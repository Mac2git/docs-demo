## epoll 函数和 IO 多路复用深度解析

### 没有 epoll 和 IO 多路复用之前

#### 多路复用要解决的问题

并发多客户端连接，在多路复用之前最简单和典型的方案：同步阻塞网络IO模型

这种模式的特点就是用一个进程来处理一个网络连接(一个用户请求)，比如一段典型的示例代码如下。

直接调用 `recv` 函数从一个 socket 上读取数据。

```c
int main()
{
 ...

 recv(sock, ...) //从用户角度来看非常简单，一个recv一用，要接收的数据就到我们手里了。
}
```

我们来总结一下这种方式：

优点：

就是这种方式非常容易让人理解，写起代码来非常的自然，符合人的直线型思维。

缺点：

就是性能差，每个用户请求到来都得占用一个进程来处理，来一个请求就要分配一个进程跟进处理，

类似一个学生配一个老师，一位患者配一个医生，可能吗？进程是一个很笨重的东西。一台服务器上创建不了多少个进程。

#### 结论

进程在 Linux 上是一个开销不小的家伙，先不说创建，光是上下文切换一次就得几个微秒。所以为了高效地对海量用户提供服务，必须要让一个进程能同时处理很多个 tcp 连接才行。现在假设一个进程保持了 10000 条连接，那么如何发现哪条连接上有数据可读了、哪条连接可写了 ？

 

我们当然可以采用循环遍历的方式来发现 IO 事件，但这种方式太低级了。



我们希望有一种更高效的机制，在很多连接中的某条上有 IO 事件发生的时候直接快速把它找出来。



其实这个事情 Linux 操作系统已经替我们都做好了，它就是我们所熟知的 IO 多路复用机制。

这里的复用指的就是对进程的复用

### IO 多路复用模型

#### 是什么

* IO：网络 I/O

* 多路：多个客户端连接（连接就是套接字描述符，即 socket 或者 channel），指的是多条 TCP 连接

* 复用：用一个进程来处理多条的连接，使用单进程就能实现同时处理多个客户端的连接

* 一句话

  * 实现了用一个进程来处理大量的用户连接

  * IO 多路复用类似于一个规范和接口，落地实现

    * 可以分 `select -> poll -> epoll`三个阶段来描述

  * 动画演示

    `IO multiplexing.gif`

    ![img](data:image/gif;base64,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)

#### redis 单线程如何处理那么多并发客户端连接，为什么单线程，为什么块

Redis的IO多路复用

Redis利用epoll函数来实现IO多路复用，将连接信息和事件放到队列中，一次放到文件事件分派器，事件分派器将事件分发给事件处理器。

![image-20250721165723132](/redisImages/image-20250721165723132.png)

Redis 是跑在单线程中的，所有的操作都是按照顺序线性执行的，但是由于读写操作等待用户输入或输出都是阻塞的，所以 I/O 操作在一般情况下往往不能直接返回，这会导致某一文件的 I/O 阻塞导致整个进程无法对其它客户提供服务，而 I/O 多路复用就是为了解决这个问题而出现

 

所谓 I/O 多路复用机制，就是说通过一种机制，可以监视多个描述符，一旦某个描述符就绪（一般是读就绪或写就绪），能够通知程序进行相应的读写操作。这种机制的使用需要 select 、 poll 、 epoll 来配合。多个连接共用一个阻塞对象，应用程序只需要在一个阻塞对象上等待，无需阻塞等待所有连接。当某条连接有新的数据可以处理时，操作系统通知应用程序，线程从阻塞状态返回，开始进行业务处理。

 

Redis 服务采用 Reactor 的方式来实现文件事件处理器（每一个网络连接其实都对应一个文件描述符） 

Redis基于Reactor模式开发了网络事件处理器，这个处理器被称为文件事件处理器。它的组成结构为4部分：

多个套接字、

IO多路复用程序、

文件事件分派器、

事件处理器。

因为文件事件分派器队列的消费是单线程的，所以Redis才叫单线程模型



#### 参考《`Redis` 设计与实现》

![image-20250721165833527](/redisImages/image-20250721165833527.png)

##### 结论

从Redis6开始，将网络数据读写、请求协议解析通过多个IO线程的来处理 ，对于真正的命令执行来说，仍然使用单线程操作，一举两得，便宜占尽！！！ o(￣▽￣)ｄ

![image-20250721165857096](/redisImages/image-20250721165857096.png)

#### 从吃米线开始，读读read...

##### 从吃米线开始，读读read...

上午开会，错过了公司食堂的饭点， 中午就和公司的首席架构师一起去楼下的米线店去吃米线。我们到了一看，果然很多人在排队。

架构师马上发话了：嚯，请求排队啊！你看这位收银点菜的，像不像nginx的反向代理？只收请求，不处理，把请求都发给后厨去处理。

我们交了钱，拿着号离开了点餐收银台，找了个座位坐下等餐。

架构师：你看，这就是异步处理，我们下了单就可以离开等待，米线做好了会通过小喇叭“回调”我们去取餐；

如果同步处理，我们就得在收银台站着等餐，后面的请求无法处理，客户等不及肯定会离开了。

接下里架构师盯着手中的纸质号牌。

架构师：你看，这个纸质号牌在后厨“服务器”那里也有，这不就是表示会话的ID吗？

有了它就可以把大家给区分开，就不会把我的排骨米线送给别人了。过了一会， 排队的人越来越多，已经有人表示不满了，可是收银员已经满头大汗，忙到极致了。

架构师：你看他这个系统缺乏弹性扩容， 现在这么多人，应该增加收银台，可以没有其他收银设备，老板再着急也没用。

老板看到在收银这里帮不了忙，后厨的订单也累积得越来越多， 赶紧跑到后厨亲自去做米线去了。

架构师又发话了：幸亏这个系统的后台有并行处理能力，可以随意地增加资源来处理请求（做米线）。

我说：他就这点儿资源了，除了老板没人再会做米线了。

不知不觉，我们等了20分钟， 但是米线还没上来。

架构师：你看，系统的处理能力达到极限，超时了吧。

这时候收银台前排队的人已经不多了，但是还有很多人在等米线。

老板跑过来让这个打扫卫生的去收银，让收银小妹也到后厨帮忙。打扫卫生的做收银也磕磕绊绊的，没有原来的小妹灵活。

架构师：这就叫服务降级，为了保证米线的服务，把别的服务都给关闭了。

又过了20分钟，后厨的厨师叫道：237号， 您点的排骨米线没有排骨了，能换成番茄的吗？

架构师低声对我说：瞧瞧， 人太多， 系统异常了。然后他站了起来：不行，系统得进行补偿操作：退费。

说完，他拉着我，饿着肚子，头也不回地走了。

##### 同步

调用者要一直等待调用结果的通知后才能进行后续的执行，现在就要，我可以等，等出结果为止

##### 异步

* 指被调用方先返回应答让调用者先回去，然后再计算调用结果，计算完最终结果后再通知并返回给调用方
* 异步调用要想获得结果一般通过回调

##### 同步与异步的理解

同步、异步的讨论对象是被调用者（服务提供者），重点在于获得调用结果的消息通知方式上

##### 阻塞

调用方一直在等待而且别的事情什么都不做，当前进/线程会被挂起，啥都不干

##### 非阻塞

调用在发出去后，调用方先去忙别的事情，不会阻塞当前进/线程，而会立即返回

##### 阻塞与非阻塞的理解

阻塞、非阻塞的讨论对象是调用者（服务请求者），重点在于等消息时候的行为，调用者是否能干其他事

##### 总结

4种组合方式

* 同步阻塞：
  * 服务员说快到你了，先别离开我后台看一眼马上通知你。客户在海底捞火锅前台干等着，啥都不干
* 同步非阻塞：
  * 服务员说快到你了，先别离开。客户在海底捞火锅前台边刷抖音边等着叫号
* 异步阻塞：
  * 服务员说还要再等等，你先去逛逛，一会儿通知你。客户怕过号在海底捞火锅前台拿着排号小票啥都不干，一直等着店员通知
* 异步非阻塞
  * 服务员说还要再等等，你先去逛逛，一会儿通知你。拿着排号小票+刷着抖音，等着店员通知

#### Unix 网络编程中的五种 IO 模型

1. Blocking IO ：阻塞 IO
2. NoneBlocking：非阻塞 IO
3. IO multiplexing：IO 多路复用
4. signal driven IO：信号驱动 IO
5. asynchronous IO：异步 IO

### java验证

#### 背景

一个redisServer+2个Client

#### BIO

当用户进程调用了recvfrom这个系统调用，kernel就开始了IO的第一个阶段：准备数据（对于网络IO来说，很多时候数据在一开始还没有到达。比如，还没有收到一个完整的UDP包。这个时候kernel就要等待足够的数据到来）。这个过程需要等待，也就是说数据被拷贝到操作系统内核的缓冲区中是需要一个过程的。而在用户进程这边，整个进程会被阻塞（当然，是进程自己选择的阻塞）。当kernel一直等到数据准备好了，它就会将数据从kernel中拷贝到用户内存，然后kernel返回结果，用户进程才解除block的状态，重新运行起来。所以，**BIO的特点就是在IO执行的两个阶段都被block了。**

![image-20250722171743375](/redisImages/image-20250722171743375.png)

![image-20250722171804256](/redisImages/image-20250722171804256.png)

##### 先演示 accept

* accept监听

* 代码案例

  `RedisServer`

  ```java
  package com.lazy.iomultiplex.bio;
  
  import java.io.IOException;
  import java.net.ServerSocket;
  import java.net.Socket;
  
  public class RedisServer {
      public static void main(String[] args) throws IOException {
          ServerSocket serverSocket = new ServerSocket(6380);
          while (true) {
              System.out.println("==== 111 等待连接 ====");
              Socket accept = serverSocket.accept();
              System.out.println("==== 222 成功连接 ====");
          }
      }
  }
  ```

  `RedisClient01`

  ```java
  package com.lazy.iomultiplex.bio;
  
  import java.io.IOException;
  import java.net.Socket;
  
  public class RedisClient01 {
      public static void main(String[] args) throws IOException {
          System.out.println("=== RedisClient01 connection success ====");
          Socket socket =  new Socket("127.0.0.1", 6380);
      }
  }
  ```

  `RedisClient02`

  ```java
  package com.lazy.iomultiplex.bio;
  
  import java.io.IOException;
  import java.net.Socket;
  
  public class RedisClient02 {
      public static void main(String[] args) throws IOException {
          System.out.println("=== RedisClient02 connection success ====");
          Socket socket =  new Socket("127.0.0.1", 6380);
      }
  }
  ```

  先启动我们的`RedisServer`，在依次启动`RedisClient01`和`RedisClient02`测试

`RedisServer`

  ![image-20250722173327027](/redisImages/image-20250722173327027.png)

`RedisClient01`

![image-20250722173346354](/redisImages/image-20250722173346354.png)

`RedisClient02`

![image-20250722173409433](/redisImages/image-20250722173409433.png)

再看看我们的`RedisServer`

![image-20250722173429815](/redisImages/image-20250722173429815.png)

我们启动了`RedisClient01`和`RedisClient02`，应该显示，两个连接成功，为什么只显示一个连接成功？接着看我们的read

##### 在演示 read

* read 读取

* 代码案例

  * 1

    先启动 `RedisServerBIO`，在启动`RedisClient01`验证后再启动2号客户端

    `RedisServerBIO`

    ```java
    package com.lazy.iomultiplex.bio.read;
    
    import java.io.IOException;
    import java.io.InputStream;
    import java.net.ServerSocket;
    import java.net.Socket;
    
    public class RedisServerBIO {
        public static void main(String[] args) throws IOException {
            ServerSocket serverSocket = new ServerSocket(6380);
            while (true) {
                System.out.println("=== 111 等待连接 ===");
                Socket socket = serverSocket.accept();//阻塞 1 ，等待客户端连接
                System.out.println("=== 222 成功连接 ====");
                InputStream inputStream = socket.getInputStream();//获得输入流
                int length;
                byte[] bytes = new byte[1024];
                System.out.println("=== 333 等待读取");
                while ((length = inputStream.read(bytes)) != -1) {//阻塞 2 ，等待客户端发送数据
                    System.out.println("=== 444 成功读取："+new String(bytes, 0, length));
                    System.out.println("=======");
                }
                inputStream.close();
                socket.close();
            }
        }
    }
    ```

    `RedisClient01`

    ```java
    package com.lazy.iomultiplex.bio.read;
    
    import java.io.IOException;
    import java.net.Socket;
    import java.util.Scanner;
    
    public class RedisClient01 {
        public static void main(String[] args) throws IOException {
            Socket socket = new Socket("127.0.0.1",6380);
            System.out.println("RedisClient01 Connected to RedisServerBIO");
            while (true){
                Scanner scanner = new Scanner(System.in);
                String string = scanner.next();
                if (string.equalsIgnoreCase("quit")){
                    break;
                }
                socket.getOutputStream().write(string.getBytes());
                System.out.println("输入quit退出");
            }
        }
    }
    ```
  
    `RedisClient02`
  
    ```java
    package com.lazy.iomultiplex.bio.read;
    
    import java.io.IOException;
    import java.net.Socket;
    import java.util.Scanner;
    
    public class RedisClient02 {
        public static void main(String[] args) throws IOException {
            Socket socket = new Socket("127.0.0.1",6380);
            System.out.println("RedisClient02 Connected to RedisServerBIO");
            while (true){
                Scanner scanner = new Scanner(System.in);
                String string = scanner.next();
                if (string.equalsIgnoreCase("quit")){ 
                    break;
                }
                socket.getOutputStream().write(string.getBytes());
                System.out.println("输入quit退出");
            }
        }
    }
    ```
  
    先启动`RedisServerBIO`，再启动`RedisClient01`和`RedisClient02`，测试
  
    `RedisServerBIO`
  
    ![image-20250722175025041](/redisImages/image-20250722175025041.png)
  
    `RedisClient01`
  
    ![image-20250722175228055](/redisImages/image-20250722175228055.png)
  
    输入内容
  
    ![image-20250722175250860](/redisImages/image-20250722175250860.png)
  
    `RedisServerBIO`
  
    ![image-20250722175310389](/redisImages/image-20250722175310389.png)
  
    再启动`RedisClient02`，并输入内容
  
    ![image-20250722175347302](/redisImages/image-20250722175347302.png)
  
    `RedisServerBIO`
  
    ![image-20250722175418138](/redisImages/image-20250722175418138.png)
  
  * 存在的问题
  
    上面的模型存在很大的问题，如果客户端与服务端建立了连接，
  
    如果这个连接的客户端迟迟不发数据，程就会一直堵塞在read()方法上，这样其他客户端也不能进行连接，
  
    也就是一次只能处理一个客户端，对客户很不友好
  
     
  
     
  
    知道问题所在了，请问如何解决？？
  
  * 2
  
    多线程模式
  
    ​	利用多线程
  
    ​	只要连接了一个socket，操作系统分配一个线程来处理，这样read()方法堵塞在每个具体线程上而不堵塞主线程，
  
    ​	就能操作多个socket了，哪个线程中的socket有数据，就读哪个socket，各取所需，灵活统一。
  
     
  
    ​	程序服务端只负责监听是否有客户端连接，使用 accept() 阻塞
  
    ​	客户端1连接服务端，就开辟一个线程（thread1）来执行 read() 方法，程序服务端继续监听
  
    ​	客户端2连接服务端，也开辟一个线程（thread2）来执行 read() 方法，程序服务端继续监听
  
    ​	客户端3连接服务端，也开辟一个线程（thread3）来执行 read() 方法，程序服务端继续监听
  
    ​	。。。。。。
  
     
  
    ​	任何一个线程上的socket有数据发送过来，read()就能立马读到，cpu就能进行处理。
  
    `RedisServerBIOMultiThread`
  
    ```java
    package com.lazy.iomultiplex.bio.mythread;
    
    import java.io.IOException;
    import java.io.InputStream;
    import java.net.ServerSocket;
    import java.net.Socket;
    
    public class RedisServerBIOMultiThread {
        public static void main(String[] args) throws IOException {
            ServerSocket serverSocket = new ServerSocket(6380);
    
            while (true) {
                System.out.println("=== 等待连接 ===");
                Socket socket = serverSocket.accept();//阻塞，等待客户端连接
                System.out.println("=== 成功连接 ===");
                new Thread(() -> {
                    try {
                        InputStream inputStream = socket.getInputStream();
                        int length = -1;
                        byte[] bytes = new byte[1024];
                        System.out.println("=== 等待读取 ===");
                        while ((length = inputStream.read(bytes)) != -1) {
                            System.out.println("=== 成功读取 ===");
                            System.out.println("内容为："+new String(bytes,0,length));
                        }
                        inputStream.close();
                        socket.close();
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                },Thread.currentThread().getName()).start();
                System.out.println(Thread.currentThread().getName());
            }
        }
    }
    ```
  
    `RedisClient01`
  
    ```java
    package com.lazy.iomultiplex.bio.mythread;
    
    import java.io.IOException;
    import java.io.OutputStream;
    import java.net.Socket;
    import java.util.Scanner;
    
    public class RedisClient01 {
        public static void main(String[] args) throws IOException {
            System.out.println("RedisClient01 连接 RedisServerBIOMultiThread 成功");
            Socket socket = new Socket("127.0.0.1", 6380);
            OutputStream outputStream = socket.getOutputStream();
            while (true){
                Scanner scanner = new Scanner(System.in);
                String string = scanner.next();
                if (string.equalsIgnoreCase("quit")){
                    break;
                }
                outputStream.write(string.getBytes());
                System.out.println("输入quit退出！");
                outputStream.close();
                socket.close();
            }
        }
    }
    ```
  
    `RedisClient02`
  
    ```java
    package com.lazy.iomultiplex.bio.mythread;
    
    import java.io.IOException;
    import java.io.OutputStream;
    import java.net.Socket;
    import java.util.Scanner;
    
    public class RedisClient02 {
        public static void main(String[] args) throws IOException {
            System.out.println("RedisClient02 连接 RedisServerBIOMultiThread 成功");
            Socket socket = new Socket("127.0.0.1", 6380);
            OutputStream outputStream = socket.getOutputStream();
            while (true){
                Scanner scanner = new Scanner(System.in);
                String string = scanner.next();
                if (string.equalsIgnoreCase("quit")){
                    break;
                }
                outputStream.write(string.getBytes());
                System.out.println("输入quit退出！");
                outputStream.close();
                socket.close();
            }
        }
    }
    ```
  
    `RedisServerBIOMultiThread`
  
    ![image-20250722181457966](/redisImages/image-20250722181457966.png)
  
    `RedisClient01`
  
    ![image-20250722181536938](/redisImages/image-20250722181536938.png)
  
    `RedisServerBIOMultiThread`
  
    ![image-20250722181701254](/redisImages/image-20250722181701254.png)
  
    `RedisClient02`
  
    ![image-20250722181626426](/redisImages/image-20250722181626426.png)
  
    `RedisServerBIOMultiThread`
  
    ![image-20250722181732453](/redisImages/image-20250722181732453.png)
  
  * 存在的问题
  
    多线程模型
  
    每来一个客户端，就要开辟一个线程，如果来1万个客户端，那就要开辟1万个线程。
  
    在操作系统中用户态不能直接开辟线程，需要调用内核来创建的一个线程，
  
    这其中还涉及到用户状态的切换（上下文的切换），十分耗资源。
  
     
  
     
  
    知道问题所在了，请问如何解决？？
  
    * 解决
  
      第一个办法：使用线程池
  
       
  
      这个在客户端连接少的情况下可以使用，但是用户量大的情况下，你不知道线程池要多大，太大了内存可能不够，也不可行。
  
       
  
       
  
      第二个办法：NIO（非阻塞式IO）方式
  
      因为read()方法堵塞了，所有要开辟多个线程，如果什么方法能使read()方法不堵塞，这样就不用开辟多个线程了，这就用到了另一个IO模型，NIO（非阻塞式IO）
  
       

##### 总结

tomcat7之前就是用 BIO 多线程来解决多连接

##### 目前我们的两个痛点

两个痛点

* accept
* read
* 在阻塞式 I/O 模型中，应用程序在调用 `recvfrom` 开始到它返回有数据报准备好这段时间是阻塞的，`recvfrom` 返回成功后，应用程序才能开始处理数据报

阻塞式 IO 小总结

![image-20250722182156454](/redisImages/image-20250722182156454.png)

思考

每个线程分配一个连接，必然会产生多个，既然是多个 `socket` 连接必然需要放入进容器，纳入统一管理

#### NIO

当用户进程发出read操作时，如果kernel中的数据还没有准备好，那么它并不会block用户进程，而是立刻返回一个error。从用户进程角度讲 ，它发起一个read操作后，并不需要等待，而是马上就得到了一个结果。用户进程判断结果是一个error时，它就知道数据还没有准备好，于是它可以再次发送read操作。一旦kernel中的数据准备好了，并且又再次收到了用户进程的system call，那么它马上就将数据拷贝到了用户内存，然后返回。**所以，NIO特点是用户进程需要不断的主动询问内核数据准备好了吗？一句话，用轮询替代阻塞！**

![image-20250723165325836](/redisImages/image-20250723165325836.png)

在NIO模式中，一切都是非阻塞的：

 

accept()方法是非阻塞的，如果没有客户端连接，就返回无连接标识

read()方法是非阻塞的，如果read()方法读取不到数据就返回空闲中标识，如果读取到数据时只阻塞read()方法读数据的时间

 

在NIO模式中，只有一个线程：

当一个客户端与服务端进行连接，这个socket就会加入到一个数组中，隔一段时间遍历一次，

看这个socket的read()方法能否读到数据，这样一个线程就能处理多个客户端的连接和读取了

##### 代码案例

上述以前的socket是阻塞的，另外发开了一套 `API` ServerSocketChannel

![image-20250723165450855](/redisImages/image-20250723165450855.png)

`RedisServerNIO`

```java
package com.lazy.iomultiplex.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.ArrayList;

public class RedisServerNIO {

    static ArrayList<SocketChannel> socketList = new ArrayList<>();
    static ByteBuffer buffer = ByteBuffer.allocate(1024);

    public static void main(String[] args) throws IOException {
        System.out.println("=== Redis Server NIO 启动等待中...===");
        ServerSocketChannel serverSocket = ServerSocketChannel.open();
        serverSocket.socket().bind(new InetSocketAddress("127.0.0.1", 6380));
        serverSocket.configureBlocking(false);//设置为非阻塞模式

        while (true) {
            for (SocketChannel element : socketList) {
                int read = element.read(buffer);
                if (read > 0) {//当有数据的时候
                    System.out.println("=== 读取数据："+read);
                    buffer.flip();
                    byte[] bytes = new byte[read];
                    buffer.get(bytes);
                    System.out.println(new String(bytes));
                    buffer.clear();
                }
            }
            SocketChannel socketChannel = serverSocket.accept();
            if (socketChannel != null) { //如果不等于空，成功连接
                System.out.println("=== 成功连接：");
                socketChannel.configureBlocking(false);//设置为非阻塞模式
                socketList.add(socketChannel);
                System.out.println("socketList 容量为："+socketList.size());
            }
        }
    }
}
```

`RedisClient01`

```java
package com.lazy.iomultiplex.nio;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.util.Scanner;

public class RedisClient01 {
    public static void main(String[] args) throws IOException {
        System.out.println("RedisClient01 开始");
        Socket socket = new Socket("127.0.0.1", 6380);
        OutputStream outputStream = socket.getOutputStream();
        while (true){
            Scanner scanner = new Scanner(System.in);
            System.out.println("请输入数据：");
            String string = scanner.next();
            if (string.equalsIgnoreCase("quit")) {
                break;
            }
            outputStream.write(string.getBytes());//写入数据
            System.out.println("输入quit退出！");
        }
        outputStream.close();
        socket.close();
    }
}
```

`RedisClient02`

```java
package com.lazy.iomultiplex.nio;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.util.Scanner;

public class RedisClient02 {
    public static void main(String[] args) throws IOException {
        System.out.println("RedisClient01 开始");
        Socket socket = new Socket("127.0.0.1", 6380);
        OutputStream outputStream = socket.getOutputStream();
        while (true){
            Scanner scanner = new Scanner(System.in);
            System.out.println("请输入数据：");
            String string = scanner.next();
            if (string.equalsIgnoreCase("quit")) {
                break;
            }
            outputStream.write(string.getBytes());//写入数据
            System.out.println("输入quit退出！");
        }
        outputStream.close();
        socket.close();
    }
}
```

效果

`RedisServerNIO`

![image-20250723170650738](/redisImages/image-20250723170650738.png)

`RedisClient01`

![image-20250723170726565](/redisImages/image-20250723170726565.png)

`RedisClient02`

![image-20250723170743851](/redisImages/image-20250723170743851.png)

`RedisServerNIO`

![image-20250723170805419](/redisImages/image-20250723170805419.png)

##### 存在的问题和优缺点

NIO成功的解决了BIO需要开启多线程的问题，NIO中一个线程就能解决多个socket，但是还存在2个问题。

 

**问题一：**

这个模型在客户端少的时候十分好用，但是客户端如果很多，

比如有1万个客户端进行连接，那么每次循环就要遍历1万个socket，如果一万个socket中只有10个socket有数据，也会遍历一万个socket，就会做很多无用功，每次遍历遇到 read 返回 -1 时仍然是一次浪费资源的系统调用。

 

**问题二：**

而且这个遍历过程是在用户态进行的，用户态判断socket是否有数据还是调用内核的read()方法实现的，这就涉及到用户态和内核态的切换，每遍历一个就要切换一次，开销很大因为这些问题的存在。

 

优点：不会阻塞在内核的等待数据过程，每次发起的 I/O 请求可以立即返回，不用阻塞等待，实时性较好。

缺点：轮询将会不断地询问内核，这将占用大量的 CPU 时间，系统资源利用率较低，所以一般 Web 服务器不使用这种 I/O 模型。

结论：让Linux内核搞定上述需求，我们将一批文件描述符通过一次系统调用传给内核由内核层去遍历，才能真正解决这个问题。IO多路复用应运而生，也即将上述工作直接放进Linux内核，不再两态转换而是直接从内核获得结果，**因为内核是非阻塞的。**

非阻塞式IO小总结

![image-20250722182156454](/redisImages/image-20250722182156454.png)

问题升级：

如何用单线程处理大量的连接？(使用IO多路复用)

#### IO Multiplexing（IO 多路复用）

##### 是什么

![image-20250723183906773](/redisImages/image-20250723183906773.png)

I/O多路复用在英文中其实叫 I/O multiplexing 

![image-20250723183931129](/redisImages/image-20250723183931129.png)

多个Socket复用一根网线这个功能是在内核＋驱动层实现的

I/O multiplexing 这里面的 multiplexing 指的其实是在单个线程通过记录跟踪每一个Sock(I/O流)的状态来同时管理多个I/O流. 目的是尽量多的提高服务器的吞吐能力。

![image-20250723183946081](/redisImages/image-20250723183946081.png)

大家都用过nginx，nginx使用epoll接收请求，ngnix会有很多链接进来， epoll会把他们都监视起来，然后像拨开关一样，谁有数据就拨向谁，然后调用相应的代码处理。redis类似同理

`FileDescriptor`

 文件描述符（File descriptor）是计算机科学中的一个术语，是一个用于表述指向文件的引用的抽象化概念。文件描述符在形式上是一个非负整数。实际上，它是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。在程序设计中，一些涉及底层的程序编写往往会围绕着文件描述符展开。但是文件描述符这一概念往往只适用于UNIX、Linux这样的操作系统。

![image-20250723184027965](/redisImages/image-20250723184027965.png)

IO 多路复用

视多个描述符，一旦某个描述符就绪（一般是读就绪或者写就绪），能够通知程序进行相应的读写操作。可以基于一个阻塞对象并同时在多个描述符上等待就绪，而不是使用多个线程(每个文件描述符一个线程，每次new一个线程)，这样可以大大节省系统资源。所以，I/O 多路复用的特点是通过一种机制一个进程能同时等待多个文件描述符而这些文件描述符（套接字描述符）其中的任意一个进入读就绪状态，select，poll，epoll等函数就可以返回。

![image-20250723184051642](/redisImages/image-20250723184051642.png)

##### 解释

模拟一个tcp服务器处理30个客户socket，一个监考老师监考多个学生，谁举手就应答谁。

 

假设你是一个监考老师，让30个学生解答一道竞赛考题，然后负责验收学生答卷，你有下面几个选择：

第一种选择：按顺序逐个验收，先验收A，然后是B，之后是C、D。。。这中间如果有一个学生卡住，全班都会被耽误,你用循环挨个处理socket，根本不具有并发能力。 



第二种选择：你创建30个分身线程，每个分身线程检查一个学生的答案是否正确。 这种类似于为每一个用户创建一个进程或者线程处理连接。



第三种选择，你站在讲台上等，谁解答完谁举手。这时C、D举手，表示他们解答问题完毕，你下去依次检查C、D的答案，然后继续回到讲台上等。此时E、A又举手，然后去处理E和A。。。这种就是IO复用模型。Linux下的select、poll和epoll就是干这个的。

 

将用户socket对应的fd注册进epoll，然后epoll帮你监听哪些socket上有消息到达，这样就避免了大量的无用操作。此时的socket应该采用非阻塞模式。这样，整个过程只在调用select、poll、epoll这些调用的时候才会阻塞，收发客户消息是不会阻塞的，整个进程或者线程就被充分利用起来，这就是事件驱动，所谓的reactor反应模式。

##### 能干嘛

Redis 单线程如何处理那么多并发客户端连接，为什么单线程，为什么快

* Redis的IO多路复用

  * Redis利用epoll来实现IO多路复用，将连接信息和事件放到队列中，依次放到事件分派器，事件分派器将事件分发给事件处理器。

    ![image-20250723184140922](/redisImages/image-20250723184140922.png)

    Redis 服务采用 Reactor 的方式来实现文件事件处理器（每一个网络连接其实都对应一个文件描述符) 

    ​	所谓 I/O 多路复用机制，就是说通过一种机制，可以监视多个描述符，一旦某个描述符就绪（一般是读就绪或写就绪），能够通知程序进行相应的读写操作。这种机制的使用需要 select 、 poll 、 epoll 来配合。多个连接共用一个阻塞对象，应用程序只需要在一个阻塞对象上等待，无需阻塞等待所有连接。当某条连接有新的数据可以处理时，操作系统通知应用程序，线程从阻塞状态返回，开始进行业务处理。

    ​	所谓 I/O 多路复用机制，就是说通过一种考试监考机制，一个老师可以监视多个考生，一旦某个考生举手想要交卷了，能够通知监考老师进行相应的收卷子或批改检查操作。所以这种机制需要调用班主任(select/poll/epoll)来配合。多个考生被同一个班主任监考，收完一个考试的卷子再处理其它人，无需等待所有考生，谁先举手就先响应谁，当又有考生举手要交卷，监考老师看到后从讲台走到考生位置，开始进行收卷处理。

Reactor 设计模式

是什么

* ​	基于 I/O 复用模型：多个连接共用一个阻塞对象，应用程序只需要在一个阻塞对象上等待，无需阻塞等待所有连接。当某条连接有新的数据可以处理时，操作系统通知应用程序，线程从阻塞状态返回，开始进行业务处理。

  ​	Reactor 模式，是指通过一个或多个输入同时传递给服务处理器的服务请求的事件驱动处理模式。服务端程序处理传入多路请求，并将它们同步分派给请求对应的处理线程，Reactor 模式也叫 Dispatcher 模式。即 I/O 多了复用统一监听事件，收到事件后分发(Dispatch 给某进程)，是编写高性能网络服务器的必备技术。

  ![image-20250723184442547](/redisImages/image-20250723184442547.png)

  Reactor 模式中有 2 个关键组成：

  1）Reactor：Reactor 在一个单独的线程中运行，负责监听和分发事件，分发给适当的处理程序来对 IO 事件做出反应。 它就像公司的电话接线员，它接听来自客户的电话并将线路转移到适当的联系人；

  2）Handlers：处理程序执行 I/O 事件要完成的实际事件，类似于客户想要与之交谈的公司中的实际办理人。Reactor 通过调度适当的处理程序来响应 I/O 事件，处理程序执行非阻塞操作。

* 每个网络连接其实都对应一个文件描述符

  ![image-20250723184529026](/redisImages/image-20250723184529026.png)

  Redis 服务采用 Reactor 的方式来实现文件事件处理器（每一个网络连接其实都对应一个文件描述符）

   

  Redis基于Reactor模式开发了网络事件处理器，这个处理器被称为文件事件处理器。

  它的组成结构为4部分：

  多个套接字、

  IO多路复用程序、

  文件事件分派器、

  事件处理器。因为文件事件分派器队列的消费是单线程的，所以Redis才叫单线程模型



##### select、poll、epoll 都是 I/O 多路复用的具体的实现

C语言 struct 结构体语法简介

![image-20250723184740611](/redisImages/image-20250723184740611.png)

![image-20250723184751292](/redisImages/image-20250723184751292.png)

select 方法

* Linux 官网或者 man

  ![image-20250723184834546](/redisImages/image-20250723184834546.png)

  select 函数监视的文件描述符分3类，分别是readfds、writefds和exceptfds，将用户传入的数组拷贝到内核空间

   

  调用后select函数会阻塞，直到有描述符就绪（有数据 可读、可写、或者有except）或超时（timeout指定等待时间，如果立即返回设为null即可），函数返回。

   

  当select函数返回后，可以通过遍历fdset，来找到就绪的描述符。

  官网：https://man7.org/linux/man-pages/man2/select.2.html

  select 是第一个实现（1983 左右在BSD里面实现的）

* 用户态我们自己写的java代码思想

  ![image-20250723185036920](/redisImages/image-20250723185036920.png)

* C 语言代码

  ![image-20250723185055165](/redisImages/image-20250723185055165.png)

  ![image-20250723185104663](/redisImages/image-20250723185104663.png)

  ![image-20250723185113871](/redisImages/image-20250723185113871.png)

* 优点

  select 其实就是把NIO中用户态要遍历的fd数组(我们的每一个socket链接，安装进ArrayList里面的那个)拷贝到了内核态，让内核态来遍历，因为用户态判断socket是否有数据还是要调用内核态的，所有拷贝到内核态后，这样遍历判断的时候就不用一直用户态和内核态频繁切换了

   

  从代码中可以看出，select系统调用后，返回了一个置位后的&rset，这样用户态只需进行很简单的二进制比较，就能很快知道哪些socket需要read数据，有效提高了效率

  ![image-20250723185145446](/redisImages/image-20250723185145446.png)

* 缺点

  ![image-20250723185221023](/redisImages/image-20250723185221023.png)

  1. bitmap最大1024位，一个进程最多只能处理1024个客户端
  1. &rset不可重用，每次socket有数据就相应的位会被置位
  1. 文件描述符数组拷贝到了内核态(只不过无系统调用切换上下文的开销。（内核层可优化为异步事件通知）)，仍然有开销。select 调用需要传入 fd 数组，需要拷贝一份到内核，高并发场景下这样的拷贝消耗的资源是惊人的。（可优化为不复制）
  1. select并没有通知用户态哪一个socket有数据，仍然需要O(n)的遍历。select 仅仅返回可读文件描述符的个数，具体哪个可读还是要用户自己遍历。（可优化为只返回给用户就绪的文件描述符，无需用户做无效的遍历）

  我们自己模拟写的是，RedisServerNIO.java,只不过将它内核化了。

* select 小结论

  select方式，既做到了一个线程处理多个客户端连接（文件描述符），又减少了系统调用的开销（多个文件描述符只有一次 select 的系统调用 + N次就绪状态的文件描述符的 read 系统调用

##### poll 方法

Linux 官网或者 man

![image-20250723190312309](/redisImages/image-20250723190312309.png)

1997 年实现了 poll

官网：https://man7.org/linux/man-pages/man2/poll.2.html

C 语言代码

![image-20250723190424306](/redisImages/image-20250723190424306.png)

![image-20250723190432890](/redisImages/image-20250723190432890.png)

![image-20250723190445858](/redisImages/image-20250723190445858.png)

优点

1. poll使用pollfd数组来代替select中的bitmap，数组没有1024的限制，可以一次管理更多的client。它和 select 的主要区别就是，去掉了 select 只能监听 1024 个文件描述符的限制。
2. 当pollfds数组中有事件发生，相应的revents置位为1，遍历的时候又置位回零，实现了pollfd数组的重用

问题

poll 解决了select缺点中的前两条，其本质原理还是select的方法，还存在select中原来的问题

1. pollfds数组拷贝到了内核态，仍然有开销
2. poll并没有通知用户态哪一个socket有数据，仍然需要O(n)的遍历

##### epoll 方法

Linux 官网或者 man

![image-20250723190615538](/redisImages/image-20250723190615538.png)

![image-20250723190623761](/redisImages/image-20250723190623761.png)

![image-20250723190631959](/redisImages/image-20250723190631959.png)

| int epoll_create(int size)                                   | 参数size并不是限制了epoll所能监听的描述符最大个数，只是对内核初始分配内部数据结构的一个建议 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event) | 见上图                                                       |
| int epoll_wait(int epfd, struct epoll_event * events, int maxevents, int timeout) | 等待epfd上的io事件，最多返回maxevents个事件。参数events用来从内核得到事件的集合，maxevents告之内核这个events有多大。 |

在2002年被大神 Davide Libenzi (戴维德·利本兹)发明出来了



三步调用

* epoll_create

  * 创建一个epoll句柄

    ![image-20250723190825824](/redisImages/image-20250723190825824.png)

* epoll_ctl

  * 向内核添加、修改或删除要监控的文件描述符

  ![image-20250723190903214](/redisImages/image-20250723190903214.png)

* epoll_wait

  * 类似发起了 select() 调用

    ![image-20250723190948106](/redisImages/image-20250723190948106.png)

C 语言代码

![image-20250723191005378](/redisImages/image-20250723191005378.png)

![image-20250723191021305](/redisImages/image-20250723191021305.png)

结论

​	多路复用快的原因在于，操作系统提供了这样的系统调用，使得原来的 while 循环里多次系统调用，

变成了一次系统调用 + 内核层遍历这些文件描述符。

​	epoll是现在最先进的IO多路复用器，Redis、Nginx，linux中的Java NIO都使用的是epoll。

这里“多路”指的是多个网络连接，“复用”指的是复用同一个线程。

1. 一个socket的生命周期中只有一次从用户态拷贝到内核态的过程，开销小
2. 使用event事件通知机制，每次socket中有数据会主动通知内核，并加入到就绪链表中，不需要遍历所有的socket

​	在多路复用IO模型中，会有一个内核线程不断地去轮询多个 socket 的状态，只有当真正读写事件发送时，才真正调用实际的IO读写操作。因为在多路复用IO模型中，只需要使用一个线程就可以管理多个socket，系统不需要建立新的进程或者线程，也不必维护这些线程和进程，并且只有真正有读写事件进行时，才会使用IO资源，所以它大大减少来资源占用。多路I/O复用模型是利用 select、poll、epoll 可以同时监察多个流的 I/O 事件的能力，在空闲的时候，会把当前线程阻塞掉，当有一个或多个流有 I/O 事件时，就从阻塞态中唤醒，于是程序就会轮询一遍所有的流（epoll 是只轮询那些真正发出了事件的流），并且只依次顺序的处理就绪的流，这种做法就避免了大量的无用操作。 采用多路 I/O 复用技术可以让单个线程高效的处理多个连接请求（尽量减少网络 IO 的时间消耗），且 Redis 在内存中操作数据的速度非常快，也就是说内存内的操作不会成为影响Redis性能的瓶颈

##### 三个方法对比

![image-20250723191111492](/redisImages/image-20250723191111492.png)

#### 5种 I/O 模型总结

 多路复用快的原因在于，操作系统提供了这样的系统调用，使得原来的 while 循环里多次系统调用，

变成了一次系统调用 + 内核层遍历这些文件描述符。 

所谓 I/O 多路复用机制，就是说通过一种机制，可以监视多个描述符，一旦某个描述符就绪（一般是读就绪或写就绪），能够通知程序进行相应的读写操作。这种机制的使用需要 select 、 poll 、 epoll 来配合。多个连接共用一个阻塞对象，应用程序只需要在一个阻塞对象上等待，无需阻塞等待所有连接。当某条连接有新的数据可以处理时，操作系统通知应用程序，线程从阻塞状态返回，开始进行业务处理；

![image-20250723191208911](/redisImages/image-20250723191208911.png)

#### 为什么3个都保有

![image-20250723191232748](/redisImages/image-20250723191232748.png)

### 案例实战（微信抢红包）

#### 业务描述

![image-20250724170119462](/redisImages/image-20250724170119462.png)

#### 需求分析

1. 各种节假日，发红包+抢红包，不说了，100%高并发业务要求，不能用mysql来做
2. 一个总的大红包，会有可能拆分成多个小红包，总金额= 分金额1+分金额2+分金额3......分金额N
3. 每个人只能抢一次，你需要有记录，比如100块钱，被拆分成10个红包发出去，总计有10个红包，抢一个少一个，总数显示(10/6)直到完，需要记录那些人抢到了红包，重复抢作弊不可以。
4. 有可能还需要你计时，完整抢完，从发出到全部over，耗时多少？
5. 红包过期，或者群主人品差，没人抢红包，原封不动退回。
6. 红包过期，剩余金额可能需要回退到发红包主账户下。

由于是高并发不能用mysql来做，只能用redis，那需要要redis的什么数据类型？

#### 架构设计

难点：

1. 拆分算法如何

  红包其实就是金额，拆分算法如何 ？给你100块，分成10个小红包(金额有可能小概率相同，有2个红包都是2.58)，

  如何拆分随机金额设定每个红包里面安装多少钱?

2. 次数限制

  	每个人只能抢一次，次数限制

3. 原子性

  每抢走一个红包就减少一个(类似减库存)，那这个就需要保证库存的-----------------------原子性，不加锁实现

你认为存在redis什么数据类型里面？set ？hash？ list？

##### 关键点

* 发红包
* 抢红包
  * 抢，不加锁且原子性，还能支持高并发
  * 每人一次且有抢红包记录
* 记红包
  * 记录每个人抢了多少
* 拆红包
  * 拆红包算法
    1. 所有人抢到金额之和等于红包金额，不能超过，也不能少于
    2. 每个人至少抢到一分钱
    3. 要保证所有人抢到金额的几率相等

##### 结论

抢红包业务通用算法

**二倍均值法**

剩余红包金额为M，剩余人数为N，那么有如下公式：

每次抢到的金额 = 随机区间 （0， (剩余红包金额M ÷ 剩余人数N ) X 2）

这个公式，保证了每次随机金额的平均值是相等的，不会因为抢红包的先后顺序而造成不公平。

举个例子：

假设有10个人，红包总额100元。

第1次：

100÷10 X2 = 20, 所以第一个人的随机范围是（0，20 )，平均可以抢到10元。假设第一个人随机到10元，那么剩余金额是100-10 = 90 元。

第2次：

90÷9 X2 = 20, 所以第二个人的随机范围同样是（0，20 )，平均可以抢到10元。假设第二个人随机到10元，那么剩余金额是90-10 = 80 元。

第3次：

80÷8 X2 = 20, 所以第三个人的随机范围同样是（0，20 )，平均可以抢到10元。 以此类推，每一次随机范围的均值是相等的。



数据类型

| 发红包 | 抢红包 | 记红包 | 拆红包算法 |
| :----: | :----: | :----: | :--------: |
|  list  |  list  |  hash  | 二倍均值法 |

#### 代码实现

改代码没有`service`只有`controller`

`pom`

```xml
<dependencies>
    <!--SpringBoot通用依赖模块-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--SpringBoot与Redis整合依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <!-- redis 连接池 -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
    </dependency>
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>23.0</version>
    </dependency>
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.8.8</version>
    </dependency>
</dependencies>
```

`yaml`

```yaml
server:
  port: 7777
spring:
  application:
    name: redis_distributed_lock2
  data:
    redis:
      host: 192.168.0.136
      port: 6379
      password: redis
      lettuce:
        pool:
          max-idle: 8
          max-wait: -1ms
          max-active: 8
          min-idle: 0
      database: 0
```

`controller`

```java
package com.lazy.controller;

import cn.hutool.core.util.IdUtil;
import com.google.common.primitives.Ints;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
public class RedPackageController {

    public static final String RED_PACKAGE_KEY = "redPackage:";
    public static final String RED_PACKAGE_CONSUMER_KEY = "redPackage:consumer:";

    @Resource
    private RedisTemplate<String,Object> redisTemplate;

    @GetMapping(value = "/send")
    public String send(Integer totalMoney,Integer redPackageNumber)
    {
        //拆红包，总金额拆分成多少个红包，每个小红包里面包多少钱
        Integer[] splitPackages = splitRedPackage(totalMoney, redPackageNumber);
        String key = RED_PACKAGE_KEY + IdUtil.simpleUUID();
        //采用list存储红包并设置过期时间
        redisTemplate.opsForList().leftPushAll(key, splitPackages);
        redisTemplate.expire(key,1, TimeUnit.DAYS);
        //将数组转成字符串显示
        return key + "\t\t"+ Ints.asList(Arrays.stream(splitPackages).mapToInt(Integer::valueOf).toArray());
    }

    @GetMapping("/rob")
    public String redPackage(String redPackageKey,String userId)
    {
        //验证某个用户是否抢过红包
        Object redPackage = redisTemplate.opsForHash().get(RED_PACKAGE_CONSUMER_KEY + redPackageKey, userId);
        if (redPackage != null)
        {
            return "errorCode:-2,   message: "+"\t"+userId+" 用户你已经抢过红包了";
        }
        //从 list 里面出队一个红包，抢到一个
        Object partRedPackage = redisTemplate.opsForList().leftPop(RED_PACKAGE_KEY + redPackageKey);
        if ( partRedPackage == null ) {
            return "errorCode:-1,红包抢完了";
        }
        //抢到手后，记录进去hash表示谁抢到了多少钱的某一个红包
        redisTemplate.opsForHash().put(RED_PACKAGE_CONSUMER_KEY + redPackageKey, userId, partRedPackage);
        System.out.println("用户: "+userId+"\t 抢到多少钱红包: "+partRedPackage);
        //TODO 后续异步进mysql或者RabbitMQ进一步处理
        return String.valueOf(partRedPackage);
    }

    /**
     * 拆完红包总金额+每个小红包金额别太离谱
     * @param totalMoney
     * @param redPackageNumber
     * @return
     */
    private Integer[] splitRedPackage(Integer totalMoney,Integer redPackageNumber){
        int useMoney = 0;
        Integer[] redPackageNumbers = new Integer[redPackageNumber];
        for (int i = 0; i < redPackageNumber; i++) {
            if (i == redPackageNumber-1) {
                redPackageNumbers[i] = totalMoney - useMoney;//如果为最后一个红包把剩余的金额放到里面
            }else {
                //二倍均值算法，每次拆分后塞进子红包的金额 = 随机区间(0,(剩余红包金额M ÷ 未被抢的剩余红包个数N)×2)
                int avgMoney = ((totalMoney-useMoney)/(redPackageNumber-i))*2;
                redPackageNumbers[i] = 1 + new Random().nextInt(avgMoney);
            }
            useMoney += redPackageNumbers[i];
        }
        return redPackageNumbers;
    }
}
```

效果

发红包

![image-20250724173311185](/redisImages/image-20250724173311185.png)

抢红包

![image-20250724173732374](/redisImages/image-20250724173732374.png)

抢完红包

![image-20250724173814301](/redisImages/image-20250724173814301.png)

抢过红包

![image-20250724173832149](/redisImages/image-20250724173832149.png)

![image-20250724173842305](/redisImages/image-20250724173842305.png)

![image-20250724173931290](/redisImages/image-20250724173931290.png)

#### 如何批量删除？

当需要删除符合特定模式的键时，可以结合 *KEYS* 或 *SCAN* 命令。

**使用 KEYS + xargs：**

redis-cli KEYS "pattern*" | xargs redis-cli DEL

- 示例：删除所有以 *user:* 开头的键：

redis-cli KEYS "user:*" | xargs redis-cli DEL

**使用 SCAN + xargs（推荐生产环境）：**

redis-cli --scan --pattern "cache:*" | xargs -L 1000 redis-cli DEL

- SCAN 命令避免了 KEYS 的阻塞问题，更适合大规模数据。

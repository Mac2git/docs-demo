## Redis经典五大类型源码及底层实现

本源码基于redis7.0.5

Redis数据类型和底层数据结构

* SDS动态字符串
* 双向链表
* 压缩列表ziplist
* 哈希表hashtable
* 跳表skiplist
* 整数集合intset
* 快速列表quicklist
* 紧凑列表listpack

源码在哪里？

github ：https://github.com/redis/redis

![image-20250716165354378](/redisImages/image-20250716165354378.png)

### Redis核心部分

src源码包下面该如何看？

#### Redis基本数据结构（骨架）

* Github官网说明

  ![image-20250716170131856](/redisImages/image-20250716170131856.png)

  * Redis对象object.c
  * 字符串t_string.c
  * 列表t_list.c
  * 字典t_hash.c
  * 集合及有序集合t_set.c和t_zset.c
  * 数据流t_stream.c：Streams的底层实现结构listpack.c和rax.c

* 简单动态字符串sds.c
* 整数集合intset.c
* 压缩列表ziplist.c
* 快速链表quicklist.c
* listpack（紧凑列表）
* 字典dict.c

#### Redis数据库的实现

* 数据库的底层实现db.c
* 持久化rdb.c和aof.c

#### Redis服务端和客户端实现

* 事件驱动ae.c和ae_epoll.c
* 网络连接anet.c和networking.c
* 服务端程序server.c
* 客户端程序redis-cli.c

#### 其他

* 主从复制replication.c
* 哨兵sentinel.c
* 集群cluster.c
* 其他数据结构，如hyperloglog.c、geo.c等
* 其他功能，如pub/sub、Lua脚本

## 平时说的redis的字典数据库KV键到底是什么

* 怎样实现键值对（key-value）数据库的

  * redis是key-value存储系统
    * key一般都是String类型的字符串对象
    * value类型则为redis对象（redisObject）
      * value可以是字符串对象，也可以是集合数据类型的对象，比如List对象、Hash对象、Set对象和Zset对象

  ![image-20250716170742811](/redisImages/image-20250716170742811.png)

* 10大类型说明（粗分）

  * 传统的5大类型

    * String
    * List
    * Hash
    * Set
    * ZSet

  * 新介绍的5大类型

    * bitmap：实质String

    * hyperloglog：实质String

    * GEO：实质Zset

    * Stream：实质Stream

    * BITFIELD：看具体key

      ![image-20250716170949148](/redisImages/image-20250716170949148.png)

      ![image-20250716170957043](/redisImages/image-20250716170957043.png)

      ![image-20250716171058106](/redisImages/image-20250716171058106.png)
      
  
  * 上帝视角
  
    ![image-20250716171235555](/redisImages/image-20250716171235555.png)
  
  * Redis定义了redisObject结构体来表示string、hash、list、set、zset等数据类型
  
    * C语言struct结构体语法简介
  
      ![image-20250716171632672](/redisImages/image-20250716171632672.png)
  
      ![image-20250716171746488](/redisImages/image-20250716171746488.png)
  
    * Redis中每个对象都是一个redisObject结构
  
    * 字典、KV是什么（重点）
  
      * 每个键值对都会有一个dictEntry
  
      * 源码位置：dict.h
  
      * 重点：从dictEntry到RedisObject
  
        ![image-20250716171937938](/redisImages/image-20250716171937938.png)
  
        ![image-20250716171957848](/redisImages/image-20250716171957848.png)
  
    * 这些键值对是如何保存进Redis并进行读取操作，O(1)复杂度
  
      ![image-20250716172245094](/redisImages/image-20250716172245094.png)
  
    * redisObject+Redis数据类型+Redis所有编码方式（底层实现）三者之间的关系
  
      ![image-20250716172324587](/redisImages/image-20250716172324587.png)
  
      ![image-20250716172342336](/redisImages/image-20250716172342336.png)
  
## 5大结构底层C语言源码分析

重点：redis数据类型与数据结构总纲图

1. SDS动态字符串
2. 双向链表
3. 压缩列表ziplist
4. 哈希表hashtable
5. 跳表skiplist
6. 整数集合intset
7. 快速列表quicklist
8. 紧凑列表listpack

redis6.0.5

![image-20250717175335798](/redisImages/image-20250717175335798.png)

redis7

![image-20250717175358840](/redisImages/image-20250717175358840.png)

源码分析总体数据结构大纲

* redisObject操作底层定义来自哪里？

  通常我们了解的数据结构有字符串、双端链表、字典、压缩列表、整数集合等，但是Redis为了加快读写速度，并没有直接使用这些数据结构，而是在此基础上又包装了一层称之为RedisObject。

  RedisObject 有五种对象：字符串对象（String）、列表对象（List）、哈希对象（Hash）、集合对象（Set）和有序集合对象（ZSet）。

  ![image-20250717175715503](/redisImages/image-20250717175715503.png)

  ![image-20250717175735825](/redisImages/image-20250717175735825.png)

每个键值对都会有一个dictEntry

* set hello word为例，因为Redis是KV键值对的数据库，每个键值对都会有一个dictEntry(源码位置：dict.h)，

  里面指向了key和value的指针，next 指向下一个 dictEntry。

  key 是字符串，但是 Redis 没有直接使用 C 的字符数组，而是存储在redis自定义的 SDS中。

  **value 既不是直接作为字符串存储，也不是直接存储在 SDS 中，而是存储在redisObject 中**。

  实际上五种常用的数据类型的任何一种，都是通过 redisObject 来存储的。

  ![image-20250717175910184](/redisImages/image-20250717175910184.png)
  
  看看类型`type key`

  ​	![image-20250717181148922](/redisImages/image-20250717181148922.png)

  看看编码`object encoding key`

![image-20250717181253912](/redisImages/image-20250717181253912.png)

redisObject结构的作用

为了便于操作，Redis采用redisObjec结构来统一五种不同的数据类型，这样所有的数据类型就都可以以相同的形式在函数间传递而不用使用特定的类型结构。同时，为了识别不同的数据类型，redisObjec中定义了type和encoding字段对不同的数据类型加以区别。简单地说，redisObjec就是string、hash、list、set、zset的父类，可以在函数间传递时隐藏具体的类型信息，所以作者抽象了redisObjec结构来到达同样的目的。

![image-20250717181404448](/redisImages/image-20250717181404448.png)

* RedisObject各字段的含义

  ![image-20250717181445493](/redisImages/image-20250717181445493.png)

  1. 4位的type表示具体的数据类型
  2. 4位的encoding表示该类型的物理编码方式见下表，同一种数据类型可能有不同的编码方式。

  (比如String就提供了3种:int embstr raw)

  ![image-20250717181509011](/redisImages/image-20250717181509011.png)

3. lru字段表示当内存超限时采用LRU算法清除内存中的对象。

4. refcount表示对象的引用计数。
5. ptr指针指向真正的底层数据结构的指针。

案例

`set age 17`

![image-20250717181559043](/redisImages/image-20250717181559043.png)

|   type   |              类型               |
| :------: | :-----------------------------: |
| encoding |      编码，此处是数字类型       |
|   lru    |        最近被访问的时间         |
| refcount | 等于1，表示当前对象被引用的次数 |
|   ptr    |    value值是多少，当前就是17    |

### 经典5大数据结构解析

各个类型的数据结构的编码映射和定义

![image-20250717181734422](/redisImages/image-20250717181734422.png)

`Debug object key`

命令

![image-20250717181814642](/redisImages/image-20250717181814642.png)

开启前

![image-20250717182024992](/redisImages/image-20250717182024992.png)

开启后

![image-20250717182218853](/redisImages/image-20250717182218853.png)

![image-20250717182429283](/redisImages/image-20250717182429283.png)

* value at: 内存地址
* refcount: 引用次数
* encoding: 物理编码类型
* serializedlength: 序列化后的长度（注意这里的长度是序列化后的长度，保存为rdb文件时使用了该算法，不是真正存贮在内存的大小),会对字串做一些可能的压缩以便底层优化
* lru：记录最近使用时间戳
* lru_seconds_idle（秒）：空闲时间

### String数据结构介绍

RedisObject内部对应3大物理编码

![image-20250718172440375](/redisImages/image-20250718172440375.png)

#### int

保存long型（长整型）的64位（8个字节）有符号整数

![image-20250718172632631](/redisImages/image-20250718172632631.png)

>只有整数才会使用int，如果是浮点数，Redis内部其实先将浮点数转化为字符串值，然后在保存。

#### embstr

代表`embstr`格式的 SDS (Simple Dynamic String 简单动态字符串)，保存长度小于44字节的字符串

embstr 顾名思义即：embedded string，表示嵌入式的 String

#### raw

保存长度大于44字节的字符串

#### 案例测试

![image-20250718173724656](/redisImages/image-20250718173724656.png) 

#### C语言中字符串的展现

![image-20250718173756472](/redisImages/image-20250718173756472.png)

![image-20250718173811739](/redisImages/image-20250718173811739.png)

![image-20250718173820486](/redisImages/image-20250718173820486.png)

用空间换取时间

#### SDS简单动态字符串

sds.h源码分析

![image-20250718173923812](/redisImages/image-20250718173923812.png)

说明

![image-20250718173951302](/redisImages/image-20250718173951302.png)

Redis中字符串的实现,SDS有多种结构（sds.h）：

sdshdr5、(2^5=32byte)

sdshdr8、(2 ^ 8=256byte)

sdshdr16、(2 ^ 16=65536byte=64KB)

sdshdr32、 (2 ^ 32byte=4GB)

sdshdr64，2的64次方byte＝17179869184G用于存储不同的长度的字符串。

len 表示 SDS 的长度，使我们在获取字符串长度的时候可以在 O(1)情况下拿到，而不是像 C 那样需要遍历一遍字符串。

alloc 可以用来计算 free 就是字符串已经分配的未使用的空间，有了这个值就可以引入预分配空间的算法了，而不用去考虑内存分配的问题。

buf 表示字符串数组，真存数据的。

![image-20250718174421071](/redisImages/image-20250718174421071.png)

官网：https://github.com/antirez/sds

#### Redis为什么重新设计一个SDS数据结构？

![image-20250718174214155](/redisImages/image-20250718174214155.png)

C语言没有Java里面的String类型，只能是靠自己的char[]来实现，字符串在 C 语言中的存储方式，想要获取 「Redis」的长度，需要从头开始遍历，直到遇到 '\0' 为止。所以，Redis 没有直接使用 C 语言传统的字符串标识，而是自己构建了一种名为简单动态字符串 SDS（simple dynamic string）的抽象类型，并将 SDS 作为 Redis 的默认字符串。

![image-20250718174234621](/redisImages/image-20250718174234621.png)

| C语言              | SDS                                                          |                                                              |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **字符串长度处理** | 需要从头开始遍历，直到遇到 '\0' 为止，时间复杂度O(N)         | 记录当前字符串的长度，直接读取即可，时间复杂度 O(1)          |
| **内存重新分配**   | 分配内存空间超过后，会导致数组下标越级或者内存分配溢出       | 空间预分配SDS 修改后，len 长度小于 1M，那么将会额外分配与 len 相同长度的未使用空间。如果修改后长度大于 1M，那么将分配1M的使用空间。惰性空间释放有空间分配对应的就有空间释放。SDS 缩短时并不会回收多余的内存空间，而是使用 free 字段将多出来的空间记录下来。如果后续有变更操作，直接使用 free 中记录的空间，减少了内存的分配。 |
| **二进制安全**     | 二进制数据并不是规则的字符串格式，可能会包含一些特殊的字符，比如 '\0' 等。前面提到过，C中字符串遇到 '\0' 会结束，那 '\0' 之后的数据就读取不上了 | 根据 len 长度来判断字符串结束的，二进制安全的问题就解决了    |

#### 3 大物理编码方式

![image-20250718180957953](/redisImages/image-20250718180957953.png)

##### int 编码格式

![image-20250718181512946](/redisImages/image-20250718181512946.png)

命令示例： set k2 123

当字符串键值的内容可以用一个64位有符号整形来表示时，Redis会将键值转化为long型来进行存储，此时即对应 OBJ_ENCODING_INT 编码类型。内部的内存结构表示如下:

![image-20250718181206307](/redisImages/image-20250718181206307.png)

Redis 启动时会预先建立 10000 个分别存储 0~9999 的 redisObject 变量作为共享对象，这就意味着如果 set字符串的键值在 0~10000 之间的话，则可以 **直接指向共享对象 而不需要再建立新对象，此时键值不占空间！**

set k1 123

set k2 123

![image-20250718181233064](/redisImages/image-20250718181233064.png)



redis源码：server.h，笔记下面有

![image-20250718181534080](/redisImages/image-20250718181534080.png)

redis6源代码：object.c笔记下面还有

![image-20250718181635588](/redisImages/image-20250718181635588.png)

redis7源代码：object.c笔记下面还有

![image-20250718181709091](/redisImages/image-20250718181709091.png)

![image-20250718181718725](/redisImages/image-20250718181718725.png)

> 如果值一样，且是int类型的编码格式，就直接引用之前的，不会再去开辟新的空间！前提是值不能超过10000，0~9999才可以！

##### embstr 编码格式

![image-20250718181937055](/redisImages/image-20250718181937055.png)

redis源代码：object.c

![image-20250718182001674](/redisImages/image-20250718182001674.png)

对于长度小于 44的字符串，Redis 对键值采用OBJ_ENCODING_EMBSTR 方式，EMBSTR 顾名思义即：embedded string，表示嵌入式的String。从内存结构上来讲 即字符串 sds结构体与其对应的 redisObject 对象分配在同一块连续的内存空间，字符串sds嵌入在redisObject对象之中一样。

![image-20250718182025751](/redisImages/image-20250718182025751.png)

![image-20250718182036492](/redisImages/image-20250718182036492.png)

进一步createEmbddedStringObject方法

![image-20250718182445621](/redisImages/image-20250718182445621.png)

>没有申请新的redisObject对象，只是在之前redisObject对象下加了一个1，内存紧凑。实现了内存的高度连续！减少碎片，不占空间

##### raw编码格式

![image-20250718182644113](/redisImages/image-20250718182644113.png)

set k3 大于44长度的一个字符串，随便写

![image-20250718182732390](/redisImages/image-20250718182732390.png)

当字符串的键值为长度大于44的超长字符串时，Redis 则会将键值的内部编码方式改为OBJ_ENCODING_RAW格式，这与OBJ_ENCODING_EMBSTR编码方式的不同之处在于，此时动态字符串sds的内存与其依赖的redisObject的内存不再连续了

![image-20250718182753983](/redisImages/image-20250718182753983.png)

##### 明明没有超过阈值，为什么变成 raw 了

![image-20250718182842208](/redisImages/image-20250718182842208.png)

如果先添加一个字符，在拼接一个字符，直接去最大“raw”

判断不出来，就取最大Raw

##### 转变逻辑图

![image-20250718183008200](/redisImages/image-20250718183008200.png)

##### 案例结论

只有整数才会使用 int，如果是浮点数， Redis 内部其实先将浮点数转化为字符串值，然后再保存。

embstr 与 raw 类型底层的数据结构其实都是 SDS (简单动态字符串，Redis 内部定义 sdshdr 一种结构)。

那这两者的区别见下图：

| 1 int    | Long类型整数时，RedisObject中的ptr指针直接赋值为整数数据，不再额外的指针再指向整数了，节省了指针的空间开销。 |
| :------- | :----------------------------------------------------------- |
| 2 embstr | 当保存的是字符串数据且字符串小于等于44字节时，embstr类型将会调用内存分配函数，只分配一块连续的内存空间，空间中依次包含 redisObject 与 sdshdr 两个数据结构，让元数据、指针和SDS是一块连续的内存区域，这样就可以避免内存碎片 |
| 3 raw    | 当字符串大于44字节时，SDS的数据量变多变大了，SDS和RedisObject布局分家各自过，会给SDS分配多的空间并用指针指向SDS结构，raw 类型将会调用两次内存分配函数，分配两块内存空间，一块用于包含 redisObject结构，而另一块用于包含 sdshdr 结构 |

![image-20250718183057653](/redisImages/image-20250718183057653.png)

#### 总结

redis 内部会根据用户给的不同键值而使用不同的编码格式，自适应地选择较优化的内部编码格式，而这一切对用户完全透明！

### Hash数据结果介绍

#### hash的两种编码格式

redis6

* ziplist
* hashtable

redis7

* listpack
* hashtable

#### redis6（案例）

##### 案例

**hash-max-ziplist-entries：使用压缩列表保存时哈希集合中的最大元素个数。**

**hash-max-ziplist-value：使用压缩列表保存时哈希集合中单个元素的最大长度。**

Hash类型键的字段个数 小于 hash-max-ziplist-entries 并且每个字段名和字段值的长度 小于 hash-max-ziplist-value 时，

Redis才会使用 OBJ_ENCODING_ZIPLIST来存储该键，前述条件任意一个不满足则会转换为 OBJ_ENCODING_HT（hashtable）的编码方式

![image-20250719170734724](/redisImages/image-20250719170734724.png)

![image-20250719170758547](/redisImages/image-20250719170758547.png);

##### 结构

hash-max-ziplist-entries：使用压缩列表保存时哈希集合中的最大元素个数

hash-max-ziplist-value：使用压缩列表保存时哈希集合中单个元素的最大长度。

##### 结论

1. 哈希对象保存的键值对数量小于512个
2. 所有的键值对和值的字符串长度都小于等于64byte（一个英文字母一个字节）时用ziplist，反之用hashtable

ziplist升级到hashtable可以，反过来降级不可以

* 一旦从压缩列表转为了哈希表，Hash类型就会一直用哈希表进行保存而不会再转回压缩列表了。
* 在节省内存空间方面哈希表就没有压缩列表高效了。

##### 流程

![image-20250719171909980](/redisImages/image-20250719171909980.png)

##### 源码分析

t_hash.c

* 在 redis 中，hashtable 被称为字典（dictionary），它是一个数组+链表的结构

* OBJ_ENCODING_HT（hashtable）编码分析

  * OBJ_ENCODING_HT 这种编码方式内部才是真正的哈希表结构，或称为字典结构，其可以实现O(1)复杂度的读写操作，因此效率很高。

    在 Redis内部，从 OBJ_ENCODING_HT类型到底层真正的散列表数据结构是一层层嵌套下去的，组织关系见面图：

    ![image-20250719172057855](/redisImages/image-20250719172057855.png)

    ![image-20250719172106542](/redisImages/image-20250719172106542.png)

    源代码：dict.h

    ![image-20250719172131076](/redisImages/image-20250719172131076.png)

    ![image-20250719172152713](/redisImages/image-20250719172152713.png)

    ![image-20250719172207049](/redisImages/image-20250719172207049.png)

    * 每个键值对都会有一个dictEntry

* hset 命令解读

  ![image-20250719172335753](/redisImages/image-20250719172335753.png)

  * 类型

    ![image-20250719172409193](/redisImages/image-20250719172409193.png)

ziplist.c

* ziplist，什么样？

  源代码：ziplist.c

  为了节约内存而开发的，它是由连续内存块组成的顺序型数据结构，有点类似于数组

  ziplist是一个经过特殊编码的双向链表，它不存储指向前一个链表节点prev和指向下一个链表节点的指针next而是存储上一个节点长度和当前节点长度，通过牺牲部分读写性能，来换取高效的内存空间利用率，节约内存，是一种时间换空间的思想。只用在字段个数少，字段值小的场景里面

  ![image-20250719172514866](/redisImages/image-20250719172514866.png)

  ![image-20250719172539546](/redisImages/image-20250719172539546.png)

  ![image-20250719172556712](/redisImages/image-20250719172556712.png)

  * ziplist 各个组成单元什么意思

    ![image-20250719172628534](/redisImages/image-20250719172628534.png)

* zlentry，压缩列表节点的构成

  * 官网源码

    ![image-20250719230633635](/redisImages/image-20250719230633635.png)

  * zlentry 实体结构解析

    ```c
    /* 再内存中并没有存下下面结构体zlentry的内容，只是为了方便，在代码中定义了这样的结构体，包含了一些其他信息
    */
    typedef struct zlentry {
        unsigned int prevrawlensize, prevrawlen;            //用来计算前面节点的地址
        unsigned int lensize, len;                          //本节点的长度
        unsigned int headersize;                            //头部大小
        unsigned char encoding;                             //编码
        unsigned char *p;
    } zlentry;
    ```

  * ziplist 存取情况

    ![image-20250719230929887](/redisImages/image-20250719230929887.png)

    ![image-20250719230939536](/redisImages/image-20250719230939536.png)

    | prevlen  |       记录了前一个节点的长度；       |
    | :------: | :----------------------------------: |
    | encoding | 记录了当前节点实际数据的类型以及长度 |
    |   data   |       记录了当前节点的实际数据       |

    * zlentry 解析

      压缩列表zlentry节点结构：每个zlentry由前一个节点的长度、encoding和entry-data三部分组成

      ![image-20250719231031510](/redisImages/image-20250719231031510.png)

      前节点：(前节点占用的内存字节数)表示前1个zlentry的长度，privious_entry_length有两种取值情况：1字节或5字节。取值1字节时，表示上一个entry的长度小于254字节。虽然1字节的值能表示的数值范围是0到255，但是压缩列表中zlend的取值默认是255，因此，就默认用255表示整个压缩列表的结束，其他表示长度的地方就不能再用255这个值了。所以，当上一个entry长度小于254字节时，prev_len取值为1字节，否则，就取值为5字节。记录长度的好处：占用内存小，1或者5个字节

      enncoding：记录节点的content保存数据的类型和长度。

      content：保存实际数据内容

      ![image-20250719231058329](/redisImages/image-20250719231058329.png)

    * 为什么 zlentry 这么设计？数组和链表数据结构对比

      privious_entry_length，encoding长度都可以根据编码方式推算，真正变化的是content，而content长度记录在encoding里 ，因此entry的长度就知道了。entry总长度 = privious_entry_length字节数+encoding字节数+content字节数

      ![image-20250719231153304](/redisImages/image-20250719231153304.png)

      为什么entry这么设计？记录前一个节点的长度？

      链表在内存中，一般是不连续的，遍历相对比较慢，而ziplist可以很好的解决这个问题。如果知道了当前的起始地址，因为entry是连续的，entry后一定是另一个entry，想知道下一个entry的地址，只要将当前的起始地址加上当前entry总长度。如果还想遍历下一个entry，只要继续同样的操作。

  * **明明有链表了，为什么出来一个压缩链表？**

    1. 普通的双向链表会有两个指针，在存储数据很小的情况下，我们存储的实际数据的大小可能还没有指针占用的内存大，得不偿失。ziplist 是一个特殊的双向链表没有维护双向指针:previous next；而是存储上一个 entry的长度和当前entry的长度，通过长度推算下一个元素在什么地方。牺牲读取的性能，获得高效的存储空间，因为(简短字符串的情况)存储指针比存储entry长度更费内存。这是典型的“时间换空间”。

    2. 链表在内存中一般是不连续的，遍历相对比较慢而ziplist可以很好的解决这个问题，普通数组的遍历是根据数组里存储的数据类型找到下一个元素的(例如int类型的数组访问下一个元素时每次只需要移动一个sizeof(int)就行)，但是ziplist的每个节点的长度是可以不一样的，而我们面对不同长度的节点又不可能直接sizeof(entry)，所以ziplist只好将一些必要的偏移量信息记录在了每一个节点里，使之能跳到上一个节点或下一个节点。

       备注:sizeof实际上是获取了数据在内存中所占用的存储空间，以字节为单位来计数。

    3. 头节点里有头节点里同时还有一个参数 len，和string类型提到的 SDS 类似，这里是用来记录链表长度的。因此获取链表长度时不用再遍历整个链表，直接拿到len值就可以了，这个时间复杂度是 O(1)
    
  * ziplist 总结
  
    ziplist为了节省内存，采用了紧凑的连续存储。
  
    ziplist是一个双向链表，可以在时间复杂度为 O(1) 下从头部、尾部进行 pop 或 push。
  
    新增或更新元素可能会出现连锁更新现象(致命缺点导致被listpack替换)。
  
    不能保存过多的元素，否则查询效率就会降低，数量小和内容小的情况下可以使用。

#### redis7（案例）

##### 案例

**hash-max-listpack-entries：使用压缩列表保存时哈希集合中的最大元素个数。**

**hash-max-listpack-value：使用压缩列表保存时哈希集合中单个元素的最大长度。**

Hash类型键的字段个数 小于 hash-max-listpack-entries且每个字段名和字段值的长度 小于 hash-max-listpack-value 时，

Redis才会使用OBJ_ENCODING_LISTPACK来存储该键，前述条件任意一个不满足则会转换为 OBJ_ENCODING_HT（hashtable）的编码方式 

![image-20250720164040253](/redisImages/image-20250720164040253.png)

![image-20250720164419983](/redisImages/image-20250720164419983.png)

![image-20250720164515154](/redisImages/image-20250720164515154.png)

![image-20250720165008568](/redisImages/image-20250720165008568.png)

![image-20250720165109650](/redisImages/image-20250720165109650.png)

##### 结构

hash-max-listpack-entries：使用紧凑列表保存时哈希集合中的最大元素个数

hash-max-listpack-value：使用紧凑列表保存时哈希集合中单个元素的最大长度

##### 结论

1. 哈希对象保存的键值对数量小于512个
2. 所有的键值对的键和值的字符串长度都小于等于64byte（一个英文字母一个字节）时用listpack，反之用hashtable

listpack升级到hashtable可以，反过来降级不可以

##### 流程（同redis6，只不过ziplist改为listpack）

![image-20250720165549111](/redisImages/image-20250720165549111.png)

##### 源码分析

源码说明

* 实现：object.c

  ![image-20250720165652847](/redisImages/image-20250720165652847.png)

* 实现：listpack.c

  ![image-20250720165725665](/redisImages/image-20250720165725665.png)

  lpNew 函数创建了一个空的 listpack，一开始分配的大小是 LP_HDR_SIZE 再加 1 个字节。LP_HDR_SIZE 宏定义是在 listpack.c 中，它默认是 6 个字节，其中 4 个字节是记录 listpack 的总字节数，2 个字节是记录 listpack 的元素数量。此外，listpack 的最后一个字节是用来标识 listpack 的结束，其默认值是宏定义 LP_EOF。和 ziplist 列表项的结束标记一样，LP_EOF 的值也是 255

* 实现2：object.c

  ![image-20250720165803047](/redisImages/image-20250720165803047.png)

**明明有了ziplist了，为什么出来一个listpack紧凑列表？**

![image-20250720165842959](/redisImages/image-20250720165842959.png)

压缩列表里的每个节点中的 prelen 属性都记录了【前一个节点的长度】，而且 prelen 属性的空间大小跟前一个节点长度值有关，比如：

* 如果**前一个节点的长度小于 254 字节**，那么 prelen 属性需要用 **1字节的空间**来保存这个长度值
* 如果**前一个节点的长度大于等于 254 字节**，那么 prelen 属性需要用 **5字节的空间**来保存这个长度值

ziplist的连锁更新问题

​	压缩列表新增某个元素或修改某个元素时，如果空间不不够，压缩列表占用的内存空间就需要重新分配。而当新插入的元素较大时，可能会导致后续元素的 prevlen 占用空间都发生变化，从而引起「连锁更新」问题，导致每个元素的空间都要重新分配，造成访问压缩列表性能的下降。

案例说明：**压缩列表每个节点正因为需要保存前一个节点的长度字段，就会有连锁更新的隐患**

第一步：现在假设一个压缩列表中有多个连续的、长度在 250～253 之间的节点，如下图：

![image-20250720170312513](/redisImages/image-20250720170312513.png)

因为这些节点长度值小于 254 字节，所以 prevlen 属性需要用 1 字节的空间来保存这个长度值，一切OK，O(∩_∩)O哈哈~

第二步：这时，如果将一个长度大于等于 254 字节的新节点加入到压缩列表的表头节点，即新节点将成为entry1的前置节点，如下图：

![image-20250720170340969](/redisImages/image-20250720170340969.png)

因为entry1节点的prevlen属性只有1个字节大小，无法保存新节点的长度，此时就需要对压缩列表的空间重分配操作并将entry1节点的prevlen 属性从原来的 1 字节大小扩展为 5 字节大小。

第三步：连续更新问题出现

![image-20250720170407334](/redisImages/image-20250720170407334.png)

entry1节点原本的长度在250～253之间，因为刚才的扩展空间，此时entry1节点的长度就大于等于254，因此原本entry2节点保存entry1节点的 prevlen属性也必须从1字节扩展至5字节大小。entry1节点影响entry2节点，entry2节点影响entry3节点......一直持续到结尾。这种在特殊情况下产生的连续多次空间扩展操作就叫做「连锁更新」

结论

listpack 是 Redis 设计用来取代掉 ziplist 的数据结构，它通过每个节点记录自己的长度且放在节点的尾部，来彻底解决掉了 ziplist 存在的连锁更新的问题

listpack结构

![image-20250720171528498](/redisImages/image-20250720171528498.png)

* 官网：https://github.com/antirez/listpack/blob/master/listpack.md

* listpack由4部分组成：total Bytes、Num Elem、Entry以及End

  ![image-20250720170710779](/redisImages/image-20250720170710779.png)

  | Total Bytes         | 为整个listpack的空间大小，占用4个字节，每个listpack最多占用4294967295Bytes。 |
  | ------------------- | ------------------------------------------------------------ |
  | num-elements        | 为listpack中的元素个数，即Entry的个数占用2个字节             |
  | element-1~element-N | 为每个具体的元素                                             |
  | listpack-end-byte   | 为listpack结束标志，占用1个字节，内容为0xFF。                |

  ![image-20250720170735027](/redisImages/image-20250720170735027.png)

* entry 结构

  * 当前元素的编码类型（entry-encoding）

  * 元素数据（entry-data）

  * 以及编码类型和元素数据这两部分的长度（entry-len）

  * listpackEntry结构定义：listpack.h

    ![image-20250720170855675](/redisImages/image-20250720170855675.png)

ziplist 内存布局 VS listpack 内存布局

![image-20250720170930879](/redisImages/image-20250720170930879.png)

和ziplist 列表项类似，listpack 列表项也包含了元数据信息和数据本身。不过，为了避免ziplist引起的连锁更新问题，listpack 中的每个列表项

不再像ziplist列表项那样保存其前一个列表项的长度。

![image-20250720170952949](/redisImages/image-20250720170952949.png)

##### hash 的两种编码格式

* redis 6
  * ziplist
  * hashtable
* redis 7
  * listpack
  * hashtable

### List 数据结构介绍

#### redis 6（案例）
![image-20250720171137367](/redisImages/image-20250720171137367.png)

1. ziplist压缩配置：list-compress-depth 0

   表示一个quicklist两端不被压缩的节点个数。这里的节点是指quicklist双向链表的节点，而不是指ziplist里面的数据项个数

   参数list-compress-depth的取值含义如下：

   ​	0: 是个特殊值，表示都不压缩。这是Redis的默认值。

   ​	1: 表示quicklist两端各有1个节点不压缩，中间的节点压缩。

   ​	2: 表示quicklist两端各有2个节点不压缩，中间的节点压缩。

   ​	3: 表示quicklist两端各有3个节点不压缩，中间的节点压缩。

依此类推…

2. ziplist中entry配置：list-max-ziplist-size -2

​	当取正值的时候，表示按照数据项个数来限定每个quicklist节点上的ziplist长度。比如，当这个参数配置成5的时候，表示每个quicklist节点的ziplist最多包含5个数据项。当取负值的时候，表示按照占用字节数来限定每个quicklist节点上的ziplist长度。这时，它只能取-1到-5这五个值，

每个值含义如下：

-5: 每个quicklist节点上的ziplist大小不能超过64 Kb。（注：1kb => 1024 bytes）

-4: 每个quicklist节点上的ziplist大小不能超过32 Kb。

-3: 每个quicklist节点上的ziplist大小不能超过16 Kb。

-2: 每个quicklist节点上的ziplist大小不能超过8 Kb。（-2是Redis给出的默认值）

-1: 每个quicklist节点上的ziplist大小不能超过4 Kb。

##### redis 6版本前的List的一种编码格式

list用quicklist来存储，quicklist存储了一个双向链表，每个节点都是ziplist

![image-20250720171355626](/redisImages/image-20250720171355626.png)

在Redis3.0之前，list采用的底层数据结构是ziplist压缩列表+linkedList双向链表

然后在高版本的Redis中底层数据结构是quicklist(替换了ziplist+linkedList)，而quicklist也用到了ziplist

结论：quicklist就是「双向链表 + 压缩列表」组合，因为一个 quicklist 就是一个链表，而链表中的每个元素又是一个压缩列表

![image-20250720171412731](/redisImages/image-20250720171412731.png)

##### quicklist总纲

quicklist 实际上是 zipList 和 linkedList 的混合体，它将 linkedList按段切分，每一段使用 zipList 来紧凑存储，多个 zipList 之间使用双向指针串接起来。

![image-20250720171646305](/redisImages/image-20250720171646305.png)

是 ziplist 和 linkedlist 的结合体

##### 源码分析

* quicklist.h，head和tail指向双向列表的表头和表尾

  * quicklist 结构

    ![image-20250720171806258](/redisImages/image-20250720171806258.png)

    ![image-20250720171814235](/redisImages/image-20250720171814235.png)

  * quicklistNode 结构

    ![image-20250720171846382](/redisImages/image-20250720171846382.png)

    ![image-20250720171856481](/redisImages/image-20250720171856481.png)

  * quicklistNode 中的 *zl 指向一个 ziplist 一个ziplist 可以存放多个元素

    ![image-20250720171944856](/redisImages/image-20250720171944856.png)

#### redis 7（案例）

![image-20250720172224873](/redisImages/image-20250720172224873.png)

listpack紧凑列表

是用来替代 ziplist 的新数据结构，在 7.0 版本已经没有 ziplist 的配置了（6.0版本仅部分数据类型作为过渡阶段在使用）

##### 源码说明

实现：t_list.c

* 本图最下方有lpush命令执行后直接调用pushGenericCommand命令

  ![image-20250720172316427](/redisImages/image-20250720172316427.png)

  * 看看 redis 6 的相同文件 t_list.c

    ![image-20250720172457864](/redisImages/image-20250720172457864.png)

* 实现：object.c

  ![image-20250720172522705](/redisImages/image-20250720172522705.png)

* redis 7的 list 的一种编码格式

  * list 用 quicklist 来存储，quicklist 存储了一个双向链表，每个节点都是一个listpack

  * quicklist

    是 listpack 和 linkedlist 的结合体

### Set 数据结构介绍

#### 案例

Redis用intset或hashtable存储set。如果元素都是整数类型，就用intset存储。

如果不是整数类型，就用hashtable（数组+链表的存来储结构）。key就是元素的值，value为null。

![image-20250720172727901](/redisImages/image-20250720172727901.png)

set-proc-title 修改进程标题以显示一些运行时信息

#### Set 的两种编码方式

1. inset
2. hashtable

#### 源码分析

t_set.c

![image-20250720172835076](/redisImages/image-20250720172835076.png)

![image-20250720172852165](/redisImages/image-20250720172852165.png)

### ZSet 数据结构介绍

#### 案例

##### redis 6

当有序集合中包含的元素数量超过服务器属性 server.zset_max_ziplist_entries 的值（默认值为 128 ），

或者有序集合中新添加元素的 member 的长度大于服务器属性 server.zset_max_ziplist_value 的值（默认值为 64 ）时，

redis会使用跳跃表作为有序集合的底层实现。

否则会使用ziplist作为有序集合的底层实现

![image-20250720172941555](/redisImages/image-20250720172941555.png)

![image-20250720172954650](/redisImages/image-20250720172954650.png)

##### redis 7

![image-20250720173025379](/redisImages/image-20250720173025379.png)

![image-20250720173035219](/redisImages/image-20250720173035219.png)

#### ZSet 的两种编码格式

* redis 6
  * ziplist
  * skiplist
* redis 7
  * listpack
  * skiplist

#### redis 6 源码分析

t_zset.c

![image-20250720173208670](/redisImages/image-20250720173208670.png)

![image-20250720173227370](/redisImages/image-20250720173227370.png)

#### redis 7 源码分析

t_zset.c

![image-20250720173301672](/redisImages/image-20250720173301672.png)

### 小总结

#### redis 6 类型-物理编码-对应表

![image-20250720173412806](/redisImages/image-20250720173412806.png)

#### redis 6 数据类型对应的底层数据结构

1. 字符串

   int：8个字节的长整型。

   embstr：小于等于44个字节的字符串。

   raw：大于44个字节的字符串。

   Redis会根据当前值的类型和长度决定使用哪种内部编码实现。

2. 哈希

   ziplist(压缩列表)：当哈希类型元素个数小于hash-max-ziplist-entries 配置(默认512个)、同时所有值都小于hash-max-ziplist-value配置(默认64 字节)时，Redis会使用ziplist作为哈希的内部实现，ziplist使用更加紧凑的 结构实现多个元素的连续存储，所以在节省内存方面比hashtable更加优秀。

   hashtable(哈希表)：当哈希类型无法满足ziplist的条件时，Redis会使 用hashtable作为哈希的内部实现，因为此时ziplist的读写效率会下降，而hashtable的读写时间复杂度为O(1)。

 

3. 列表

   ziplist(压缩列表)：当列表的元素个数小于list-max-ziplist-entries配置 (默认512个)，同时列表中每个元素的值都小于list-max-ziplist-value配置时 (默认64字节)，Redis会选用ziplist来作为列表的内部实现来减少内存的使用。

   linkedlist(链表)：当列表类型无法满足ziplist的条件时，Redis会使用 linkedlist作为列表的内部实现。quicklist ziplist和linkedlist的结合以ziplist为节点的链表(linkedlist)

 

4. 集合

   intset(整数集合)：当集合中的元素都是整数且元素个数小于set-max-intset-entries配置(默认512个)时，Redis会用intset来作为集合的内部实现，从而减少内存的使用。hashtable(哈希表)：当集合类型无法满足intset的条件时，Redis会使用hashtable作为集合的内部实现。

 

5. 有序集合

   ziplist(压缩列表)：当有序集合的元素个数小于zset-max-ziplist- entries配置(默认128个)，同时每个元素的值都小于zset-max-ziplist-value配 置(默认64字节)时，Redis会用ziplist来作为有序集合的内部实现，ziplist 可以有效减少内存的使用。

   skiplist(跳跃表):当ziplist条件不满足时，有序集合会使用skiplist作 为内部实现，因为此时ziplist的读写效率会下降。

#### redis 6 数据类型以及数据结构的关系

![image-20250720173713526](/redisImages/image-20250720173713526.png)

#### redis 7数据类型以及数据结构的关系

![image-20250720173754323](/redisImages/image-20250720173754323.png)

#### redis 数据类型以及数据结构的时间复杂度

![image-20250720173829537](/redisImages/image-20250720173829537.png)

### skiplist面试题

#### 为什么引出跳表

先从一个单链表来讲

* 对于一个单链表来讲，即便链表中存储的数据是有序的，如果我们要想在其中查找某个数据，也只能从头到尾遍历链表。

* 这样查找效率就会很低，时间复杂度会很高O(N)

  ![image-20250721162119847](/redisImages/image-20250721162119847.png)

#### 痛点

![image-20250721162155118](/redisImages/image-20250721162155118.png)

 解决方法：升维，也叫空间换时间。

* 优化 1

  ![image-20250721162221385](/redisImages/image-20250721162221385.png)

  这个例子里，我们看出，加来一层索引之后，查找一个结点需要遍历的结点个数减少了，也就是说查找效率提高了。

* 优化 2

  * 画了一个包含 64 个结点的链表，按照前面讲的这种思路，建立了五级索引

    ![image-20250721162337117](/redisImages/image-20250721162337117.png)

#### 是什么

跳表是可以实现二分查找的有序链表

skiplist是一种以空间换取时间的结构。

由于链表，无法进行二分查找，因此借鉴数据库索引的思想，提取出链表中关键节点（索引），先在关键节点上查找，再进入下层链表查找，提取多层关键节点，就形成了跳跃表

但是：由于索引也要占据一定空间的，所以，索引添加的越多，空间占用的越多

>总结来讲
>
>​	跳表 = 链表 + 多级索引

#### 跳表时间+空间复杂度介绍

* 跳表的时间复杂度

  跳表查询的时间复杂度分析，如果链表里有N个结点，会有多少级索引呢？

  按照我们前面讲的，两两取首。每两个结点会抽出一个结点作为上一级索引的结点，以此估算：

  第一级索引的结点个数大约就是n/2，

  第二级索引的结点个数大约就是n/4，

  第三级索引的结点个数大约就是n/8，依次类推......

  也就是说，第k级索引的结点个数是第k-1级索引的结点个数的1/2，那第k级索引结点的个数就是n/(2^k)

  ![image-20250721162527062](/redisImages/image-20250721162527062.png)

  ![image-20250721162534143](/redisImages/image-20250721162534143.png)

  ![image-20250721162543774](/redisImages/image-20250721162543774.png)

  ![image-20250721162559150](/redisImages/image-20250721162559150.png)

  时间复杂度是 O(logN)

* 跳表的空间复杂度

  跳表查询的空间复杂度分析

  比起单纯的单链表，跳表需要存储多级索引，肯定要消耗更多的存储空间。那到底需要消耗多少额外的存储空间呢？

  我们来分析一下跳表的空间复杂度。

  第一步：首先原始链表长度为n，

  第二步：两两取首，每层索引的结点数：n/2, n/4, n/8 ... , 8, 4, 2 每上升一级就减少一半，直到剩下2个结点,以此类推；如果我们把每层索引的结点数写出来，就是一个等比数列。

  ![image-20250721162654157](/redisImages/image-20250721162654157.png)

  这几级索引的结点总和就是n/2+n/4+n/8…+8+4+2=n-2。所以，跳表的空间复杂度是O(n) 。也就是说，如果将包含n个结点的单链表构造成跳表，我们需要额外再用接近n个结点的存储空间。

* 优缺点

  **优点：**

  跳表是一个最典型的空间换时间解决方案，而且只有在数据量较大的情况下才能体现出来优势。而且应该是读多写少的情况下才能使用，所以它的适用范围应该还是比较有限的

  **缺点：** 

  维护成本相对要高，

  在单链表中，一旦定位好要插入的位置，插入结点的时间复杂度是很低的，就是O(1) 

  但是：

  新增或者删除时需要把所有索引都更新一遍，为了保证原始链表中数据的有序性，我们需要先找

  到要动作的位置，这个查找操作就会比较耗时最后在新增和删除的过程中的更新，时间复杂度也是O(log n)

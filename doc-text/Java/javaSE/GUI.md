## GUI

**组件**

- 窗口
- 弹窗
- 面板
- 文本框
- 列表框
- 按钮
- 图片
- 监听事件
- 鼠标
- 键盘事件
- 破解工具

### 1.简介

- GUI核心技术：Swing AWT
  - 界面不美观；
  - 需要JRE环境。

**为什么要学习？**

- 可以写出自己的小工具；
- 工作时，可能会维护到Swing界面；
- 了解MVC架构，了解监听。

---

### 2.AWT

#### 1.Awt介绍

- 包含了很多类和接口！GUI：图形用户界面编程。
- 元素：窗口、按钮、文本框

![1622957948116](/javaSEImages/SE/07/1622957948116.png)

#### 2.组件和容器

> 1.Frame

```java
package github.GUI;

import java.awt.*;

/**
 * 
 * @create 2021-06-04 13:42
 */
public class TestFrame {
    public static void main(String[] args) {
        // Frame,JDK,   看源码！
        Frame frame = new Frame("我的第一个Java图形界面！");

        // 需要设置可见性
        frame.setVisible(true);

        // 设置窗口大小
        frame.setSize(600,600);
        // 设置背景颜色
        Color color = new Color(122, 123, 222);
        frame.setBackground(color);

        // 设置默认弹出的初始位置
        frame.setLocation(90,90);

        // 设置大小固定
        frame.setResizable(false);
    }
}
```

```java
package github.GUI;

import java.awt.*;

/**
 * 
 * @create 2021-06-04 13:53
 */
public class TestFrame2 {
    public static void main(String[] args) {
        // 展示多个窗口
        new MyFrame(100,100,400,400,Color.PINK);
        new MyFrame(500,100,400,400,Color.green);
        new MyFrame(100,500,400,400,Color.red);
        new MyFrame(500,500,400,400,Color.orange);


    }
}
class MyFrame extends Frame{
    static int id = 0;  // 可能存在多个窗口，需要一个计数器

    public MyFrame(int x,int y,int w,int h,Color color){
        super("MyFrame" + (++id));
        setBackground(color);
        setBounds(x,y,w,h);
        setVisible(true);
    }

}
```

![1622959380684](/javaSEImages/SE/07/1622959380684.png)

> 2.面板Panel

```java
package github.GUI;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-04 14:04
 */
// panel 可以看成一个单独空间，但不能单独存在
public class TestPanel {
    public static void main(String[] args) {
        Frame frame = new Frame();
        // 布局的概念
        Panel panel = new Panel();

        // 设置布局
        frame.setLayout(null);

        // 坐标
        frame.setBounds(300,300,500,500);
        frame.setBackground(new Color(205, 103, 49));

        // panel设置坐标，相对于frame
        panel.setBounds(50,50,400,400);
        panel.setBackground(new Color(35, 161, 121));

        // frame.add(panel)
        frame.add(panel);

        frame.setVisible(true);

        // 监听事件，监听窗口关闭事件
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });

    }
}
```

![1622965933240](/javaSEImages/SE/07/1622965933240.png)

> 3.布局管理器

- 按钮

```java
package github.GUI;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-04 15:53
 */
public class TestLowLayout {
    public static void main(String[] args) {
        Frame frame = new Frame();
        // 组件--按钮
        Button button = new Button("button");
        Button button2 = new Button("button2");
        Button button3 = new Button("button3");

        // 设置为流式布局
        frame.setLayout(new FlowLayout());
//        frame.setLayout(new FlowLayout(FlowLayout.LEFT)); // 靠左
//        frame.setLayout(new FlowLayout(FlowLayout.RIGHT)); // 靠右

        frame.setSize(200,200);

        // 把按钮添加上去
        frame.add(button);
        frame.add(button2);
        frame.add(button3);

        frame.setVisible(true);

        // 监听事件，监听窗口关闭事件
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}
```

![1622980131307](/javaSEImages/SE/07/1622980131307.png)

- 东西南北中

```java
package github.GUI;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-04 19:50
 */
public class TestBorderLayout {
    public static void main(String[] args) {
        Frame frame = new Frame("TestBorderLayout");

        Button east = new Button("East");
        Button west = new Button("West");
        Button South = new Button("South");
        Button north = new Button("North");
        Button center = new Button("Center");

        frame.add(east,BorderLayout.EAST);
        frame.add(west,BorderLayout.WEST);
        frame.add(South,BorderLayout.SOUTH);
        frame.add(center,BorderLayout.CENTER);
        frame.add(north,BorderLayout.NORTH);

        frame.setSize(200,200);
        frame.setVisible(true);

        // 监听事件，监听窗口关闭事件
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}
```

![1622980613119](/javaSEImages/SE/07/1622980613119.png)

- 表格布局

```java
package github.GUI;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-04 19:59
 */
public class TestGridLayout {
    public static void main(String[] args) {
        Frame frame = new Frame("TestGridLayout");

        Button btn1 = new Button("btn1");
        Button btn2 = new Button("btn2");
        Button btn3 = new Button("btn3");
        Button btn4 = new Button("btn4");
        Button btn5 = new Button("btn5");
        Button btn6 = new Button("btn6");

        // 表格格式间隔
        frame.setLayout(new GridLayout(3,2));

        frame.add(btn1);
        frame.add(btn2);
        frame.add(btn3);
        frame.add(btn4);
        frame.add(btn5);
        frame.add(btn6);

        frame.pack();   // Java函数
        frame.setVisible(true);

        // 监听事件，监听窗口关闭事件
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}
```

![1622981071407](/javaSEImages/SE/07/1622981071407.png)

- 小练习

```java
package github.GUI;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-04 20:06
 */
public class HWork {
    public static void main(String[] args) {
        Frame frame = new Frame("HWork");

        // 设置窗口大小
        frame.setSize(600,600);
        // 设置默认弹出的初始位置
        frame.setLocation(400,400);
        // 设置背景颜色
        frame.setBackground(new Color(255, 244, 0));
        // 表格格式间隔
        frame.setLayout(new GridLayout(2,1));

        // 布局的概念
        Panel p1 = new Panel(new BorderLayout());
        Panel p2 = new Panel(new GridLayout(2,1));
        Panel p3 = new Panel(new BorderLayout());
        Panel p4 = new Panel(new GridLayout(2,2));

        p1.add(new Button("btn1"),BorderLayout.WEST);
        p1.add(new Button("btn2"),BorderLayout.EAST);

        p2.add(new Button("btn3"));
        p2.add(new Button("btn4"));
        p1.add(p2,BorderLayout.CENTER);

        p3.add(new Button("BTN5"),BorderLayout.WEST);
        p3.add(new Button("BTN6"),BorderLayout.EAST);

        p4.add(new Button("btn7"));
        p4.add(new Button("btn8"));
        p4.add(new Button("btn9"));
        p4.add(new Button("btn10"));
        p3.add(p4,BorderLayout.CENTER);

        frame.add(p1);
        frame.add(p3);
        frame.setVisible(true);

        // 监听事件，监听窗口关闭事件
        // 适配器模式
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}
```

![1622983268832](/javaSEImages/SE/07/1622983268832.png)

**总结**：

1. Frame是一个顶级窗口；
2. Pane无法单独显示，必须添加到某个容器中。
3. 布局管埋器
   1. 流式
   2. 东西南北中
   3. 表格
4. 大小，定位，背景颜色，可见性，监听！

> 4.事件监听

- 事件监听：当某个事情发生时，干什么？

```java
package github.GUI.Demo02;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-05 10:07
 */
public class TestActionEvent {
    public static void main(String[] args) {
        // 按下按钮，触发一些事件
        Frame frame = new Frame();
        Button button = new Button();

        // 因为addActionListener需要一个ActionListener
        MyActionListenner myActionListenner = new MyActionListenner();
        button.addActionListener(myActionListenner);

        frame.add(button,BorderLayout.CENTER);
        frame.pack();

        windowClose(frame); // 关闭窗口
        frame.setVisible(true);
    }

    // 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}

class MyActionListenner implements ActionListener{

    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("aaa");
    }
}
```

- 多个按钮，共享一个事件。

```java
package github.GUI.Demo02;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-05 10:57
 */
public class TestActionTwo {
    public static void main(String[] args) {
        // 两个按钮，实现同一个监听
        // 开始、停止
        Frame frame = new Frame("开始-停止");
        Button start = new Button("start");
        Button stop = new Button("stop");

        /*
        可以显示的定义触发会返回的命令，如果不显示定义，则会走默认的值！
        可以多个按钮只写一个监听类！
         */
        stop.setActionCommand("button-stop");

        MyMonitor myMonitor = new MyMonitor();
        start.addActionListener(myMonitor);
        stop.addActionListener(myMonitor);

        frame.add(start,BorderLayout.NORTH);
        frame.add(stop,BorderLayout.SOUTH);

        frame.pack();
        windowClose(frame); // 关闭窗口
        frame.setVisible(true);
    }

    // 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}

class MyMonitor implements ActionListener{

    @Override
    public void actionPerformed(ActionEvent e) {
        // e.getActionCommand()返回按钮信息
        System.out.println("按钮被点击了！" + e.getActionCommand());
    }
}
```

![1623042331021](/javaSEImages/SE/07/1623042331021.png)

> 5.输入框监听事件

```java
package github.GUI.Demo02;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-05 11:15
 */
public class TestTest01 {
    public static void main(String[] args) {
        // 启动！
        MyFrame frame = new MyFrame();

        windowClose(frame); // 关闭窗口
    }
    // 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}

class MyFrame extends Frame {
    public MyFrame(){
        TextField textField = new TextField();
        add(textField);

        // 监听这个文本输入框输入的文字
        MyActionListener2 myActionListener2 = new MyActionListener2();
        textField.addActionListener(myActionListener2);

        // 设置替换编码
        textField.setEchoChar('*');

        setVisible(true);
        pack();
    }
}

class MyActionListener2 implements ActionListener {
    @Override
    public void actionPerformed(ActionEvent e) {
        TextField field = (TextField) e.getSource();// 获得一些资源
        System.out.println(field.getText());    // 获得输入框中的文本
        field.setText("");  // null

    }
}
```

> 6.简易计算器，组合+内部类复习！

**OOP原则：组合，大于继承！**

```java
class A extends B{
    
}
class A{
    public B b;
}
```

```java
package github.GUI.Demo02;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-05 13:53
 */
public class TextCalc {
    public static void main(String[] args) {
        // 启动！
        Frame frame = new Calculator();

        windowClose(frame); // 关闭窗口

    }
    // 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}


// 计算器类
class Calculator extends Frame{
    public Calculator(){
        // 三个文本框
        TextField num1 = new TextField(10);    // 字符数
        TextField num2 = new TextField(10);    // 字符数
        TextField num3 = new TextField(20);    // 字符数

        // 一个按钮
        Button button = new Button("=");

        button.addActionListener(new MyCalculatorListener(num1,num2,num3));

        // 一个标签
        Label label = new Label("+");

        // 布局
        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(num3);

        pack();
        setVisible(true);
    }
}

// 监听器类
class MyCalculatorListener implements ActionListener{
    // 获取三个变量
    private TextField num1,num2,num3;

    public MyCalculatorListener(TextField num1,TextField num2,TextField num3){
        this.num1 = num1;
        this.num2 = num2;
        this.num3 = num3;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 1.获得加数和倍加数
        int n1 = Integer.parseInt(num1.getText());
        int n2 = Integer.parseInt(num2.getText());

        // 2.将这个值 + 法运算后，放到第三个框
        num3.setText("" + (n1+n2));

        // 3.清楚前两个值
        num1.setText("");
        num2.setText("");

    }
}
```

- 完全改造为面向对象

```java
package github.GUI.Demo02;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 
 * @create 2021-06-05 13:53
 */
public class TextCalc {
    public static void main(String[] args) {
        new Calculator().loadFrame();

    }
}


// 计算器类
class Calculator extends Frame{
    // 属性
    TextField num1,num2,num3;

    // 方法
    public void loadFrame(){
        // 三个文本框
        num1 = new TextField(10);    // 字符数
        num2 = new TextField(10);    // 字符数
        num3 = new TextField(20);    // 字符数

        // 一个按钮
        Button button = new Button("=");
        // 一个标签
        Label label = new Label("+");

        button.addActionListener(new MyCalculatorListener(this));

        // 布局
        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(num3);

        pack();
        setVisible(true);
    }
}

// 监听器类
class MyCalculatorListener implements ActionListener{
    // 获取三个变量
    Calculator calculator = null;

    public MyCalculatorListener(Calculator calculator){
        this.calculator = calculator;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // 1.获得加数和倍加数
        int n1 = Integer.parseInt(calculator.num1.getText());
        int n2 = Integer.parseInt(calculator.num2.getText());

        // 2.将这个值 + 法运算后，放到第三个框
        calculator.num3.setText("" + (n1+n2));

        // 3.清楚前两个值
        calculator.num1.setText("");
        calculator.num2.setText("");
    }
}
```

- 内部类

```java
package github.GUI.Demo02;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 
 * @create 2021-06-05 13:53
 */
public class TextCalc {
    public static void main(String[] args) {
        new Calculator().loadFrame();
    }
}


// 计算器类
class Calculator extends Frame{
    // 属性
    TextField num1,num2,num3;

    // 方法
    public void loadFrame(){
        // 三个文本框
        num1 = new TextField(10);    // 字符数
        num2 = new TextField(10);    // 字符数
        num3 = new TextField(20);    // 字符数

        // 一个按钮
        Button button = new Button("=");
        // 一个标签
        Label label = new Label("+");

        button.addActionListener(new MyCalculatorListener());

        // 布局
        setLayout(new FlowLayout());

        add(num1);
        add(label);
        add(num2);
        add(button);
        add(num3);

        pack();
        setVisible(true);
    }

    // 监听器类
    // 内部类最大的好处，就是可以畅通无阻的访问外部属性和方法！
    private class MyCalculatorListener implements ActionListener{

        @Override
        public void actionPerformed(ActionEvent e) {
            // 1.获得加数和倍加数
            int n1 = Integer.parseInt(num1.getText());
            int n2 = Integer.parseInt(num2.getText());

            // 2.将这个值 + 法运算后，放到第三个框
            num3.setText("" + (n1+n2));

            // 3.清楚前两个值
            num1.setText("");
            num2.setText("");
        }
    }
}
```

> 画笔

```java
package github.GUI.Demo03;

import java.awt.*;

/**
 * 
 * @create 2021-06-05 14:39
 */
public class TestPaint {
    public static void main(String[] args) {
        new MyPaint().loadFrame();
    }
}

class MyPaint extends Frame{

    public void loadFrame(){
        setBounds(200,200,600,600);
        setVisible(true);

    }

    // 画笔
    @Override
    public void paint(Graphics g){
        // 画笔需要颜色
        g.setColor(Color.green);
//        g.drawOval(100,100,100,100);    // 画一个空心的圆
        g.fillOval(100,100,100,100);    // 画一个实心的圆

        g.setColor(Color.BLUE);
        g.fillRect(150,200,200,200);

        // 画笔用完，还原到最初的颜色
    }
}
```

![1623149120326](/javaSEImages/SE/07/1623149120326.png)

> 鼠标监听

- 目的：想要实现鼠标画画。

```java
package github.GUI.Demo03;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * 
 * @create 2021-06-05 14:47
 */
// 测试鼠标监听
public class TestMouseListener {
    public static void main(String[] args) {
        MyFrame frame = new MyFrame("画图");

        windowClose(frame); // 关闭窗口
    }
    // 关闭窗体的事件
    private static void windowClose(Frame frame){
        frame.addWindowListener(new WindowAdapter() {
            // 窗口点击关闭时要做的事
            @Override
            public void windowClosing(WindowEvent e) {
                // 结束程序
                System.exit(0);
            }
        });
    }
}

// 自己的类
class MyFrame extends Frame{
    ArrayList ponits;
    // 需要监听鼠标当前位置，需要集合来存储这个点
    public MyFrame(String title){
        super(title);
        setBounds(200,200,400,300);
        // 存鼠标点击的点
        ponits = new ArrayList<>();

        setVisible(true);
        // 正对这个窗口
        this.addMouseListener(new MyMouseLintener());

    }

    @Override
    public void paint(Graphics g) {
        // 画画，监听鼠标的事件
        Iterator iterator = ponits.iterator();
        while(iterator.hasNext()){
            Point point = (Point) iterator.next();
            g.setColor(Color.orange);
            g.fillOval(point.x,point.y,10,10);
        }
    }

    // 添加一个点到界面上
    public void addPoint(Point point){
        ponits.add(point);
    }


    // 适配器模式
    private class MyMouseLintener extends MouseAdapter {

        // 鼠标按压
        @Override
        public void mousePressed(MouseEvent e) {
            MyFrame myFrame = (MyFrame) e.getSource();
            myFrame.addPoint(new Point(e.getX(),e.getY()));

            // 每次点击都需要重画一次
            myFrame.repaint();  // 刷新
        }
    }
}
```

![1623210403404](/javaSEImages/SE/07/1623210403404.png)

> 窗口监听

```java
package github.GUI.Demo03;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * 
 * @create 2021-06-05 15:00
 */
public class TestWindow {
    public static void main(String[] args) {
        new WindowFrame();

    }
}

class WindowFrame extends Frame{
    public WindowFrame(){
        setBackground(Color.blue);
        setBounds(100,100,200,200);
        setVisible(true);
//        addWindowFocusListener(new MyWindowListener());

        this.addWindowListener(
                // 匿名内部类
                new WindowAdapter(){

                    // 关闭窗口
                    @Override
                    public void windowClosing(WindowEvent e) {
                        System.out.println("windowClosing");
                        System.exit(0);
                    }

                    // 激活窗口
                    @Override
                    public void windowActivated(WindowEvent e) {
                        WindowFrame source = (WindowFrame) e.getSource();
                        source.setTitle("被激活了！！！");
                        
                        System.out.println("windowActivated");
                    }
                }
        );
    }
}
```

![1623220297452](/javaSEImages/SE/07/1623220297452.png)

> 键盘监听

```java
package github.GUI.Demo03;

import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

/**
 * 
 * @create 2021-06-05 15:13
 */
// 键
public class TestKeyListener {
    public static void main(String[] args) {
        new KeyFrame();
    }
}

class KeyFrame extends Frame {
    public KeyFrame(){
        setBounds(1,2,400,300);
        setVisible(true);

        this.addKeyListener(new KeyAdapter() {
            // 键盘按下
            @Override
            public void keyPressed(KeyEvent e) {
                // 获得键盘下的键是哪一个
                int keyCode = e.getKeyCode();
                System.out.println(keyCode);
                if(keyCode == KeyEvent.VK_UP){
                    System.out.println("你按下了上键！");
                }
                // 根据按下的键不同，产生不同的结果
            }
        });

    }
}
```

### 3.Swing

#### 1.窗口、面

```java
package github.GUI.Demo04;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 15:23
 */
public class JFrameDemo02 {
    public static void main(String[] args) {
        new MyJFrame().init();
    }
}

class MyJFrame extends JFrame{
    public void init(){
        this.setBounds(300,300,300,300);
        this.setVisible(true);

        // 设置显示文字
        JLabel label = new JLabel("欢迎查阅！！！");
        this.add(label);
        // 让文本居中
        label.setHorizontalAlignment(SwingConstants.CENTER);

        // 获得一个容器
        Container contentPane = this.getContentPane();
        contentPane.setBackground(Color.orange);

        // 关闭事件
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }
}
```

#### 2.JDialog弹窗

- 默认就有了，弹出实现！

```java
package github.GUI.Demo04;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * 
 * @create 2021-06-05 15:30
 */
// 主窗口
public class DialogDemo extends JFrame {
    public DialogDemo(){
        this.setVisible(true);
        this.setSize(700,500);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

        // JFrame 放东西，容器
        Container container = this.getContentPane();
        // 绝对布局
        container.setLayout(null);

        // 按钮
        JButton button = new JButton("点击弹出一个对话框");
        button.setBounds(30,30,200,200);

        // 点击这个按钮时，弹出一个弹窗
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // 弹窗
                new MyDialogDemo();
            }
        });

        container.add(button);

    }

    public static void main(String[] args) {
        new DialogDemo();
    }
}

// 弹窗的窗口
class MyDialogDemo extends JDialog{
    public MyDialogDemo(){
        this.setVisible(true);
        this.setBounds(100,100,500,500);
        this.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);

        Container container = this.getContentPane();
        container.setLayout(null);

        container.add(new Label("Java全栈——GUI"));
    }
}
```

#### 3.标签 

```java
package github.GUI.Demo04;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 15:38
 */
public class IconDemo extends JFrame implements Icon {
    private int width;
    private int height;

    public IconDemo(){}

    public IconDemo(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public void init(){
        IconDemo iconDemo = new IconDemo(15, 15);
        // 图标可以放标签，也可以放在按钮上！
        JLabel label = new JLabel("icontest", iconDemo, SwingConstants.CENTER);

        Container container = getContentPane();
        container.add(label);

        this.setVisible(true);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new IconDemo().init();
    }

    @Override
    public void paintIcon(Component c, Graphics g, int x, int y) {
        g.fillOval(x,y,width,height);
    }

    @Override
    public int getIconWidth() {
        return this.width;
    }

    @Override
    public int getIconHeight() {
        return this.height;
    }
}
```

```java
package github.GUI.Demo04;

import javax.swing.*;
import java.awt.*;
import java.net.URL;

/**
 * 
 * @create 2021-06-05 15:45
 */
public class ImageIconDemo extends JFrame {
    public ImageIconDemo(){
        // 获取图片地址
        JLabel label = new JLabel("ImageIcon");
        URL url = ImageIconDemo.class.getResource("tpg.jpg");

        ImageIcon imageIcon = new ImageIcon(url);
        label.setIcon(imageIcon);
        label.setHorizontalAlignment(SwingConstants.CENTER);

        Container container = getContentPane();
        container.add(label);

        setVisible(true);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setBounds(400,400,400,400);
    }

    public static void main(String[] args) {
        new ImageIconDemo();
    }
}
```

![1623228405882](/javaSEImages/SE/07/1623228405882.png)

#### 4.面板

```java
package github.GUI.Demo05;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 15:55
 */
public class JPaneDemo extends JFrame {
    public JPaneDemo(){
        Container container = this.getContentPane();
        container.setLayout(new GridLayout(2,1,10,10));

        JPanel panel = new JPanel(new GridLayout(1, 3));

        panel.add(new JButton("1"));
        panel.add(new JButton("1"));
        panel.add(new JButton("1"));

        container.add(panel);

        this.setVisible(true);
        this.setSize(500,500);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new JPaneDemo();
    }
}
```

![1623228815454](/javaSEImages/SE/07/1623228815454.png)

- 边框——JScroll

```java
package github.GUI.Demo05;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 16:04
 */
public class JScroPallDemo extends JFrame {

    public JScroPallDemo(){
        Container container = this.getContentPane();
        // 文本域
        JTextArea textArea = new JTextArea(20, 30);
        textArea.setText("欢迎查阅！！");

        // 面板
        JScrollPane scrollPane = new JScrollPane(textArea);
        container.add(scrollPane);

        this.setVisible(true);
        this.setBounds(200,200,300,350);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new JScroPallDemo();
    }
}
```

![1623229183297](/javaSEImages/SE/07/1623229183297.png)

#### 5.按钮

- 图标按钮

```java
package github.GUI.Demo05;

import javax.swing.*;
import java.awt.*;
import java.net.URL;

/**
 * 
 * @create 2021-06-05 16:13
 */
public class JButtonDemo01 extends JFrame {

    public JButtonDemo01(){
        Container container = this.getContentPane();
        // 将一个图片变为图标
        URL resource = JButtonDemo01.class.getResource("tpg.jpg");
        Icon icon = new ImageIcon(resource);

        // 将图标放在按钮上
        JButton button = new JButton();
        button.setIcon(icon);
        button.setToolTipText("图片按钮");

        // add
        container.add(button);

        this.setVisible(true);
        this.setSize(500,300);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new JButtonDemo01();
    }
}
```

![1623234874633](/javaSEImages/SE/07/1623234874633.png)

- 单选框和多选框

```java
package github.GUI.Demo05;

import javax.swing.*;
import java.awt.*;
import java.net.URL;

/**
 * 
 * @create 2021-06-05 16:13
 */
public class JButtonDemo02 extends JFrame {
    public JButtonDemo02(){
        Container container = this.getContentPane();
        // 将一个图片变为图标
        URL resource = JButtonDemo01.class.getResource("tpg.jpg");
        Icon icon = new ImageIcon(resource);

        // 单选框
        JRadioButton radioButton01 = new JRadioButton("JRadioButton01");
        JRadioButton radioButton02 = new JRadioButton("JRadioButton02");
        JRadioButton radioButton03 = new JRadioButton("JRadioButton03");

        ButtonGroup group = new ButtonGroup();
        group.add(radioButton01);
        group.add(radioButton02);
        group.add(radioButton03);

        container.add(radioButton01,BorderLayout.CENTER);
        container.add(radioButton02,BorderLayout.NORTH);
        container.add(radioButton03,BorderLayout.SOUTH);


        this.setVisible(true);
        this.setSize(500,300);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new JButtonDemo02();
    }
}
```

![1623246346555](/javaSEImages/SE/07/1623246346555.png)

```java
package github.GUI.Demo05;

import javax.swing.*;
import java.awt.*;
import java.net.URL;

/**
 * 
 * @create 2021-06-05 16:13
 */

public class JButtonDemo03 extends JFrame {
    public JButtonDemo03(){
        Container container = this.getContentPane();
        // 将一个图片变为图标
        URL resource = JButtonDemo01.class.getResource("tpg.jpg");
        Icon icon = new ImageIcon(resource);

        // 多选框
        JCheckBox checkBox01 = new JCheckBox("checkBox01");
        JCheckBox checkBox02 = new JCheckBox("checkBox02");

        container.add(checkBox01,BorderLayout.NORTH);
        container.add(checkBox02,BorderLayout.SOUTH);

        this.setVisible(true);
        this.setSize(500,300);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new JButtonDemo03();
    }
}
```

![1623246570284](/javaSEImages/SE/07/1623246570284.png)

#### 6.列表

- 下拉框

```java
package github.GUI.Demo06;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 16:23
 */
public class TextComboxDemo01 extends JFrame {
    public TextComboxDemo01(){
        Container container = this.getContentPane();
        JComboBox box = new JComboBox();

        box.addItem(null);
        box.addItem("正在热映");
        box.addItem("已下架");
        box.addItem("即将上架");

        container.add(box);

        this.setVisible(true);
        this.setSize(500,500);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new TextComboxDemo01();
    }
}
```

![1623305116647](/javaSEImages/SE/07/1623305116647.png)

- 列表框

```java
package github.GUI.Demo06;

import javax.swing.*;
import java.awt.*;
import java.util.Vector;

/**
 * 
 * @create 2021-06-05 16:26
 */
public class TextComboxDemo02 extends JFrame{
    public TextComboxDemo02(){
        Container container = this.getContentPane();
        // 生成列表的内容
//        String[] contents = {"1","2","3"};

        Vector vector = new Vector();

        // 列表中放入需要的内容
        JList jList = new JList(vector);

        vector.add("赵公明");
        vector.add("吕岳");
        vector.add("吴刚");

        container.add(jList);

        this.setVisible(true);
        this.setSize(500,500);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new TextComboxDemo02();
    }
}
```

![1623305476562](/javaSEImages/SE/07/1623305476562.png)

- 应用场景
  - 选择地区，或者一些单个选项；
  - 列表：展示信息，一股是动态扩容！

#### 7.文本框

```java
package github.GUI.Demo06;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 16:33
 */
// 文本框
public class TestTextDemo01 extends JFrame{
    public TestTextDemo01(){
        Container container = this.getContentPane();

        JTextField textField = new JTextField("Hello");
        JTextField textField1 = new JTextField("World", 30);

        container.add(textField,BorderLayout.SOUTH);
        container.add(textField1,BorderLayout.NORTH);

        this.setVisible(true);
        this.setSize(500,500);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new TestTextDemo01();
    }
}
```

![1623305783587](/javaSEImages/SE/07/1623305783587.png)

```java
package github.GUI.Demo06;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 16:37
 */
// 密码框
public class TestTextDemo02 extends JFrame {
    public TestTextDemo02(){
        Container container = this.getContentPane();

        JPasswordField passwordField = new JPasswordField();
        passwordField.setEchoChar('*');

        container.add(passwordField);

        this.setVisible(true);
        this.setSize(500,500);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

    }

    public static void main(String[] args) {
        new TestTextDemo02();
    }
}
```

![1623305966966](/javaSEImages/SE/07/1623305966966.png)

```java
package github.GUI.Demo05;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 16:04
 */
// 文本域
public class JScroPallDemo extends JFrame {

    public JScroPallDemo(){
        Container container = this.getContentPane();
        // 文本域
        JTextArea textArea = new JTextArea(20, 30);
        textArea.setText("欢迎查阅！！");

        // 面板
        JScrollPane scrollPane = new JScrollPane(textArea);
        container.add(scrollPane);

        this.setVisible(true);
        this.setBounds(200,200,300,350);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        new JScroPallDemo();
    }
}
```

![1623306186155](/javaSEImages/SE/07/1623306186155.png)

### 4.贪吃蛇小游戏

> 素材链接：[https://www.yuque.com/nizhegechouloudetuboshu/library/foie2x](https://www.yuque.com/nizhegechouloudetuboshu/library/foie2x)

#### 1.静态界面绘制

![1623308439432](/javaSEImages/SE/07/1623308439432.png)

- StartGame.java

```java
package github.GUI.snack;

import javax.swing.*;

/**
 * 
 * @create 2021-06-05 17:32
 */
public class StartGame {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Java-贪吃蛇小游戏");

        frame.setBounds(10,10,915,820); // 设置窗口的位置和大小
        frame.setResizable(false);  // 窗口大小不可调整,即固定窗口大小
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // 设置关闭事件，游戏可以关闭

        //正常游戏界面的绘制
        frame.add(new GamePanel());

        frame.setVisible(true); // 展示窗口
    }
}
```

- Date.java

```java
package github.GUI.snack;

import javax.swing.*;
import java.net.URL;

/**
 * 
 * @create 2021-06-05 17:41
 */
// 数据中心
public class Data {
    //头部图片
    public static URL headerUrl = Data.class.getResource("statics/header.png");
    public static ImageIcon header = new ImageIcon(headerUrl);
    //头部：上下左右
    public static URL upUrl = Data.class.getResource("statics/up.png");
    public static URL downUrl = Data.class.getResource("statics/down.png");
    public static URL leftUrl = Data.class.getResource("statics/left.png");
    public static URL rightUrl = Data.class.getResource("statics/right.png");
    public static ImageIcon up = new ImageIcon(upUrl);
    public static ImageIcon down = new ImageIcon(downUrl);
    public static ImageIcon left = new ImageIcon(leftUrl);
    public static ImageIcon right = new ImageIcon(rightUrl);
    //身体
    public static URL bodyUrl = Data.class.getResource("statics/body.png");
    public static ImageIcon body = new ImageIcon(bodyUrl);
    //食物
    public static URL foodUrl = Data.class.getResource("statics/food.png");
    public static ImageIcon food = new ImageIcon(foodUrl);
}
```

- GamePanel.java

```java
package github.GUI.snack;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 17:38
 */
public class GamePanel extends JPanel {

    // 绘制面板
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);    // 清屏
        // 绘制静态面板
        this.setBackground(Color.white);
        Data.header.paintIcon(this,g,25,10);    // 头部广告栏画上去
        g.fillRect(25,125,850,625);  // 默认的游戏界面
    }

}
```

![1623311266744](/javaSEImages/SE/07/1623311266744.png)

#### 2.绘制静态小蛇

```java
package github.GUI.snack;

import javax.swing.*;
import java.awt.*;

/**
 * 
 * @create 2021-06-05 17:38
 */
public class GamePanel extends JPanel {

    // 定义蛇的数据结构
    int length; // 定义蛇的长度
    int[] snakeX = new int[600];  // 蛇的坐标x
    int[] snakeY = new int[500];  // 蛇的坐标y
    String fx = "R"; // 蛇的方向 ： R:右  L:左  U:上  D:下
    boolean isStart = false; // 游戏是否开始


    // 构造器
    public GamePanel(){
        init();
    }

    // 初始化方法
    public void init(){
        length = 3; // 初始小蛇有三节,包括小脑袋
        // 初始化开始的蛇,给蛇定位,
        snakeX[0] = 100; snakeY[0] = 125;
        snakeX[1] = 75; snakeY[1] = 120;
        snakeX[2] = 50; snakeY[2] = 120;

    }

    // 绘制面板
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);    // 清屏
        // 绘制静态面板
        this.setBackground(Color.white);
        Data.header.paintIcon(this,g,25,10);    // 头部广告栏画上去
        g.fillRect(25,125,850,625);  // 默认的游戏界面

        // 把小蛇画上去
        if (fx.equals("R")){ // 蛇的头通过方向变量来判断
            Data.right.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("L")){
            Data.left.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("U")){
            Data.up.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("D")){
            Data.down.paintIcon(this,g,snakeX[0],snakeY[0]);
        }
        for (int i = 1; i < length; i++) {
            Data.body.paintIcon(this,g,snakeX[i],snakeY[i]); // 蛇的身体长度根据length来控制
        }

        // 游戏状态
        if (isStart==false){
            g.setColor(Color.white);
            g.setFont(new Font("微软雅黑",Font.BOLD,40));   // 设置字体
            g.drawString("按下空格开始游戏!",300,300);  // 文字提示
        }

    }

}
```

#### 3.小蛇开始移动

```java
package github.GUI.snack;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

/**
 * 
 * @create 2021-06-05 17:38
 */
public class GamePanel extends JPanel implements KeyListener, ActionListener {

    // 定义蛇的数据结构
    int length; // 定义蛇的长度
    int[] snakeX = new int[600];  // 蛇的坐标x
    int[] snakeY = new int[500];  // 蛇的坐标y
    String fx = "R"; // 蛇的方向 ： R:右  L:左  U:上  D:下
    boolean isStart = false; // 游戏是否开始

    boolean isFail = false; // 游戏是否结束

    // 定时器:第一个参数，就是定时执行时间,100毫秒执行一次
    Timer timer = new Timer(100, this);

    // 构造器
    public GamePanel(){
        init();
        // 获得焦点和键盘事件
        this.setFocusable(true); // 获取焦点事件
        this.addKeyListener(this); // 键盘监听事件
        timer.start();
    }

    // 初始化方法
    public void init(){
        length = 3; // 初始小蛇有三节,包括小脑袋
        // 初始化开始的蛇,给蛇定位,
        snakeX[0] = 100; snakeY[0] = 125;
        snakeX[1] = 75; snakeY[1] = 125;
        snakeX[2] = 50; snakeY[2] = 125;

    }

    // 绘制面板
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);    // 清屏
        // 绘制静态面板
        this.setBackground(Color.white);
        Data.header.paintIcon(this,g,25,10);    // 头部广告栏画上去
        g.fillRect(25,125,850,625);  // 默认的游戏界面

        // 把小蛇画上去
        if (fx.equals("R")){ // 蛇的头通过方向变量来判断
            Data.right.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("L")){
            Data.left.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("U")){
            Data.up.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("D")){
            Data.down.paintIcon(this,g,snakeX[0],snakeY[0]);
        }
        for (int i = 1; i < length; i++) {
            Data.body.paintIcon(this,g,snakeX[i],snakeY[i]); // 蛇的身体长度根据length来控制
        }

        // 游戏状态
        if (isStart==false){
            g.setColor(Color.white);
            g.setFont(new Font("微软雅黑",Font.BOLD,40));   // 设置字体
            g.drawString("按下空格开始游戏!",300,300);  // 文字提示
        }

    }

    // 键盘监听事件
    @Override
    public void keyPressed(KeyEvent e) {
        int keyCode = e.getKeyCode(); // 获取按下的键盘

        if (keyCode==KeyEvent.VK_SPACE){ // 如果是空格
            isStart = !isStart; // 取反
            repaint();
        }

        // 小蛇移动
        if (keyCode==KeyEvent.VK_LEFT){
            fx = "L";
        }else if (keyCode==KeyEvent.VK_RIGHT){
            fx = "R";
        }else if (keyCode==KeyEvent.VK_UP){
            fx = "U";
        }else if (keyCode==KeyEvent.VK_DOWN){
            fx = "D";
        }

    }

    @Override
    public void keyReleased(KeyEvent e) {

    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    // 定时执行时的操作
    @Override
    public void actionPerformed(ActionEvent e) {
        if (isStart && isFail==false) {  // 如果游戏是开始状态，且没有结束，则小蛇移动
            // 右移:即让后一个移到前一个的位置即可 !
            for (int i = length - 1; i > 0; i--) { // 除了脑袋都往前移：身体移动
                snakeX[i] = snakeX[i - 1]; // 即第i节(后一节)的位置变为(i-1：前一节)节的位置！
                snakeY[i] = snakeY[i - 1];
            }
            // 通过方向控制，头部移动
            if (fx.equals("R")) {
                snakeX[0] = snakeX[0] + 25;
                if (snakeX[0] > 850) snakeX[0] = 25;    // 边界判断
            } else if (fx.equals("L")) {
                snakeX[0] = snakeX[0] - 25;
                if (snakeX[0] < 25) snakeX[0] = 850;    // 边界判断
            } else if (fx.equals("U")) {
                snakeY[0] = snakeY[0] - 25;
                if (snakeY[0] < 125) snakeY[0] = 725;    // 边界判断
            } else if (fx.equals("D")) {
                snakeY[0] = snakeY[0] + 25;
                if (snakeY[0] > 725) snakeY[0] = 125;    // 边界判断
            }
            repaint();  //重画页面
        }
        timer.start();  // 定时器开启
    }
}
```

#### 4.小蛇开始吃食物

```java
package github.GUI.snack;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Random;

/**
 * 
 * @create 2021-06-05 17:38
 */
public class GamePanel extends JPanel implements KeyListener, ActionListener {

    // 定义蛇的数据结构
    int length; // 定义蛇的长度
    int[] snakeX = new int[600];  // 蛇的坐标x
    int[] snakeY = new int[500];  // 蛇的坐标y
    String fx = "R"; // 蛇的方向 ： R:右  L:左  U:上  D:下
    boolean isStart = false; // 游戏是否开始
    boolean isFail = false; // 游戏是否结束

    // 食物的坐标
    int foodx;
    int foody;
    Random random = new Random();

    // 定时器:第一个参数，就是定时执行时间,100毫秒执行一次
    Timer timer = new Timer(100, this);

    // 构造器
    public GamePanel(){
        init();
        // 获得焦点和键盘事件
        this.setFocusable(true); // 获取焦点事件
        this.addKeyListener(this); // 键盘监听事件
        timer.start();
    }

    // 初始化方法
    public void init(){
        length = 3; // 初始小蛇有三节,包括小脑袋
        // 初始化开始的蛇,给蛇定位,
        snakeX[0] = 100; snakeY[0] = 125;
        snakeX[1] = 75; snakeY[1] = 125;
        snakeX[2] = 50; snakeY[2] = 125;

        // 把食物随机分布到界面上
        foodx = 25 + 25 * random.nextInt(34);
        foody = 125 + 25 * random.nextInt(25);

    }

    // 绘制面板
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);    // 清屏
        // 绘制静态面板
        this.setBackground(Color.white);
        Data.header.paintIcon(this,g,25,10);    // 头部广告栏画上去
        g.fillRect(25,125,850,625);  // 默认的游戏界面

        // 把小蛇画上去
        if (fx.equals("R")){ // 蛇的头通过方向变量来判断
            Data.right.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("L")){
            Data.left.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("U")){
            Data.up.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("D")){
            Data.down.paintIcon(this,g,snakeX[0],snakeY[0]);
        }
        for (int i = 1; i < length; i++) {
            Data.body.paintIcon(this,g,snakeX[i],snakeY[i]); // 蛇的身体长度根据length来控制
        }

        // 游戏状态
        if (isStart==false){
            g.setColor(Color.white);
            g.setFont(new Font("微软雅黑",Font.BOLD,40));   // 设置字体
            g.drawString("按下空格开始游戏!",300,300);  // 文字提示
        }

        // 画食物
        Data.food.paintIcon(this,g,foodx,foody);

    }

    // 键盘监听事件
    @Override
    public void keyPressed(KeyEvent e) {
        int keyCode = e.getKeyCode(); // 获取按下的键盘

        if (keyCode==KeyEvent.VK_SPACE){ // 如果是空格
            isStart = !isStart; // 取反
            repaint();
        }
        
        // 小蛇移动
        if (keyCode==KeyEvent.VK_LEFT){
            fx = "L";
        }else if (keyCode==KeyEvent.VK_RIGHT){
            fx = "R";
        }else if (keyCode==KeyEvent.VK_UP){
            fx = "U";
        }else if (keyCode==KeyEvent.VK_DOWN){
            fx = "D";
        }

    }

    @Override
    public void keyReleased(KeyEvent e) {

    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    // 定时执行时的操作
    @Override
    public void actionPerformed(ActionEvent e) {
        if (isStart && isFail==false) {  // 如果游戏是开始状态，且没有结束，则小蛇移动
            // 右移:即让后一个移到前一个的位置即可 !
            for (int i = length - 1; i > 0; i--) { // 除了脑袋都往前移：身体移动
                snakeX[i] = snakeX[i - 1]; // 即第i节(后一节)的位置变为(i-1：前一节)节的位置！
                snakeY[i] = snakeY[i - 1];
            }
            // 通过方向控制，头部移动
            if (fx.equals("R")) {
                snakeX[0] = snakeX[0] + 25;
                if (snakeX[0] > 850) snakeX[0] = 25;    // 边界判断
            } else if (fx.equals("L")) {
                snakeX[0] = snakeX[0] - 25;
                if (snakeX[0] < 25) snakeX[0] = 850;    // 边界判断
            } else if (fx.equals("U")) {
                snakeY[0] = snakeY[0] - 25;
                if (snakeY[0] < 125) snakeY[0] = 725;    // 边界判断
            } else if (fx.equals("D")) {
                snakeY[0] = snakeY[0] + 25;
                if (snakeY[0] > 725) snakeY[0] = 125;    // 边界判断
            }

            // 吃食物:当蛇的头和食物一样时，算吃到食物！
            if (snakeX[0]==foodx && snakeY[0]==foody){
                length++; // 1.长度加一
                // 2.重新生成食物
                foodx = 25 + 25 * random.nextInt(34);
                foody = 125 + 25 * random.nextInt(25);
            }

            repaint();  //重画页面
        }
        timer.start();  // 定时器开启
    }
}
```

#### 5.失败判定，积分系统

```java
package github.GUI.snack;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Random;

/**
 * 
 * @create 2021-06-05 17:38
 */
public class GamePanel extends JPanel implements KeyListener, ActionListener {

    // 定义蛇的数据结构
    int length; // 定义蛇的长度
    int[] snakeX = new int[600];  // 蛇的坐标x
    int[] snakeY = new int[500];  // 蛇的坐标y
    String fx = "R"; // 蛇的方向 ： R:右  L:左  U:上  D:下
    boolean isStart = false; // 游戏是否开始
    boolean isFail = false; // 游戏是否结束

    // 食物的坐标
    int foodx;
    int foody;
    Random random = new Random();

    // 定时器:第一个参数，就是定时执行时间,100毫秒执行一次
    Timer timer = new Timer(100, this);

    int score; // 游戏分数

    // 构造器
    public GamePanel(){
        init();
        // 获得焦点和键盘事件
        this.setFocusable(true); // 获取焦点事件
        this.addKeyListener(this); // 键盘监听事件
        timer.start();
    }

    // 初始化方法
    public void init(){
        length = 3; // 初始小蛇有三节,包括小脑袋
        // 初始化开始的蛇,给蛇定位,
        snakeX[0] = 100; snakeY[0] = 125;
        snakeX[1] = 75; snakeY[1] = 125;
        snakeX[2] = 50; snakeY[2] = 125;

        // 把食物随机分布到界面上
        foodx = 25 + 25 * random.nextInt(34);
        foody = 125 + 25 * random.nextInt(25);

        score = 0; //初始化游戏分数
    }

    // 绘制面板
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);    // 清屏
        // 绘制静态面板
        this.setBackground(Color.white);
        Data.header.paintIcon(this,g,25,10);    // 头部广告栏画上去
        g.fillRect(25,125,850,625);  // 默认的游戏界面

        // 把小蛇画上去
        if (fx.equals("R")){ // 蛇的头通过方向变量来判断
            Data.right.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("L")){
            Data.left.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("U")){
            Data.up.paintIcon(this,g,snakeX[0],snakeY[0]);
        }else if (fx.equals("D")){
            Data.down.paintIcon(this,g,snakeX[0],snakeY[0]);
        }
        for (int i = 1; i < length; i++) {
            Data.body.paintIcon(this,g,snakeX[i],snakeY[i]); // 蛇的身体长度根据length来控制
        }

        // 游戏状态
        if (isStart==false){
            g.setColor(Color.white);
            g.setFont(new Font("微软雅黑",Font.BOLD,40));   // 设置字体
            g.drawString("按下空格开始游戏!",300,300);  // 文字提示
        }

        // 画食物
        Data.food.paintIcon(this,g,foodx,foody);

        g.setColor(Color.white);
        g.setFont(new Font("微软雅黑",Font.BOLD,18));
        g.drawString("长度: " + length,750,35);
        g.drawString("分数: " + score,750,50);

        // 游戏失败
        if(isFail){
            g.setColor(Color.RED);
            g.setFont(new Font("微软雅黑",Font.BOLD,40));
            g.drawString("失败, 按下空格重新开始",200,300);
        }
    }

    // 键盘监听事件
    @Override
    public void keyPressed(KeyEvent e) {
        int keyCode = e.getKeyCode(); // 获取按下的键盘

        if (keyCode==KeyEvent.VK_SPACE){ // 如果是空格
            if (isFail){ // 如果游戏失败,从头再来！
                isFail = false;
                init(); // 重新初始化
            }else { // 否则，暂停游戏
                isStart = !isStart; // 取反
            }
            repaint();
        }

        // 小蛇移动
        if (keyCode==KeyEvent.VK_LEFT){
            fx = "L";
        }else if (keyCode==KeyEvent.VK_RIGHT){
            fx = "R";
        }else if (keyCode==KeyEvent.VK_UP){
            fx = "U";
        }else if (keyCode==KeyEvent.VK_DOWN){
            fx = "D";
        }

    }

    @Override
    public void keyReleased(KeyEvent e) {

    }

    @Override
    public void keyTyped(KeyEvent e) {

    }

    // 定时执行时的操作
    @Override
    public void actionPerformed(ActionEvent e) {
        if (isStart && isFail==false) {  // 如果游戏是开始状态，且没有结束，则小蛇移动
            // 右移:即让后一个移到前一个的位置即可 !
            for (int i = length - 1; i > 0; i--) { // 除了脑袋都往前移：身体移动
                snakeX[i] = snakeX[i - 1]; // 即第i节(后一节)的位置变为(i-1：前一节)节的位置！
                snakeY[i] = snakeY[i - 1];
            }
            // 通过方向控制，头部移动
            if (fx.equals("R")) {
                snakeX[0] = snakeX[0] + 25;
                if (snakeX[0] > 850) snakeX[0] = 25;    // 边界判断
            } else if (fx.equals("L")) {
                snakeX[0] = snakeX[0] - 25;
                if (snakeX[0] < 25) snakeX[0] = 850;    // 边界判断
            } else if (fx.equals("U")) {
                snakeY[0] = snakeY[0] - 25;
                if (snakeY[0] < 125) snakeY[0] = 725;    // 边界判断
            } else if (fx.equals("D")) {
                snakeY[0] = snakeY[0] + 25;
                if (snakeY[0] > 725) snakeY[0] = 125;    // 边界判断
            }

            // 吃食物:当蛇的头和食物一样时，算吃到食物！
            if (snakeX[0]==foodx && snakeY[0]==foody){
                length++; // 1.长度加一
                // 2.重新生成食物
                foodx = 25 + 25 * random.nextInt(34);
                foody = 125 + 25 * random.nextInt(25);
            }

            // 结束判断，头和身体撞到了
            for (int i = 1; i < length; i++) {
                // 如果头和身体碰撞，那就说明游戏失败
                if (snakeX[i]==snakeX[0] && snakeY[i]==snakeY[0] ){
                    isFail = true;
                }
            }

            repaint();  //重画页面
        }
        timer.start();  // 定时器开启
    }
}
```

> Java版贪吃蛇开发完成！！！
>
> 可执行exe文件：https://download.csdn.net/download/m0_46153949/19552033


## 
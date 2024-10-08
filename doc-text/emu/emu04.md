# 宏汇编语言的基本语法

## 1、常数、变量和符号

### 1、常数

常数：没有任何属性的纯数值。在汇编期间，它的值已经完全确定，而且在程序的运行中也不会发生变化。它可以有以下几种类型

1. 二进制数：以字母和B结尾的由一串 "0" 和 "1" 组成的序列，例如：001011B
2. 八进制数：以字母0或Q结尾，由若干个0到7的数字组成的序列：例如255Q
3. 十进制数：由若干个0到9的数字组成的序列，可以以字母 D 结尾，也可以省略字母 D 例如：1234D 或 1234
4. 十六进制数：以字母H结尾，由若干个0到9的数字和字母A到F组成的序列，且必须以数字开头。例如：56H，DB3FH。
5. 字符串数：用引号括起来的一个或多个字符。这些字符以ASCII码形式存在内存中。例如："A" 的值是41H，而 "B" 的值是42H，因以串常量与整数常量可以交替使用。

#### 注意：

- 为了区分 A~F 组成的一个字符串是十六进制数还是英文符号；规定凡以字母 A~F 为起始字符的十六进制数，必须在前面冠以数字 "0"。
- 总之，常数主要以立即数，位移量的形式出现在指令语句或数据定义伪指令中。

### 变量

BUF 默认指向 0 的地址

1. 变量：通常是存放在某些存储单元的数据，这些数据在程序运行期间可以修改。
2. 变量名：表示数据在段中的有效地址，由用户指定。变量名是可选的，如果使用变量名，它代表数据区中第一个数据项的地址。
   1. 变量的三个属性:(数据段定义的变量，存储器内容)
      1. 段属性(SEGMENT)：表示变量所在段的段首地址。
      2. 偏移属性(OFFSET)：表示变量的偏移地址。
      3. 类型属性(TYPE)：表示变量占用存储单元的字节数。类型：字节、字、双子、四字、十字节类型。
   2. 变量是用数据定义伪指令DB、DW、DD等定义的。
      1. DB(BYTE) ——字节
      2. DW(WORD) —— (2字节)
      3. DD(DWORD) —— (4字节)
   3. 注意：变量也可以定义一个数据区或存储区，但变量名仅表示该数据区或存储区的第一个数据单元(即数据区或存储区的首地址)。



### 标号: 标号：操作码 操作数1,操作数2

表示一条指令所在的地址，也是指令语句的地址符号，常用作转移指令(包含子程序调用指令)的操作数，即目标地址。

通常由字母数字组成，但第一个字符必须为字母。最多允许 31个字符，且可以使用下划线 (一) 使用标号容易阅读。

标号的三个属性：

1. 段属性(SEGMENT)：表示标号所在段的段基址。
2. 偏移地址(OFFSET)：表示标号的偏移地址。
3. 距离属性(类型属性 TYPE)：表示标号作为段内或段间的转移属性。
   1. 距离属性分为两种：
      1. NEAR(近)(段内)：表示本标号只能被标号所在段内的转移和调用指令访问(即段内转移)
      2. FAR(远)(段间)：表示本标号可以被其他段(不是标号所在段)的转移和调用指令访问(即段间转移)

### **运算符与表达式**

1. 表达式
   1. 数值表达式：只产生数值结果
   2. 地址表达式：产生的结果是一个存储器地址，若该地址存放的是数据，一般称它为变量，若存放的是指令，一般称它为标号.

运算符主要包括以下6种类型： 

####  1、算术运算符 

 包括：+、-、*、/、MOD(求余)、SHL（左移）和右移（SHR）

   例：CONT = 14*4    

```asm
	CONT = CONT/8  
```

​           MOV AL, 21H SHL 2   

#### 2、 逻辑运算符 

 包括：AND、OR、XOR和NOT。只适用于对常数进行逻辑运算。

 例: AND DX，PORT AND 0FE

#### 3、关系运算符

包括：EQ（相等）、NE（不相等）、

​      LT（小于）、GT（大于）、

​      LE（小于或等于）、GE（大于或等于）。



结果：若关系为假（不成立），结果为0；

​      若关系为真（成立），结果为0FFH或0FFFFH。

例: MOV BX，PORT LT 5

例: MOV BX，( (PORT LT 5) AND 20) OR

​               ( (PORT GE 5) AND 30 ) 

​    当PORT<5时，等价 MOV  BX,  20

​    当PORT>5时，等价 MOV  BX,  30

### 综合运算符

#### 1、PTR运算符

1. 格式：类型 PTR 表达式

2. 功能：用于指出变量、标号或地址表达式的类型属性，新的类型只在当前指令内有效。

   ```asm
   # 例
   	MOV BYTE PTR [DI],4 ；指明目的操作数为字节类型                          
   	JMP DWORD PTR [BP]；指明目的操作数为双字类型
   ```

#### 2、SHORT运算符

1. 格式：SHORT 标号

2. 功能：当转移的目标地址与本转移指令的下一条指令之间的字节距离在 -128~ +127 范围时，可以用 SHORT 运算符进行说明。

   ```asm
   # 例
   	L1：  JMP   SHORT  L2
        		┇
        L2：  MOV  AX，BX
                  ┇ 
   ```




## 分析操作符(数值返回运算符)

### 1、取地址的偏移量

1. 格式：OFFSET 变量名或标号
2. 功能：取变量或标号所在段的段内偏移量

```asm
LEA SI,BUF;	实打实取了偏移地址
MOV SI,OFFSET,BUF(源操作数立即寻址);		编译的过程，把BUF还原成偏移地址
```

### 2、取段基址

1. 格式：SEG 变量名或标号
2. 功能：取变量名或标号所在段的段首地址。

### 3、求变量名或标号的类型值

1. 格式：TYPE  变量名或标号
2. 功能：返回一个数字值。若TYPE加在变量名前，返回该变量的类型属性；若加在标号前，返回该变量的距离属性。

​																					存储器操作数的类型值

|                  | 属性  | 类型值 |
| ---------------- | ----- | ------ |
| 变量(占的字节数) | BYTE  | 1      |
| 变量(占的字节数) | WORD  | 2      |
| 变量(占的字节数) | DWORD | 4      |
| 标号             | NEAR  | -1     |
| 标号             | FAR   | -2     |

### 4、求长度

1. 格式：LENGTH	变量名

2. 功能：返回一个变量名所占存储单元(字节、字或双字)的数目。若变量是用重复定义字句说明的，则返回DUP(重复)前面的数值，其余返回。

   ```asm
   BUF DB 100 DUP (1);	从0开始100个1放到 DB里
   MOV AX,LENGTH BUF;		AX=100
   ```

### 5、求大小

1. 格式：SIZE 变量名
2. 功能：返回变量名所占存储单元的字节数，它等于 LENGTH 和 BYTE 两个运算符返回值的乘积。
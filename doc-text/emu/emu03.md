# 寻址方式和指令系统

## 一、8086/8088指令系统的特点

1. 指令系统的兼容性
2. 指令格式的灵活性
3. 寻址方式的多样性
4. 可对多种类型的数据进行处理
5. 可构成多处理机系统

## 二、指令格式

指令：是指指示计算机完成特定操作的命令

指令系统：他取决于计算机的硬件设计，指令系统因机而异，没有通用性。

指令中应包含的信息：

- 执行指令的运算 ①
- 运算结果的去向 ②
- 运算数据的来源 ③
  - 例：
    - ③ i=a+b (a、b ②，+ ③)

指令格式：

​	<img src="/emuImage/指令格式.png" style="zoom:80%;" />

源操作数：指令加工之前的数据(来源)

目的操作数：指令加工之后形成的数据(去向)



<img src="/emuImage/指令中的操作数表征方法.png" style="zoom:80%;" />

寄存器的东西是CPU内部的寄存器

存储器的东西是CPU外部的

### 操作数类型：3种方式(寄存器操作数、立即数操作数、存储器操作数(左面最快，依次类推))

只有存储器有地址属性

### 1、立即数操作数(无存储空间、所以放不了数)

表示参加操作的数据本身，可以是8位或16位

```asm
例：
     MOV AX,1234H;		就是AX <- 1234H （赋值）
     MOV BL,22H;
```

**注意：**

立即数无法作为目的操作数

立即数可以是无符号或带符号数，其数值应在可取值范围内



### 2、寄存器操作数

表示参加运算的数存放在指令给出寄存器中，可以是16位或8位。

```asm
例：
     MOV AX,BX   对应长度都是16位寄存器
     MOV DL,CH
```



### 3、存储器操作数

表示当前参加运算的数存放在存储器的某一个或两个单元中。

```asm
例：
     MOV AX,[1200H]		(中括号是一个偏移地址)
     MOV AX,[1200H]		(去1200H里面取数，取多长根据寄存器长度决定，前面AX是16位，就应该取一个16位的长度给AX)
```

<img src="/emuImage/寄存器如何取数.png" style="zoom:80%;" />

高高低低(小端格式/小端存储)

- 高位放到高位地址
- 低位放到低位地址

指令的字长与指令的执行速度：

1. 指令字长由操作码的长度、操作数、地址长度、操作数个数决定
2. 8086/8088 CPU采用变字长指令格式
3. 指令的字长操作响应指令的执行速度

对不同的操作数，指令执行的时间不同：

- (CPU外) 存储器——》立即数 (CPU外)——》 寄存器 (CPU内)
- 慢———>快
- MOV AX,BX	2字节(变长指令)   速度最快



## 寻址方式：

1. 就是寻找指令操作数所在地址的方式
2. 只有存储器数有地址属性

### 1、立即寻址(立即数寻址)：立即数只有这一种方式(默认ds段)

指令操作数部分直接给出指令的操作数，它与指令操作码相接，顺序存放在代码段中，立即数有8位和16位之分。

```asm
例：
	MOV AH,36H	AH《—— 立即数36H
	MOV CX,2A50H	CX 《—— 立即数 2A50H
```

不能写MOV AL,-200 超出表示范围 ，表示范围为 -128~127

#### 注意：

1. 立即寻址不能超出范围
2. 立即寻址方式只能用于源操作数，主要用于给寄存器赋值
3. 立即寻址方式不执行总线周期，执行速度快。



### 2、寄存器寻址：只有这一种(默认ds段)

操作数放在寄存器内，由指令直接给某个寄存器的名字，以寄存器的内容作为操作数。

寄存器可以是16位的AX、BX、CX、DX、SI、DI、SP、BP寄存器，也可以是8位的AH、AL、BH、BL、CH、CL、DH、Dl寄存器

```asm
例：
	MOV AX、CX		把CX给AX
	DEC AL		 AL-1，回送给AL
```

#### 注意：

1. 寄存器寻址方式的指令操作在CPU内部执行，不需要执行总线周期，执行速度快。
2. 寄存器寻址方式既用于指令的源操作数，也可以用于目的操作数，并且可同时用于源操作数和目的操作数。



### 3-8都是存储器数寻址方式



### 3、直接寻址(默认ds段)

操作数在存储器中，指令中直接给出操作数所在存储单元的有效地址EA，即段内偏移地址，表示操作数所在存储单元距离段首地址的字节数。有效地址是一个无符号的16位二进制数。

```asm
例：
	MOV AH,[2100H]			将DS段中2100H单元的内容送给AH
	MOV AX,[2100H]			将DS段中2100H单元送给AL；2101H单元的内容送给AH
	MOV [1000H],AH			DS=1000H 《—— (AH)
```

#### 注意：

1. 直接寻址方式的操作数所在存储单元的段地址一般在数据寄存器DS中。

2. 如果操作数在其他段，则需要在指令中用段超越前缀指出相应的段寄存器名。

```asm
例：
	MOV AH,EH:[2000H]		超越到ES段去取数据
	将段附加器寄存器ES的内容乘16，再加上2000H作为操作数所在存储单元地址，取出该存储单元的内容送到寄存器AH中。
```



### 4、寄存器间接寻址(默认ds段，除bp默认ss段)

操作数在存储器中，指令中寄存器的内容作为操作数所在存储单元的有效地址EA(偏移地址)，寄存器仅限BX、BP、SI、DI

EA包括：[SI]、[DI]、[BX]、[BP]

```asm
例：
	MOV AH,[SI]|[BP]|[SI]|[DI] 	或	MOV AH,EA:[SI]|[DI]|[BX]|[BP]
```



- 当使用BX、SI、DI 时，操作数所在存储单元的段地址存在数据段寄存器DS中。
- 当使用BP时，操作数所在存储单元的段地址存在堆栈段寄存器SS中。

#### 注意：

- 只有SI、DI、BX、SP可作为间址寄存器。
- 若操作数所在存储单元不在数据段DS中，需要在指令中用段超越前缀表明其所在段的段名。



### 5、基址寻址(bx+偏移量 默认ds段，bp+偏移量默认ss段)

基址寻址就是用BX和BP进行寻址

操作数在存储器内，指令中寄存器(BX或BP)的内容与指令指定的位移量之和作为操作数所在存储单元的有效地址EA(偏移地址)

![](/emuImage/EA.png)

- 使用BX时，段地址为DS的内容。
- 使用BP时，段地址为SS的内容。

```asm
例：
	SS=2000H	BP=1000H COUNT=2000H(16位偏移量)
	指令：	MOV AX，COUNT[BP]
	解:	物理地址=16×SS+BP+16位偏移量
			  =20000H+1000H+2000H
			  =23000H
		指令执行结果是将23000H和23001H单元的内容送入寄存器AX中
		MOV BL,[BX] 或 MOV BL,[BX+2]; (DS:[BX+2]->BL)
```



### 6、变址寻址(跟基址一样，变址变成了SI、DI，默认ds段)

操作数在存储器内，指令将变址寄存器SI、DI内容与指令指定的位移量之和作为操作数所在存储单元的有效地址EA（偏移地址）。段地址规定为DS的内容。

<img src="/emuImage/变址寻址.png" style="zoom:80%;" />

```asm
例：
	DS=3000H	SI=1000H	COUNT=2000H
	指令：MOV AX，COUNT[SI]
	解：物理地址=16×DS+SI+16位偏移量
			=3000H+1000H+2000H
			=33000H
	指令执行结果是将33000H和33001H单元的内容送入寄存器AX中。	
```



### 7、相对寻址(默认ds段)

```asm
mov ax,[bx+偏移量]|[si+偏移量]|[di+偏移量]|[bp+偏移量]
```



### 8、基址加变址寻址(bx+si或bx+di默认ds段，bp+si或bp+di默认ss段)

操作数在存储器内。指令将基址寄存器BX，BP与变址寄存器SI、DI的内容之和再加上偏移量(8位或16位)，得到操作数所在存储单元的有效地址EA。

![](/emuImage/基址加变址寻址.png)

- 当使用BX时，段寄存器为DS
- 当使用BP时，段寄存器为SS。

```asm
例：
	已知	DS=2000H		BX=1000H		SI=0500H		MK=1120H
		指令： MOV AX,[MK+BX+SI]
			解：物理地址=20000H+1000H+0500H+1120H
					=22620H
```

#### 注意：

BX/SP只能出现一个，SI/DI只能出现一个+偏移地址，默认使用段由基址存储器决定

​	例：[BP+SI] = SS×16+BP+SI



### 9.字符串寻址(不考)

用于字符串操作指令。规定变址寄存器SI中的内容是源数据串的段内偏移地址，而变址寄存器DI中的内容是目标数据串的段内偏移地址

源数据串的段地址规定是数据段DS，目标数据串的段地址规定是附加段ES。指令执行后SI和DI的内容自动增量（或减量），增（或减）值为1或2。

**例 :** **MOVSB**

  执行后： [DI]←[SI]   SI←SI±1   DI←DI±1



### 10.I/O端口寻址(不考)

**寻找输入输出设备的端口地址，可分为直接端口寻 址和间接端口寻址。**

**直接端口寻址**：由指令直接给出I/O设备的端口地址。

​            它规定端口地址为8位，能寻址256 个端口

**间接端口寻址**：由DX给出I/O设备的端口地址。由于DX 是16位，因此间接端口寻址能寻址多达64K个端口。

例：IN AL，20H ；将地址为20H的外设内容读入AL中OUT  DX，AL；AL中内容输出给以DX的内容为地址的外设



### 11、 隐含寻址

   **指令隐含了的一个或两个操作数的地址，即操作数在默认的地址中。**

例： AAA； 对AL中的内容进行十进制加法调整，并把调整后的结果放入AH和AL中。这条指令的隐含操作数是AH和AL。 



## mov指令

```asm
mov op目，op源
```

注意：(适用于所有双操作数指令)

1. 操作数必须对齐(8位/16位)
2. 两个操作数不能同为存储器数，也不能同为段寄存器
3. 立即数不能作为目的操作数
4. cs段寄存器不能作为目的操作数，IP不能作为操作数
5. 除 CS 段以外的寄存器可以作为目的操作数，但是只能用通用寄存器送入
6. 立即数不能直接送入段寄存器
7. 传送指令不影响标志位



## 转移指令

### 汇编的指令格式：

- 标号：操作码	操作数,操作数;注释
  - 例：
    - 标号(START): 操作码(MOV)，操作数(AX),操作数(2000H);注释

<img src="/emuImage/汇编指令格式.png" style="zoom:80%;" />



### 1、寻址方式

控制转移指令在段内，段间转移时，使用直接(相对)寻址或间接寻址。

#### 1、直接寻址方式(同一段内)(JMP,标号)

- 段内直接寻址目标程序和源程序在同一个程序段内，只给出源地址和目标地址的差值。此差值是偏移量，他是一个以 IP 为基准段间直接寻址方式(不同代码段)
- 直接给出转移目标地址的段地址和段内位移量，用前者取代 CS 当前的值，用后者取代 IP 中当前的值，使程序从一个代码段转移到另一个代码段。

#### 2、间接寻址(需要把地址从寄存器或存储器中，取出来，在跳转)

##### 	1、段内间接寻址(同一段，代码段中)

​		指令转移的有效地址存在一个寄存器或存储器中，用它取代当前 IP 的值，实现程序转移。

##### 	2、段间间接寻址方式(不同代码段)

​		指令给出一个存储器地址，从该地址的段内偏移量和段地址，这两个地址在指令执行时用于取代前面的 IP 和 CS 的内容，使程序从一个代码段到另一个代码段。



### 2、转移指令

通过修改指令的偏移地址或段地址及偏移地址实现程序的转移。

1. 无条件转移指令
   1. 无条件转移到目标地址，执行新的指令
2. 有条件转移指令
   1. 在具备一定条件下的情况下转移到目标地址



#### 1、无条件转移指令

- JMP 指令
  - 格式：JMP OP
  - 功能：无条件地将控制转移到目标地址去。

<img src="/emuImage/JMP指令转移.png" style="zoom:60%;" />

<img src="/emuImage/段内转移.png" style="zoom:80%;" />



#### 2、段内转移指令(CS不变、IP变)

1. 段内直接短转移(修正IP)            
   1. JMP SHORT(范围-128 ~ +127) OP                IP <——  IP+8位偏移量(下一个地址)
2. 段内直接近转移
   1. JMP NEAR(范围 -32768 ~ +32767) PTR OP			IP <—— IP+16位偏移量(下一个地址)
3. 段内间接转移
   1. JMP WORD PTR OP 或 JMP OP  <—— 寄存器        IP <—— EA，WORD PTR 是运算符

当目标地址高于源地址时称为正向转移，偏移量是正数。

当目标地址低于源地址时称为反向偏移，偏移量是负数。



#### 3、段内转移指令(不同代码段，CS、IP都变)

段直接转移(远转移)		JMP FAR(段间转移运算符) DTR OP

IP <—— OP的段内偏移地址

CS <—— OP的段地址

#### 4、段间间接转移  JMP  DWORD(双字节运算符)  PTR  OP

转移的目标段地址及偏移地址存放在内存的连续4个单元之内，前两个单元为偏移地址，后两个单元为段地址。



### 条件重复

REPE   相等重复

REPZ   为零重复

上面这两个都是  	CX不等于0    			ZF=1

REPNE	不相等重复

REPNZ	不为零重复

上面这两个都是 	CX不等于0  				ZF=0





## INC指令(指针加一)

加1*指令*INC是将操作数[D]的内容进行加1，运算结果仍存入[D]中

````asm
例：
	INC BX	BX的指针加一，指向下一个单元
````





## LEA指令(取有效地址)

一个计算机指令，可以将有效地址传送到指定的的寄存器。LEA指令返回间接操作数的地址。

```asm
例：
	LEA BX,DATA1	将data1里面的地址给bx
```



## DEC指令(DEC CX，影响标志位)

-1指令

````asm
例：
	MOV CX,99  1个数一个数给CX，需要用到循环
	DEC CX  CX-1操作
````



````asm
# 例：在DATA1开始的存储区中存放100个8位无符号数，找出其中最大的数存入MAX单元。
     LEA BX,DATA1 		# 把 DATA1的地址给 BX
     MOV AL,[BX]  		# 从数组取一个值给AL 例如 bx=1, 那么 MOV AL,[1]，只有8位，所以，应该使用AL，AL是低8位
     MOV CX,99			# 创建一个计数器用来记录 bx还剩多少个数未比较
LL:	INC BX			# 让BX指针加1，指向下一个单元
     CMP AL,[BX]		# 比较 AL，和 BX 的值，谁的值更大
     JA NEXT			# 如果 AL 的值大，跳转到 LL ，没有继续比较
NEXT:MOV AL,[BX]		# 把刚才那个值给 AL
	DEC CX 			# CX-1，CX-1 = 0 ZF = 1 ,CX-1 不等于 0 ZF=0 (CX-1影响ZF标志位)
	JNZ LL;			# 如果 CX-1 不等于0，继续跳到LL里面，继续比较
	MOV MAX,AL		# 把 AL的值给 MAX
````



## 调用和返回指令

1. 分段内调用和段间调用
   1. 段内调用：主程序/子程序 同一段(CS不变)
   2. 段间调用：主程序/子程序 不同段(CS变)
2. 格式：CALL OP
3. 功能：将 CALL 指令的下一条指令的地址(断点地址 IP 或 IP 与 CS ) 压栈，新的目标地址(子程序首地址)装入 IP 或 IP 与 CS 中，控制程序转移到由 OP 指明入口的子程序。其中 OP 为 子程序 (过程) 的名字。
   1. 操作过程：
      1. SP-2 ——> SP，当前压栈，OP所在段地址——> CS(段间)
      2. SP-2 ——> SP，当前 IP 压栈，OP的偏移地址——> IP 对于段内调用只有(2)。
   2. 返回指令：
      1. 格式：RET (子程序返回)
      2. 功能：通常作为一个子程序的最后一条指令，用以返回到调用子程序的断点处，即从堆栈弹出断点送 IP 和 CS
   3. 操作过程：
      1. 从栈顶弹出一个字给 IP，SP+2——> SP(段内调用)
      2. 从栈顶弹出一个字给 CS，SP+2——> SP(段间调用)



## 条件转移指令

​		条件转移指令将前一条指令执行结果对状态标志位的影响，作为程序转移的条件。满足条件时转移到指令指定的地址，否则将顺序执行下条指令。可作为判断条件的状态标志有 CF、PF、ZF、SF和OF。

​		条件转移指令都是采用相对寻址方式的双字节指令，指令第一条是操作码，第二字节是带符号的位移量。条件转移指令只能在当前段中实现短转移，不影响状态标志。(短转移的范围是 -128~+127字节)。

1. 对无符号数

   1. JA (大于跳)			JB (小于跳)		JE (等于)		JBE (小于等于) 	JNAE (不大于等于(小于))	JAE (大于等于)

      ​	满足条件跳转，不满足条件顺序执行

   2. 例：

      ````asm
      CMP AL,DL;  # AL>BL 
      JA NEXT;	  # 跳到NEXT否则顺序执行
      ````

2. 有符号数

   1.  JG (大于)		JL (小于)		JLE (小于等于)		JGE(大于等于)

3. 对标志位 

   | 进位为1转移              | JC  目标符号      | CF=1 |
   | ------------------------ | ----------------- | ---- |
   | 进位为0                  | JNC  目标符号     | CF=0 |
   | 等于/结果为0转移         | JZ/JE  目标符号   | ZF=1 |
   | 不等于/结果不为0转移     | JNZ/JNE  目标符号 | ZF=0 |
   | 溢出转移                 | JO  目标符号      | OF=1 |
   | 不溢出转移               | JNO  目标符号     | OF=0 |
   | 奇偶位为0/奇偶性为奇转移 | JNP/JPO  目标符号 | PF=0 |
   | 奇偶位位1/奇偶性为偶转移 | JP/JPE  目标符号  | PF=1 |
   | 符号标志位为0转移        | JNS  目标标号     | SF=0 |
   | 符号标志位为1转移        | JS 目标标号       | SF=1 |



## 循环控制指令

1. 使用循环控制指令之前，必须在 CX (计数器) 中预置循环次数的初始值。
2. 不影响状态标志位 (DEC CX，影响标志位)
3. 主要用于数据块比较、查找关键字等操作
   1. 计数循环
      1. 格式：LOOP 目标标号
      2. 功能：CX-1——> CX，若 CX ≠ 0 ，循环转移到目标标号，直到 CX=0 退出循环。(先-1，后判断)
      3. CX=0 的时间循环次数最多，因为先 -1，所有 0-1 就是 0FFFFH，最多为 65536次。
   2. 结果为0/相等循环(不常用)
      1. 格式：LOOP/LOOPE  目标标号
      2. 功能：CX-1——> CX，若 CX ≠ 0 且 ZF=1 时，循环转移到目标标号，直到 CX=0 或 ZF = 0 退出循环。
   3. 结果不为0/不相等循环(不常用)
      1. 格式：LOOPNZ/LOOPNE  目标标号
      2. 功能：CX-1——> CX，若 CX ≠ 0 且 ZF = 0 时，循环转移到目标标号，直到 CX = 0 或 ZF = 1时退出循环。
   4. 计数为0转移(不常用)
      1. 格式：JCXZ 目标标号
      2. 功能：若 CX = 0 时，则转向目标标号，否则顺序执行。处理器控制指令。



## 处理器控制指令

1. 标志操作指令

   1. 格式：

      | CF   | CLC  | 置CF=0          |
      | ---- | ---- | --------------- |
      | CF   | STC  | 置CF=1          |
      | CF   | CMC  | 置CF=CF取反     |
      | DF   | CLD  | 置DF=0 (正向串) |
      | DF   | STD  | 置DF=1 (反向串) |
      | IF   | CLI  | 置IF=0          |
      | IF   | STI  | 置IF=1          |

      标志操作指令完成对标志位的置位、复位等操作，这些指令只影响与其相关的标志位。

2. CPU控制指令

   1. 处理器暂停指令(不怎么用)
      1. 格式：HLT
      2. 功能：使处理器处于暂停时停机状态
      3. 说明：HLT 引起的暂停，只有 RESET(复位)、NMI(非屏蔽中断请求)、INTR(可屏蔽中断请求) 信号可以使 CPU 退出暂停状态。
   2. 空操作指令
      1. 格式：NOP
      2. 功能：在执行指令期间，CPU 不完成任何操作，只是每执行一条 NOP 指令，耗费3个时钟周期的时间。



## 输入输出指令(IO操作)

CPU对外设端口有两种寻址方式，即直接寻址和间接寻址。直接寻址范围为 00H~0FFH 个端口；间接寻址范围为 0000H~0FFFFH 共64k个端口。间接寻址时，只能用 DX 作为间址寄存器。

### 1、输入指令(IN)

​	格式：IN 累加器(AL/AX)，端口(直接或间接)

​		端口如果在 0~255/ 0HH~0FFH 用直接寻址，否则使用间接寻址，间接寻址使用 DX 寄存器 (DX存的是端口地址)

​	功能：把一个字节/字 由输入端口传送到 AL/AX 中

```asm
# 例：
	IN AL,21H # 将端口21H的8位数读到AL中(直接)
	MOV DX,201H 
	IN AX,DX  # 间接，把201H的数据给了AX(AX,内容,AX有的是端口数据)
```



### 2、输出指令(OUT)：分直接寻址和间接寻址(和输入指令差不多)

​	格式：OUT 端口 累加器

​	功能：把AX中的16位数或AL中的8位数输出到指定的端口。

````asm
# 例：
	OUT 22H,AL	# 将AL中的8位数输出到指定的端口
	MOV DX,511H
	OUT DX,AX		# 将AX中的数据传到511H端口(间接)
````



## 3、中断指令

### 	1、溢出中断指令

​			格式：INTO

​			功能：检测 OF 标志位，当 OF = 1 时，产生一个中断类型4的中断，当 OF = 0 时，本指令不起作用。

```asm
# 例：
	AL = 1
	ADD AL,7FH(80H=128)
	OF = 1
	# INTO 发生溢出中断，如果运算超出表示范围，加 INTO 会发生溢出，没有则不会发生中断
```



### 2、软中断指令

​		格式：INT n (n为中断类型号)

​		功能：产生一个软件中断，把控制转向一个类型号为 n 的软中断。

​		注意：影响标志位 IF、TF

### 3、中断返回指令

​		格式：IRET (必弹出 FR、CS、IP 标志位)

​		功能：让 CPU 执行完中断服务程序后，正确返回原程序的断点处。

​		注意：影响所有标志位



## 8086的指令系统

​		指令系统包括九大类、133种基本指令，通过寻址方式的变化与数据形式(字节、字型)的组合，可构成上千条指令。指令系统按功能分为数据传送类、算术运算类、逻辑运算与移位类、串操作类、控制转移类、处理机控制、输入输出、中断等

### 数据传送指令

​		数据传送类指令实现 CPU 内部寄存器之间，CPU与存储器之间、CPU 与 I/O 端口之间的数据传送。

​		源操作数的值给目的操作数，源操作数的值不变。

#### 1、通过数据传送指令：MOV (8位/16位)

1. 包括 MOV 、进栈、出栈指令、交换指令和换码指令

   1. 格式：MOV(复制)  OP(目),OP(源)

   2. 要求：OP 可以是寄存器，所有寄存器 ( CS、IP、FR 除外)。

   3. 存储器 OP 可以是寄存器、存储器和立即数。

   4. CS(代码段) 和 IP(指令指针寄存器) 一使用 MOV 指令修改，会使程序全乱套。

   5. 使用存储器，取决于8位还是16位。

   6. MOV WORD PTR [SI] (类型声明)，6070H

      1. 如果没有 CPU 内部寄存器，就需要声明类型，CPU 内部寄存器(AX、BX、CX、DX、SI、DI、SP、BP)，因为CPU内部寄存器长度是已知的。

         ```asm
         # 例：
         	MOV WORD PTR [SI],6070H	# 声明一个字为[SI],通过 MOV 指令把6070H复制一份数给[SI]
         ```

   7. 注意：

      1. 堆栈可以不用写类型声明 

      2. MOV指令的两个操作数(源、目的) 均可采用不同的寻址方式，源操作数和目的操作数的类型必须一致。

      3. 不允许把立即数作为目的操作数，也不允许向段寄存器送立即数。

      4. 不允许在段寄存器之间、存储器单元之间传送数据。

      5. CS、IP 寄存器不能用作目的操作数。

      6. 一般传送指令不影响标志位。

      7. 可以向段寄存器 (DS) 送寄存器数。

         ```asm
         # 例：
         	MOV DS,2000H 	×			MOV DS,AX	 √
         # 判断下列指令正确与否
         	MOV AL,BL		√			MOV CX,BX	 √
         	MOV BX,DL		× 类型不一致
         	MOV DX,0034H	√
         	MOV DS,1234H	× 立即数不能送段寄存器
         	MOV ES,AX		√
         	MOV CS,BX		× CS不能作为目的操作数
         	MOV [SI],CX	√
         	MOV [DI],[SI]	× 不能同时为存储器操作数
         	MOV 2000H,AX	× 目的不能为立即数
         	MOV DS:[2000H],AX	√
         ```



### 2、堆栈操作指令(8086堆栈从高到低形成的)

堆栈：是按 “后进先出” 的原则工作的，一般存储器区域。

<img src="/emuImage/后进先出.png" style="zoom:80%;" />

堆栈寄存器 SS —— 段地址

堆栈指针 SP —— 始终当前栈顶所在的存储单元的地址，即最新入栈数据所在的存储单元的地址。

#### 压(入)栈操作：(先sp-2/1 在给空间，在入栈)

1. 格式：PUSH OP (先给空间，在压(入)栈) 

2. 功能：把 OP 字数据压入栈中，结果 SP-2 ——> SP

3. 原则：高字节压在高地址，低字节压在低地址。

   <img src="/emuImage/压栈操作.png" style="zoom:80%;" />

4. 执行过程：

   1. 先 SP - 1，后压(进)高位
   2. 再 SP - 1，后压(进)低位

5. 压栈执行过程：(空间减1，在进栈)

   1. SP <— SP-1(先减1)		[SP] <- OPH (高位数据进栈)
   2. SP <- SP -1(再减1)		  [SP] <- OPL (低位数据进栈)



#### 出栈操作：

1. 格式：POP OP (先把对应的数据拿出来，在收回空间(和压栈操作相反))
2. 功能：从栈中弹出一个数据 -> OP ，结果 SP+2 —> SP
3. 出栈执行过程：(先出栈，然后空间加1)
   1. OPL <— [SP]  (低位出栈)		SP <— SP +1 (地址+1)
   2. OPH <—[SP]  (高位出栈)        [SP] <— OPL (地址+1)



```asm
# 使用堆栈实现数据交换

 	MOV AX,20H
 	MOV BX,10H
 	PUSH AX
 	PUSH BX
 	POP AX
 	POP BX
```



#### 压栈和出栈的注意事项：

1. 堆栈操作总是按字进行的 (PUSH、POP)。
2. 压入指令，SP-2，数据在栈顶、弹出指令正好相反。
3. 操作数可以是存储器、寄存器或段寄存器操作数。
4. 入栈操作是将操作数写入堆栈，出栈操作是将堆栈的内容写入操作数
5. (CS不能用于POP)，不能是立即数
   1. PUSH CS  √ (CS入栈)		POP CS × (会把堆栈段某些数据给CS，导致程序全乱套)
   2. PUSH 1200H	 ×		POP 2300H	 ×
      1. 这两条指令主要用来进行现场保护和恢复，以保证子程序调用或中断的程序正常返回。
      2. 堆栈指令是一个隐含寻址
         1. PUSH 隐含了 SS段 (目的操作数)		本应 PUSH AX,SS (这样写错的，就知道PUSH隐含了那个段就行)
         2. POP 隐含了 SS:SP (源操作数)



### 数据交换指令

1. 格式：XCHG OP1,OP2

2. 功能：实现 OP1 和 OP2 内容的相互转换

3. 操作数：通用寄存器或存储器，但不能均为内存单元。

4. 注意：

   1. 段寄存器和 IP 不能作为交换指令的操作数。
   2. 继承 MOV 指令的规则，原则。
   3. OP1，OP2 不能为立即数，不能同为寄存器数

   ````asm
   # 例
   	XCHG AX,BX 	√
   	XCHG BH,BL	√
   	XCHG AX,1122H	× 不能为立即数
   	XCHG DS,AX	× 不能为段寄存器
   	XCHG [SI],BP	√ = BP <=> DS=[SI],[SI+1]
   	XCHG [SI],[DI]	× 两个操作数不能同为寄存器数 
   ````

### 换码指令(查表指令、翻译指令)

​		换码指令是一条完成字节翻译功能的指令。他可以使累加器中的一个值变换为内存表格中的某一个值，一般用来实现编码制的转换。

1. 格式：XLAT

2. 功能：[BX+AL(BX+AL相加作为有效地址 EA )]  ——> AL  

3. 说明：将 BX 和 AL 内容相加作为有效地址 EA ，在一个表格中找出此单元中的内容 ——> AL 中

4. BX —— 表格的首地址

5. AL —— 相对于表格首地址的位移量 (要转换的代码)

   ````asm
   # 例：
   	BX = 1000H	DS = 4000H	BX = 1004H	2004H对应的是a 	AL = 04H
   	XLAT;	就类似于 AL = DS*16+BX+AL,最后等于 20004H，对应的就是 A
   	MOV AL,[BX+1004H]	和上面 XLAT 结果一样
   ````

6. 注意：

   1. XLAT 是隐含寻址
   2. 使用前，先建立被转换代码(字节型)的数据表。
   3. 换码指令只能使用寄存器 BX、AL，不影响标志位。



### 目的地址传送指令(存储器数才有地址)

​	此类指令的功能是将操作数所在存储器的地址送入目标寄存器

​		注意：

​				OP源必须是存储器操作数

​				OP且必须是16位的通用寄存器

​				地址传送指令不影响状态标志位

#### 1、取有效地址 LEA 指令：

1. 格式：LEA OP目,OP源
2. 功能：将源操作数的有效地址 EA 送到目的操作数

```asm
# 例
	LEA AX,[5678H];	AX = 5678H
	LEA BX,[BP+SI];	BX = BP+SI
	LEA BX,[BX];	取 BX 不变(取以BX为偏移地址的内存单元的偏移地址给BX)，就是取BX的值，还是BX的本身
	MOV BX,[BX];	这个[DX×16+BX]找地址
```

MOV BX,[BX] 和 LEA BX,[BX] 区别：

MOV BX,[BX]：这个就是在找地址 [DX × 16 + BX ]

LEA BX,[BX] ：这个去 BX 本身找自己的偏移地址给自己，结果是一样的，但是过程不一样

```asm
DATA1 = 2000H
LEA SI,DATA1;			SI = 2000H
MOV SI,DATA1;			以 DS × 16+DATA1为物理地址取数(取一个字的大小)
MOV SI,OFFSET DATA1;	取DATA1的偏移地址给SI,SI=2000H
MOV SI,SEG DATA1;		取DATA1的段地址给SI,SI=1000H
```

OFFSET： 只是在编译的过程中 把标号还原成偏移地址

OFFSET和 SEG 都是立即寻址

SEG：单纯的取段地址

LEA 和 OFFSET 都是取偏移地址，只是原理不同，用法不同，OFFSET 后面只能跟变量名或地址符号

#### 2、指令指针送寄存器和DS指令(不太重要)

1. 格式： LDS  OP目，OP源

2. 功能：把OP源指定的4个字节内容取出，低地址的两字节—>OP目，高地址的两字节—>DS。

   ```asm
   # 例 
   	LDS DI,[2130H];	从2130开始取四个字节，2130H、2131H、2132H、2133H，低字节(2个字节)放到 目标地址操作数，					  高字节(2个字节)放到DS寄存器
   ```



#### 3、指针送寄存器和 ES 指令(不太重要)

1. 格式：LES  OP目，OP源
2. 功能：本指令与LDS指令的操作基本相同，所不同的是将OP源4个字节中高地址的两字节ES。
3. 例：LES DI，[2130H]；
   1. 2130H和2131H单元中的内容—>DI；         
   2. 2132H和2133H单元中的内容—>ES
4. 跟上面的DS差不多，LDS 2位字节送到 DS，LES 高2位字节送到 ES
   1. LES DI,[2130H]
      1. 2130、2131H (送到目的操作数)		2132H、2133H(送到ES段)



### 算术运算指令

8086的算术运算类指令能够对二进制或十进制(BCD码)数进行加、减、乘、除运算，操作数的数形式可以是8位或16位无符号数或带符号数

#### 1、加法指令

##### 	1、不带进位的加法指令(影响标志位)

​		格式：ADD OP目,OP源

​		功能：OP目 <— OP源 + OP目，根据结果设置标志位

```asm
# 例：
	ADD AL,50H;		AL+50H —> AL
	ADD DI,SI;		DI+SI —> DI
	ADD AX,[DI];		16位+[DS:DI+1][DS:DI] —> AX
	ADD [BX+DI],AX;	(BX+DI)和(BX+DI+1)2个单元的内容给AX，结果放在BX+DI和BX+DI+1所指的单元
	ADD AX,[BX+2000H];	BX+2000H和BX+2001H所指的单元内容和AX的内容相加，结果在AX中
```

注意：

​	两操作数的类型相同，类型明确，不能同为寄存器操作数，不能有段寄存器。

```asm
# 例 判断下列指令正确与否
	ADD AL,BX			× 位数不相同
	ADD CL,CH			√
	ADD AX,[BX]		√
	ADD [BX],[SI]		× [BI]不能存值
	ADD 1000H,AX 		× 1000H不是存储器
	ADD [SI],BX		√
```

##### 2、进位的加法指令(带进位，影响标志位)

1. 格式：ADC OP目,OP源
2. 功能：OP目 <— OP源+OP目+CF  		置标志位
3. 说明：主要用于多字节运算，多字节运算时低位字节产生的进位应加到高位。影响 CF 标志位
4. 和不带进位的加法指令差不多，只是这个是带进位的加法指令



##### 加1指令

1. 格式：INC OP
2. 功能：OP <— OP+1
3. 说明：常用于修改偏移地址和计数次数。操作数可以是8位或者16位通用寄存器或存储器操作数，不能为立即数(立即数没有存储能力)

```asm
# 例：
	INC AL;		AL <— AL+1		DS:BX+DI -> CPU 在回送过到 BX+DI 去
	INC BYTE PTR [BX+DI];			[BX+DI] <— [BX+DI] + 1
# 判断对错
	INC CL		√
	INC [DX]		× 不能是立即数，先声明类型 —>	INC BYTE PTR [DI]	√
	INC	2000H	× 不能为立即数
```

注意:

1. INC 指令 不影响 CF 标志位，影响标志位 AF、OF、PF、SF 和 ZF
2. 操作数视为无符号数

总结：

​	以上三条指令运算结果将影响状态标志位，但 INC 不影响标志位 CF



#### 2、减法指令 (减法指令跟加法指令对应)

##### 1、不带进位的减法指令(影响标志位)

1. 格式：SUB OP目,OP源

2. 功能：OP <— OP目 减 OP源，并根据结果设置标志位

   ```asm
   # 例：
   	SUB BX,CX;		BX-CX —> BX
   	SUB AL,[SI+2];		AL - (SI+2) 单元中的数 —> AL
   	SUB AL,20;		AL - 20 —> AL
   ```



##### 2、带借位的减法指令(影响标志位)

1. 格式：SBB OP目,OP源

2. 功能：OP目 <— OP目 减 OP源  减 CF ，   根据结果设置标志位

3. 说明：注意用于多字节或多精度数据相减的运算

   ```asm
   # 例：	
   	SBB AX,2030H;				AX - 2030H - CF 给 AX
   	SBB WORD PTR [DI+2],100H;	将 DI+2 和 DI+3 所指两个单元的内容 减 1000H 减 CF，结果存放在 DI+2和DI+3所							   指的单元		
   ```



##### 3、减1指令

1. 格式：DEC OP

2. 功能：OP <— OP-1          根据结果设置标志位，不影响 CF

   ```asm
   # 例：
   	DEC AX;						AX-1 —> AX
   	DEC BL;						BL-1	—> BL
   	DEC BYTE PTR [DI+2];			将 DI+2 所指的单元的内容减1，结果回送给此单元
   ```



#### 3、取补指令(0FFFFH - (OP) + 1)

1. 格式:	NEG	OP

2. 功能： 0FFFFH - (OP) + 1，将操作数取补后送回源操作数 OP 可以是8位或16位通用寄存器和存储器操作数，不能为立即数。

   ```asm
   # 例：
   	NEG AL;			0-AL —> AL
   	MOV AX,1;			AX = 0001H
   	NEG AX;			AX = 0FFFFH
   ```

3. 注意：

   1. 对 80H 或 8000H 取补时，操作数没有变化，但 OF = 1
   2. 对 CF 影响特殊，只要操作数不是 0 ，总是使 CF =1



#### 4、比较指令：不送回结果，只影响标志位，根据 CF 的值进行跳转

1. 若两者相等，相减以后结果为零，ZF标志为1， 否则为0 (大小的比较CMP AX,BX 对无符号数，若结果没有产生借位(CF=0)，则 AX≥BX；若产生了借位（CF＝1），则AX＜BX。 对带符号数，则可根据OF与SF异或运算的结果来判断,结果为1,则AX<BX， 结果为 0 ， 则 AX≥BX
2. 格式：CMP OP目,OP源
3. 功能：OP目 减 OP源，不同送结果，只根据结果置标志位

```asm
# 例
	CMP AX,BX;	AX 减 BX，根据结果置标志位
	CMP AL,20H;	AL 减 20H，根据结果置标志位
```

说明：

​	本指令主要通过比较(相减)结果置标志位，表示两个操作数的关系，指令执行的结果不影响目标操作数。

用途：

​	用于比较两个数的大小，可作为条件转移指令转移的条件



#### 乘法指令(隐含寻址，结果在AX中，考的几率很小)

##### 1、无符号数乘法

1. 格式：MUL OP (只能是存储器或通用寄存器数)
2. 功能：AX <— AL × OP                8位数乘法
3. 高16位 (DX、AX) <— AX × OP    16位数乘法

```asm
#例：
	AL = 0FEH		BL = 0AH
		
     MUL BL
     =0FEH × 0AH
     =254 × 10
     =09ECH
```



##### 带符号数乘法(和无符号数乘法格式相同，结果不同)

1. 格式：IMUL OP

2. 功能：在操作同上，但是操作数为带符号数

   ````asm
   8位乘法							16位乘法
   		AL (8位)					AX(16位)
   	×	操作数(8位)			×	操作数(16位)
   	----------------			----------------
   	(高8位)AH AL(低8位)		(高16位)DX AX(低16位)
   #例：
   	AL = 0FEH		BL = 0AH
              IMUL BL
             = 0FEAH(取真值(-1)×0AH(去真值))
             = -2 × 10
             = -20(转16位补码，放在AX中)
             = -14H
             = -0014H
            	第一种方式：
                  = 1000 0000 0001 0100B(原码)
                  = 1111 1111 1110 1011B(反码)
                  = 1111 1111 1110 1100B(补码)
                  = 0FECH
             第二种方式：
             	10000H - 14H = 0FECH
   ````

   注意：

   1. 进行字节运算时，OP目必须是 AL ，乘积在 AX 中

   2. 进行字运算时，OP目必须是 AX，乘积在DX、AX中，源操作数不允许使用立即数寻址方式

   3. 运算结果只影响CF、OF，其他的无定义

   4. 对于 MUL，若字节型数据相乘之积AH=0或字数据相乘之积DX=0，则CF=OF=0,否则CF=OF=1

      1. 对于无符号数 8位 × 8位 —> 未超出8位表示范围(0-255)，CF=OF=0

      2. 对于有符号数 8位 × 8位 —> 未超出8位表示范围(-128 ~ +127)，CF=OF=0

      3. 对于无符号数 16位 × 16位 —> 未超出16位的表示范围 ( 0 ~ 65535 )，OF = CF = 0

      4. 对于有符号数 16位 × 16位 —> 未超出16位的表示范围 ( -32768 ~ +32767 )，OF = CF = 0

      5. 超出表示范围 OF = CF =1

      6. 结论

         1. 如果8位×8位得出16位，高八位 全为0 就是，OF = CF = 0

         2. 如果是 16位 ×16位 得出 32位，高16位全为0，就是 OF = CF = 0 

         ```asm
         # 例
         	02H × 01H = 002H		CF=0F=0
         	09ECH				CF=OF=1
         ```

   5. （以补码的形式进行存储）对于 IMUL 指令，若字节数据相乘之积，AH或字数据相乘之积 DX 的内容是低一半的符号拓展，则 CF=OF=0，否则 CF=OF=1

      1. 8位 如果超出 -128 ~ +127 OF = CF = 1 , 若没有超出 OF = CF = 0

      2. 16位 如果超出 -32767 ~ +32768  OF = CF = 1 , 若没有超出 OF = CF = 0 


      ```asm
   AX值 = 0FFECH = -20 (16位)   AL值 = OECH = -20 (8位)
   那么CF=OF=0，否则 CF=OF=1
      ```

   6. 8位×8位 —> 8位补码(超出(-128~+127)表示范围) OF = CF = 1 否则 OF = CF = 0

   7. 有符号在内存中是以补码的形式存储

      1. 8位补码 -1 的表示形式 = 0FFH
      2. 16位补码的 -1 的表示形式 = 0FFFFH   两个值相同 

   8位补：

   ​	正 0 ~ +127(00H~7FH)		负 -128 ~ -1(80H~0FFH)

   16位补：

   ​	0000H ~ 007FH = 8位的 00H ~ 7FH

   ​	0FF80H ~ 0FFFFH = 8位的 80H ~ 0FFH

   有无符号：

   ​	8位 × 8位 —> 16位(16位的低8位能不能表示这个结果)，如果能 OF=CF=0	如果不能 OF=CF=1

   16位表示范围

   ​	无符号：

   ​		0 ~ 65536

   ​	有符号：

   ​		-32768 ~ + 32767	

​		8位表示范围

​			无符号：

​				0 ~ 255

​			有符号：

​				-128 ~ +127



#### 除法指令(隐含寻址，考的几率很小)

​	指令要求被除数是除数的双倍字长，即当除数是8位/16位时，要求被除数是16/32位的二进制数。

##### 1、无符号数除法

1. 格式：DIV OP
2. 功能：
   1. 字节除法：AX/OP —> AL = 商，AH=余数
   2. 字除法：(DX(放高位)、AX(放低位))/OP —> AX = 商 ，DX = 余数



##### 2、带符号数除法

1. 格式：IDIV OP
2. 功能：操作用 DIV，但是操作数为带符号数

8位除法：

<img src="/emuImage/8位除法.png" style="zoom:80%;" />

16位除法：

​	<img src="/emuImage/16位除法.png" style="zoom:80%;" />



##### 注意：

1. 当除数是字节时，被除数必须放在 AX 中。
2. 当除数是字时，被除数必须放在 DX、AX中。
3. 商超出规定的范围时，将产生 0 号中断
4. IDIV 运算节结果余数的符号与被除数相同。
5. 带符号数除法运算中，当被除数位数不够时，则需将除数拓展到所需的位数。(8086/8088设有带符号数拓展指令)
6. 除法的商放到 AL 中，余数放到 AH 中，以补码的形式存放。

### 符号拓展指令格式(除法不能8位除8位，所以有字，字节拓展指令)

#### 字节拓展指令(8位—> 16位)，隐含寻址，隐含 AL

1. 格式：CBW
2. 功能：将AL中的数的符号位拓展到 AH
3. 规则：若最高位 = 1，则执行后 AH = FFH，若最高位 = 0，则执行后 AH = 00H

#### 字拓展指令(16—> 32位)，隐含寻址，隐含AX，默认对AX操作

1. 格式：CWD
2. 功能：将AX中的数的符号位拓展到DX
3. 规则：
   1. 若最高位 = 1，则执行后 DX = FFFFH
   2. 若最高位 = 0，则执行后 DX = 0000H
4. 这两条指令不影响标志位。

```asm
# 例：
	MOV AL,44H	正数
	CBW			结果 AX = 0044H
	MOV AX,0AFDEH	负数
	CWD			结果 DX = FFFFH，AX = 0AFDEH
	MOV AL,86H	负数
	CBW			结果 FF86H
```



### 十进制运算调整指令(看看就行，会计算就行)

BCD码：二进制编码的十进制数，又称为二一十进制数

BCD有效码：0000 ~ 1001			无效码：1010 ~ 1111

非组合(非压缩BCD)码：用一字节表示一位十进制的数

组合(压缩)BCD码：用一个字节表示二位十进制数

<img src="/emuImage/组合BCD和非组合BCD码.png" style="zoom:80%;" />

由于BCD码是四位二进制数共有16个编码，BCD码只用其中的10个，其余没有的编码 1010~1111 称为无效码。BCD 码运算结果进入或跳过无效码区时，都会出现错误，为了得到正确的结果，必须进行调整

```asm
# 例： 18+27=45
		0001 1000
	+	0010 0111
	---------------
		0011 1111	 低四位的十进制数大于9
		0000	0110  加6进行调整
	---------------
		0100	0101
```

调整原则：

​	运算结果大于9或D3(D7)向高位有进位(错位)，进行加6(或 减6)调整。

```asm
# 判断顺序
# ① 判断低四位是否大于9，如果大于9，+6进行调整
# ② 判断高四位是否大于9，如果大于9，+6进行调整

# 例：
		1000 0010
	+	0011	1001
	--------------
		1011 1011 ①低四位大于9，加6进行调整
		0000 0110
	--------------
		1100 0001 ②高四位大于9，加6进行调整
		0110	0000
	--------------
(这个1给了CF)10010 0001
```

#### 1、非组合BCD码的加法调整指令(8位表1位)

1. 格式：AAA
2. 对AL中的由两个非组合BCD码相加的和进行调整，结果（非组合BCD码）存于AX中。
3. 调整过程：若AL的低4位大于9或AF=1，则AL←AL+6， AF←1，CF←1，AH←AH+1，清除AL的高四位；否则清除AL的高4位以及AF和CF标志；

```asm
# 例：
	08H
	02H
	---
	0AH 加6调整
	 6H
	---
	 10H  = 00H(必须让高4位为0，CF=1)
```

#### 2、组合BCD码的加法调整指令

1.   格式： DAA
2.   功能：对AL中的由两个组合BCD码相加的和进行调整，将结果（组合BCD码）存于 AL中。
3.   调整过程： 调整方法与AAA类似，只是此指令要分别考虑AL的高4位和低4位。
4.   若AL低4位大于9或AF=1，则AL+6→AL，置AF=1；
5.   若AL高4位大于9或CF=1，则AL+60H→AL，置CF=1
6.   注意：以上两条指令使用时必须紧跟在ADD或ADC之后 。

#### 3、非组合BCD码的减法调整指令

1.  格式： AAS 
2.  功能：对AL中由两个非组合BCD码相减的差进行调整，将结果（非组合BCD码）存于AL中。
3.  调整过程：调整方法与AAA类似，不同的是当AL的低4位表示的数大于9或AF=1时，将AL-6→AL，AH-１→AH，并将AF和CF置1，清除AL的高四位。

#### 4、组合BCD码的减法调整指令

1.  格式： DAS
2.  功能：对AL中由两个组合BCD码相减所得的结果进行调整，并将结果（组合BCD码）存于AL中。
3.  调整过程：调整方法与DAA类似，不同的是当AL的低4位>9或者 AF=1，则AL-6→AL，并置AF=1；而当 AL的高4位大于9或者 CF=1时，则AL-60H → AL，并置CF=1。
4.  注意：使用AAS、DAS指令必须紧跟在减法指令之后。



#### 5、非组合BCD码的乘法调整指令

1. 格式： AAM 
2. 功能：对AX中的由两个非组合BCD码相乘所得的结果进行调整，并将调整后的结果存于AX中。
3. 调整过程：AH←AL/0AH（商），AL←AL%0AH(余数)
4. 注意：本指令必须紧跟在MUL指令之后使用 。

####  6、非组合BCD码的除法调整指令

1. 格式： AAD 
2. 功能：把AX中的两个非组合BCD码进行调整，然后可用DIV指令实现两个非组合BCD码的除法运算
3. 调整过程： AL←10×AH＋AL，AH←0
4. 注意：本指令必须在DIV运算前使用 。

#### 总结： 

- DAA或DAS必须用在ADD（ADC）或SUB（SBB）之后，结果对OF无影响，对其他状态标志位均有影响。
- AAA或AAS必须用在ADD（ADC）或SUB（SBB）之后，结果影响AF和CF，对其他标志位均无意义。
- AAM必须用在MUL之后，结果影响SF、ZF和PF，对AF、CF和OF无影响。
- AAD必须用在DIV之前，结果影响SF、ZF和PF，对AF、CF和OF无影响。



### 逻辑运算指令

 OP源: 8/16位通用寄存器、存储器操作数或立即数  

 OP目: 通用寄存器和存储器操作数。

 除“非”运算外，其余指令都会使OF=CF=0

#### 1、逻辑与运算指令(全1则1，否则为0,位运算)

1. 格式：AND OP目，OP源
2. 功能：对两个操作数按位进行与操作，结果回送OP目。 
3. 说明：该指令常用于截取（或屏蔽）若干位二进制数
4. 例：已知AL＝46H，将AL的低４位保留，高４位屏蔽。     
   1.  AND AL，0FH；AL=06H ，屏蔽高位(高位清0) ，
   2.  取出低位；即对应位为0则清0，    
   3.  对应位为1则不变                     

#### 2、逻辑或运算指令(有1，则1,位运算)

1.  格式：OR　OP目，OP源
2.  功能：对两个操作数进行或运算，结果回送到OP目。
3.  说明：可用于组合某个字，或将某位置1。
    1. 例：MOV AX，8888H；
    2. OR AX，00FFH ；AX=88FFH，将AX的低8位置1，其他位不变。即对应1位置1，对应0位则不变。
    3. 例：将AL中的非组合BCD码转换成ASCⅡ码。
    4. OR  AL，30H

#### 3、逻辑异或运算指令(相同，则1，否则为0,位运算)

1. 格式：XOR　OP目，OP源

2. 功能：对两个操作数进行异或运算，结果回送到OP目。

3. 说明：用于对某个二进制数按位取反或对某寄存器清0。

   1. 例： XOR  AL，0FFH ;  AL数据按位求反 
   2. 例:  MOV  AX, 3333H
          XOR  AX, 00FFH ; 
   3. 结果：AX=33CCH， AH数据保持不变，对AL数据求反。
   4. 即对应0不变,对应1求反 。                      

   ```asm
   # 例：寄存器清0（有4条指令可达到AX清0目的）：
       XOR   AL，AL;      AL清0	CF=0
       MOV  AX，0		不影响 CF
       SUB  AX，AX		CF=0
       AND  AX，0    	CF=0
   ```

#### 4、逻辑非运算指令(取反,位运算)

1.  格式：NOT　OP
2.  功能：对操作数逐位取反后回送到原处。
3.  例： MOV AX，1
    1.  NOT  AX     ；AX=0FFFEH
4.  注意：
    1. 该指令只是执行求反操作，而不是求反码指令，对符号位也求反。
    2. 不影响标志位。

#### 5、测试指令(与运算，不会送结果)

1. 格式：TEST　OP目，OP源
2. 功能：将OP目与OP源进行与运算，不回送结果，只根据结果置标志位。
3. 说明：主要用来检测目的操作数的某些位是1或0,根据测试结果,决定转向
   1. 例：测试AX中的D15位是1还是0
      1. TEST  AX，8000H；若D15为1，ZF=0，否则ZF=1
4. 总结：
   1. AND OR  XOR TEST均影响标志，CF=0，OF=0，而PF，SF，ZF由结果而定，AF无意义。此类指令可用来清CF，常用于拆字，拼字。
   2. NOT 不影响标志。

```asm
# 例:   将BX的高四位与CX的低四位,AX的中间8位反码,拼成新字送至AX
	如:  
	AX=AAAAH         BX=BBBBH  CX=CCCCH	=> AX=B55CH
	
	AND  BH，0F0H        ; 取BX高四位，BH=B0H
     AND  CL，0FH          ; 取CL低四位， CL=0CH
     AND  AX，0FF0H     ; 取AX中间八位，AX=0AA0H
     XOR  AX，0FF0H     ; 求反  AX=0550H
     OR     AH，BH        
     OR     AL，CL          ;  拼字  AX=B55CH
```



### 移位指令

<img src="/emuImage/移位操作.png" style="zoom: 67%;" />

规定：

​	移动一位时由指令中的计数值直接给出，移动两位及以上，则移位次数由 CL 指令，即必须将移位位数 N 事先装入 CL 中。



#### 1、非循环移位指令

<img src="/emuImage/image-20230924142302666.png" alt="image-20230924142302666" style="zoom:80%;" />

- 算术左移与逻辑左移相同，可用于无符号数乘2操作。
- 逻辑右移可用于无符号数除2操作。
- 算术右移可以用于有符号数除2操作。
- 左移进 CF 表示进位，右移进 CF 表示余数
- 左移位可以判定 AX 有中 " 1 " 的个数

```asm
# 逻辑左移
	AL = 1001 0001B
	SHL AL,1  = 0010 0010B CF=1
# 算术左移
	AL = 1001 0001B
	SAL AL,1  = 0010 0010B CF=1
# 逻辑右移
	AL = 1001 0001B
	SHR AL,1  = 0100 1000B CF=1
# 算术右移
	AL = 1001 0001B
	SAR AL,1  = 1100 1000B CF=1
# 算术逻辑移位指令是双操作数指令，操作数可以是除立即数之外的任何寻址方式；当计数值大于1时,必须使用CL作计数器。
例：		MOV   BX， FFFCH
           SAR     BX，1
           结果：  BX=FFFEH，BX由-4变为-2。
           
例:  		MOV  BL，0CH  ；BL=12
           SHL    BL,    1      ;    BL=24 
```



#### 2、循环移位指令

<img src="/emuImage/image-20230924142650976.png" alt="image-20230924142650976" style="zoom: 67%;" />

```asm
# 循环左移,ROL OP目,OP源
	AL = 1001 0001B
	ROL AL,1  = 0010 0011B CF=1
# 循环右移,ROR OP目,OP源
	AL = 1001 0001B
	ROR AL,1  = 1100 1000B CF=1
# 带进位循环左移(带CF一起玩)
	AL = 1001 0001B
	RCL AL,1  = 0010 0010B CF=1
# 带进位循环右移(带CF一起玩)	
	AL = 1001 0001B
	RCR AL,1  = 0100 1000B CF=1
```

注意：

​	当计数值大于1时,必须使用CL作计数器。



### 字符串操作指令(不太重要)：隐含寻址

   串操作指令实现对一串字符或数据的操作，分为基本串操作指令和重复前缀指令。基本串操作指令每执行一次只能处理一个数据，与重复前缀指令结合可以处理一串数据。

串操作有如下共同点：

1. 源串一般存放在数据段(DS)，偏移地址由SI指定， 目标串在附加段(ES)，偏移地址由DI指定。
2. 每执行一次串操作后自动修改指针SI、DI。若方向标志DF=0，则每次操作后SI和DI自动加1(或加2)；若DF=1，则每次操作后SI和DI自动减1(或减2)修改。
3. 串长(字或字节个数)存放在CX中。 

注意：在执行指令前必须DS、ES、SI、DI、DF、CX置好需要的值，它们是串操作指令的隐含操作数。

#### **1、字符串串操作指令**

字符串传送指令 

1. 格式： MOVS OP目，OP源
   1. MOVSB——字节传送		
   2. MOVSW——字传送
      1. [DS:SI] 传送到 [ES:DI] 如果是字节就传送 1个字节，如果是字，还需要 [DS:SI+1/SI-1] 传送给 [ES:DI+1/DI-1]，加1减1有 DF 决定
2. 功能：把位于数据段由SI指定的内存单元的字节/字数据传送到附加段由DI指定的内存单元，指令不影响状态标志位。
3. 过程：
   1. [DI](ES:DI)←[SI](DS:SI) 若DF=0 SI←SI+1/2，DI←DI+1/2
   2. [DI](ES:DI)←[SI](DS:SI) 若DF=1 SI←SI - 1/2，DI←DI-1/2
4. 说明：串传送指令常与无条件重复前缀连用



#### 2、字符串比较指令

1. 格式：
   1. CMPS  OP目，OP源 
   2. CMPSB  ——字节比较
   3. CMPSW ——字比较
2. 功能：把位于数据段由SI指定的字节/字数据与附加段由DI指定的字节/字数据进行比较，结果不保存，但影响状态标志位，并由DF状态决定SI、DI的修改方向。
3. 过程：[SI] -[DI]  SI←SI±1/2，DI←DI±1/2
4. 说明：串比较指令常与条件重复前缀连用，指令的执行不改变操作数，仅影响标志位。



#### 3、字符串搜索指令 

1. 格式：  
   1. SCAS  OP
   2. SCASB
   3. SCASW
2. 功能: 把AL/AX中的内容与附加段由DI指定的一个字节/字数据进行比较，结果不保存，但影响状态标志位，并由DF状态决定DI的修改方向。
3. 过程：
   1. 字节——AL-[DI]，DI←DI±1
   2. 字——AX-[DI]，DI←DI±2

#### 4、取字符串指令 

1. 格式：
   1. LODSB  ——AL←[SI]，SI←SI±1
   2. LODSW ——AX←[SI]，SI←SI±2
2. 功能：把位于数据段由SI指定内存单元的内容取到AL或AX中，并修改SI的内容，指向下一字节/字单元。

#### 5、存字符串指令

1. 格式：
   1. STOSB ——[DI]←AL，DI←DI±1
   2. STOSW ——[DI]←AX，DI←DI±2
2. 功能: 把寄存器AL或AX中的内容存到附加段由DI指定的内存单元，并修改DI的内容，指向下一字节/字的存放单元。

### 重复前缀指令(经常考)

​    基本串操作指令每执行一次只能处理一个数据，与重复前缀指令结合可以处理一串数据。

1. 无条件重复(REP)：CX ≠ 0 退出，若 CX ≠ 0，则 CX ← CX-1 继续重复操作，直到 CX = 0 为止
2. 相等/为0重复(REPE/REPZ)：若 CX ≠ 0 且 ZF = 1，则 CX ← CX -1 继续重复操作，直到 CX = 0 或 ZF = 0 为止(退出)
3. 不相等/不为0重复(REPNE/REPNZ)：若 CX ≠ 0 且 ZF = 0，则 CX ← CX-1 继续重复操作，直到 CX = 0 或 ZF = 1 为止。

注意：

- 重复前缀指令不能单独使用，其后必须跟基本串操作指令，控制基本串操作指令重复执行，其执行过程相当于一个循环程序的运行。在每次重复之后，地址指针 SI 和 DI 都被修改，但指令指针 IP 仍保持指向带有前缀的串操作指令的地址。
- 重复执行的次数由数据串长度决定，数据串长度应预置在寄存器 CX 中。
- 执行重复前缀指令不影响标志位。
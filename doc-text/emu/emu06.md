# **汇编语言程序的结构**

一个标准的汇编语言源程序的框架结构：

 ```asm
# 数据段
DATA  SEGMENT BYTE;默认任意存放
      ┇	    WORD;从偶地址开始存放
      ┇       PAPA;从64字节开始存放
      ┇	    PAGE;从256字节开始存放
DATA  ENDS

#堆栈段
STACK SEGMENT  PARA  STACK ‘STACK’；
                ┇							 
STACK  ENDS
#定义代码段
CODE SEGMENT				
   ASSUME  CS:CODE，SS:STACK，DS:DATA，ES: DATA
#设置数据
START: MOV   AX，DATA
	  MOV   DS，AX
       MOV   ES，AX
       MOV AX，STACK 
       MOV SS，AX					      
          ┇
       MOV AH，4CH
       INT  21H
PRA PROC NEAR						   
PRA ENDP
 ┇	
CODE  ENDS						                
END START
 ```



## DOS系统功能调用

   MS-DOS系统中设置了几十个内部子程序，在汇编语言源程序中可采用软中断指令调用它们。 MS-DOS中常用的软中断有8条，系统规定它们的中断类型码为20H—27H， INT 21H是DOS系统功能调用。

  INT 21H中断本身包含很多子程序，调用它们时采用统一的格式：

1. 传送入口参数到指定寄存器中
2. 功能号送入AH寄存器
3. INT 21H

### 1、键盘输入单字符——1号系统功能调用（返回值在 AL中）

  格式：MOV AH，1

​        INT  21H

 功能：无入口参数，执行时，系统等待键盘输入，待按下任何一键，系统先检查是否是Ctrl—Break键。若是则退出，否则将键入值置入AL中，并在屏幕上显示该字符。

### 2、输出单字符——2号系统功能调用（显示放在 DL 寄存器）

 格式： MOV DL，‘A’

   MOV AH，2

   INT  21H 

功能：将DL中的字符送屏幕显示。

### 3、键盘输入字符串——0AH号系统功能调用

功能：将键盘输入的字符串写入到内存缓冲区中，必须事先定义一个缓冲区。

​	缓冲区的第一个字节：该缓冲区存放的字节数。

​     第二个字节：预留，系统填写实际的字符数。

​    从第三个开始：存放字符串，回车（0DH）表示结束。

格式：     

```asm
	┇
BUF DB  20 ; 预留长度
DB  ？	; 实际输入长度
DB  20 DUP（？）	; 真正存的位置
	   ┇ 
MOV DX，OFFSET BUF
MOV AH，0AH
INT 21H 
```

### 4、输出字符串——9号系统功能调用

 功能：将指定的内存缓冲区中的字符串在屏幕上显示出来，缓冲区的字符串以“$”为结束标志。

  格式：

```asm
BUF DB  ‘GOOD BYE$’
             ┇
MOV  DX，OFFSET BUF
MOV  AH，9
INT  21H
结果：显示GOOD BYE
```

### 5、  返回操作系统——4CH号系统功能调用

格式：  MOV AH，4CH

​    INT  21H

```asm
DATA SEGMENT             ; 定义数据段
   SHORT DB "YES$"       ; 定义正确显示数据
   SHORT1 DB "NO$"       ; 定义失败显示数据
DATA ENDS                ; 代码段结束
CODE SEGMENT             ; 定义 代码段
    ASSUME DS:CODE,CS:DATA   ; 链接代码段和数据段
START:                       ; 开始
    MOV AX,DATA              ; 装载 数据段
    MOV DS,AX                ; 送入代码段
    
    MOV AH,1                 ; 定义键盘输入的数据，如果是 Ctrl+Break 程序退出
    INT 21H                  ; 执行21H(软中断),程序退出
    
    CMP AL,'1'               ; 比较是否为1，1 对应的 ASCII 码值是 31H ，所以放到低八位
    JZ SO                    ; 如果输入的为 1 跳转到 SO
    MOV DX,OFFSET SHORT1     ; 如果不为 1 继续执行，把 SHOTR1 的偏移地址给 DX
    MOV AH,9                 ; 显示 SHOTR1 的字符
    INT 21H                  ; 调用 21H(软中断),程序退出
    JMP EXITO                ; 跳转到 EXTIO 代码段

SO:                          ; 定义 SO
   MOV DX,OFFSET SHORT       ; 把 SHORT 的偏移地址给 DX
   MOV AH,9                  ; 显示字符
   INT 21H                   ; 调用软中断
   
EXITO:
    MOV AH,4CH               ; 返回操作系统
    INT 21H                  ; 执行21H(软中断),程序退出
                                    
CODE ENDS                    ; 代码段结束
END START                    ; START 结束
```



# 
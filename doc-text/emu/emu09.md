
# 存储器地址分配及译码

1. 存储器地址分配在进行存储器与CPU连接前，首先要确定内存容量的大小和选择存储器芯片的容量大小。

2. 存储器地址译码

## 译码就是选中芯片的过程

或门：≥1，全0出0，有1出1

与们：&，全1出1，有0出0

## 常用的译码电路

一种常见的3∶8译码器74LS138，包含3个输入端，8个输出端，3个使能端

<img src="/emuImage/image-20230928162638794.png" alt="image-20230928162638794" style="zoom:80%;" />



## 两种译码方式

下面介绍外部译码电路的两种译码方法。(可能考)

1. 线性选择法

​    直接用CPU地址总线中某一高位线作为存储器芯片的片选信号，简称为线选法。

优点：连接简单，片选信号的产生不需复杂的逻辑电路。

缺点：

​		(1) 当采用线选法时，高位地址未全部用完、而又没有对其实施控制时，会出现地址的不连续和多义性。

​        (2)即使所有的高位地址线都用作线选，其能寻址的存储空间也十分有限。

2. 全译码法

​    将高位地址全部作为译码器的输入，用译码器的输出作为片选信号。

​    在这种方法中，低位地址线用作字选，与芯片的地址输入端直接相连；高位地址线全部连接进译码电路，用来生成片选信号。这样，所有的地址线均参与片内或片外的地址译码，不会产生地址的多义性和不连续性。在全译码方式中，译码电路的核心常用一块译码器充当，例如74LS138等。


# App的工程结构

本节介绍App工程的基本结构及其常用配置，首先描述项目和模块的区别，以及工程内部各目录与配置 文件的用途说明；其次阐述两种级别的编译配置文件build.gradle，以及它们内部的配置信息说明；再次 讲述运行配置文件AndroidManifest.xml的节点信息及其属性说明。

## App工程目录结构

App工程分为两个层次，第一个层次是项目，依次选择菜单File→New→New Project即可创建新项目。 另一个层次是模块，模块依附于项目，每个项目至少有一个模块，也能拥有多个模块，依次选择菜单 File→New→New Module即可在当前项目创建新模块。一般所言的“编译运行App”，指的是运行某个模 块，而非运行某个项目，因为模块才对应实际的App。单击Android Studio左上角竖排的Project标签， 可见App工程的项目结构如图2-12所示。

![image-20230726103617410](/androidImages/image-20230726103617410.png)



从图2-12中看到，该项目下面有两个分类：一个是app（代表app模块）；另一个是Gradle Scripts。其 中，app下面又有3个子目录，其功能说明如下： 

1. manifests子目录，下面只有一个XML文件，即AndroidManifest.xml，它是App的运行配置文 件。 
2. java子目录，下面有3个com.example.myapp包，其中第一个包存放当前模块的Java源代码，后 面两个包存放测试用的Java代码。 
3. res子目录，存放当前模块的资源文件。res下面又有4个子目录：

 drawable目录存放图形描述文件与图片文件。 

layout目录存放App页面的布局文件。 

mipmap目录存放App的启动图标。 

values目录存放一些常量定义文件，例如字符串常量strings.xml、像素常量dimens.xml、颜色常 量colors.xml、样式风格定义styles.xml等。 

Gradle Scripts下面主要是工程的编译配置文件，主要有： 

（1）build.gradle，该文件分为项目级与模块级两种，用于描述App工程的编译规则。 

（2）proguard-rules.pro，该文件用于描述Java代码的混淆规则。 

（3）gradle.properties，该文件用于配置编译工程的命令行参数，一般无须改动。 

（4）settings.gradle，该文件配置了需要编译哪些模块。初始内容为include ':app'，表示只编译app模 块。 

（5）local.properties，项目的本地配置文件，它在工程编译时自动生成，用于描述开发者电脑的环境 配置，包括SDK的本地路径、NDK的本地路径等。


## 编译配置文件build.gradle



新创建的App项目默认有两个build.gradle，一个是Project项目级别的build.gradle；另一个是Module 模块级别的build.gradle。 

项目级别的build.gradle指定了当前项目的总体编译规则，打开该文件在buildscript下面找到 repositories和dependencies两个节点，其中repositories节点用于设置Android Studio插件的网络仓 库地址，而dependencies节点用于设置gradle插件的版本号。由于官方的谷歌仓库位于国外，下载速度 相对较慢，因此可在repositories节点添加阿里云的仓库地址，方便国内开发者下载相关插件。修改之后 的buildscript节点内容如下所示：

```xml
buildscript {
     repositories {
          // 以下四行添加阿里云的仓库地址，方便国内开发者下载相关插件
          maven { url 'https://maven.aliyun.com/repository/jcenter' }
          maven { url 'https://maven.aliyun.com/repository/google'}
          maven { url 'https://maven.aliyun.com/repository/gradle-plugin'}
          maven { url 'https://maven.aliyun.com/repository/public'}
          google()
          jcenter()
     }
     dependencies {
          // 配置gradle插件版本，下面的版本号就是Android Studio的版本号
          classpath 'com.android.tools.build:gradle:4.1.0'
     }
}
```

然后打开测试界面的XML布局文件activity_custom_button.xml，添加如下所示的自定义控件节点 CustomButton：

模块级别的build.gradle对应于具体模块，每个模块都有自己的build.gradle，它指定了当前模块的详细 编译规则。下面给chapter02模块的build.gradle补充文字注释，方便读者更好地理解每个参数的用途。

```xml
android {
	// 指定编译用的SDK版本号。比如30表示使用Android 11.0编译
	compileSdkVersion 30
     // 指定编译工具的版本号。这里的头两位数字必须与compileSdkVersion保持一致，具体的版本号可
     在sdk安装目录的“sdk\build-tools”下找到
	buildToolsVersion "30.0.3"
     defaultConfig {
     	// 指定该模块的应用编号，也就是App的包名
     	applicationId "com.example.chapter02"
          // 指定App适合运行的最小SDK版本号。比如19表示至少要在Android 4.4上运行
          minSdkVersion 19
          // 指定目标设备的SDK版本号。表示App最希望在哪个版本的Android上运行
          targetSdkVersion 30
          // 指定App的应用版本号
          versionCode 1
          // 指定App的应用版本名称
          versionName "1.0"
          testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
      }
     buildTypes {
     	release {
          	minifyEnabled false
			proguardFiles getDefaultProguardFile('proguard-androidoptimize.txt'), 'proguard-rules.pro'
		}
	}
}
// 指定App编译的依赖信息
dependencies {
     // 指定引用jar包的路径
     implementation fileTree(dir: 'libs', include: ['*.jar'])
     // 指定编译Android的高版本支持库。如AppCompatActivity必须指定编译appcompat库
     //appcompat库各版本见
     https://mvnrepository.com/artifact/androidx.appcompat/appcompat
     implementation 'androidx.appcompat:appcompat:1.2.0'
     // 指定单元测试编译用的junit版本号
     testImplementation 'junit:junit:4.13'
     androidTestImplementation 'androidx.test.ext:junit:1.1.2'
     androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
}
```

<div style="page-break-after: always;"></div>

为啥这两种编译配置文件的扩展名都是Gradle呢？这是因为它们采用了Gradle工具完成编译构建操作。 Gradle工具的版本配置在gradle\wrapper\gradle-wrapper.properties，也可以依次选择菜单 File→Project Structure→Project，在弹出的设置页面中修改Gradle Version。注意每个版本的Android Studio都有对应的Gradle版本，只有二者的版本正确对应，App工程才能成功编译。比如Android Studio 4.1对应的Gradle版本为6.5，更多的版本对应关系见[https://developer.android.google.cn/studi o/releases/gradle-plugin#updating-plugin](https://developer.android.google.cn/studi o/releases/gradle-plugin#updating-plugin)。

<div style="page-break-after: always;"></div>

## 运行配置文件AndroidManifest.xml



AndroidManifest.xml指定了App的运行配置信息，它是一个XML描述文件，初始内容如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.example.chapter02">
     
     <application
     android:allowBackup="true"
     android:icon="@mipmap/ic_launcher"
     android:label="@string/app_name"
     android:roundIcon="@mipmap/ic_launcher_round"
     android:supportsRtl="true"
     android:theme="@style/AppTheme">
          
          <activity android:name=".Main2Activity"></activity>
          <!-- activity节点指定了该App拥有的活动页面信息，其中拥有
          android.intent.action.MAIN的activity说明它是入口页面 -->
               <activity android:name=".MainActivity">
               <intent-filter>
                    <action android:name="android.intent.action.MAIN" />
                    <category android:name="android.intent.category.LAUNCHER" />
               </intent-filter>
          </activity>
          
     </application>
     
</manifest>
```



可见AndroidManifest.xml的根节点为manifest，它的package属性指定了该App的包名。manifest下 面有个application节点，它的各属性说明如下：



- android:allowBackup，是否允许应用备份。允许用户备份系统应用和第三方应用的apk安装包和 应用数据，以便在刷机或者数据丢失后恢复应用，用户即可通过adb backup和adb restore来进行 对应用数据的备份和恢复。为true表示允许，为false则表示不允许。 

- android:icon，指定App在手机屏幕上显示的图标。 

- android:label，指定App在手机屏幕上显示的名称。 

- android:roundIcon，指定App的圆角图标。 

- android:supportsRtl，是否支持阿拉伯语／波斯语这种从右往左的文字排列顺序。为true表示支 持，为false则表示不支持。 

- android:theme，指定App的显示风格。

  

注意到application下面还有个activity节点，它是活动页面的注册声明，只有在AndroidManifest.xml中 正确配置了activity节点，才能在运行时访问对应的活动页面。初始配置的MainActivity正是App的默认 主页，之所以说该页面是App主页，是因为它的activity节点内部还配置了以下的过滤信息：

```xml
<intent-filter>
	<action android:name="android.intent.action.MAIN" />
	<category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```



其中action节点设置的android.intent.action.MAIN表示该页面是App的入口页面，启动App时会最先打 开该页面。而category节点设置的android.intent.category.LAUNCHER决定了是否在手机屏幕上显示 App图标，如果同时有两个activity节点内部都设置了android.intent.category.LAUNCHER，那么桌面就 会显示两个App图标。以上的两种节点规则可能一开始不太好理解，读者只需记住默认主页必须同时配 置这两种过滤规则即可。


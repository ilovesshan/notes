# Android基础

## Android版本记录

| Android Version | Name        | API Level |
| --------------- | ----------- | --------- |
| Android 13      | T           | 33        |
| Android 12L     | S           | 32        |
| Android 12.0    | S           | 31        |
| Android 11.0    | R           | 30        |
| Android 10.0    | Q           | 29        |
| Android 9.0     | Pie         | 28        |
| Android 8.1     | Orea        | 27        |
| Android 8.0     | Orea        | 26        |
| Android 7.1.1   | Nougat      | 25        |
| Android 7.0     | Nougat      | 24        |
| Android 6.0     | MarshMallow | 23        |
| Android 5.1     | Lollipop    | 22        |
| Android 5.0     | Lollipop    | 21        |
| Android 4.4W    | KitKat Wera | 20        |
| Android 4.4     | KitKat      | 19        |



## Android各种单位解释

### 1、Px (Pixel像素) 

`px` 也称为图像元素，是作为图像构成的基本单元，单个像素的大小并不固定，跟随屏幕大小和像素数量的关系变化（屏幕越大，像素越低，单个像素越大，反之亦然）。所以在使用像素作为设计单位时，在不同的设备上可能会有缩放或拉伸的情况。

### 2、Resolution(分辨率)

指屏幕的垂直和水平方向的像素数量，如果分辨率是 1920*1080 ，那就是垂直方向有 1920 个像素，水平方向有 1080 个像素。

### 3、Dpi(像素密度)

指屏幕上每英寸（1英寸 = 2.54 厘米）上有多少个像素点。如果屏幕为 320*240，屏幕长 2 英寸宽 1.5 英寸，Dpi = 320 / 2 = 240 / 1.5 = 160。

### 4、Density(密度)

指屏幕上每平方英寸（2.54 ^ 2 平方厘米）中含有的像素点数量。

### 5、Dip / dp (设备独立像素)

也可以叫做dp，长度单位，同一个单位在不同的设备上有不同的显示效果，具体效果根据设备的密度有关。

通过以上代码获取系统提供的屏幕信息

```java
DisplayMetrics metrics = new DisplayMetrics();
getWindowManager().getDefaultDisplay().getMetrics(metrics);
```

Android系统自带dp转px的方法

```java
public static float dp2px(float dp) {
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().getDisplayMetrics());
}
```

```java
public class ScreenUtil {
    public static int dip2px(Context context, double dipValue) {
        // density 1个dip对应多少px
        float density = context.getResources().getDisplayMetrics().density;
        return (int) (dipValue * density + 0.5);
    }
}
```



## Android常用控件

### 1、常用布局控件

#### 线性布局( LinearLayout)

#### 相对布局(RelativeLayout)

+ 相对于父控件
  + `android:layout_alignParentTop`   控件的顶部与父控件的顶部对齐。
  + `android:layout_alignParentBottom`  控件的底部与父控件的底部对齐。
  + `android:layout_alignParentLeft`  控件的左部与父控件的左部对齐。
  + `android:layout_alignParentRight`  控件的右部与父控件的右部对齐。
+ 相对给定`Id`控件
  + `android:layout_above` 控件的底部置于给定ID的控件之上。
  + `android:layout_below`  控件的底部置于给定ID的控件之下。
  + `android:layout_toLeftOf`  控件的右边缘与给定ID的控件左边缘对齐。
  + `android:layout_toRightOf`  控件的左边缘与给定ID的控件右边缘对齐。
  + `android:layout_alignBaseline`  控件的baseline与给定ID的baseline对齐。
  + `android:layout_alignTop`    控件的顶部边缘与给定ID的顶部边缘对齐。
  + `android:layout_alignBottom`   控件的底部边缘与给定ID的底部边缘对齐。
  + `android:layout_alignLeft`   控件的左边缘与给定ID的左边缘对齐。
  + `android:layout_alignRight`   控件的右边缘与给定ID的右边缘对齐。
+ 居中
  + `android:layout_centerHorizontal` 水平居中。
  + `android:layout_centerVertical`  垂直居中。
  + `android:layout_centerInParent` 父控件的中央。

#### 绝对布局(AbsoluteLayout)

#### 网格布局( GridLayout)

#### 帧布局( FrameLayout)

#### 约束布局( ConstraintLayout)

### 2、 布局控件思考问题

#### `layout_gravity` 和 `gravity`

+ `layout_gravity` 是当前控件针对于父控件的对齐方式。
+ `gravity` 是子控件针对于当前控件的对齐方式。

#### `layout_margin` 和 `padding` 

+ `layout_margin` 指该控件边框距离父控件的边距。
+  `padding` 指该控件内部内容距离该控件的边距。

### 3、基础控件

#### TextView

文本展示控件



#### Button

按钮控件

`Button` 和 `TextView`区别：

+ `Button` 是 `TextView`的派生类、`Button` 默认文字全部大写，居中对齐，有背景色。

+ `TextView` 文字原样显示，默认左对齐，无背景色。

`Button`添加事件监听

+ `OnClickListener` 被点击时触发该事件。

+ `OnLongClickListener`， 按住`500ms`触发该事件。

  ```java
  // 这里涉及到事件传播的问题
  // 当处理事件的返回值为false时表示该事件未完全处理完毕，事件会继续向下传播。
  // 返回值改为true即可过滤掉单击事件
  btn.setOnLongClickListener(v -> false);
  ```

  

+ 通过时间来判定是否是双击事件。

  ```java
  btn.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
          //获取系统当前毫秒数，从开机到现在的毫秒数(手机睡眠时间不包括在内)
          long currentTimeMillis = SystemClock.uptimeMillis();
          //两次点击间隔时间小于300ms代表双击
          if (currentTimeMillis - lastClickTime < CLICK_INTERVAL_TIME) {
              Log.d("btn listener:", "btn is doubleClicked!");
              return;
          }
          lastClickTime = currentTimeMillis;
          Log.d("btn listener:", "btn is clicked!");
      }
  });
  ```

  

#### ImageView

图像视图，用于展示图片的控件。

绘制圆形的ImageView，推荐两个github的开源项目，当前也可以自定义`view`实现：

+ [RoundedImageView](https://github.com/vinc3m1/RoundedImageView)
+ [CircleImageView](https://github.com/hdodenhof/CircleImageView)

src属性和background属性的区别：

+ background通常指的都是背景，而src指的是内容。

+ 当使用 `src` 填入图片时，是按照图片大小直接填充,并不会进行拉伸，而使用`background`填入图片，则是会根据ImageView给定的宽度来进行拉伸

  

解决blackground拉伸导致图片变形的方法：

+ 这个适用于动态加载ImageView，只要在添加View的时候,把大小写写死就可以了。

  ```java
  LinearLayout.LayoutParams layoutParam = new LinearLayout.LayoutParams(48, 48);    
  layout.addView(ibtnPen, layoutParam); 
  ```

  

scaleType设置缩放类型

+ `fitXY`: 对图像的横向与纵向进行独立缩放,使得该图片完全适应ImageView,但是图片的横纵比可能会发生改变。

+ `fitStart`: 保持纵横比缩放图片,知道较长的边与Image的编程相等,缩放完成后将图片放在ImageView的左上角。

+ `fitCenter`: 同上,缩放后放于中间。

+ `fitEnd`: 同上,缩放后放于右下角。

+ `center`: 保持原图的大小，显示在ImageView的中心。当原图的size大于ImageView的size，超过部分裁剪处理。

+ `centerCrop`: 保持横纵比缩放图片,知道完全覆盖ImageView,可能会出现图片的显示不完全。

+ `centerInside`: 保持横纵比缩放图片,直到ImageView能够完全地显示图片。

+ `matrix`: 默认值，不改变原图的大小，从ImageView的左上角开始绘制原图， 原图超过ImageView的部分作裁剪处理。

  

#### ImageButton

`ImageButton`也是一个按钮，但与`Button`不同的是，`Button`显示的是文字，`ImageButton`显示的是图片。

`ImageButton`和`Button`拥有同样的事件处理机制。

`ImageButton`不同状态样式， 我们需要根据按钮的不同状态改变按钮不同的样式，比如：按钮默认样式、按压时的样式、以及按钮选中时的样式等等。图片按钮也可以设置在不同状态下的不同图片展示。

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <!--按钮的默认状态-->
    <item android:state_window_focused="false" android:drawable="@drawable/winter">
    </item>

    <!--按下时的按钮状态-->
    <item android:state_pressed="true" android:drawable="@drawable/winter_pressed">
    </item>

    <!--选中时的按钮状态-->
    <item android:state_selected="true" android:drawable="@drawable/winter_selected">
    </item>
</selector>
```



#### ScrollView

纵向滚动



#### HorizontalScrollView

横向滚动



## Activity 组件

### 1、Activity 状态和生命周期

#### Activity三种状态

+ `active`: 当 `activity` 运行在屏幕的前台(当前 `activity`处于页面活动栈的最顶端 )，此时它可以获取页面焦点和响应用户操作，同一个时刻只会有一个`Activity`处于活动(`Active`)。
+ `paused`: 当`Activity`失去焦点但仍对用户可见(如在它之上有另一个透明的`Activity`或`Toast`、`AlertDialog`等弹出窗口时)它处于暂停状态。暂停的`Activity`仍然是存活状态，但是当系统内存极小时可以被系统杀掉。
+ `stoped`： 完全被另一个`Activity`遮挡时处于停止状态，它仍然在内存中保留着所有的状态和成员信息。只是对用户不可见，当其他地方需要内存时它往往被系统杀掉。

#### Activity 生命周期

+ `onCreate`：当`Activity`被实例化时系统会调用，整个生命周期只会执行一次，在 `onCreate`中通常做一些初始化工作，例如：为 `Activity` 设置布局文件，为按钮设置事件监听等。
+ `onStart`：当 `Activity` 可见，未获得用户焦点不能交互时调用。
+ `onRestart`：当`Activity`已经停止，重新启动时系统会调用。
+ `onResume`：当 `Activity` 可见，已获得用户焦点能交互时调用。
+ `onPause`：当 `Activity` 可见不可交互时调用。通常做一些存储持久数据，关闭动画，定时器等操作。
+ `onStop`：当 `Activity` 被新的 `Acticity`完全覆盖不可见时调用。
+ `onDestroy`：当`Activity`(用户调用`finish`或系统由于内存不足)被系统销毁杀掉时系统调用，（整个生命周期只调用1次）用来释放`onCreate`方法中创建的资源，如结束线程等。

### 2、Activity 启动模式

#### 五种启动模式

+ `standard`: 标准模式，`Activity`默认启动模式，每次启动`Activity`都会在当前Task中创建一个Activity的新的实例。

  `ActivityA -> ActivityB`，`ActivityB`处于栈顶，`ActivityB -> ActivityB`，`ActivityB`处于栈顶，此时栈中：`ActivityB / ActivityB / ActivityA`。

  

+ `singTop`：栈顶复用模式，如果当前栈中已经存在该 `Activity` 但是未位于栈顶，则重新创建一个实例，如果已经位于栈顶，则不创建新的实例。

  `ActivityA -> ActivityB`，`ActivityB`处于栈顶，`ActivityB -> ActivityB`，`ActivityB`处于栈顶，此时栈中：`ActivityB / ActivityA`。

  

+ `singTask`：栈内复用模式，如果当前栈中已经存在该 `Activity` 并且位于栈顶则不创建新的实例。如果位于栈中那么清空该 `Activity`上的所有`Activity`。

+ `ActivityA -> ActivityB`，`ActivityB`处于栈顶，`ActivityB -> ActivityA`，`ActivityA`处于栈顶，此时栈中：`ActivityA`。

  

+ `singleInstance`：拥有 `singTask`的全部特性，区别是：`singleInstance`模式下的 `Activity`会单独占用一个 Task，具有全局的唯一性，由于栈内的复用模式，后续请求均不会创建新的 `Activity`，除非 `Activity`被销毁了。

  

+ `singleInstancePerTask`

####  Intent 标记

+ `FLAG_ACTIVITY_NEW_TASK`：和`launchMode = standard`产生的行为相同。
+ `FLAG_ACTIVITY_SNGLE_TOP`：和`launchMode = singTop`产生的行为相同。
+ `FLAG_ACTIVITY_CLEAR_TOP`：和`launchMode = singTask`产生的行为相同。

`FLAG_ACTIVITY_CLEAR_TOP` 最常与 `FLAG_ACTIVITY_NEW_TASK` 结合使用。将这两个标记结合使用，可以查找其他任务中的现有 Activity，并将其置于能够响应 intent 的位置。

```java
// 以下情况可以适用于：登录界面跳转到首页、退出登录功能
Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
startActivity(intent);
```



#### 五种启动模式总结

`standard`：可以创建无数个`Activity`实例。

`singleTop`：如果当前Task的top如果已经是正在启动的这个Activity，那就不要重复启动。

`singleTask`：这个Activity只能有一个，且作为它所在的Task的root Activity。

`singleInstance`：这个`Activity`只能有一个，且它所在的Task也只能有它这一个Activity。



### 3、Intent 意图

intent是一个消息传递对象，主要用作与组件之间传递消息，但是常见的使用用例主要包含三种：

+ 启动 Activity
+ 启动 广播
+ 启动 服务

#### 显示Intent和隐式Intent

显示Intent相对来说比较直接，可以通过代码直接观察到目标Activity的全限定名称或者组件类对象。

```java
// 方式一
Intent intent = new Intent(ActivityFrom.this, ActivityTo.class);

// 方式二
Intent intent = new Intent();
intent.setComponent(new ComponentName(ActivityFrom.this, ActivityTo.class));

// 方式三
Intent intent = new Intent();
intent.setClassName(ActivityFrom.this, "com.ilovesshan.a06_activity.ActivityTo");
```



隐式Intent相对来说比隐含，不能通过代码直接观察到目标Activity的信息，隐式Intent主要通过 `Action`和 `Category`来确定目标Activity。

一些常见的 `Action`字符串：

+ `Intent.ACTION_DIAL` 打电话 
+ `Intent.ACTION_SENDTO` 发送短信
+ `Intent.ACTION_VIEW` 加载网址

```java
// 给15112345678打电话
Intent intent = new Intent();
intent.setAction(Intent.ACTION_DIAL);
intent.setData(Uri.parse("tel:15112345678"));
startActivity(intent);
```



```java
// 给15112345678发送当前时间
Intent intent = new Intent();
intent.setAction(Intent.ACTION_SENDTO);
intent.setData(Uri.parse("sms:15112345678"));
intent.putExtra("sms_body", new Date().toString());
startActivity(intent);
```



```java
// 访问学习笔记主页
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://ilovesshan.github.io/"));
startActivity(intent);
```



```java
// 访问其他模块的Activity，通过 action 和 category进行匹配
Intent intent = new Intent();
intent.setAction("com.ilovesshan.android_base.ScrollViewActivity");
intent.addCategory(Intent.CATEGORY_DEFAULT);
if (intent.resolveActivity(getPackageManager()) != null) {
    startActivity(intent);
} else {
    Toast.makeText(JumpSystemActivity.this, "抱歉，未找到目标界面", Toast.LENGTH_LONG).show();
}
```

```xml
<activity android:name=".ScrollViewActivity" android:exported="true">
    <intent-filter>
        <action android:name="com.ilovesshan.android_base.ScrollViewActivity" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```



#### 显示Intent和隐式Intent区别

显示Intent： 知道目标组件名称的情况下使用，显示Intent很明确的知道要激活那个组件，一般用作App内部跳转。

隐式Intent：通过清单文件中通过配置 `intent-filter`标签来实现，使用场景：不知道目标组件的名称，当要激活另一个Activity时(看不到源码)，这种情况只能使用隐式Intent，一般是不同应用程序之间的跳转，根据Activity配置的意图过滤器建一个意图，让意图中的各项参数的值都跟过滤器匹配，这样就可以激活其他应用中的Activity。

### 4、Activity传数据通信

通过`intent`做为两个`Activity`之间通信的桥梁，如果是简单数据可以直接通过`intent`携带，如果是复杂数据则通过`Bundle`对象对数据进行打包，再通过 `intent`进行传递。



#### 接收目标Activity返回的数据

```java
mIntentActivityResultLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
    // 返回状态码
    int resultCode = result.getResultCode();
    // 目标Activify返回的数据
    Bundle bundle = result.getData().getExtras();
    String userId = bundle.getString("userId");
    String username = bundle.getString("username");
});

// 进行页面跳转, 如果需要传递数据 直接放在Intent中即可
mIntentActivityResultLauncher.launch(new Intent(RequestActivity.this, ResponseActivity.class));
```



#### 向上一个Activity返回数据

```java
// 构建Bundle对象
Bundle bundle = new Bundle();
bundle.putString("userId", "I123456");
bundle.putString("username", "ilovesshan");
Intent intent = new Intent();
intent.putExtras(bundle);
// Activity.RESULT_OK 状态码，用作接收返回值界面进行判断做一些不同的业务逻辑
setResult(Activity.RESULT_OK, intent);
finish();
```



### 5、获取资源文件信息

`string.xml`新增

```xml
<resources>
    <string name="username">ilovesshan</string>
    <string name="userid">i123456</string>
</resources>
```

在`Activity`中获取

```java
String userid = getResources().getString(R.string.userid);
String username = getResources().getString(R.string.username);
```

在其他`java`文件（必须有`Context或pplication`）中获取

```java
String userid = context.getString(R.string.userid); 
String username = application.getString(R.string.username); 
```



### 6、获取元数据信息

清单文件中配置

```xml
<activity  android:name=".MetaDataActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

    <meta-data android:name="appId" android:value="efefeddrtrfsdsdrytthfdfert4"/>
    <meta-data android:name="appPackage" android:value="com.ilovesshan.a06_activity"/>
</activity>
```



`Activity` 中获取 `meta-data` 数据

```java
ActivityInfo activityInfo = getPackageManager().getActivityInfo(getComponentName(), PackageManager.GET_META_DATA);
Bundle bundle = activityInfo.metaData;
String appId = bundle.getString("appId");
String appPackage = bundle.getString("appPackage");
```

`Service` 中获取 `meta-data` 数据

```java
ComponentName componentName = new ComponentName(Activity.class, Receiver.class);
ServiceInfo serInfo = mContext.getPackageManager().getServiceInfo(componentName, PackageManager.GET_META_DATA);
Bundle bundle = activityInfo.metaData;
String appId = bundle.getString("appId");
String appPackage = bundle.getString("appPackage");
```

`Recriver` 中获取 `meta-data` 数据

```java
ComponentName componentName = new ComponentName(Activity.class, Service.class);
ActivityInfo Info = mContext.getPackageManager().getReceiverInfo(componentName, PackageManager.GET_META_DATA);
Bundle bundle = activityInfo.metaData;
String appId = bundle.getString("appId");
String appPackage = bundle.getString("appPackage");
```



### 7、配置应用快捷方式

```xml
<activity  android:name=".LoginActivity"  android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.LoginActivity" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>

<activity  android:name=".ScanActivity"  android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.ScanActivity" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>


<activity android:name=".MetaDataActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    <meta-data android:name="android.app.shortcuts" android:resource="@xml/shortcuts" />
</activity>
```

```xml
<resources>
    <string name="login_long">登录</string>
    <string name="login_short">登录</string>
    <string name="scan_long">扫一扫</string>
    <string name="scan_short">扫一扫</string>
</resources>
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<shortcuts.xml xmlns:android="http://schemas.android.com/apk/res/android">
    <shortcut
              android:icon="@drawable/login"
              android:shortcutId="login"
              android:shortcutLongLabel="@string/login_long"
              android:shortcutShortLabel="@string/login_short">
        <intent android:action="android.intent.action.LoginActivity" />
    </shortcut>
    <shortcut
              android:icon="@drawable/scan"
              android:shortcutId="scan"
              android:shortcutLongLabel="@string/scan_long"
              android:shortcutShortLabel="@string/scan_short">
        <intent android:action="android.intent.action.ScanActivity" />
    </shortcut>
</shortcuts.xml>
```


# Android



### 冷启动和热启动是什么？有什么区别？

1. 冷启动：后台不存在该应用进程，APP启动时系统会重新创建一个新的进程分配给该应用。
2. 热启动：后台存在该应用进程，当APP已经打开，但是因为按下了Home键、返回键回到了桌面或者其他应用程序的时候，再重新打开APP时，这种方式成为热启动。
3. 冷热启动区别：
   + 冷启动：因为系统会重新创建一个新的进程分配给该应用，所以会先创建和初始化Application类，再创键MainActivity类（包括一系列的测量、布局、绘制），最后显示到界面上。
   + 热启动：热启动系统会从已有的进程中启动，所以热启动就不会走Application这步了，而是直接走MainActivity（包括一系列的测量、布局、绘制），所以热启动的过程只需要创建和初始化一个MainActivity就行了，而不必创建和初始化Application。



### 冷启动如何优化？

1. 冷启动优化主要是解决视觉上优化，解决白屏问题，来提高用户体验。
2. 优化手段
   + 减少onCreate方法的工作量。
   + 不要让Application参与业务操作以及进行一些耗时操作。
   + 减少布局的复杂度和层级。
   + 减少主线程的耗时操作。



### Activity的三种状态和生命周期？

1. Activity三种状态

   + active：当Actvity处于活动栈的最顶端（同一时刻只能有一个Activty处于active状态），它能够获取页面焦点和响应用户操作。

   + pause：当Actvity失去焦点但是可见时，比如：弹出Toast、AlertDialog、当前Avtivity有一个透明的Activty。此时Activty任然是存活状态，但是当系统内存极小时可能会被回收。

   + stop：完全被另一个Activity遮挡时处于停止状态，它仍然在内存中保留着所有的状态和成员信息。只是对用户不可见，当其他地方需要内存时它往往被系统杀掉。

     

2. Activity生命周期

   + onCreate：当Activity被实例化时会调用，整个生命周期只执行一次，在onCreate中通常做一些初始化操作，比如：设置布局文件，为按控件加事件监听等操作。
   + onStart：当Activity可见，但是未能获取焦点不能和用户交互时调用。
   + onRestart：当Activity已经停止，重新启动时系统会调用。
   + onResume：当Activity可见，能获取焦点能和用户交互时调用。
   + onPause：当Activity可见不可交互时调用，通常做一些存储持久数据，关闭动画，定时器等操作。
   + onStop：当Activity不可见时调用（可能被新的Activtiy完全覆盖）。
   + onDestroy：当Activity被销毁（调用finish或者由于内存不足导致Activity被杀掉）时调用，整个生命周期只执行一次。一般在用onCreate方法中释放创建的资源，如结束线程等。



### Activity的四种启动模式？

1. standrad（标准模式）：如果在mainfest中不设置就默认standard；standard就是新建一个Activity就在栈中新建一个activity实例。
2. singTop（栈顶复用模式）：栈顶存在则复用不存在则新建，相对standrad模式来说减少了重复创建Activity的资源消耗（视情况而定）。
3. singStack（栈内单例模式）：栈内只有一个activity实例，栈内已存在这个Activty实例，当其他Activty start这个Activty时，系统直接把这个Activty实例之上的其他Activity移除栈中被GC掉。
4. singleInstance（堆内单例模式）：新建的Acticty会独占一个任务栈并且全局唯一，因为singleInstance具备了singStack特性，所以后续Activty均不会创建新的实例，除非被销毁。



### 横竖屏切换时Activity生命周期？

1. 不在AndroidManifest清单文件中配置configchanges时，横竖屏切换生命周期各走一遍。
2. 配置configchanges时，需要设置为android:configChanges="orientation|screenSize"时，才不会重走生命周期方法。只会回调onConfigurationChanged方法。
3. 注意如果不配置configchanges或者配置了但是不是orientation|screenSize这两个值时，横竖屏切换生命周期还是会各走一遍，并且也不会调用onConfigurationChanged方法。



### Android中五种进程？

1. 前台进程：这是Android最重要的进程，是与用户正在交互的进程。
2. 可见进程：部分程序界面能够被用户看见，但是却不在前台和用户交互。
3. 服务进程：一个包含已启动服务的进程就是服务进程，服务进程没有界面，不能和用户直接交互，但是服务进程最大特点是能够在后台长期运行。
4. 后台进程：如果一个进程不包含任何启动的服务而且没有用户可见的Activity，则这个进程就是后台进程。
5. 空进程：空进程是不包含任何活跃组件的进程。在系统资源紧张时会被首先清除。



### startService和bindService区别、使用场景？

1. 区别：

   + startServices是开启服务，开启服务不能和服务内部方法通信（与调用者进行交互）但是该服务可以在后台长期运行。
   + bindService是绑定服务，绑定服务可以和服务内部方法通信但是不能在后台长期运行， bindService 的方式通过onServiceConnected方法，获取到Service对象，通过该对象可以直接操作到Service内部的方法，从而实现的Service 与调用者之间的交互。

2. 使用场景：

   + 如果想要启动一个后台服务长期进行某项任务，那么使用startService
   + 如果只是短暂的使用，那么使用bindService。
   + 如果想启动一个后台服务长期进行任务，且这个过程中需要与调用者进行交互，考虑使用混合服务方式即：（startServices + bindService）既能和服务内部方法通信又可以在后台长期运行。

   

### startService和bindService生命周期？

1. startService：onCreatet(一次)  ->  onStart(废弃了)/onStartCommand（多次）  -> onDestory (一次)
2. bindService： onCreatet(一次)  ->  onBind(一次)  -> callMethod（多次）  -> onUnbind(一次)  ->  onDestory(一次)
3. 混合服务：onCreatet  -> onStartCommand  ->onBind  -> callMethod -> onUnbind ->  onDestory
4. 混合服务使用步骤：
   + 开启服务：startService()，确保服务可以长期在后台运行。
   + 绑定服务：onBind()，为了使服务能够进行通讯。
   + 调用服务内部的方法，与调用者进行交互。
   + 解绑服务：unBindService()，退出Activity。
   + 停止服务：stopService()。



### 跨进程通信的方式？

1. AIDL（Android Interface definition language）
2. 广播
3. 文件
4. scoket/管道



### 广播静态注册和动态注册区别？

1. 动态注册广播不是常驻型广播，该广播会跟随Activity生命周期。一般情况下在 Activity 结束前，都会移除广播接收器。
2. 静态注册是常驻型广播，也就是说当应用程序关闭后，如果有信息广播来，程序也会被系统调用自动运行。
3. 当广播为有序广播时：优先级高的先接收（不分静态和动态），同优先级的广播接收器，动态优先于静态。



### Android中的类加载器

1. PathClassLoader，只能加载系统中已经安装过的 apk。
2. DexClassLoader，可以加载 jar/apk/dex，可以从 SD卡中加载未安装的 apk。



### 简单聊聊Hander机制？

1. Hnandler与之密切的几个类：Message、MessageQueue、Lopper。
   + Message就是消息数据，将消息数据封装成Message对象借助Hnandler进行发送。Message中有两个变量target 和 callback。
     + target ：发送消息的Handler对象。
     + callback：是当调用 `handler.post(runnable)` 时传入的 Runnable 类型的任务。
   + MessageQueue：就是存放消息的消息队列，MessageQueue的next方法会返回下一个待处理的消息。
   + Lopper：轮询器，它是连接消息队列和Handler的核心，Lopper有两个核心方法：Looper.prepare()和Looper.loop()。
     + Looper.prepare()：首先通过`ThreadLocal.get()`获取当前线程中的Looper,如果不为空，则会抛出一个RunTimeException，意思是一个线程不能创建2个Looper。如果为null则执行下一步。第二步是创建了一个Looper，并通过 `ThreadLocal.set(looper)。`将我们创建的Looper与当前线程绑定。
     + Looper.loop()：这个方法开启了整个事件机制的轮询。它的本质是开启了一个死循环，不断的通过 `MessageQueue的next()`方法获取消息，拿到消息后会调用 `msg.target.dispatchMessage()`来做处理。其实`msg.target`也就是发送消息的Handler，这句话本质上就是调用handler的dispatchMessage()方法。
2. Hnandler主要的功能就是：发送消息和处理消息。
   + 发送消息除了 sendMessage 之外还有 sendMessageDelayed 和 post 以及 postDelayed 等等不同的方式。
   + 消息处理的核心其实就是`dispatchMessage()`这个方法。这个方法里面的逻辑很简单，先判断 `msg.callback` 是否为 null，如果不为空则执行这个 runnable。如果为空则会执行我们的`handleMessage`方法。
3. [handler面试题](https://www.yuque.com/houzhenpu/qadgkf/bgb947?#Pnlnx)：https://www.yuque.com/houzhenpu/qadgkf/bgb947?#Pnlnx



### Android性能优化手段？

1. 布局优化：布局优化的本质就是减少 View 的层级
   + 在 LinearLayout 和 RelativeLayout 都可以完成布局的情况下优先选择 RelativeLayout，可以减少 View 的层级。
   + 将常用的布局组件通过\<include>标签抽取出来使用 。
   + 使用 \<Merge>标签来减少布局的嵌套层次。
2. 网络优化
   + 尽量减少网络请求，能够合并的就尽量合并。
   + 大量数据的加载采用分页的方式。
   + 加入网络数据的缓存，避免频繁请求网络。
   + 上传图片时，在必要的时候压缩图片。
3. 安装包优化：主要偶就是减小包体积
   + 使用混淆，可以在一定程度上减少 apk 体积，但实际效果微乎其微。
   + 减少应用中不必要的资源文件，比如图片，在不影响 APP 效果的情况下尽量压缩图片。
   + 对SO 库进行部分的保留和删减。



### 事件冲突解决思路与方案？

1. 两种解决方案，内部和外部。



### Android中常见的设计模式？

1. Builder模式
   + 我们经常用到AlertDialog。在Android源码中，最常用的Builder模式就是AlertDialog.Builder，使用该Builder来构建复制AlertDialog对象。
2. 组合模式
   + View和ViewGroup的嵌套组合。
   + 在Android的视图层级中，容器一定是ViewGroup，而且只有ViewGroup才能包含其他的View，比如LinearLayout能包含TextView、Button等，但是反过来TextView不能包含LinearLayout，因为TextView直接继承自View,并非一个容器（ViewGroup）。
3. 策略模式：Android里面策略模式的其中一个典型应用就是动画中的插值器。
4. 装饰模式：
   + ContextImpl是抽象类Context的具体实现。
   + ContextWrapper及所有其子类对象持有的Context均是ContextImpl对象。所以对于 Application，Activity 和 Service 等类来说，他们只是一个个装饰者，都是用来装饰 ContextImpl 这个被装饰者类。
5. 适配器模式
   + 开发过程中我们经常会使用ListView，它所需要的目标接口(target interface)就是ListAdapter，包含getCount(),getItem(),getView()等几个基本的方法。
   + 为了兼容List,Cursor等数据类型作为数据源，我们专门定义两个适配器来适配他们：ArrayAdapter和CursorAdapter。这两个适配器，就是针对目标接口对数据源进行兼容修饰。
6. 模板方法模式：规定子类方法执行顺序，具体实现逻辑由子类完成。
7. 观察者模式：广播通知、事件通知就是使用的观察模式。
8.  原型模式
   + 比如我们需要一张Bitmap的几种不同格式：ARGB_8888、RGB_565、ARGB_4444、ALAPHA_8等。那我们就可以先创建一个ARGB_8888的Bitmap作为原型，在它的基础上，通过调用Bitmap.copy(Config)来创建出其它几种格式的Bitmap。



### 为什么说android UI操作不是线程安全的？

1. 可能在非UI线程中刷新界面的时候，UI线程也在刷新界面，这样就导致多个界面刷新的操作不能同步，导致线程不安全。


# Flutter

### 简单介绍下Flutter框架，以及优缺点？

1. Flutter是Google推出的一套开源跨平台UI框架，可以快速地在Android、iOS和Web平台上构建高质量的原生用户界面。
2. Flutter采用现代响应式框架构建，其中心思想是使用组件来构建应用的UI。当组件的状态发生改变时，组件会重构它的描述，Flutter会对比之前的描述，以确定底层渲染树从当前状态转换到下一个状态所需要的最小更改。
3. Flutter优点
   + 借助可移植的GPU加速的渲染引擎实现跨平台。
   + 热重载（Hot Reload），ctrl+s可以保存并重载，模拟器立马就可以看见效果，相比原生冗长的编译过程强很多。
   + 一切皆为Widget的理念，可以通过可组合控件集合以及丰富的动画库来构建灵活的丰富的界面。
4. Flutter缺点
   + 不支持热更新。
   + 三方库有限，需要自己造轮子。
   + Dart语言编写，增加了学习难度。

### Flutter的FrameWork和Engine层？

1. Flutter的FrameWork层是用Dart语言封装的一套开发类库，它实现了一套基础库。主要包含Material（Android风格UI）和Cupertino（iOS风格）的UI界面，下面是通用的Widgets（组件），之后是一些动画、绘制、渲染、手势库等。这个纯 Dart实现的 SDK被封装为了一个叫作 dart:ui的 Dart库。我们在使用 Flutter写 App的时候，直接导入这个库即可使用组件等功能。
2. Flutter的Engine层是Skia 2D的绘图引擎库，Skia 在图形转换、文字渲染、位图渲染方面都提供了友好、高效的表现。Skia是跨平台的，所以可以被嵌入到 Flutter的 iOS SDK中，Android自带了 Skia，所以 Flutter Android SDK要比 iOS SDK小很多。

### **Flutter**中的**key?** 有什么用？

1. key是Widgets、Elements、SemanticsNodes的标识符。

2. Flutter中key分为两种：

   + LocalKey ：要修改集合中控件的顺序或者数量时LocalKey 会起到标识作用来提高渲染性能。

   + GlobalKey：GlobalKey允许 Widget 在应用中的 任何位置更改父级而不会丢失 State。

     

### GlobalKey是什么，有什么作用？

1. GlobalKey使用了一个静态常量Map来保存对应的Element，你可以通过GlobalKey找到持有该GlobalKey的 Widget，State 和 Element。

2. 需求：需要在外部Widget中改变内部Widget的状态，有两种办法解决：

   + 通过回调函数的方式。

   + 通过GlobalKey，GlobalKey 能够跨 Widget 访问状态。

     ```dart
     // 外部Widget先定义一个GlobalKey
     final GlobalKey<_SwitchWidgetState> switchWidgetKey = GlobalKey<_SwitchWidgetState>();
     
     // 使用内部Widget并将key作为参数传递
     body: SwitchWidget(key: switchWidgetKey)
         
     // 当外部Widget按钮被点击时此时需要取更改内部Widget的状态
     switchWidgetKey.currentState!.changeSwitchState();
     ```

     ```dart
     // 在内部Widet中仅仅需要写好代码逻辑 提供给外部调用即可
     void changeSwitchState(){
         isCheck = !isCheck;
         setState(() {});
     }
     ```

     

### main函数和runApp的作用以及关系？

1. main函数是整个应用程序的入口函数。

2. runApp函数是渲染根widget树的函数。

3. runApp函数都会在main函数中运行。

   ```dart
   void main() {
       runApp(const MyApp());
   }
   
   class MyApp extends StatelessWidget {
       //...
   }
   ```



### 谈谈你对Widget的理解以及分类？

1. Widget被译为 `小部件`，在Flutter中Widget其实就是一些界面上展示的UI组件。
2. Widget可以分为两类
   + statelessWidget（无状态Widget）不会自己重新构建自己。一般使用场景做一个简单的静态展示页面，不涉及数据操作。
   + statefulWidget（有状态Widget），有状态意味着在Widget内部可能有需要动态改变的数据，改变数据可能会（如果调用`setState(() {})`）涉及到UI更新，此时statefulWidget就会自己重新构建自己。



### Widget的生命周期是怎么样？

1. statelessWidget的生命周期，因为是无状态Widget且不会自己重新构建自己。生命周期比较简单。

   + Widget的构造方法。

   + Widget的build方法。

     

2. statefulWidget的生命周期

   + Widget的构造方法。

   + Widget的createSatet方法。

   + State的构造方法。

   + state的initState方法，当Widget第一次插入到Widget树时会被调用（注意：重写该方法时，必须要先调用super. initState()）。

   + State的didChangeDependencies方法，该方法被调用后，组件的状态变为 dirty，并且立即调用 build 方法，该方法有两种调用时机：

     + 调用initState方法后，会调用该方法。
     + 从其他widget中依赖一些数据发生改变时会调用该方法，比如用InheritedWidget，provider来监听数据的改变。

   + State的build方法（调用完 didChangeDependencies方法后调用该方法 ， 调用 setState 方法之后 , 该方法也会被调用），build方法中应该只包含构建组件的代码，不应该包含其他额外的功能，尤其是耗时任务。

   + state的deactivate方法（当state被暂时从视图移除的时候会调用，页面push走、pop回来的时候都会调用）。

   + State的dispose方法（页面被销毁的时候调用）。

     

3. 生命周期画图

   ![image-20230509095612742](../../.vuepress/public/image-20230509095612742.png)

   

4. 生命周期相关的一些注意点

   + mounted对象，mounted 是 State 对象中的一个属性，此属性表示当前组件是否在树中。createState 函数执行完毕后表示当前组件已经在组件树中，属性 mounted 被 Framework 设置为 true，强烈建议：在调用 setState 时加上 mounted 判断。

     ```dart
     if(mounted){ 
         setState(() {  });
     }
     ```

   + dirty 和 clean

     + dirty 表示组件当前的状态为 脏状态，绘制下一帧时将会执行 build 函数，调用 setState 方法或者执行didUpdateWidget 方法后，组件的状态为 dirty。
     + clean 表示组件当前的状态为干净状态，clean 状态下组件不会执行 build 函数。

   

### Flutter中监听Android Activity的生命周期？

1. 通过WidgetsBindingObserver的didChangeAppLifecycleState 可以获取App的生命周期状态。

2. 在AppLifecycleState类中。常用状态包含如下几个：

   + `inactive` — 应用处于非活跃状态并且不接收用户输入。
   + `detached` — 应用依然保留 flutter engine，但是全部宿主 view 均已脱离。
   + `paused` — 应用当前对用户不可见，无法响应用户输入，并运行在后台。这个事件对应于 Android 中的 `onPause()`；
   + `resumed` — 应用对用户可见并且可以响应用户的输入。这个事件对应于 Android 中的 `onPostResume()`；

3. 案例

   ```dart
   // 需要混入WidgetsBindingObserver类
   class HomeWidgetState extends State<HomeWidget> with WidgetsBindingObserver {
       @override
       void initState() {
           super.initState();
           // 注册监听器，当生命周期发生变化时 FreamWork会回调didChangeAppLifecycleState方法，并传递当前状态
           WidgetsBinding.instance!.addObserver(this);
       }
   
       //...
       
       @override
       void didChangeAppLifecycleState(AppLifecycleState state) {
           if (state == AppLifecycleState.resumed) {
               print("应用对用户可见并且可以响应用户的输入。这个事件对应于 Android 中的 `onPostResume()`；。");
           } else if (state == AppLifecycleState.inactive) {
               print("应用处于非活跃状态并且不接收用户输入。");
           } else if (state == AppLifecycleState.paused) {
               print("应用当前对用户不可见，无法响应用户输入，并运行在后台。这个事件对应于 Android 中的 `onPause()`；");
           } else if (state == AppLifecycleState.detached) {
               print("应用依然保留 flutter engine，但是全部宿主 view 均已脱离。");
           }
       }
       
       @override
       void deactivate() {
           super.deactivate();
           // 注意deactivate时 请移除监听
           WidgetsBinding.instance!.removeObserver(this);
       }
   }
   ```

   

### Widget和Widget树的概念？

1. Widget：在Flutter中几乎所有东西都是Widget，可以将Widget想象成一个可视化组件或者能与应用程序交互的组件。
2. Widget树：Widget以树结构进行组织。包含其他Widget的widget被称为父Widget(或widget容器)。包含在父widget中的widget被称为子Widget。



### Context 、State概念？

1. Context：是已创建的Widget树中某个Widget位置引用，一个context只从属于一个widget，它和widget一样是链接在一起的，并且会形成一个context树。

2. State：State定义了statefulWidget实例的行为，包含了用于干预/交互Widget信息的行为和布局，应用于State的任何更改都会强制重新构建Widget。

   

### Widget、Elements、RenderObject 关系？

1. 实体概念
   + Widget：用于存储和渲染需要的信息。
   + RenderObject：负责管理布局、绘制等操作。
   + Element：才是这颗巨大的控件树上的实体。
2. 在第一次创建 Widget 的时候，会对应创建一个 Element， 然后将该元素插入树中。如果之后 Widget 发生了变化，则将其与旧的 Widget 进行比较，并且相应地更新 Element。重要的是，Element 不会被重建，只是更新而已。



### Flutter中自定义View的流程？

1. 已有控件（widget）的继承，组合。
2. 自定义绘制widget,也就是利用paint，cavans等进行绘制自定义视图。



### 什么是状态管理？

1. Flutter采用现代响应式框架构建，其中心思想是使用组件来构建应用的UI，组件最重要的概念就是状态，状态是一个组件的UI数据模型，是组件渲染时的数据依据。

   

### 你了解那些状态管理框架？

1. Flutter的状态管理可以分成两大类：全局状态和局部状态。
2. 常用的状态管理框架有：Redux 、BLoC、Provider、Getx等等。





### Flutter如何和Android与IOS通信？

1. Flutter主要是通过plateformChannel与原生进行交互，其中plateformChannel又分成三种：
   + BasicMessageChannel：用于传递字符串和半结构化的信息。
   + MethodChannel：用于传递方法调用（methods invocation）。
   + EcventChannel：用于数据流的通信（event stream）。
2. 注意：plateformChannel并非是线程安全的。



### 简述Flutter热重载

1. Flutter 的热重载是基于 JIT 编译模式的代码增量同步。由于 JIT 属于动态编译，能够将 Dart 代码编译成生成中间代码，让 Dart VM 在运行时解释执行，因此可以通过动态更新中间代码实现增量同步。

2. 热重载的流程可以分为 5 步，包括：扫描工程改动、增量编译、推送更新、代码合并、Widget 重建。Flutter 在接收到代码变更后，并不会让 App 重新启动执行，而只会触发 Widget 树的重新绘制，因此可以保持改动前的状态，大大缩短了从代码修改到看到修改产生的变化之间所需要的时间。

3. 另一方面，由于涉及到状态的保存与恢复，涉及状态兼容与状态初始化的场景，热重载是无法支持的，如改动前后 Widget 状态无法兼容、全局变量与静态属性的更改、main 方法里的更改、initState 方法里的更改、枚举和泛型的更改等。

4. 可以发现，热重载提高了调试 UI 的效率，非常适合写界面样式这样需要反复查看修改效果的场景。但由于其状态保存的机制所限，热重载本身也有一些无法支持的边界。

   



### Flutter 是怎么运转的？

1. 与用于构建移动应用程序的其他大多数框架不同，Flutter 是重写了一整套包括底层渲染逻辑和上层开发语言的完整解决方案。
2. 这套解决方案不仅可以保证视图渲染在 Android 和 iOS 上的高度一致性（即高保帧），在代码执行效率和渲染性能上也可以媲美原生 App 的体验（即高性能）。



### Flutter组件化思想和设计原则？

1. 组件化又叫模块化，即基于可重用的目的，将一个大型软件系统（App）按照关注点分离的方式，拆分成多个独立的组件或模块。每个独立的组件都是一个单独的系统，可以单独维护、升级甚至直接替换，也可以依赖于别的独立组件，只要组件提供的功能不发生变化，就不会影响其他组件和软件系统的整体功能。

2. 设计原则

   + 单一性原则：每个组件仅提供一个功能。每个组件都有自己固定的职责和清晰的边界，专注地做一件事。
   + 抽象化原则：组件提供的功能抽象应该尽量稳定，具有高复用度。而稳定的直观表现就是对外暴露的接口很少发生变化。
   + 稳定性原则：不要让稳定的组件依赖不稳定的组件。比如组件 A 依赖了组件 B，如果组件A很稳定，但是组件B经常变化，那么组件A也就会变得不稳定了，需要经常适配。
   + 自完备性：即组件需要尽可能地做到自给自足，尽量减少对其他底层组件的依赖，达到代码可复用的目的。

   

### Flutter平台化概念？

1. 平台化是组件化的升级，即在组件化的基础上，对它们提供的功能进行分类，统一分层划分，增加依赖治理的概念。
2. 与组件化更关注组件的独立性相比，平台化更关注的是组件之间关系的合理性，而这也是在设计平台化架构时需要重点考虑的单向依赖原则。
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



### MVC、MVP、MVVM的优缺点？

1. 不管是MVC、MVP还是MVVM他们要做的都只有一个目的那就是将业务代码和视图代码进行分离。

2. MVC，在 MVC 中，对应用程序划分出了三种角色：Model、View、Controller。三者有各自的具体用途和职责。

   + MVC的三层介绍
     + Model：数据 + 业务逻辑。
     + View：接收和展示数据的界面。
     + Controller：主要担任 Model 与 View 之间的桥梁，用于控制程序的流程。
   + MVC的优缺点
     + 优点：MVC 为业务和视图的实现分离提供了开创性的设计思路，让负责业务逻辑的 Model 与负责展示的 View 实现了解耦，从而 Model 的复用性高。
     + 缺点：三层会直接或者间接通信，各层职责划分不明确，C层承担了很大一部分职责，后期不利于维护。

3. MVP，MVP中包含的三种角色：Model、View、Presenter，它们都是通过接口进行交互的，Presenter 其实就是MVC中的 Controller，只是为了与 MVC 区别开来，所以才称为 Presenter，主要是目的还是MVP对MVC进行了分解，重新架构。

   + MVC的三层介绍
     + Model：主要负责数据提供
     + View：其实还是和MVC中的View层一样的。
     + Presenter ：主要负责业务逻辑处理，作为M和V层的通信桥梁。
   + MVP的优缺点
     + 优点：
       + MVP 之间的交互通过接口来进行的，便于进行单元测试，维护性和扩展性也提高了。
       + M 和 V 之间彻底分离了，降低了耦合性，修改 V 层也不会影响 M 层（不再是MVC中MV直接通信）。
     + 缺点：
       + 由于增加了很多接口的定义，需要编写的代码量暴增，增加了项目的复杂度。
       + 需要对很多业务模块之间的交互抽象成接口定义，对开发人员的设计能力要求更高了。

4. MVVM：Model + View + ViewModel，和MVC、MVP不同的是ViewModel。

   + MVVM的三层介绍
     + Model： 封装了业务逻辑和数据，管理的是业务模型。
     + VM：（ViewModel）即视图模型，MVVM 最重要的一个特性就是数据绑定，通过将 View 的属性绑定到 ViewModel，可以使两者之间松耦合，当 ViewModel 的数据发生改变之后，与之绑定的 View 也会随之自动更新。反过来，当 View  发生了变化如果使用的单向绑定（ViewModel 数据不会自动更新），如果使用的双向绑定（ViewModel 数据会自动更新）。
     + View：视图层。

5. 简单总结MVP和MVVP区别：

   + MVP 和 MVVM 都是为了解决界面和数据的分离问题，两者只是采用了不同的实现方案。
   + MVP 之间的交互主要是通过接口实现的，其主要弊端就是需要编写大量接口。
   + 而 MVVM 则是通过数据绑定的方式实现交互，虽然其实现需要依赖具体的一些框架工具，但明显大大减少了开发者需要编写的代码量。

   

### Application、Module、Plugin、Package区别？

1. Application：主体是Flutter，其中包含iOS、Android、web等项目。

2. Module：主要用于原生ios和android嵌入Flutter项目，用于原生和Flutter混合开发。

3. Plugin：在Flutter中实现不了的功能，可以通过Plugin方式调用原生能力来实现。

4. Package：纯Dart语言编写的模块，不需要原生代码实现，没有Android iOS目录。

   

### Flutter的FrameWork和Engine层？

1. Flutter的FrameWork层是用Dart语言封装的一套开发类库，它实现了一套基础库。主要包含Material（Android风格UI）和Cupertino（iOS风格）的UI界面，下面是通用的Widgets（组件），之后是一些动画、绘制、渲染、手势库等。这个纯 Dart实现的 SDK被封装为了一个叫作 dart:ui的 Dart库。我们在使用 Flutter写 App的时候，直接导入这个库即可使用组件等功能。
2. Flutter的Engine层是Skia 2D的绘图引擎库，Skia 在图形转换、文字渲染、位图渲染方面都提供了友好、高效的表现。Skia是跨平台的，所以可以被嵌入到 Flutter的 iOS SDK中，Android自带了 Skia，所以 Flutter Android SDK要比 iOS SDK小很多。



### **Flutter**中的**key?** 有什么用？

1. 在Flutter中key是一个抽象类，有两个直接子类：

   + LocalKey ：主要是用于比较新旧Widget是否要更新或者删除，这个比较的过程采用了一个算法叫做Diff算法。
   + GlobalKey：主要保存Widget、State或者是Element的引用，可以用于访问他们内部的信息或者调用内部的方法。




### LocalKey 是什么，有什么作用？

1. LocalKey主要是用于比较新旧Widget是否要更新或者删除，其实LocalKey 存在的其中一个就是为了服务Diff算法，LocalKey也是Diff算法的核心所在。

2. LocalKe中又分成三个常用的Key

   + ValueKey：可以传入泛型作为Key的类型，一般情况传入例如：字符串、数字等等类型的key。

   + ObjectKey：内部采用Object类型来保存传入的Key，也就是我们可以将一个Object类型的值作为Key。

   + UniqueKey：生成一个唯一的KEey，本质通过hash生成的。

     ```dart
     @override
     String toString() => '[#${shortHash(this)}]';
     ```

     

3. 比较两个Widget时会调用canUpdate(oldWidget, newWidget)方法通过新旧Widget的runtimeType和key这两个属性来进行比较。

   ```dart
   static bool canUpdate(Widget oldWidget, Widget newWidget) {
       return oldWidget.runtimeType == newWidget.runtimeType && oldWidget.key == newWidget.key;
   }
   ```

   

### GlobalKey是什么，有什么作用？

1. GlobalKey使用了一个静态常量Map来保存对应的Element，你可以通过GlobalKey找到持有该GlobalKey的 Widget，State 和 Element。

   ```dart
   final Map<GlobalKey, Element> _globalKeyRegistry = <GlobalKey, Element>{};
   ```

   ```
   // 通过GlobalKey获取Context对象
   BuildContext? get currentContext => _currentElement;
   
   // 通过GlobalKey获取Widget对象
   Widget? get currentWidget => _currentElement?.widget;
   
   // 通过GlobalKey获取State对象
   T? get currentState {
       final Element? element = _currentElement;
       if (element is StatefulElement) {
       final StatefulElement statefulElement = element;
       final State state = statefulElement.state;
       if (state is T)
       	return state;
       }
       	return null;
   }
   ```

2. 通过GlobalKey可以用于访问引用内部的信息或者调用内部的方法。

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

1. Context：是已创建的Widget树中某个Widget位置引用（Element），一个context只从属于一个widget，它和widget一样是链接在一起的，并且会形成一个context树。

2. State：State定义了statefulWidget实例的行为，包含了用于干预/交互Widget信息的行为和布局，应用于State的任何更改都会强制重新构建Widget。

   

### Widget、Element、RenderObject 关系？

1. 创建widget的时候，一个widget对应一个element，但是widget和element与 RenderObject并不是一一对应，为什么？后面解答。
1. 三者的概念理解
   + Widget：页面小部件，我们自己编写Widget，比如：Container、Text、Column、ListView等等...
   + Element：
     + Element和Widget是一一对应的，Element中通过_widget来保存Widget引用，设计这个element主要的灵感主要是来自React框架的虚拟DOM和Diff算法（Flutter官网有说过）。
     + 因为Widget是不稳定的，经常会进行Build 如果界面直接渲染我们写的Widget这势必对Flutter的性能有很高的要求，此时Element就排上用场了，Flutter会通过KEY（GlobalKey）来找到对应的Element并且调用canUpdate方法进行比较（主要是比较新旧widget的key和runtimeType属性），进行小范围的更新，而不是重新创建Element。
   + RenderObject：最终被渲染到页面的视图，渲染视图步骤主要包含两步：布局(layout)和绘制(paint)。
3. 为什么但是widget和element与 RenderObject并不是一一对应？？
   + 首选需要确定当前Widget是否是一个渲染的Widget（RenderObjectWidget），如何判断？看是不是RenderObjectWidget的子类或者看父类是否继承了XXXRenderObjectWidget。
   + 举个例子：
     + 非RenderObjectWidget：Text、Container、Icon等等...
     + RenderObjectWidget -> MultiChildRenderObjectWidget: Column、Stack、Flex等等...
     + RenderObjectWidget -> SingleChildRenderObjectWidget：Align、SizedBox、Padding等等...
   + 结论就是：只有继承了RenderObjectWidget的Widget最后才会生成一个对应的RenderObject，那么非RenderObjectWidget的子类会通过插槽的方式被合并到其中。



### FlutterWidget渲染流程？

1. 创建Widget时会创建一个对应的Element。

2. 在Element中会做几件事情：

   + 调用Element的mount方法 本质是调用自己写的Widget的build方法，Element中通过_widget来保存build方法返回的引用。

     + 调用build的形式分成两种情况：
       + StatelessWidget：_widget = Widget.build(BuildContext context)
       + StatefullWidget：__widget = _state.build(BuildContext context), 因为StatefullWidget的布局都在State中。
       + BuildContext解释：BuildContext本质就是当前的Element对象，传递context对象的根本原因是因为：当Widget重新build的时候来确定Element的位置以及数据信息。

   + 如果Element是一个RenderElement，调用createRenderObject方法创建对象并通过_renderObject引用保存。

     + _renderObject = createRenderObject()

   + 如果Element是一个StatefullElement，调用createState来创建一个State对象，并通过_state对象来保存引用。

     + _state = createState();
     + _state.widget = _widget; 这一步刚好就是：为什么我们能够在State中能通过this.widget去访问父Widget的数据的根本原因。

     

### Flutter中自定义View的流程？

1. 已有控件（widget）的继承，组合。
2. 自定义绘制widget,也就是利用paint，cavans等进行绘制自定义视图。



### 什么是状态管理？你了解那些状态管理框架？

1. 状态管理是声明式编程中一个重要的概念，Flutter也是声明式编程的，
2. Flutter采用现代响应式框架构建，其中心思想是使用组件来构建应用的UI，组件最重要的概念就是状态，状态是一个组件的UI数据模型，是组件渲染时的数据依据。
3. Flutter的状态管理可以分成两大类：应用状态（全局状态）和短时状态（局部状态）。
4. 常用的状态管理框架有：Redux 、BLoC、Provider、Getx等等。



### 简单聊聊Provider这个状态管理框架？

1. Flutter中状态管理框架事比较多的，其中Provider是官方推荐的一个状态管理框架，Provider主要还是做全局数据共享的，底层是通过封装InheritedWidget并且在此基础上做了一些优化。

2. 使用Provider时一般我们会配合几个类一起使用

   + ChangeNotifier：这个类可以监听到数据变化，只需要我们在数据变化时手动调用notifyListeners() 方法，ChangeNotifier就能够通知消费者进行数据更新。

   + XxxViewModel：充当MVVM中的MV角色，通过数据绑定的方式来驱动视图更新。

     ```dart
     class countViewModel extends ChangeNotifier {
         int _count;
     
         countViewModel(this._count);
     
         int get count => _count;
     
         set count(int value) {
             _count = value;
             // 数据更新 通知消费者
             notifyListeners()
         }
     }
     ```

   + Provider/MultiProvider：用在根Widget上，方便项目的子Widget能够共享到数据，唯一Provider和MultiProvider区别就是：Provider只能接收一个Provider，当然可以通过嵌套方式（层级太多很难受），MultiProvider就是来解决Provider的不足。

     ```dart
     Provider(
         create: (_) => MyModel(count),
         child: ...
     )
     ```

     ```dart
     Provider<Something>(
         create: (_) => Something(),
         child: Provider<SomethingElse>(
             create: (_) => SomethingElse(),
             child: Provider<AnotherThing>(
                 create: (_) => AnotherThing(),
                 child: someWidget,
             ),
         ),
     ),
     ```

     ```dart
     MultiProvider(
         providers: [
             Provider<Something>(create: (_) => Something()),
             Provider<SomethingElse>(create: (_) => SomethingElse()),
             Provider<AnotherThing>(create: (_) => AnotherThing()),
         ],
         child: someWidget,
     )
     ```

     

   + Probvider.of\<T>()：从Provider中获取数据

     ```
     final provider = Provider.of<ProviderInterface>(context);
     ```

     

   + Consumer/Consumer2/Consume3，同样的也是从Provider中获取数据

     ```dart
     // Consumer 
     Foo(
         child: Consumer<A>(
             builder: (_, vm, child) {
                 return Bar(a: a, child: child);
             },
             child: Baz(),
         )
     )
     ```

     ```dart
     // Consumer2
     Foo(
         child: Consumer2<A,B>(
             builder: (_, aVM, bVM, child) {
                 return Bar(a: a, child: child);
             },
             child: Baz(),
         )
     )
     ```

     ```dart
     // Consumer3
     Foo(
         child: Consumer2<A, B, C>(
             builder: (_, aVM, bVM, cVM, child) {
                 return Bar(a: a, child: child);
             },
             child: Baz(),
         )
     )
     ```

     

   + Selector/Selector2/Selecto3，同样的也是从Provider中获取数据

     ```dart
     return Selector<A, A>(
         selector: (_, a) => a,
         shouldRebuild: (pre, next) => pre.value == next.value,
         child: Switch(
             value: isCheck,
             onChanged: (value) {}
         ),
     );
     ```

     

### 有对Provider做过优化吗？

1. 从Provider中获取数据的方式有三种：Provider.of()、Consmer、Selector，下面分别介绍这三种区别以及优化手段。

2. 使用Provider.of方法，当数据更新时会直接调用使用Provider.of方法的Widge类的tbuild方法，这显然是不有好的。

3. Consmer其实是对Provider.of的一个优化，默认情况下数据更新并不会调用Widge类的tbuild方法而是调用Consmer的build，有时候Consmer中的build并没有Widget依赖数据，肯能是更新而已，那其实也没必要更新build中的child这时官网又提出了优化，将child换一种方式写

   ```dart
   // 原版
   return Consumer(
       builder: (_, vm, _child) {
           return  Text("111");
       },
   );
   
   // 改良版
   return Consumer(
       builder: (_, vm, _child) {
           // _child 就是Consumer构造函数中传递进来的child
           return _child!;
       },
       child: Text("111")
   );
   ```

4. Selector其实是一个最终改良版，能够更好的控件视图是否需要更新，通过shouldRebuild方法来抉择，同时Selector功能也很强大可以将Avm通过selector函数一些列处理变成Bvm。





### 有用过GetX吗？简单聊聊？

1. GetX 是 Flutter 上的一个轻量级且强大的解决方案：高性能的状态管理、智能的依赖注入和便捷的路由管理，还有一些实用工具包括：国际化、改变主题等等。

2. 状态管理

   + 目前，Flutter有几种状态管理器。但是，它们中的大多数都涉及到使用ChangeNotifier来更新widget，这对于中大型应用的性能来说是一个很糟糕的方法。

   + Get有两个不同的状态管理器：简单的状态管理器（GetBuilder）和响应式状态管理器（GetX），使用 Get 的响应式编程就像使用 setState 一样简单。

     ```dart
     // 让我们想象一下，你有一个名称变量，并且希望每次你改变它时，所有使用它的小组件都会自动刷新。
     
     // 这就是你的计数变量。
     var name = 'Jonatas Borges';
     
     // 要想让它变得可观察，你只需要在它的末尾加上".obs"。
     var name = 'Jonatas Borges'.obs;
     
     // 而在UI中，当你想显示该值并在值变化时更新页面，只需这样做。
     Obx(() => Text("${controller.name}"));
     ```

     

3. 依赖注入

   + Get有一个简单而强大的依赖管理器，它允许你只用1行代码就能检索到与你的Bloc或Controller相同的类，无需Provider context，无需inheritedWidget。

     ```dart
     Controller controller = Get.put(Controller()); // 而不是 Controller controller = Controller();
     ```

   + Get会自动为你的控制器找到你想要的数据，而你甚至不需要任何额外的依赖关系。

     ```dart
     // 你可以实例化100万个控制器，Get总会给你正确的控制器。
     Controller controller = Get.find();
     
     // 然后你就可以恢复你在后面获得的控制器数据。
     Text(controller.textFromApi);
     ```

     

4. 路由管理

   + 使用Gex的路由管理避免了Context的传递，例如使用：snackbars、dialogs、bottomsheets等等...

   + 使用Getx很简单：

     ```dart
     // 在你的MaterialApp前加上 "Get"，把它变成GetMaterialApp。
     
     // Before: MaterialApp(
     GetMaterialApp( 
         home: RootApplication(),
     )
     ```

     ```dart
     // 导航到新页面
     Get.to(NextScreen());
     
     // 用别名导航到新页面
     Get.toNamed('/details');
     
     // 要关闭snackbars、dialogs、bottomsheets或任何你通常会用Navigator.pop(context)关闭的东西。
     Get.back();
     
     // 进入下一个页面，但没有返回上一个页面的选项（用于闪屏页，登录页面等）。
     Get.off(NextScreen());
     
     //进入下一个页面并取消之前的所有路由（在购物车、投票和测试中很有用）。
     Get.offAll(NextScreen());
     ```

     



### Flutter如何和Android与IOS通信？

1. Flutter主要是通过plateformChannel与原生进行交互，其中plateformChannel又分成三种：
   + BasicMessageChannel：用于传递字符串和半结构化的信息。
   + MethodChannel：用于传递方法调用（methods invocation）。
   + EcventChannel：用于数据流的通信（event stream）。
2. 注意：plateformChannel并非是线程安全的。



### 简述Flutter热重载？

1. Flutter 的热重载是基于 JIT 编译模式的代码增量同步。由于 JIT 属于动态编译，能够将 Dart 代码编译成生成中间代码，让 Dart VM 在运行时解释执行，因此可以通过动态更新中间代码实现增量同步。
2. 热重载的流程可以分为 5 步，包括：扫描工程改动、增量编译、推送更新、代码合并、Widget 重建。Flutter 在接收到代码变更后，并不会让 App 重新启动执行，而只会触发 Widget 树的重新绘制，因此可以保持改动前的状态，大大缩短了从代码修改到看到修改产生的变化之间所需要的时间。
3. 另一方面，由于涉及到状态的保存与恢复，涉及状态兼容与状态初始化的场景，热重载是无法支持的，如改动前后 Widget 状态无法兼容、全局变量与静态属性的更改、main 方法里的更改、initState 方法里的更改、枚举和泛型的更改等。
4. 可以发现，热重载提高了调试 UI 的效率，非常适合写界面样式这样需要反复查看修改效果的场景。但由于其状态保存的机制所限，热重载本身也有一些无法支持的边界。




### 热重载、热重启和完全重启之间有什么区别？

1. 热重载（hot reload）：会将代码更改转入 VM，重建 widget 树并保持应用的状态，整个过程不会重新运行 `main()` 或者 `initState()`。
2. 热重启（hot restart）：会将代码更改转入 VM，重启 Flutter 应用，不保留应用状态。
3. 完全重启（start）： 将会完全重新运行应用。该进程较为耗时，因为它会重新编译原生部分代码。在 Web 平台上，它同时会重启 Dart 开发编译器。完全重启并没有既定的快捷键，你需要手动停止后重新运行。



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
# Vue2

### Vue框架优点有那些？

1. Vue是一个轻巧、高性能、可组件化的MVVM库，同时拥有非常容易上手的API。
2. Vue框架两大特点：响应式编程、组件化。
3. Vue优点：轻量级、简单易学、可重用性、独立开发等等。



### Vue组件间通信方式有那些？

1. 父组件向子组件传递数据：子组件中使用$emit派发事件，父组件中使用v-on监听事件。
2. 祖先组件通过依赖注入(inject / provide)的方式，向其所有子孙后代传递数据。
3. 通过属性$root 、$parent 、$children、$ref，访问根组件、父级组件、子组件中的数据。
4. 通过事件总线(eventbus)的方式，可以实现任意两个组件间进行数据传递。
5. 通过 VueJs 的状态管理模式 Vuex，实现多个组件进行数据共享，推荐使用这种方式进行项目中各组件间的数据传递。



### vue中常用的修饰符？

1. .stop：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡。
2. .prevent：等同于 JavaScript 中的event.preventDefault()，阻止事件传播。
3. .capture：与事件冒泡的方向相反，事件捕获由外到内。
4. .self：只会触发自己范围内的事件，不包含子元素。
5. .once：只会触发一次。



### v-show和v-if指令的区别？

1. 相同点

   + v-show和v-if指令都可以实现对页面元素的显示和隐藏控制，都是动态显示 DOM 元素。

2. 不同点

   + v-if进行切换时，是对Dom元素进行创建或者销毁。
+ v-show进行切换时，是控制Dom元素的diasplay属性。
   + v-if是惰性的，若初始值为 false ，就不会编译了。

3. 性能消耗

   + v-if 有更高的切换消耗。
     v-show 有更高的初始渲染消耗。

4. 使用场景

   + v-if 适合偶尔切换。
   + v-show 适合频繁切换。



### v-moel的使用原理？

1. v-model用于表单数据的双向绑定，其实它就是一个语法糖，这个背后就做了两个操作
   + v-bind绑定一个value属性。
   + v-on指令给当前元素绑定input事件。



### 单向绑定和双向绑定的概念

1. 单向绑定非常简单，就是把Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新。
2. 双向绑定：如果用户更新了View，Model的数据也自动被更新了。



### 如何让CSS只在当前组件中起作用？

1. 在style标签内添加：scoped



### vue中强制覆盖第三方css的方式？

1. 覆盖三方样式有三种方式： `>>>` 、`/deep/`、`::v-deep`、`！important`
2. 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `>>>` 操作。
3. 些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。
4. 谨慎使用`！important`  ， 因为`!important` 是例外规则，没法算清优先级权重，就是说使用 `!important` 会破坏固有的级联规则。



### keep-alive的作用是什么？

1. keep-alive作为一种vue的内置组件，主要作用是缓存组件状态。当需要组件的切换时，不用重新渲染组件，避免多次渲染，就可以使用keep-alive包裹组件。

2. props属性

   + `include` 字符串或者正则表达式，只有名称匹配的组件会被缓存。
   + `exclude` 字符串或者正则表达式，任何名臣匹配的组件都不会被缓存。
   + `max` 数字，最多可以缓多少组件实例。

3. keep-alive生命周期

   + 页面第一次进入：created-> mounted-> activated，退出时触发deactivated。
   + 当再次进入（前进或者后退）时，只触发activated或者deactivated。

   

### Vue中如何获取dom？

1. 给dom元素加ref="refname"。
2. 通过this.$refs.refname进行获取dom元素。



### 列举几种vue中的指令和它的用法

1. v-model：对数据进行双向绑定。
2. v-on：添加事件监听。
3. v-html：将字符串当作Html元素进行解析渲染。
4. v-text：渲染普通文本。
5. v-once：定义它的元素或组件只会渲染一次，包括元素或者组件的所有字节点。首次渲染后，不再随着数据的改变而重新渲染。
6. v-if：动态控制页面Dom元素的显示和隐藏。
7. v-show：动态控制页面Dom元素的显示和隐藏。



### vue-loader是什么？它的用途是什么？

1. vue-loader：Vue文件的加载器，它可以解析和转换.vue文件。提取出其中的逻辑代码 script,样式代码style,以及HTML 模板template，再分别把他们交给对应的loader去处理。
2. 用途是降级: 
   + js可以写es6。
   + style样式可以写scss或less。
   + template可以加jade等。



### 使用v-for的时候为什么用key？

1. 给每个dom元素加上key作为唯一标识 ，diff算法可以正确的识别这个节点，使页面渲染更加迅速。



### v-on可以监听多个方法吗？

1. 可以，比如 v-on="onclick,onblur"。



### $nextTick的使用?

1. Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
2. $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM。



### Vue组件中data为什么必须是一个函数？

1. 组件中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，他们只负责各自维护数据，不会造成混乱。
2. 而单纯的写成对象形式，就是所有组件实例共用了一个data，这样改一个全部都会修改，牵一发而动全身。



### vue在双向数据绑定是如何实现的？

1. vue双向数据绑定是通过数据劫持、组合、发布订阅模式的方式来实现的，也就是说数据和视图同步。数据发生变化，视图跟着变化，视图变化，数据也随之发生改变。
2. 核心实现，关于vue双向数据绑定
   + Vue2.0：其核心是Object.defineProperty()方法。
   + Vue3.0：其核心是Proxy 方法。
3. Vue3为什么使用Proxy？
   + defineProperty缺陷：
     + 不能监听数组变化。
     + 只能劫持对象的属性（给对象添加属性vue无法检测到）。
   + Proxy的好处：
     + proxy可以直接监听数组的变化。
     + proxy可以监听对象而非属性.它在目标对象之前架设一层“拦截”，因此提供了一种机制，可以对外界的访问进行过滤和改写。proxy直接劫持一个对象，并且会返回一个新对象。



### 单页面应用和多页面应用区别及缺点？

1. 单页面应用（SPA），通俗的说就是指只有一个主页面的应用，浏览器一开始就加载所有的js、html、css，所有的页面内容都包含在这个主页面中。
2. 多页面（MPA），就是一个应用中有多个页面，页面跳转时是整页刷新。
3. 单页面应优缺点
   + 优点：用户体验好，快，内容的改变不需要重新加载整个页面，基于spa特性对服务器压力较小，前后端分离页面效果会比较酷炫。
   + 缺点：不利于seo，导航不可用，如果一定要导航需要自行实现前进、后退。页面复杂度提高很多。



### 父子组件生命周期钩子执行顺序是什么？

1. 加载渲染过程
   + 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
2. 子组件更新过程
   + 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
3. 父组件更新过程
   + 父 beforeUpdate -> 父 updated
4. 销毁过程
   + 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed



### vue更新数组时触发视图更新的方法？

1. push()、pop()、shift()、unshift()、splice()、sort()、reverse()。



### 什么是 vue 生命周期？有什么作用？

1. 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。
2. 同时在这个过程中也会运行一些叫做 生命周期钩子 的函数，这给了用户在不同阶段添加自己的代码的机会。



### vue生命周期的理解？

1. 总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。
2. 创建前/后： 在beforeCreated阶段，vue实例的挂载元素el还没有。
3. 载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
4. 更新前/后：当data变化时，会触发beforeUpdate和updated方法。
5. 销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在。



### created和mounted的区别？

1. created：在模板渲染成html前调用（不能获取DOM元素），即通常初始化某些属性值，然后再渲染成视图。
2. mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。



### vuex是什么？vuex有哪几种属性？

1. vuex是vue框架中状态管理，vuex中有五种属性：
   + state：基本数据(数据源存放地)。
   + getters：从基本数据派生出来的数据。
   + mutations： 提交更改数据的方法，同步。
   + actions：像一个装饰器，包裹mutations，使之可以异步。
   + modules：模块化Vuex。



### v-if 和v-for优先级？

1. 在vue2中应尽量避免二者同时使用
   + 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。
   + Vue2官方推荐的写法：采用计算属性去生成你要遍历的数组， 在computed里先做好判断，这里过滤的成本远比v-if的成本低。
2. 在vue3中
   + 当 `v-if` 与 `v-for` 一起使用时，`v-if` 具有比 `v-for` 更高的优先级。
   + 在vue3中官方推荐的写法：把 v-for 移动到容器元素上,例如ul,ol 或者外面包裹一层 template。



### vue 事件中如何使用 event 对象?

1. 获取事件对象，方法参数传递 $event 。注意在事件中要使用 $ 符号。

   ```vue
   <button @click="foo($event)">button</button>
   ```



### Computed、Watch、Methods 的区别?

1. computed计算属性 : 依赖其它属性值,并且computed的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。
2. watch侦听器 : 更多的是观察的作用,无缓存性。类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。
3. methods 里面是用来定义函数的，它需要手动调用才能执行。而不像 watch 和 computed 那样，“自动执行”预先定义的函数。
4. 运用场景
   + 当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed的缓存特性,避免每次获取值时,都要重新计算。
   + 当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch。
5. 多个因素影响一个显示，用Computed，一个因素的变化影响多个其他因素显示，用Watch。





### route和router的区别?

1. route是路由信息对象，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
2. router是路由实例：对象包括了路由的跳转方法，钩子函数等



### params和query的区别？

1. params是路由的一部分,必须要在路由后面添加参数名。query是拼接在url后面的参数，没有也没关系。
2. query要用path来引入，params要用name来引入。
3. query刷新不会丢失query里面的数据 params刷新 会 丢失 params里面的数据。



### Vue2中注册在router-link上事件无效解决方法？

1. 使用 @click.native 。
2. 原因：router-link会阻止click事件，.native指直接监听一个原生事件。



### 怎样理解 Vue 的单项数据流?

1. 数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父组件的状态，从而导致你的应用的数据流向难以理解。
2. 在子组件直接用 v-model 绑定父组件传过来的 props 这样是不规范的写法，开发环境会报警告，如果实在要改变父组件的 props 值可以再data里面定义一个变量，并用 prop 的值初始化它，之后用$emit 通知父组件去修改。



### delete和Vue.delete删除数组的区别？

1. delete： delete会删除数组的值（变成了empty），但是它依然会在内存中占位置。
2. Vue.delete：vue.delete会删除数组在内存中的占位。



### Vuex 页面刷新数据丢失怎么解决？

1. 需要做 vuex 数据持久化，一般使用本地储存的方案来保存数据，可以自己设计存储方案，也可以使用第三方插件。
2. 持久化方案
   + 三方插件： vuex-persist，它是为 Vuex 持久化储存而生的一个插件。不需要你手动存取 storage，而是直接将状态保存至 cookie 或者 localStorage中。
   + 手动存储到cookie 、 localStorage或者sessionStorage中。



### 简单说说负载均衡？

1. 多台服务器共同协作，不让其中某一台或几台超额工作，发挥服务器的最大作用。
2. 反向代理负载均衡（Nginx）：
   + 访问统一的服务器，由服务器进行调度访问实际的某个服务器。
   + 对统一的服务器要求大，性能受到服务器群的数量。



### 逐进增强和优雅降级?

1. 逐进增强（迭代更新）：
   + 针对低版本浏览器进行构建页面，保证最基本的功能。
   + 然后再针对高版本浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
2. 优雅降级（向下兼容）：
   + 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。



### 项目性能优化常见方式？

1. 减少 HTTP 请求数、减少 DNS 查询。
2. 使用 CDN、避免重定向。
3. 减少 DOM 元素数量、减少 DOM 操作。
4. 使用外部 JavaScript 和 CSS、压缩 JavaScript、CSS、字体、图片等。
5. 优化 CSS Sprite，使用 iconfont、避免图片 src 为空、做图片懒加载。
6. 多域名分发划分内容到不同域名、尽量减少 iframe 使用。
7. 把样式表放在 link 中、把 JavaScript 放在页面底部。



### SPA首屏加载慢如何解决？

1. 安装动态懒加载所需插件；
2. 使用CDN资源。

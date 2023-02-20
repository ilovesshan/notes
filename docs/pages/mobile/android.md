# Android基础

[ Android 入门教程](https://www.runoob.com/w3cnote/android-tutorial-intro.html)

[ Android 开发者指南](https://developer.android.google.cn/guide?hl=zh-cn)

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



[搞懂androidx的前世今生](https://blog.csdn.net/dodod2012/article/details/123551206)



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



### 4、中级控件

#### Drawable图片资源

​		图片资源是最简单的Drawable资源.只要把*.png,*.jpg,*.gif 等格式的图片放入目录下面就可以使用，Android SDK会在编译时自动加载图片，并在R资源清单中生成索引。

Drawable图片资源根据屏幕分辨率做适配

| 密度类型             | 分辨率(px)  | 屏幕密度(dpi) |
| -------------------- | ----------- | ------------- |
| （低密度）ldpi       | 240 x 320   | 120           |
| （中密度）mdpi       | 320 x 480   | 160           |
| （高密度）hdpi       | 480 x 800   | 240           |
| （超高密度）xhdpi    | 720 x 1280  | 320           |
| （超超高密度）xxhdpi | 1080 x 1920 | 480           |



#### shape形状

可以通过shape来绘制一些例如矩形，椭圆包含边框颜色，背景渐变色，形状大小以及边距等等。

- shape

  形状可绘制对象。这必须是根元素。android:shape取值：rectangle(默认)，oval，line，ring四种。

- corners

  为形状产生圆角。仅当形状为矩形时适用。

- gradient

  填充形状的渐变色，android:type取值：linear(默认，线性渐变)，radial(径向渐变)，sweep(流线型渐变)

- padding

  要应用到包含视图元素的内边距（这会填充视图内容的位置，而非形状）。

- size

  形状的大小。

- solid

  用于填充形状的纯色。

- stroke

  形状的笔划中线(边框)。

圆形

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="#8ce605" />
    <padding android:right="10dp" android:left="10dp" android:top="10dp" android:bottom="10dp"/>
</shape>
```

矩形

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#8ce605" />
    <stroke android:width="2dp" android:color="#00e6de" />
    <corners android:radius="20dp" />
</shape>
```

背景渐变

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient android:type="linear" android:startColor="#38e615" android:endColor="#05e6e6"/>
</shape>
```



#### CheckBox

```xml
<!-- 通过  android:button属性进行自定义选中和非选择图形 -->
<CheckBox
          android:id="@+id/cb_is_agree"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:button="@drawable/checkbox_selector"
          android:text="是否同意协议" />
```

```java
// 设置选中监听事件
checkBox.setOnCheckedChangeListener((buttonView, isChecked) -> {});
```



#### RadioGroup

```xml
<RadioGroup
            android:id="@+id/rg_gender"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

    <RadioButton
                 android:tag="MALE"
                 android:layout_width="0dp"
                 android:layout_height="wrap_content"
                 android:layout_weight="1"
                 android:button="@drawable/checkbox_selector"
                 android:padding="10dp"
                 android:text="男" />

    <RadioButton
                 android:tag="FEMALE"
                 android:layout_width="0dp"
                 android:layout_height="wrap_content"
                 android:layout_weight="1"
                 android:button="@drawable/checkbox_selector"
                 android:padding="10dp"
                 android:text="女" />

</RadioGroup>
```

```java
// 设置选中监听事件
((RadioGroup) findViewById(R.id.rg_gender)).setOnCheckedChangeListener((group, checkedIndex) -> {
    // 通过索引获取被选中的元素
    RadioButton selectedRadioButton = (RadioButton) group.getChildAt(checkedIndex - 1);
    Toast.makeText(RadioGroupActivity.this, selectedRadioButton.getTag().toString(), Toast.LENGTH_SHORT).show();
});
```



#### Switch

```xml
<Switch
        android:id="@+id/sw_is_agree"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="同意协议?" />
```

```java
// 设置选中监听事件
((Switch) findViewById(R.id.sw_is_agree)).setOnCheckedChangeListener((buttonView, isChecked) -> {
    String checkResult = isChecked ? "选中啦" : "未选中";
    Toast.makeText(SwitchBoxActivity.this, checkResult, Toast.LENGTH_SHORT).show();
});
```

自定义Switch样式，实现IOS风格。

Switch 主要有两个属性构成：上面圆形的滑块和下面的滑道。 android: thumb 对应的滑块 ，android: track 对应的滑道。

+ 定义滑块

  `switch_thumb_selector.xml`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <selector xmlns:android="http://schemas.android.com/apk/res/android">
      <item android:drawable="@drawable/switch_thumb_selected" android:state_checked="true" />
      <item android:drawable="@drawable/switch_thumb_normal" />
  </selector>
  ```

  `switch_thumb_selected`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <shape xmlns:android="http://schemas.android.com/apk/res/android"
         android:shape="oval">
      <solid android:color="#ffffff" />
      <size
            android:width="30dp"
            android:height="30dp" />
  </shape>
  ```

  `switch_thumb_normal`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <shape android:shape="oval" xmlns:android="http://schemas.android.com/apk/res/android">
      <solid android:color="#ffffff"/>
      <size android:height="30dp" android:width="30dp"/>
  </shape>
  ```

  

+ 定义滑道

  `switch_track_selector`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <selector xmlns:android="http://schemas.android.com/apk/res/android">
      <item android:drawable="@drawable/switch_track_selected" android:state_checked="true" />
      <item android:drawable="@drawable/switch_track_normal" />
  </selector>
  ```

  `switch_track_selected`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <shape xmlns:android="http://schemas.android.com/apk/res/android">
      <corners android:radius="80dp"/>
      <solid android:color="#00ff00"/>
      <size android:width="60dp" android:height="30dp"/>
  </shape>
  ```

  `switch_track_normal`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <shape xmlns:android="http://schemas.android.com/apk/res/android">
      <corners android:radius="80dp"/>
      <solid android:color="#c0c0c0"/>
      <size android:width="60dp" android:height="30dp"/>
  </shape>
  
  ```

  

+ 使用

  ```xml
  <Switch
          android:id="@+id/sw_is_agree"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:thumb="@drawable/switch_thumb_selector"
          android:track="@drawable/switch_track_selector"
          />
  ```

  

#### EditText

```xml
<EditText
          android:id="@+id/et_password"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:background="@drawable/edit_text_selector"
          android:hint="请输入密码"
          android:inputType="numberPassword"
          />
```

自定义样式

```xml
<!-- edit_text_selector -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/edit_text_focus" android:state_focused="true" />
    <item android:drawable="@drawable/edit_text_normal" />
</selector>


<!-- edit_text_focus -->
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke android:width="1dp" android:color="#00ff00" />
    <corners android:radius="5dp" />
    <padding android:left="10dp" android:top="5dp" android:bottom="5dp"/>
</shape>


<!-- edit_text_normal -->
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke android:width="1dp" android:color="#eeeeee" />
    <corners android:radius="5dp" />
    <padding android:left="10dp" android:top="5dp" android:bottom="5dp"/>
</shape>
```



```java
/**
* @param editText 目标
* @param hintText 设置hint文字
* @param hintSize hint 文字大小
*/
public void setEditTextHintTextSize(EditText editText, int hintSize, String hintText) {
    // 新建一个可以添加属性的文本对象
    SpannableString ss = new SpannableString(hintText);
    // 新建一个属性对象,设置文字的大小
    AbsoluteSizeSpan ass = new AbsoluteSizeSpan(hintSize, true);
    // 附加属性到文本
    ss.setSpan(ass, 0, ss.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    // 设置hint
    editText.setHint(ss);
}


/**
* @param editText 目标
* @param hintText 设置hint文字
* @param color    设置hint颜色
*/
static void setEditTextHintTextColor(EditText editText, String hintText, String color) {
    SpannableString ss = new SpannableString(hintText);
    ForegroundColorSpan foregroundColorSpan = new ForegroundColorSpan(Color.parseColor(color));
    ss.setSpan(foregroundColorSpan, 0, hintText.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    editText.setText(ss);
}
```

点击空白区域关闭软键盘并让EditText释放资源

```java
public class EditTextActivity extends AppCompatActivity {
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                //获取当前获得焦点的View
                View view = getCurrentFocus();
                //调用方法判断是否需要隐藏键盘
                KeyboardUtils.hideKeyboard(ev, view, this);
                break;
        }
        return super.dispatchTouchEvent(ev);
    }

}
```

```java
public class KeyboardUtils {

    /**
* 根据传入控件的坐标和用户的焦点坐标，判断是否隐藏键盘，如果点击的位置在控件内，则不隐藏键盘
*
* @param view  控件view
* @param event 焦点位置
* @return 是否隐藏
*/
    public static void hideKeyboard(MotionEvent event, View view, Activity activity) {
        try {
            if (view != null && view instanceof EditText) {
                int[] location = {0, 0};
                view.getLocationInWindow(location);
                int left = location[0], top = location[1], right = left + view.getWidth(), bootom = top + view.getHeight();
                // （判断是不是EditText获得焦点）判断焦点位置坐标是否在控件所在区域内，如果位置在控件区域外，则隐藏键盘
                if (event.getRawX() < left || event.getRawX() > right || event.getY() < top || event.getRawY() > bootom) {
                    // 释放当前 EditText焦点
                    view.clearFocus();

                    // 隐藏键盘
                    IBinder token = view.getWindowToken();
                    InputMethodManager inputMethodManager = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
                    inputMethodManager.hideSoftInputFromWindow(token, InputMethodManager.HIDE_NOT_ALWAYS);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



#### ProgressBar



#### SeekBar



#### RatingBar 



#### AlterDialog

```java
AlertDialog.Builder builder = new AlertDialog.Builder(this);
builder.setTitle("卸载应用");
// 点击空白区域是否可关闭(默认true)
builder.setCancelable(false);
builder.setIcon(R.mipmap.ic_launcher_round);
builder.setMessage("亲亲，真的要卸载我吗？");
builder.setPositiveButton("残忍卸载", (DialogInterface dialog, int which) -> {
    Toast.makeText(this, "拜拜啦，小主！", Toast.LENGTH_SHORT).show();
});
builder.setNegativeButton("我再想想", (DialogInterface dialog, int which) -> {
    Toast.makeText(this, "继续陪你一万年!", Toast.LENGTH_SHORT).show();
});
builder.create().show();
```



#### DatePickerDialog

```java
Calendar calendar = Calendar.getInstance();
DatePickerDialog datePickerDialog = new DatePickerDialog(this, (view, year, month, dayOfMonth) -> {
    String text = String.format("您选择时间是：%d年%d月%d日", year, month, dayOfMonth);
    Toast.makeText(CusDialogActivity.this, text, Toast.LENGTH_SHORT).show();
}, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, calendar.get(Calendar.DAY_OF_MONTH));
datePickerDialog.show();
```



#### TimePickerDialog

```java
TimePickerDialog timePickerDialog = new TimePickerDialog(this, (TimePicker view, int hourOfDay, int minute) -> {
    String text = String.format("您选择的时间是：%d时%d分", hourOfDay, minute);
    Toast.makeText(CusDialogActivity.this, text, Toast.LENGTH_SHORT).show();
}, 15, 20, true);
timePickerDialog.show();
```



#### BottomSheetDialog

```java
BottomSheetDialog bottomSheetDialog = new BottomSheetDialog(CusDialogActivity.this);
// 点击空白区域是否可关闭(默认true)
bottomSheetDialog.setCanceledOnTouchOutside(true);
View view = LayoutInflater.from(CusDialogActivity.this).inflate(R.layout.gender_bottom_sheet, null);
initInnerView(view, bottomSheetDialog);
// 显示自定义xml布局
bottomSheetDialog.setContentView(view);
bottomSheetDialog.show();
```

```java
private void initInnerView(View view, BottomSheetDialog bottomSheetDialog) {
    view.findViewById(R.id.btn_cancel).setOnClickListener(v -> {
        Toast.makeText(this, "取消", Toast.LENGTH_SHORT).show();
        bottomSheetDialog.cancel();
    });

    view.findViewById(R.id.btn_sure).setOnClickListener(v -> {
        Toast.makeText(this, "确定", Toast.LENGTH_SHORT).show();
    });

    view.findViewById(R.id.btn_camera).setOnClickListener(v -> {
        Toast.makeText(this, "相机拍照", Toast.LENGTH_SHORT).show();
    });

    view.findViewById(R.id.btn_photo_album).setOnClickListener(v -> {
        Toast.makeText(this, "相册选取", Toast.LENGTH_SHORT).show();
    });
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:orientation="vertical"
              android:padding="10dp">

    <LinearLayout
                  android:layout_width="match_parent"
                  android:layout_height="wrap_content"
                  android:layout_marginBottom="10dp"
                  android:paddingLeft="10dp"
                  android:paddingRight="10dp">

        <TextView
                  android:id="@+id/btn_cancel"
                  android:layout_width="0dp"
                  android:layout_height="wrap_content"
                  android:layout_weight="1"
                  android:text="取消" />

        <TextView
                  android:id="@+id/btn_sure"
                  android:layout_width="0dp"
                  android:layout_height="wrap_content"
                  android:layout_weight="1"
                  android:gravity="right"
                  android:text="确定" />
    </LinearLayout>

    <TextView
              android:id="@+id/btn_camera"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:layout_marginBottom="10dp"
              android:gravity="center"
              android:padding="10dp"
              android:text="相机拍照" />

    <TextView
              android:id="@+id/btn_photo_album"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:layout_marginBottom="10dp"
              android:gravity="center"
              android:padding="10dp"
              android:text="相册选取" />
</LinearLayout>
```



#### ProgressDialog

```java
ProgressDialog dialog = new ProgressDialog(CusDialogActivity.this);
dialog.setTitle("");
dialog.setMessage("正在努力加载中...");
dialog.show();
new Timer().schedule(new TimerTask() {
    @Override
    public void run() {
        dialog.dismiss();
    }
}, 5000);
```



#### NotificationManager

```java
private NotificationManager notificationManager = (NotificationManager)getActivity().getSystemService(Context.NOTIFICATION_SERVICE);
final Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setData(Uri.parse("http://www.baidu.com"));
final PendingIntent activity = PendingIntent.getActivity(getActivity(), 0, intent, 0);

// android10之后 需要创建通知通道
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    final NotificationChannel notificationChannel = new NotificationChannel("T1", getActivity().getPackageName(), NotificationManager.IMPORTANCE_HIGH);
    notificationManager.createNotificationChannel(notificationChannel);
    final Notification notification = new Notification.Builder(getActivity(), "T1")
        .setContentTitle("今天放假啊")
        .setContentText("国务院办公厅印发《关于2023年部分节假日安排的通知》，哪天放假、怎么调休？")
        .setTicker("放假通知")
        .setSmallIcon(R.mipmap.ic_launcher)
        .setWhen(System.currentTimeMillis())
        .setAutoCancel(true)
        .setContentIntent(activity)
        .build();
    notificationManager.notify(1, notification);
} else {
    final Notification notification = new Notification.Builder(getActivity())
        .setContentTitle("今天放假啊")
        .setContentText("国务院办公厅印发《关于2023年部分节假日安排的通知》，哪天放假、怎么调休？")
        .setTicker("放假通知")
        .setSmallIcon(R.mipmap.ic_launcher)
        .setWhen(System.currentTimeMillis())
        .setAutoCancel(true)
        .setContentIntent(activity)
        .setDefaults(Notification.DEFAULT_LIGHTS | Notification.DEFAULT_VIBRATE)
        .build();
    notificationManager.notify(1, notification);
}
```



#### PopupMenu

弹出式菜单

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@+id/download" android:title="下载"/>
    <item android:id="@+id/share" android:title="分享"/>
</menu>
```

```java
final PopupMenu popupMenu = new PopupMenu(RetrofitActivity.this, v);
popupMenu.getMenuInflater().inflate(R.menu.popu_menu, popupMenu.getMenu());
popupMenu.show();
popupMenu.setOnMenuItemClickListener(item -> {
    switch (item.getItemId()) {
        case R.id.download:
            Toast.makeText(RetrofitActivity.this, "下载图片", Toast.LENGTH_SHORT).show();
            break;
        case R.id.share:
            Toast.makeText(RetrofitActivity.this, "分享图片", Toast.LENGTH_SHORT).show();
            break;
    }
    return false;
});
```



### 5、高级控件

#### Adapter

​	适配器是 UI 组件和数据之间的桥梁，它帮助我们将数据填充到 UI 组件当中，实现了一个典型的 MVC 模式。我们可以分别编写独立的 UI 样式和数据模型，至于数据如何与 UI 组件绑定都由 Adapter 帮我们完成，这样的好处就是做到 UI 和数据的解耦。

![](https://www.runoob.com/wp-content/uploads/2015/09/77919389.jpg)

+ ArrayAdapter

  ```java
  private final String[] fruitNames = new String[]{"草莓", "橘子", "蓝莓", "猕猴桃", "苹果", "樱桃"};
  // ArrayAdapter 使用
  final ArrayAdapter<String> arrayAdapter = new ArrayAdapter<>(this, R.layout.fruit_item, fruitNames);
  ```

  

+ SimpleAdapter

  ```java
  private final String[] fruitNames = new String[]{"草莓", "橘子", "蓝莓", "猕猴桃", "苹果", "樱桃"};
  private final int[] fruitIcons = new int[]{R.drawable.cm, R.drawable.jz, R.drawable.lm, R.drawable.mht, R.drawable.pg, R.drawable.yt};
  
  // SimpleAdapter使用
  final ArrayList<Map<String, Object>> fruitList = new ArrayList<>();
  for (int i = 0; i < fruitNames.length; i++) {
      final HashMap<String, Object> hashMap = new HashMap<>();
      hashMap.put("icon", fruitIcons[i]);
      hashMap.put("name", fruitNames[i]);
      fruitList.add(hashMap);
  }
  
  final SimpleAdapter simpleAdapter = new SimpleAdapter(
      MainActivity.this, fruitList, R.layout.fruit_item_icon,
      new String[]{"icon", "name"},
      new int[]{R.id.icon, R.id.name,}
  );
  ```

  

+ BaseAdapter

  ```java
  public class Fruit {
      public int icon;
      public String name;
      public String desc;
  
      private static final String[] fruitNames = new String[]{"葡萄", "橘子", "蓝莓", "猕猴桃", "苹果", "樱桃"};
      private static final int[] fruitIcons = new int[]{R.drawable.pt, R.drawable.jz, R.drawable.lm, R.drawable.mht, R.drawable.pg, R.drawable.yt};
      private static final String[] fruitDesc = new String[]{
          "葡萄，古作蒲陶 ，是葡萄屬（学名：Vitis）植物的通称，是一类常见的落叶木质藤本植物，其果实是浆果类水果。葡萄可以生吃，其色美、气香、味可口，西方主要用來酿造葡萄酒，東方則是習慣直接食用並培育出口感較佳的品種。",
          "橘子（学名：Citrus reticulata），或写作桔子 ，芸香科柑橘屬的一种水果，原產自中國。閩南語稱橘為柑仔，西南官话区的各方言中呼为“柑子”或“柑儿”，也有一些方言称之为“橘柑”。",
          "蓝莓（学名：Vacciniumspp.）是杜鹃花科、越橘属蓝果类型植物的俗称。多年生低，野生蓝莓在世界各地广泛分布。主产于美国，在中国主要分布于大兴安岭和小兴安岭林区。蓝莓生长最适的温度为13-30℃。",
          "猕猴桃，也称奇异果，是一种具有丰富的氨基酸与矿物质的水果。因猕猴喜食，故名猕猴桃，亦有说法是因为果皮覆毛，貌似猕猴而得名。",
          "苹果起源——天山野果林 中亚地带的新疆天山野果林，是栽培苹果的祖先林，之后苹果沿着丝绸之路被人类驯化培育。",
          "樱桃（学名：Prunusspp.）是蔷薇科、李属几种植物的统称。世界上作为栽培的，其中在生产上起重要作用的是樱桃、欧洲甜樱桃和欧洲酸樱桃。",
      };
  
      public Fruit() {
      }
  
      public Fruit(int icon, String name, String desc) {
          this.icon = icon;
          this.name = name;
          this.desc = desc;
      }
  
      public static List<Fruit> getDefaultFruitList() {
          List<Fruit> list = new ArrayList<>();
          for (int i = 0; i < fruitNames.length; i++) {
              list.add(new Fruit(fruitIcons[i], fruitNames[i], fruitDesc[i]));
          }
          return list;
      }
  }
  ```

  ```java
  
  public class FruitAdapter extends BaseAdapter {
      private Context context;
      private List<Fruit> fruits;
  
      public FruitAdapter(Context context, List<Fruit> fruits) {
          this.context = context;
          this.fruits = fruits;
      }
  
      @Override
      public int getCount() {
          return fruits.size();
      }
  
      @Override
      public Object getItem(int position) {
          return fruits.get(position);
      }
  
      @Override
      public long getItemId(int position) {
          return position;
      }
  
      @Override
      public View getView(int position, View convertView, ViewGroup parent) {
          final View view = LayoutInflater.from(context).inflate(R.layout.fruit_item_icon_desc, null);
  
          final ImageView imageView = view.findViewById(R.id.icon);
          final TextView name = view.findViewById(R.id.name);
          final TextView desc = view.findViewById(R.id.desc);
  
          imageView.setImageResource(fruits.get(position).icon);
          name.setText(fruits.get(position).name);
          desc.setText(fruits.get(position).desc);
          return view;
      }
  }
  
  ```

  

  ```java
  // BaseAdapter使用
  Adapter fruitAdapter = new FruitAdapter(this, Fruit.getDefaultFruitList())
  ```

#### ListView

```java
ListView listView = findViewById(R.id.fruit_list);
listView.setAdapter(new FruitAdapter(this, Fruit.getDefaultFruitList()));
```



#### GridView

- **android:columnWidth**：设置列的宽度
- **android:gravity**：组件对其方式
- **android:horizontalSpacing**：水平方向每个单元格的间距
- **android:verticalSpacing**：垂直方向每个单元格的间距
- **android:numColumns**：设置列数
- **android:stretchMode**：设置拉伸模式，可选值如下： **none**：不拉伸；**spacingWidth**：拉伸元素间的间隔空隙 **columnWidth**：仅仅拉伸表格元素自身 **spacingWidthUniform**：既拉元素间距又拉伸他们之间的间隔空隙。



#### ViewPager

ViewPager就是一个简单的页面切换组件，我们可以往里面填充多个View，然后我们可以左 右滑动，从而切换不同的View。

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.viewpager.widget.ViewPager xmlns:android="http://schemas.android.com/apk/res/android"
                                     android:id="@+id/view_pager"
                                     android:layout_width="match_parent"
                                     android:layout_height="275dp" />
```

```java
public class ViewPagerActivity extends AppCompatActivity implements ViewPager.OnPageChangeListener {

    private static final String TAG = "ViewPagerActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_pager);

        initViewAndBindEvent();

    }

    private void initViewAndBindEvent() {
        final ViewPager viewPager = findViewById(R.id.view_pager);
        viewPager.setAdapter(new ViewPagerAdapter(this, GoodsMock.goodsImageId));

        viewPager.addOnPageChangeListener(this);
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
        // 页面滑动时触发: position当前所在的界面, positionOffset 偏移值(0-1), positionOffsetPixels 偏移像素
        Log.d(TAG, String.format("position = %d, positionOffset = %f, positionOffsetPixels = %d, ", position, positionOffset, positionOffsetPixels));
    }

    @Override
    public void onPageSelected(int position) {
        // 页面滑动结束触发: position 选中的界面
        Toast.makeText(this, GoodsMock.goodsName[position], Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onPageScrollStateChanged(int state) {
        // 滑动状态改变的时候触发： 0 = 不滑动, 1 = 正在滑动, 2 = 滑动结束。
        Log.d(TAG, String.format("state = %d", state));
    }
```



+ PagerAdapter的使用

  + **getCount()**:获得viewpager中有多少个view
  + **destroyItem()**:移除一个给定位置的页面。适配器有责任从容器中删除这个视图。 这是为了确保在finishUpdate(viewGroup)返回时视图能够被移除。

  而另外两个方法则是涉及到一个key的东东：

  - **instantiateItem()**: ①将给定位置的view添加到ViewGroup(容器)中,创建并显示出来 ②返回一个代表新增页面的Object(key),通常都是直接返回view本身就可以了,当然你也可以 自定义自己的key,但是key和每个view要一一对应的关系
  - **isViewFromObject()**: 判断instantiateItem(ViewGroup, int)函数所返回来的Key与一个页面视图是否是 代表的同一个视图(即它俩是否是对应的，对应的表示同一个View),通常我们直接写 return view == object!

  ```java
  public class ViewPagerAdapter extends PagerAdapter {
      private Context context;
      private List<ImageView> imageViews = new ArrayList<>();
  
      public ViewPagerAdapter(Context context, int[] images) {
          this.context = context;
  
          for (int i = 0; i < images.length; i++) {
              final ImageView imageView = new ImageView(context);
              imageView.setImageResource(images[i]);
              imageView.setScaleType(ImageView.ScaleType.FIT_XY);
              final ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
              imageView.setLayoutParams(layoutParams);
              imageViews.add(imageView);
          }
      }
  
      @Override
      public int getCount() {
          return imageViews.size();
      }
  
      @Override
      public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
          return view == object;
      }
  
      @NonNull
      @Override
      public Object instantiateItem(@NonNull ViewGroup container, int position) {
          final ImageView imageView = imageViews.get(position);
          container.addView(imageView);
          return imageView;
      }
  
      @Override
      public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
          container.removeView(imageViews.get(position));
      }
  }
  ```

#### PagerTabStrip

翻页标签

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.viewpager.widget.ViewPager xmlns:android="http://schemas.android.com/apk/res/android"
                                     android:id="@+id/view_pager"
                                     android:layout_width="match_parent"
                                     android:layout_height="275dp">

    <androidx.viewpager.widget.PagerTabStrip
                                             android:id="@+id/page_tab_strip"
                                             android:layout_width="wrap_content"
                                             android:layout_height="wrap_content" />

</androidx.viewpager.widget.ViewPager>
```

```java
public class ViewPagerAdapter extends PagerAdapter {
    // ...

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        // 返回分页标题
        return titles[position];
    }
}
```



#### RecycleView

```java
public abstract class BaseRecycleAdapter extends RecyclerView.Adapter<BaseRecycleAdapter.InnerHolder> {
    private List<PictureInfo> pictureInfoList;
    private OnItemClickListener onItemClickListener;


    public BaseRecycleAdapter(List<PictureInfo> pictureInfoList) {
        this.pictureInfoList = pictureInfoList;
    }

    @NonNull
    @Override
    public BaseRecycleAdapter.InnerHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return getSubView(parent, viewType);
    }

    public abstract InnerHolder getSubView(ViewGroup parent, int viewType);

    @Override
    public void onBindViewHolder(@NonNull BaseRecycleAdapter.InnerHolder holder, int position) {
        holder.setData(pictureInfoList.get(position));
    }

    @Override
    public int getItemCount() {
        return pictureInfoList.size();
    }

    public class InnerHolder extends RecyclerView.ViewHolder {
        public ImageView icon;
        public TextView title;

        public InnerHolder(@NonNull View itemView) {
            super(itemView);
            icon = itemView.findViewById(R.id.icon);
            title = itemView.findViewById(R.id.title);

            itemView.setOnClickListener(v -> {
                onItemClickListener.click(getBindingAdapterPosition());
            });
        }

        public void setData(PictureInfo info) {
            icon.setImageResource(info.icon);
            title.setText(info.title);
        }
    }


    public interface OnItemClickListener {
        void click(int position);
    }

    public void setOnItemClickListener(OnItemClickListener onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }
}
```

```java
private void setAdapterClickListener() {
    adapter.setOnItemClickListener(new BaseRecycleAdapter.OnItemClickListener() {
        @Override
        public void click(int position) {
            Toast.makeText(MainActivity.this, "第" + position + "项图片被点击", Toast.LENGTH_SHORT).show();
        }
    });
}
```



+ ListView

  ```java
  public class ListViewAdapter extends BaseRecycleAdapter {
  
      public ListViewAdapter(List<PictureInfo> pictureInfoList) {
          super(pictureInfoList);
      }
  
      @Override
      public InnerHolder getSubView(ViewGroup parent, int viewType) {
          final View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_picture_list, parent, false);
          return new InnerHolder(view);
      }
  }
  
  ```

  ```java
  // 设置 ListView布局管理器
  private void setListViewLayout(boolean isVertical, boolean reverse) {
      adapter = new ListViewAdapter(getDefaultData());
      final LinearLayoutManager layoutManager = new LinearLayoutManager(this);
      layoutManager.setReverseLayout(reverse);
      layoutManager.setOrientation(isVertical ? RecyclerView.VERTICAL : RecyclerView.HORIZONTAL);
      recycleView.setLayoutManager(layoutManager);
      recycleView.setAdapter(adapter);
  
      setAdapterClickListener();
  }
  ```

  

+ GridView

  ```java
  public class GridViewAdapter extends BaseRecycleAdapter {
  
  
      public GridViewAdapter(List<PictureInfo> pictureInfoList) {
          super(pictureInfoList);
      }
  
      @Override
      public InnerHolder getSubView(ViewGroup parent, int viewType) {
          final View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_picture_grid, parent, false);
          return new InnerHolder(view);
      }
  }
  ```

  ```java
  // 设置 GridView布局管理器
  private void setGridViewLayout(boolean isVertical, boolean reverse) {
      adapter = new GridViewAdapter(getDefaultData());
      final GridLayoutManager layoutManager = new GridLayoutManager(this, 3);
      layoutManager.setReverseLayout(reverse);
      layoutManager.setOrientation(isVertical ? RecyclerView.VERTICAL : RecyclerView.HORIZONTAL);
      recycleView.setLayoutManager(layoutManager);
      recycleView.setAdapter(adapter);
  
      setAdapterClickListener();
  }
  ```

  

+ StaggerView

  ```java
  public class StaggerViewAdapter extends BaseRecycleAdapter {
  
  
      public StaggerViewAdapter(List<PictureInfo> pictureInfoList) {
          super(pictureInfoList);
      }
  
      @Override
      public InnerHolder getSubView(ViewGroup parent, int viewType) {
          final View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_picture_stagger, parent, false);
          return new InnerHolder(view);
      }
  }
  
  ```

  ```java
  // 设置 StaggerView布局管理器
  private void setStaggerViewLayout(boolean isVertical, boolean reverse) {
      adapter = new StaggerViewAdapter(getDefaultData());
      final StaggeredGridLayoutManager layoutManager = new StaggeredGridLayoutManager(2, isVertical ? RecyclerView.VERTICAL : RecyclerView.HORIZONTAL);
      layoutManager.setReverseLayout(reverse);
      recycleView.setLayoutManager(layoutManager);
      recycleView.setAdapter(adapter);
  
      setAdapterClickListener();
  }
  
  ```

  

## Activity - 活动

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



### 8、横竖屏解决方案

https://cloud.tencent.com/developer/article/1740063

默认情况下，手机屏幕旋转时会重新走一次生命周期，也就意味着之前那个`Activity`已经被销毁了，现在又重新创建了一个新的`Activity`，如果想实现屏幕旋转之后还是之前的 `Activity`，并不会生成一个新的。那需要进行一些配置。

```xml
<activity
          android:name=".ScreenChangeActivity"
          android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
          android:exported="true" />
```

```java
public class ScreenChangeActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = "ScreenChangeActivity";
    
    // 重写 onConfigurationChanged方法
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (newConfig.orientation == ActivityInfo.SCREEN_ORIENTATION_PORTRAIT) {
            // 屏幕当前状态: 竖屏
        } else {
             // 屏幕当前状态: 横屏
        }
    }
}
```

```java
final int orientation = getResources().getConfiguration().orientation;
if (orientation == ActivityInfo.SCREEN_ORIENTATION_PORTRAIT) {
    //竖屏, 强制为横屏
    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
}else {
    //横屏, 强制为竖屏
    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
}
```



## 数据持久化

### 1、sharedPreferences

`sharedPreferences`是一个轻量级的存储类，比较适合于保存一些简单的键值对数据，例如：保存软件配置参数。`sharedPreferences`用xml文件存放数据，文件存放在`/data/data/<package name>/shared_prefs`目录下）。

```java
SharedPreferences sharedPreferences = getSharedPreferences("userinfo", Activity.MODE_PRIVATE);
SharedPreferences.Editor editor = sharedPreferences.edit();
// 设置值
editor.putString("userId", "t123456");
editor.putString("username", "ilovesshan");
editor.apply();

// 获取值
String userId = sharedPreferences.getString("userId", "");
String username = sharedPreferences.getString("username", "");
```



### 2、Sqlite

`Sqlite` 是一个轻量级、内嵌式数据库，数据库服务器就寄宿在应用程序之中，无需网络配置和管理，`Sqlite` 的语法和市场上主流数据库 `mysql`、`oracle`大同小异。`sqllite`数据库文件保存在 `/data/user/0/<package name>/databases`目录下。

#### 创建数据库和删除数据库

```java
String dbName = getFilesDir() + "/user_info.db";
SQLiteDatabase sqLiteDatabase = openOrCreateDatabase(dbName, Activity.MODE_PRIVATE, null);
Toast.makeText(this, sqLiteDatabase != null ? "创建成功" : "创建失败", Toast.LENGTH_SHORT).show()
```

```java
String dbName = getFilesDir() + "/user_info.db";
Toast.makeText(this, deleteDatabase(dbName)  ? "删除成功" : "删除失败", Toast.LENGTH_SHORT).show()
```



#### SQLiteOpenHelper类

| 方法名称              | 方法用途                                                     |
| --------------------- | ------------------------------------------------------------ |
| onCreate()            | 创建数据库，数据库创建时自动调用                             |
| onUpgrade()           | 版本升级时调用                                               |
| close()               | 关闭所有打开的数据库对象                                     |
| execSQL()             | 可进行增删改操作, 不能进行查询操作                           |
| query()、rawQuery()   | 数据库查询                                                   |
| insert()              | 插入数据                                                     |
| delete()              | 删除数据                                                     |
| getWritableDatabase() | 创建或打开可以读/写的数据库，通过返回SQLiteDatabase对象对数据库进行操作 |
| getReadableDatabase() | 创建或打开可读的数据库，通过返回SQLiteDatabase对象对数据库进行操作 |

```java
public class DbConstant {
    public static final int DB_VERSION = 1;
    public static final String DB_NAME = "user.db";
    public static final String DB_TABLE_NAME_ACCOUNT = "account";
}

```

```java
public class DbSql {
    public static final String CREATE_TABLE_ACCOUNT = "create table " + DbConstant.DB_TABLE_NAME_ACCOUNT + "(\n" +
        "    username text(24) primary key not null,\n" +
        "    password text(24) not null,\n" +
        "    is_remember integer(1) not null,\n" +
        "    least_login_time text not null\n" +
        ");";
}

```

```java
public class DbManager extends SQLiteOpenHelper {
    private static final String TAG = "DbManager";

    private static DbManager mDbManager;
    private static SQLiteDatabase mReadDatabase;
    private static SQLiteDatabase mWriteDatabase;

    private DbManager(@Nullable Context context, @Nullable String name, int version) {
        super(context, name, null, version);
    }

    public static DbManager getInstance(@Nullable Context context, @Nullable String name, int version) {
        if (mDbManager == null) {
            synchronized (DbManager.class) {
                mDbManager = new DbManager(context, name, version);
            }
        }
        return mDbManager;
    }

    @Override
    public SQLiteDatabase getReadableDatabase() {
        if (mReadDatabase == null) {
            mReadDatabase = super.getReadableDatabase();
        }
        return mReadDatabase;
    }

    @Override
    public SQLiteDatabase getWritableDatabase() {
        if (mWriteDatabase == null) {
            mWriteDatabase = super.getWritableDatabase();
        }
        return mWriteDatabase;
    }

    @Override
    public void close() {
        if (mReadDatabase != null && mReadDatabase.isOpen()) mReadDatabase.close();
        if (mWriteDatabase != null && mWriteDatabase.isOpen()) mWriteDatabase.close();
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "onCreate: 创建数据库[当前版本: " + db.getVersion() + "]...");
        db.execSQL(DbSql.CREATE_TABLE_ACCOUNT);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.d(TAG, "onUpgrade: 数据库版本[" + oldVersion + "->" + newVersion + "]升级...");
    }
}

```



```java
public interface IRememberAccountModel {
    boolean saveAccount(Account account);

    boolean updateAccount(Account account);

    Account selectLeastAccount();

    Account selectAccountByUsername(String username);
}
```

```java
public class RememberAccountModel implements IRememberAccountModel {

    private Context mContext;
    private SQLiteDatabase mDb;


    public RememberAccountModel(Context context) {
        mContext = context;
        mDb = DbManager.getInstance(mContext, DbConstant.DB_NAME, DbConstant.DB_VERSION).getWritableDatabase();
    }

    @Override
    public boolean saveAccount(Account account) {
        Account findAccount = selectAccountByUsername(account.getUsername());
        if (findAccount.getUsername() == null) {
            ContentValues contentValues = new ContentValues();
            contentValues.put("username", account.getUsername());
            contentValues.put("password", account.getPassword());
            contentValues.put("is_remember", account.getRemember());
            contentValues.put("least_login_time", account.getLeastLoginTime());
            return mDb.insert(DbConstant.DB_TABLE_NAME_ACCOUNT, null, contentValues) > 0;
        } else {
            return updateAccount(account);
        }
    }

    @Override
    public boolean updateAccount(Account account) {
        ContentValues contentValues = new ContentValues();
        contentValues.put("username", account.getUsername());
        contentValues.put("password", account.getPassword());
        contentValues.put("is_remember", account.getRemember());
        contentValues.put("least_login_time", account.getLeastLoginTime());
        return mDb.update(DbConstant.DB_TABLE_NAME_ACCOUNT, contentValues, "username=?", new String[]{account.getUsername()}) > 0;
    }

    @Override
    public Account selectLeastAccount() {
        Cursor cursor = mDb.rawQuery("select * from " + DbConstant.DB_TABLE_NAME_ACCOUNT + " where is_remember = ? order by least_login_time desc limit 1", new String[]{"1"});
        if (cursor.moveToNext()) {
            @SuppressLint("Range") String username = cursor.getString(cursor.getColumnIndex("username"));
            @SuppressLint("Range") String password = cursor.getString(cursor.getColumnIndex("password"));
            @SuppressLint("Range") boolean isRemember = cursor.getInt(cursor.getColumnIndex("is_remember")) == 1;
            @SuppressLint("Range") String leastLoginTime = cursor.getString(cursor.getColumnIndex("least_login_time"));
            return new Account(username, password, isRemember, leastLoginTime);
        } else {
            return new Account();
        }
    }


    @Override
    public Account selectAccountByUsername(String name) {
        Cursor cursor = mDb.query(DbConstant.DB_TABLE_NAME_ACCOUNT, null, "username=?", new String[]{name}, null, null, null);
        if (cursor.moveToNext()) {
            @SuppressLint("Range") String username = cursor.getString(cursor.getColumnIndex("username"));
            @SuppressLint("Range") String password = cursor.getString(cursor.getColumnIndex("password"));
            @SuppressLint("Range") boolean isRemember = cursor.getInt(cursor.getColumnIndex("is_remember")) == 1;
            @SuppressLint("Range") String leastLoginTime = cursor.getString(cursor.getColumnIndex("least_login_time"));
            return new Account(username, password, isRemember, leastLoginTime);
        } else {
            return new Account();
        }
    }
}

```



#### Sqlite事务管理

```java
// 开启事务
sQLiteDatabase.beginTransaction();

// 事务成功
sQLiteDatabase.setTransactionSuccessful();

// 关闭事务
sQLiteDatabase.endTransaction();
```

```java
public long insertWithTransaction(User u1, User u2) {
    long u1AffectRow = 0;
    long u2AffectRow = 0;
    try {
        mWDB.beginTransaction();
        u1AffectRow = insert(u1);
        // 模拟业务异常
        int t = 10 / 0;
        u2AffectRow = insert(u2);
        mWDB.setTransactionSuccessful();
        return u1AffectRow + u2AffectRow;
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        mWDB.endTransaction();
    }
    return 0;
}
```



#### Sqlite数据库更新

由于后期需求更新与前期需求变更，不得不对于数据库中的表进行更新、添加或者删除，此时就牵涉到了数据库更新的问题，数据库更新办法：

+ 用户卸载 当前版本的 `app` 安装最新版本的 `app`。直接卸载对于老用户会造成数据丢失，对用户体验不好。

  

+ 做 `Sqlite` 数据库版本升级。当 `version`升级时(新版本大于现在的版本)，就会执行 `onUpgrade` 方法，不走 `onCreate`方法，当`version`版本升级过程为：`V1 -> V2 -> V3`。

  + 用户更新 `V1 -> V3`，走 `onUpgrade` 方法，不走 `onCreate`。
  + 用户更新 `V2 -> V3`，走 `onUpgrade` 方法，不走 `onCreate`。
  + 用户更新直接到`V3`，走 `onCreate` 方法，不走 `onUpgrade`。

开发中，更推荐做 `Sqlite` 数据库版本升级，不到万不得已不要使用 卸载`app`的手段，下面举例数据库版本升级解决方案：

```java
public class DbUpgradeManager extends SQLiteOpenHelper {
    private static final String TAG = "DbManager";

    public static final String DB_NAME = "sqlite_upgrade.db";
    public static final String DB_TABLE_NAME_ACCOUNT = "account";
    public static final String DB_TABLE_NAME_GOODS = "goods";

    // V1
    public static final String CREATE_TABLE_ACCOUNT = "create table " + DB_TABLE_NAME_ACCOUNT + "(\n" +
        "    username text(24) primary key not null,\n" +
        "    password text(24) not null,\n" +
        "    is_remember integer(1) not null,\n" +
        "    least_login_time text not null\n" +
        ");";


    // V2
    public static final String UPDATE_TABLE_ACCOUNT_STRUCTURE_01 = "alter table " + DB_TABLE_NAME_ACCOUNT + " add column phone text(11)";
    public static final String UPDATE_TABLE_ACCOUNT_STRUCTURE_02 = "alter table " + DB_TABLE_NAME_ACCOUNT + " add column address text(24)";


    // V3
    public static final String CREATE_TABLE_GOODS = "create table " + DB_TABLE_NAME_GOODS + "(\n" +
        "    goods_id text(32) primary key not null,\n" +
        "    goods_name text(24) not null,\n" +
        "    goods_price real not null\n" +
        ");";


    // V4
    public static final String DELETE_TABLE_GOODS = "drop table " + DB_TABLE_NAME_GOODS;


    // 数据库版本列表
    public static final int DB_V20230114_01 = 1;
    public static final int DB_V20230115_01 = 2;
    public static final int DB_V20230116_01 = 3;
    public static final int DB_V20230116_02 = 4;

    // 初始化版本
    public static final int DB_INIT_VERSION = DB_V20230114_01;

    // 最新版本
    public static final int DB_LAST_VERSION = DB_V20230116_02;

    private static DbUpgradeManager mDbManager;
    private static SQLiteDatabase mReadDatabase;
    private static SQLiteDatabase mWriteDatabase;

    private DbUpgradeManager(@Nullable Context context, @Nullable String name, int version) {
        super(context, name, null, version);
    }

    public static DbUpgradeManager getInstance(@Nullable Context context) {
        if (mDbManager == null) {
            synchronized (DbUpgradeManager.class) {
                mDbManager = new DbUpgradeManager(context, DB_NAME, DB_LAST_VERSION);
            }
        }
        return mDbManager;
    }

    @Override
    public SQLiteDatabase getReadableDatabase() {
        if (mReadDatabase == null) {
            mReadDatabase = super.getReadableDatabase();
        }
        return mReadDatabase;
    }

    @Override
    public SQLiteDatabase getWritableDatabase() {
        if (mWriteDatabase == null) {
            mWriteDatabase = super.getWritableDatabase();
        }
        return mWriteDatabase;
    }

    @Override
    public void close() {
        if (mReadDatabase != null && mReadDatabase.isOpen()) mReadDatabase.close();
        if (mWriteDatabase != null && mWriteDatabase.isOpen()) mWriteDatabase.close();
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "onCreate: 创建数据库[当前版本: " + db.getVersion() + "]...");
        upgradeVersion(db, DB_INIT_VERSION, DB_LAST_VERSION);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.d(TAG, "onUpgrade: 数据库版本[" + oldVersion + "->" + newVersion + "]升级...");
        // 加一原因： 当前版本的代码不需要更新
        upgradeVersion(db, (oldVersion + 1), newVersion);
    }

    // 数据库版本升级
    private void upgradeVersion(SQLiteDatabase db, int dbInitVersion, int dbLastVersion) {
        for (int version = dbInitVersion; version <= dbLastVersion; version++) {
            switch (version) {
                case DB_V20230114_01:
                    // V1 初始版本代码
                    db.execSQL(CREATE_TABLE_ACCOUNT);
                    break;
                case DB_V20230115_01:
                    // V2 版本代码
                    db.execSQL(UPDATE_TABLE_ACCOUNT_STRUCTURE_01);
                    db.execSQL(UPDATE_TABLE_ACCOUNT_STRUCTURE_02);
                    break;
                case DB_V20230116_01:
                    // V3 版本代码
                    db.execSQL(CREATE_TABLE_GOODS);
                    break;
                case DB_V20230116_02:
                    // V4 版本代码
                    db.execSQL(DELETE_TABLE_GOODS);
                    break;
            }
        }
    }
}
```



### 3、存储空间



#### 内外部存储空间

+ 内部存储空间

  app内部的一块存储控件，这块区域中的数据会随着app卸载而清空，其他app应用不能访问这块区域。`sharedPreferences`文件存放的位置也是在这块区域。

+ 外部存储空间

  android将外部存储空间分成两部分：外部私有存储空间，外部共享存储空间。

```java
// 内部存储空间
// /data/user/0/包名/files/custom.txt || /data/包名/files/custom.txt
String internalStoragePath = getFilesDir() + File.separator + "custom.txt";

// 外部私有存储空间 
// /storage/emulated/0/Android/data/包名/files/Download/custom.txt
String saveExternalPrivateStoragePath = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) + File.separator + "custom.txt";

// 外部共享存储空间 
// /storage/emulated/0/Download/custom.txt
String externalShareStoragePath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS) + File.separator + "custom.txt";
```



使用外部共享空间需要申请对应权限

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<application
             android:requestLegacyExternalStorage="true">
</application>
```

```java
public static final int PERMISSION_GRANTED = 0;
public static final int PERMISSION_DENIED = -1;


// android6.0(API23)之后需要 动态申请权限 
private void requestPermission() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        requestPermissions(new String[]{
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
        }, 0);
    }
}

@Override
public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == 0) {
        for (int i = 0; i < permissions.length; i++) {
            // 0 已授权
            // -1 拒绝授权
            Log.d(TAG, permissions[i] + "权限申请结果为: " + grantResults[i]);
        }
    }
}
```



```java
public class FileUtil {

    public static void saveText(String path, String data) {
        try (
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(path));
        ) {
            bufferedWriter.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String readText(String path) {
        StringBuilder result = new StringBuilder();
        try (
            BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
        ) {
            String line = "";
            while ((line = bufferedReader.readLine()) != null) {
                result.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result.toString();
    }
}

```



#### 存储卡上读写图片

保存图片

```java
String imagePath = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) + File.separator + "randimg.png";
Bitmap bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.randimg);
FileUtil.saveImage(imagePath, bitmap);
```



读取图片

```java
// Bitmap bm = FileUtil.readImage(imagePath);
// mImageView.setImageBitmap(bm);

mImageView.setImageURI(Uri.parse(imagePath));
```



```java
public static void saveImage(String path, Bitmap bitmap) {
    try (
        FileOutputStream outputStream = new FileOutputStream(path);
    ) {
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
    } catch (IOException e) {
        e.printStackTrace();
    }
}

public static Bitmap readImage(String path) {
    Bitmap bitmap = null;

    try (
        FileInputStream fileInputStream = new FileInputStream(path);
    ) {
        bitmap = BitmapFactory.decodeStream(fileInputStream);
    } catch (IOException e) {
        e.printStackTrace();
    }
    return bitmap;
}
```



### 4、Jetpack Room

room 持久性库在 SQLite 上提供了一个抽象层，以便在充分利用 SQLite 的强大功能的同时，能够流畅地访问数据库。具体来说，Room 具有以下优势：

- 针对 SQL 查询的编译时验证。
- 可最大限度减少重复和容易出错的样板代码的方便注解。
- 简化了数据库迁移路径。

在项目级别的下 build.grade添加 room依赖

```groovy
implementation "androidx.room:room-runtime:2.3.0"
annotationProcessor "androidx.room:room-compiler:2.3.0
```



Room 包含三个主要组件：

- [数据库类](https://developer.android.google.cn/reference/kotlin/androidx/room/Database?hl=zh-cn)，用于保存数据库并作为应用持久性数据底层连接的主要访问点。
- [数据实体](https://developer.android.google.cn/training/data-storage/room/defining-data?hl=zh-cn)，用于表示应用的数据库中的表。
- [数据访问对象 (DAO)](https://developer.android.google.cn/training/data-storage/room/accessing-data?hl=zh-cn)，提供您的应用可用于查询、更新、插入和删除数据库中的数据的方法。

```java
@Dao
public interface UserDao {
    @Insert
    void insertUser(UserEntity... userEntities);

    @Delete
    int deleteUser(UserEntity... userEntities);

    @Query("delete from user where username like:username")
    int deleteByUsername(String username);

    @Update
    int updateUser(UserEntity userEntity);

    @Query("select * from user")
    List<UserEntity> selectAll();

    @Query("select * from user where username like:username")
    UserEntity selectByUsername(String username);

    @Query("select * from user order by height")
    List<UserEntity> selectLisWithOrder();
}
```

```java
@Entity(tableName = "user")
public class UserEntity {
    @PrimaryKey(autoGenerate = true)
    public int id;

    @ColumnInfo(name = "username")
    private String username;

    @ColumnInfo(name = "height")
    private double height;
}

```

```java
// exportSchema 是否导出数据库文件的json信息 默认false， 如果设置成true 需要配置导出路径
@Database(entities = {UserEntity.class}, version = 1, exportSchema = true)
public abstract class BaseDao extends RoomDatabase {
    public abstract UserDao mUserDao();
}
```

项目级别`build.grade` 文件中：`android -> defaultConfig` 下配置

```java
// room.schemaLocation生成的文件路径
javaCompileOptions {
    annotationProcessorOptions {
        arguments = ["room.schemaLocation": "$projectDir/schemas".toString()]
    }
}
```



```java
public class BaseApplication extends Application {
    public static BaseApplication mBaseApplication;
    public static BaseDao sBaseDao;

    @Override
    public void onCreate() {
        super.onCreate();
        mBaseApplication = this;
        sBaseDao = Room.databaseBuilder(this, BaseDao.class, "room.db")
            // 测试方便 允许在主线程中允许
            .allowMainThreadQueries()
            .build();
    }
}

```





## Application - 对象

​		Application是android系统中一个重要的组件，当android应用程序启动时就会自动创建一个Application对象，如果需要创建自己 的Application，也很简单创建一个类继承 Application并在manifest的application标签中进行注册，android系统会为每个程序运行时创建一个Application类的对象且仅创建一个，所以Application可以说是单例 (singleton)模式的一个类且application对象的生命周期是整个程序中最长的，它的生命周期就等于这个程序的生命周期。因为它是全局 的单例的，所以在不同的Activity,Service中获得的对象都是同一个对象。所以通过Application来进行一些，数据传递，数据共享 等,数据缓存等操作。

```java
public class BaseApplication extends Application {
    private static final String TAG = "BaseApplication";

    private static BaseApplication mBaseApplication;

    public BaseApplication() {}

    public static BaseApplication getInstance() {
        return mBaseApplication;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        mBaseApplication = this;
        // 程序创建的时候执行
        Log.d(TAG, "onCreate...");
    }


    @Override
    public void onTerminate() {
        super.onTerminate();
        // 程序终止的时候执行
        Log.d(TAG, "onTerminate...");
    }


    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // 程序配置变化时执行, 例如屏幕旋转
        Log.d(TAG, "onConfigurationChanged...");
    }


    @Override
    public void onLowMemory() {
        super.onLowMemory();
        // 低内存的时候执行
        Log.d(TAG, "onLowMemory...");
    }


    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        // 程序在内存清理的时候执行（回收内存）, HOME键退出应用程序、长按MENU键，打开Recent TASK都会执行
        Log.d(TAG, "onTrimMemory...");
    }
}

```





## Content Provider - 内容提供者

内容提供者组件通过请求从一个应用程序向其他的应用程序提供数据。这些请求由类 ContentResolver 的方法来处理。内容提供者可以使用不同的方式来存储数据。数据可以被存放在数据库，文件，甚至是网络。

有时候需要在应用程序之间共享数据。这时内容提供者变得非常有用，内容提供者可以让内容集中，必要时可以有多个不同的应用程序来访问。内容提供者的行为和数据库很像。你可以查询，编辑它的内容，使用 insert()， update()， delete() 和 query() 来添加或者删除内容。多数情况下数据被存储在 SQLite 数据库。

内容提供者被实现为类 ContentProvider 类的子类。需要实现一系列标准的 API，以便其他的应用程序来执行事务。

```java
public class MyApplication extends  ContentProvider {}
```

### 1、内容URI

要查询内容提供者，你需要以如下格式的URI的形式来指定查询字符串：

```java
prefix://authority/date_type/id
```

+ prefix：前缀，一直被设置为content://
+ authority：授权，指定内容提供者的名称
+ date_type：数据类型，这个表明这个特殊的内容提供者中的数据的类型。
+ id：这个指定特定的请求记录。

### 2、实例

```xml
<provider
          android:name=".provider.StudentProvider"
          android:authorities="com.ilovesshan.a16_content_prvider_client.provider.StudentProvider" />
```

```java
public class StudentProvider extends ContentProvider {
    private static final String TAG = "StudentProvider";

    private static UriMatcher uriMatcher;

    private SQLiteDatabase db;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        // 通过uriMatcher添加不同的匹配规则
        uriMatcher.addURI(ProviderConfig.STUDENT_AUTHORITY, ProviderConfig.STUDENT_DATATYPE, 1);
        uriMatcher.addURI(ProviderConfig.STUDENT_AUTHORITY, ProviderConfig.STUDENT_DATATYPE + "/#", 2);
    }


    public static class StudentDbHelper extends SQLiteOpenHelper {
        public StudentDbHelper(@Nullable Context context) {
            super(context, ProviderConfig.DB_NAME, null, 1);
        }

        @Override
        public void onCreate(SQLiteDatabase database) {
            database.execSQL(ProviderConfig.STUDENT_CREATE_TABLE_SQL);
        }

        @Override
        public void onUpgrade(SQLiteDatabase database, int i, int i1) {}
    }


    @Override
    public boolean onCreate() {
        Log.d(TAG, "StudentProvider onCreate...");
        final StudentDbHelper studentDbHelper = new StudentDbHelper(getContext());
        db = studentDbHelper.getWritableDatabase();
        return db != null;
    }


    @Nullable
    @Override
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        switch (uriMatcher.match(uri)) {
                // 根据CODE进行其他的业务逻辑处理
            case 1:
                Toast.makeText(getContext(), "查询全部", Toast.LENGTH_SHORT).show();
                break;
            case 2:
                Toast.makeText(getContext(), "根据ID查询", Toast.LENGTH_SHORT).show();
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri);
        }
        return db.query(ProviderConfig.STUDENT_DATATYPE, projection, selection, selectionArgs, sortOrder, null, null);
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {
        return null;
    }

    @Nullable
    @Override
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
        final long rowId = db.insert(ProviderConfig.STUDENT_DATATYPE, null, values);
        if (rowId > 0) {
            final Uri u = ContentUris.withAppendedId(Uri.parse(ProviderConfig.STUDENT_URI), rowId);
            // 通知观察者数据新增成功
            getContext().getContentResolver().notifyChange(u, null);
            return u;
        }
        throw new SQLException("Failed to add a record into " + uri);
    }

    @Override
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) {
        return db.delete(ProviderConfig.STUDENT_DATATYPE, selection, selectionArgs);
    }

    @Override
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) {
        return db.update(ProviderConfig.STUDENT_DATATYPE, values, selection, selectionArgs);
    }
}
```



```java
public class StudentContentObserver extends ContentObserver {
    private static final String TAG = "studentContentObserver";

    Context context;

    public StudentContentObserver(Context context, Handler handler) {
        super(handler);
        this.context = context;
    }

    @Override
    public void onChange(boolean selfChange, @Nullable Uri uri) {
        super.onChange(selfChange, uri);
        Log.d(TAG, "onChange uri 数据发生变化...");
        // 可以通过uri信息进行业务处理，比如监听短信信息...
    }
}

```

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initViewAndBindEvent();
        initContentProvider();

    }

    private void initContentProvider() {
        // 注册监听者 监听URI发生变化
        getContentResolver().registerContentObserver(
            Uri.parse(ProviderConfig.STUDENT_URI),
            true,
            new StudentContentObserver(MainActivity.this, new Handler())
        );
    }

    private void initViewAndBindEvent() {
        // ...
    }

    @Override
    public void onClick(View v) {
        ContentValues contentValues = null;
        switch (v.getId()) {
            case R.id.add:
                getContentResolver().insert(Uri.parse(ProviderConfig.STUDENT_URI), new ContentValues());
                Toast.makeText(this, "添加成功!", Toast.LENGTH_SHORT).show();
                break;

            case R.id.select:
                final Cursor c = getContentResolver().query(Uri.parse(ProviderConfig.STUDENT_URI + "/" + etId.getText().toString()), null, "_id=?", new String[]{etId.getText().toString()}, null);
                while (cursor.moveToNext()) {
                    // ...
                }
                break;

            case R.id.delete:
                final String id = etId.getText().toString();
                if ("".equals(id)) {
                    Toast.makeText(this, "请输入Id", Toast.LENGTH_SHORT).show();
                    return;
                }
                getContentResolver().delete(Uri.parse(ProviderConfig.STUDENT_URI), "_id=?", new String[]{id});
                Toast.makeText(this, "删除成功!", Toast.LENGTH_SHORT).show();
                break;

            case R.id.update:
                getContentResolver().update(Uri.parse(ProviderConfig.STUDENT_URI), new ContentValues(), "_id=?", new String[]{etId.getText().toString()});
                break;

            case R.id.selectById:
                final Cursor c = getContentResolver().query(Uri.parse(ProviderConfig.STUDENT_URI + "/" + etId.getText().toString()),  null, "_id=?",new String[]{etId.getText().toString()}, null);
                if (c.moveToNext()) {
                    // ...
                }
                break;
        }
    }
}
```



### 3、动态权限申请

Android6之后需要动态申请权限

```java
public class PermissionUtil {
    public static final String[] PERMISSIONS = new String[]{
        Manifest.permission.WRITE_CONTACTS,
        Manifest.permission.READ_CONTACTS,
        Manifest.permission.READ_SMS,
        Manifest.permission.SEND_SMS,
    };


    public static final String[] CONTACTS_PERMISSIONS = new String[]{
        Manifest.permission.WRITE_CONTACTS,
        Manifest.permission.READ_CONTACTS,
    };

    public static final String[] SMS_PERMISSIONS = new String[]{
        Manifest.permission.READ_SMS,
        Manifest.permission.SEND_SMS,
    };


    public static boolean checkAndRequestPermission(Activity activity, String[] permissions, int checkCode) {
        int checkResult = PackageManager.PERMISSION_GRANTED;
        // Android 6 之后
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            for (String permission : permissions) {
                checkResult = ContextCompat.checkSelfPermission(activity, permission);
                if (checkResult != PackageManager.PERMISSION_GRANTED) {
                    break;
                }
            }
            if (checkResult == PackageManager.PERMISSION_DENIED) {
                // 申请权限弹窗
                activity.requestPermissions(permissions, checkCode);
                return false;
            }
        }
        return true;
    }


    public static void checkGranted(AppCompatActivity activity, int requestCode, String[] permissions, int[] grantResults) {
        for (int i = 0; i < grantResults.length; i++) {
            if (grantResults[i] == PackageManager.PERMISSION_DENIED) {
                switch (permissions[i]) {
                        // 通讯录权限未授权
                    case Manifest.permission.WRITE_CONTACTS:
                    case Manifest.permission.READ_CONTACTS:
                        Toast.makeText(activity, "需要打开通讯录权限才能使用该功能，您也可以前往设置->应用。。。开启权限", Toast.LENGTH_SHORT).show();
                        break;

                        // 短信权限未授权
                    case Manifest.permission.READ_SMS:
                    case Manifest.permission.SEND_SMS:
                        Toast.makeText(activity, "需要打开短信权限才能使用该功能，您也可以前往设置->应用。。。开启权限", Toast.LENGTH_SHORT).show();
                        break;
                }
            }
        }
    }
}

```

```java
public class RequestPermission extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = "RequestPermission";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request_permission);
        // 首次加载时 申请所需要的权限
        PermissionUtil.checkAndRequestPermission(this, PermissionUtil.PERMISSIONS, 0);
        initViewAndBindEvent();
    }

    private void initViewAndBindEvent() {
        findViewById(R.id.concat).setOnClickListener(this);
        findViewById(R.id.sms).setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        boolean checkResult = false;
        switch (view.getId()) {
                // 按钮级别 进行权限检查
            case R.id.concat:
                checkResult = PermissionUtil.checkAndRequestPermission(RequestPermission.this, PermissionUtil.CONTACTS_PERMISSIONS, PermissionUtil.CONTACTS_CODE);
                if (checkResult) {
                    Toast.makeText(this, "已获得通讯录读写权限", Toast.LENGTH_SHORT).show();
                }
                break;
            case R.id.sms:
                checkResult = PermissionUtil.checkAndRequestPermission(RequestPermission.this, PermissionUtil.SMS_PERMISSIONS, PermissionUtil.SMS_CODE);
                if (checkResult) {
                    Toast.makeText(this, "已获得通讯录读写权限", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        PermissionUtil.checkGranted(this, requestCode, permissions, grantResults);
    }

```



### 4、监听短信验证码

```java
public class SmsContentObserver extends ContentObserver {
    private static final String TAG = "SmsContentObserver";
    private Activity activity;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
    }

    private static UriMatcher uriMatcher;

    public SmsContentObserver(Handler handler, Activity activity) {
        super(handler);
        this.activity = activity;
    }

    @Override
    public void onChange(boolean selfChange, @Nullable Uri uri) {
        if (!uri.toString().contains("raw")) {
            final Cursor cursor = activity.getContentResolver().query(uri, new String[]{"_id", "address", "body"}, null, null, null);
            if (cursor != null && cursor.moveToNext()) {
                final String _id = cursor.getString(0);
                final String address = cursor.getString(1);
                final String body = cursor.getString(2);
                Log.d(TAG, "_id: " + _id);
                Log.d(TAG, "address: " + address);
                Log.d(TAG, "body: " + body);
            }
        }
    }
}

```



### 5、相册选择图片

```java
Intent intent = new Intent();
intent.setType("image/*");
intent.setAction(Intent.ACTION_GET_CONTENT);

// 单选
resultLauncher.launch(intent);

// 多选
intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
resultLauncher.launch(intent);

```

```java
resultLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
    if (result.getData() != null) {
        final ClipData clipData = result.getData().getClipData();
        if (clipData != null) {
            // 多选
            for (int i = 0; i < clipData.getItemCount(); i++) {
                final ClipData.Item item = clipData.getItemAt(i);
                final Uri uri = item.getUri();
            }
        } else {
            // 单选
            Uri uri = result.getData().getData();
        }
    }
});
```

```java
public static void SaveImageToSysAlbum(Context context, ImageView imageView) {
    BitmapDrawable bmpDrawable = (BitmapDrawable) imageView.getDrawable();
    Bitmap bitmap = bmpDrawable.getBitmap();
    if (bitmap == null) {
        return;
    }
    MediaStore.Images.Media.insertImage(context.getContentResolver(), bitmap, "title", "");
    //如果是4.4及以上版本
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        String fileName = UUID.randomUUID().toString() + ".png";
        File mPhotoFile = new File(fileName);
        Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        Uri contentUri = Uri.fromFile(mPhotoFile);
        mediaScanIntent.setData(contentUri);
        context.sendBroadcast(mediaScanIntent);
    } else {
        context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_MOUNTED, Uri.parse("file://" + Environment.getExternalStorageDirectory())));
    }
    Toast.makeText(context, "已保存到相册", Toast.LENGTH_SHORT).show();
}

```



```java
public class UriUtils {

    public static String getPath(final Context context, final Uri uri) {

        final boolean isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;

        // DocumentProvider
        if (isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
            // ExternalStorageProvider
            if (isExternalStorageDocument(uri)) {
                final String docId = DocumentsContract.getDocumentId(uri);
                final String[] split = docId.split(":");
                final String type = split[0];

                if ("primary".equalsIgnoreCase(type)) {
                    return Environment.getExternalStorageDirectory() + "/" + split[1];
                }

                // TODO handle non-primary volumes
            }
            // DownloadsProvider
            else if (isDownloadsDocument(uri)) {

                final String id = DocumentsContract.getDocumentId(uri);
                final Uri contentUri = ContentUris.withAppendedId(
                    Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));

                return getDataColumn(context, contentUri, null, null);
            }
            // MediaProvider
            else if (isMediaDocument(uri)) {
                final String docId = DocumentsContract.getDocumentId(uri);
                final String[] split = docId.split(":");
                final String type = split[0];

                Uri contentUri = null;
                if ("image".equals(type)) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if ("video".equals(type)) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if ("audio".equals(type)) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }

                final String selection = "_id=?";
                final String[] selectionArgs = new String[]{
                    split[1]
                };

                return getDataColumn(context, contentUri, selection, selectionArgs);
            }
        }
        // MediaStore (and general)
        else if ("content".equalsIgnoreCase(uri.getScheme())) {
            return getDataColumn(context, uri, null, null);
        }
        // File
        else if ("file".equalsIgnoreCase(uri.getScheme())) {
            return uri.getPath();
        }

        return null;
    }

    /**
     * 获取数据库表中的 _data 列，即返回Uri对应的文件路径
     */
    public static String getDataColumn(Context context, Uri uri, String selection,
                                       String[] selectionArgs) {

        Cursor cursor = null;
        final String column = "_data";
        final String[] projection = {
            column
        };

        try {
            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs,
                                                        null);
            if (cursor != null && cursor.moveToFirst()) {
                final int column_index = cursor.getColumnIndexOrThrow(column);
                return cursor.getString(column_index);
            }
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return null;
    }


    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is ExternalStorageProvider.
     */
    public static boolean isExternalStorageDocument(Uri uri) {
        return "com.android.externalstorage.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is DownloadsProvider.
     */
    public static boolean isDownloadsDocument(Uri uri) {
        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
    }

    /**
     * @param uri The Uri to check.
     * @return Whether the Uri authority is MediaProvider.
     */
    public static boolean isMediaDocument(Uri uri) {
        return "com.android.providers.media.documents".equals(uri.getAuthority());
    }
}
```

## Fragment - 碎片

### 1、Fragment简介和生命周期

​		Fragment是Android3.0后引入的一个新的API，他出现的初衷是为了适应大屏幕的平板电脑， 当然现在他仍然是平板APP UI设计的宠儿，而且我们普通手机开发也会加入这个Fragment， 我们可以把他看成一个小型的Activity，又称Activity片段！

​		如果一个很大的界面，我们 就一个布局，写起界面来会有多麻烦，而且如果组件多的话是管理起来也很麻烦！而使用Fragment 我们可以把屏幕划分成几块，然后进行分组，进行一个模块化的管理！从而可以更加方便的在 运行过程中动态地更新Activity的用户界面！另外Fragment并不能单独使用，他需要嵌套在Activity 中使用，尽管他拥有自己的生命周期，但是还是会受到宿主Activity的生命周期的影响，比如Activity 被destory销毁了，他也会跟着销毁！

![](https://www.runoob.com/wp-content/uploads/2015/08/31722863.jpg)



### 2、Fragement 静态注册

![](https://www.runoob.com/wp-content/uploads/2015/08/14443487.jpg)



### 3、Fragement 动态注册

![](https://www.runoob.com/wp-content/uploads/2015/08/29546434.jpg)



### 4、Fragment事务管理

![](https://www.runoob.com/wp-content/uploads/2015/08/97188171.jpg)



### 5、Fragment和Activity通信

![](https://www.runoob.com/wp-content/uploads/2015/08/45971686.jpg)



### 6、TabBar多方案实现

#### TextView+LinearLayout+Fragment

#### RadioButton+Fragment

#### TextView+RelativeLayout 定制TabBar

#### Fragment+Viewpager

+ `TabBarActivity.java`

  ```java
  package com.ilovesshan.tabbarapp;
  
  import androidx.appcompat.app.AppCompatActivity;
  import androidx.viewpager.widget.ViewPager;
  
  import android.os.Bundle;
  import android.widget.RadioButton;
  import android.widget.RadioGroup;
  
  import com.ilovesshan.tabbarapp.adaptar.TabBarAdapter;
  
  public class TabBarActivity extends AppCompatActivity implements RadioGroup.OnCheckedChangeListener, ViewPager.OnPageChangeListener {
  
      private RadioGroup tabBar;
      private RadioButton find;
      private RadioButton message;
      private RadioButton concat;
      private RadioButton profile;
      private ViewPager content;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_tab_bar);
  
          initViewAndBindEvent();
  
      }
  
      private void initViewAndBindEvent() {
          tabBar = findViewById(R.id.tab_bar);
          find = findViewById(R.id.find);
          message = findViewById(R.id.message);
          concat = findViewById(R.id.concat);
          profile = findViewById(R.id.profile);
          content = findViewById(R.id.app_bar_content);
  
          content.setAdapter(new TabBarAdapter(getSupportFragmentManager()));
          content.setCurrentItem(0);
          content.addOnPageChangeListener(this);
  
          find.setChecked(true);
          tabBar.setOnCheckedChangeListener(this);
      }
  
      @Override
      public void onCheckedChanged(RadioGroup group, int checkedId) {
          switch (checkedId) {
              case R.id.find:
                  content.setCurrentItem(0);
                  break;
              case R.id.message:
                  content.setCurrentItem(1);
                  break;
              case R.id.concat:
                  content.setCurrentItem(2);
                  break;
              case R.id.profile:
                  content.setCurrentItem(3);
                  break;
          }
      }
  
      @Override
      public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
  
      }
  
      @Override
      public void onPageSelected(int position) {
          switch (position) {
              case 0:
                  find.setChecked(true);
                  break;
              case 1:
                  message.setChecked(true);
                  break;
              case 2:
                  concat.setChecked(true);
                  break;
              case 3:
                  profile.setChecked(true);
                  break;
          }
      }
  
      @Override
      public void onPageScrollStateChanged(int state) { }
  }
  ```

  

+ `activity_tab_bar.xml`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                  android:layout_width="match_parent"
                  android:layout_height="match_parent">
  
      <TextView
                android:id="@+id/app_bar"
                android:layout_width="match_parent"
                android:layout_height="49dp"
                android:background="@color/efefef"
                android:gravity="center"
                android:text="AppBar"
                android:textSize="30sp" />
  
      <RadioGroup
                  android:id="@+id/tab_bar"
                  android:layout_width="match_parent"
                  android:layout_height="49dp"
                  android:layout_alignParentBottom="true"
                  android:orientation="horizontal">
  
          <RadioButton
                       android:id="@+id/find"
                       style="@style/tab_menu_item"
                       android:text="@string/find" />
  
          <RadioButton
                       android:id="@+id/message"
                       style="@style/tab_menu_item"
                       android:text="@string/message" />
  
          <RadioButton
                       android:id="@+id/concat"
                       style="@style/tab_menu_item"
                       android:text="@string/concat" />
  
          <RadioButton
                       android:id="@+id/profile"
                       style="@style/tab_menu_item"
                       android:text="@string/profile" />
  
      </RadioGroup>
  
      <androidx.viewpager.widget.ViewPager
                                           android:id="@+id/app_bar_content"
                                           android:layout_width="match_parent"
                                           android:layout_height="match_parent"
                                           android:layout_above="@id/tab_bar"
                                           android:layout_below="@id/app_bar" />
  
  </RelativeLayout>
  ```

  

+ `style.xml`

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
      <style name="tab_menu_item">
          <item name="android:layout_weight">1</item>
          <item name="android:layout_width">0dp</item>
          <item name="android:layout_height">match_parent</item>
          <item name="android:button">@null</item>
          <item name="android:gravity">center</item>
          <item name="android:textColor">@drawable/selector_tab_text_color</item>
          <item name="android:textSize">18sp</item>
      </style>
  </resources>
  ```

  

+ `string.xml`

  ```xml
  <resources>
      <string name="message">消息</string>
      <string name="concat">联系人</string>
      <string name="find">发现</string>
      <string name="profile">我的</string>
  </resources>
  ```

  

+ `TabBarAdapter`

  ```java
  package com.ilovesshan.tabbarapp.adaptar;
  
  import androidx.annotation.NonNull;
  import androidx.fragment.app.Fragment;
  import androidx.fragment.app.FragmentManager;
  import androidx.fragment.app.FragmentPagerAdapter;
  
  import com.ilovesshan.tabbarapp.fragment.ConcatFragment;
  import com.ilovesshan.tabbarapp.fragment.FindFragment;
  import com.ilovesshan.tabbarapp.fragment.MessageFragment;
  import com.ilovesshan.tabbarapp.fragment.ProfileFragment;
  
  public class TabBarAdapter extends FragmentPagerAdapter {
  
      private int FragmentCount = 4;
      private Fragment findFragment, messageFragment, concatFragment, profileFragment;
  
      public TabBarAdapter(FragmentManager fm) {
          super(fm);
          findFragment = new FindFragment();
          messageFragment = new MessageFragment();
          concatFragment = new ConcatFragment();
          profileFragment = new ProfileFragment();
      }
  
      @NonNull
      @Override
      public Fragment getItem(int position) {
          Fragment fragment = null;
          switch (position) {
              case 0:
                  fragment = findFragment;
                  break;
              case 1:
                  fragment = messageFragment;
                  break;
              case 2:
                  fragment = concatFragment;
                  break;
              case 3:
                  fragment = profileFragment;
                  break;
          }
          return fragment;
      }
  
      @Override
      public int getCount() {
          return FragmentCount;
      }
  }
  
  ```

  

+ `四个Fragment以及对应布局xml文件，剩下三个照搬。`

  ```java
  public class FindFragment extends Fragment {
      @Override
      public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
          return inflater.inflate(R.layout.fragment_find, container, false);
      }
  }
  ```

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:gravity="center">
  
      <TextView
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="发现"
          android:textSize="30sp" />
  
  </LinearLayout>
  ```



## BroadCat- 广播

​	android通过广播来实现不同进程间的通信对应于广播（broadcat）还有一个广播接收器（broadcast receiver）每个广播指定了对应的action 、 type等信息，每个接收器根据这些信息来过滤是否自己要接收的广播。

实现广播一般分成三个步骤：

+ 定义广播接收器
+ 注册广播
+ 发送广播

### 1、标准广播

```java
public class BroadCastConstant {
    public static final String STANDARD_BROADCAST = "com.ilovesshan.boradcastapp.standard_broadcast";
    public static final String ORDER_BROADCAST = "com.ilovesshan.boradcastapp.order_broadcast";
    public static final String STATIC_REGISTER_BROADCAST = "com.ilovesshan.boradcastapp.receiver.StaticRegisterBroadCastReceiver";z
}

```

```java
public class StandardBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && BroadCastConstant.STANDARD_BROADCAST.equals(intent.getAction())) {
            Toast.makeText(context, "收到系统标准广播", Toast.LENGTH_SHORT).show();
        }
    }
}

```

```java
private StandardBroadCastReceiver standardBroadCastReceiver;

@Override
protected void onStart() {
    super.onStart();
    // 注册广播
    final IntentFilter intentFilter = new IntentFilter(BroadCastConstant.STANDARD_BROADCAST);
    standardBroadCastReceiver = new StandardBroadCastReceiver();
    registerReceiver(standardBroadCastReceiver, intentFilter);
}


@Override
protected void onStop() {
    super.onStop();
    // 取消广播
    unregisterReceiver(standardBroadCastReceiver);
}
```

```java
// 发送广播
final Intent intent = new Intent(BroadCastConstant.STANDARD_BROADCAST);
sendBroadcast(intent);
```



### 2、有序 广播

多个广播接收者按照一定顺序进行广播接收，其中任意一个广播接者可以中断广播，中断之后后续广播将接不到。

广播接收者顺序：

+ 优先级大的广播先接收到
+ 相同优先级的广播，先注册的先接受到

```java
public class OrderBBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && BroadCastConstant.ORDER_BROADCAST.equals(intent.getAction())) {
            Toast.makeText(context, "B收到系统有序广播", Toast.LENGTH_SHORT).show();

            // 中断广播
            abortBroadcast();
        }
    }
}

public class OrderABroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && BroadCastConstant.ORDER_BROADCAST.equals(intent.getAction())) {
            Toast.makeText(context, "A收到系统有序广播", Toast.LENGTH_SHORT).show();
        }
    }
}

```

```java
private OrderABroadCastReceiver orderABroadCastReceiver;
private OrderBBroadCastReceiver orderBBroadCastReceiver;

@Override
protected void onStart() {
    super.onStart();
    // 注册有序广播A
    final IntentFilter intentFilterA = new IntentFilter(BroadCastConstant.ORDER_BROADCAST);
    orderABroadCastReceiver = new OrderABroadCastReceiver();
    registerReceiver(orderABroadCastReceiver, intentFilterA);

    // 注册有序广播B
    final IntentFilter intentFilterB = new IntentFilter(BroadCastConstant.ORDER_BROADCAST);
    orderBBroadCastReceiver = new OrderBBroadCastReceiver();
    // mPriority 默认优先级0
    intentFilterB.setPriority(100);
    registerReceiver(orderBBroadCastReceiver, intentFilterB);

}

@Override
protected void onStop() {
    super.onStop();
    // 取消广播
    unregisterReceiver(orderABroadCastReceiver);
    unregisterReceiver(orderBBroadCastReceiver);
}
```

```java
// 发送有序广播
sendOrderedBroadcast(new Intent(BroadCastConstant.ORDER_BROADCAST), null);
```



### 3、动态、静态广播注册

广播在代码中注册的称之为动态注册，例如：前面练习的标准广播和有序广播。在清单文件中注册的广播称之为静态注册。

```java
public class StaticRegisterBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null && BroadCastConstant.STATIC_REGISTER_BROADCAST.equals(intent.getAction())) {
            Toast.makeText(context, "收到静态注册广播， 手机将会通知并震动!", Toast.LENGTH_SHORT).show();

            // 设置震动 500ms, 注意：需要声明权限 <uses-permission android:name="android.permission.VIBRATE" />
            final Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
            vibrator.vibrate(500);

            // 获取系统声音路径
            final Uri defaultUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            // 获取提示音的实例对象
            final Ringtone ringtone = RingtoneManager.getRingtone(context, defaultUri);
            // 播放
            ringtone.play();
        }
    }
}
```

```xml
<!-- 清单文件中注册广播-->
<receiver
          android:name=".receiver.StaticRegisterBroadCastReceiver"
          android:exported="true">
    <intent-filter>
        <action android:name="com.ilovesshan.boradcastapp.receiver.StaticRegisterBroadCastReceiver" />
    </intent-filter>
</receiver>
```

```java
// 发送静态广播
final Intent intent = new Intent(BroadCastConstant.STATIC_REGISTER_BROADCAST);
// 需要设置广播接收者的全路径名称
intent.setComponent(new ComponentName(this, BroadCastConstant.STATIC_REGISTER_BROADCAST));
sendBroadcast(intent);
```



### 4、系统广播 - 分钟到达

```java
public class TimeBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null) {
            Toast.makeText(context, "收到系统分钟变更广播", Toast.LENGTH_SHORT).show();
        }
    }
}
```

```java
// 注册分钟到达广播
final IntentFilter intentFilterTime = new IntentFilter(Intent.ACTION_TIME_TICK);
timeBroadCastReceiver = new TimeBroadCastReceiver();
registerReceiver(timeBroadCastReceiver, intentFilterTime);
```



### 5、系统广播 - 网络监测

https://blog.csdn.net/guodashen007/article/details/121922509

```java
public class NetworkBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null) {
            Toast.makeText(context, "收到系统网络状态变更广播", Toast.LENGTH_SHORT).show();

            // 获取当前网络类型信息
            final ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            final NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

            if (networkInfo != null) {
                final int type = networkInfo.getType();
                final String typeName = networkInfo.getTypeName();
                final NetworkInfo.State infoState = networkInfo.getState();
                final int subtype = networkInfo.getSubtype();
                final String subtypeName = networkInfo.getSubtypeName();
                final String format = String.format(
                        "网络类型=%s, 网络类型名称=%s, 网络连接状态=%s, 网络制式=%s, 网络小类=%s",
                        type, typeName, infoState.name(), subtype, subtypeName
                );
                Toast.makeText(context, format, Toast.LENGTH_SHORT).show();
            }
        }
    }
}
```

```java
// 注册网络状态变更广播
final IntentFilter intentFilterNetworkStatus = new IntentFilter("android.net.conn.CONNECTIVITY_CHANGE");
networkBroadCastReceiver = new NetworkBroadCastReceiver();
registerReceiver(networkBroadCastReceiver, intentFilterNetworkStatus);
```



### 5、系统广播 - 实现画中画功能

```java
public class PictureInPictureBroadCastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null) {
            final String reason = intent.getStringExtra("reason");
            if (!TextUtils.isEmpty(reason) && (reason.equals("homekey") || reason.equals("recentapps"))) {
                //8.0 以后才有画中画
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !((Activity)context).isInPictureInPictureMode()){
                    // 创建画中画参数构造器
                    PictureInPictureParams.Builder builder = new PictureInPictureParams.Builder();
                    //设置宽高比例
                    Rational rational = new Rational(10, 5);
                    builder.setAspectRatio(rational);
                    //进入画中画
                    ((Activity)context).enterPictureInPictureMode(builder.build());
                }
            }
        }
    }
}
```

```java

@Override
protected void onCreate(Bundle savedInstanceState) {
    // ...
    // 注册系统广播
    final IntentFilter intentFilterPictureBroadCastReceiver = new IntentFilter(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
    pictureBroadCastReceiver = new PictureInPictureBroadCastReceiver();
    registerReceiver(pictureBroadCastReceiver, intentFilterPictureBroadCastReceiver);

}

@Override
protected void onDestroy() {
    super.onDestroy();
    unregisterReceiver(pictureBroadCastReceiver);
}
```

```xml
<!-- supportsPictureInPicture="true"   支持画中画模式 -->
<activity
          android:name=".BroadCastSenderActivity"
          android:supportsPictureInPicture="true"
          android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />

        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```



## Service - 服务

https://www.runoob.com/android/android-services.html

服务是一个后台运行的组件，执行长时间运行且不需要用户交互的任务。即使应用被销毁也依然可以工作。

### 1、开启/关闭服务

```xml
<service android:name=".service.FirstService" />
```

```java
public class FirstService extends Service {
    private static final String TAG = "FirstService";

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate...");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "onStartCommand...");
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy...");
    }
}
```

```java
// 开启服务
intent = new Intent(this, FirstService.class);
startService(intent);

// 关闭服务
stopService(intent);
```



### 2、绑定/解绑服务

```xml
<service android:name=".service.SecondService" />
```

```java
public interface ICommunication {
    void call();
}

```

```java
public class SecondService extends Service {
    private static final String TAG = "SecondService";

    public class InnerBinder extends Binder implements ICommunication {
        public void call() {
            FirstServiceInnerMethod();
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return new InnerBinder();
    }

    public void FirstServiceInnerMethod() {
        Toast.makeText(this, "FirstServiceInnerMethod内部方法被调用", Toast.LENGTH_SHORT).show();
    }
}

```

```java
final ServiceConnection serviceConnection = new ServiceConnection() {
    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        Log.d(TAG, "onServiceConnected: 服务绑定成功");
        serviceBinder = (ICommunication) service;
    }

    // ServiceConnection中的onServiceDisconnected()方法在正常情况下是不被调用的。
    // 它的调用时机是当Service服务被异外销毁时，例如内存的资源不足时这个方法才被自动调用。
    @Override
    public void onServiceDisconnected(ComponentName name) {
        serviceBinder = null;
    }
};


// 绑定服务
final Intent intent = new Intent(this, SecondService.class);
bindService = bindService(intent, serviceConnection, BIND_AUTO_CREATE);

// 调用服务内部方法
serviceBinder.call();

// 解绑服务
unbindService(serviceConnection);
```

### 3、AIDL跨进程通信

模拟游戏币充值，通过AIDL技术拉取三方应用进行充值。



### 4、混合服务开启

开启服务和绑定服务的区别

+ 开启服务：服务可以常驻后台，但是不能通信。
+ 绑定服务：服务不能常驻后台，但是可以通信。

有没有一种办法可以兼顾开启服务和绑定服务呢？既可以常驻后台又可以通信，那么通过混合服务就可以实现这个需求了。

混合服务使用步骤：

+ 开启服务
+ 绑定服务
+ 调用服务内部方法
+ 解绑服务(需要注意解绑时机，手动解绑或者通过生命周期回调函数解绑)
+ 关闭服务

混合服务使用注意点：

+ 开启服务 -> 绑定服务，如果不解绑则不能关闭服务
+ 开启服务 -> 多次绑定/解绑服务， 服务不会被关闭

### 5、混合服务应用 - 音乐播放器



## 网络编程

### 1、网络基本概念

### 2、原生Java API

android安全配置：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config xmlns:android="http://schemas.android.com/apk/res/android">
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```



`GET` 请求

```java
new Thread(() -> {
    String baseUr = "https://www.wanandroid.com/banner/json";
    try {
        final URL url = new URL(baseUr);
        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setConnectTimeout(15 * 1000);
        connection.connect();
        if (connection.getResponseCode() == 200) {
            StringBuilder stringBuffer = new StringBuilder();
            final InputStream inputStream = connection.getInputStream();
            final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            while (bufferedReader.read() > 0) {
                stringBuffer.append(bufferedReader.readLine());
            }
            Log.d(TAG, String.valueOf(stringBuffer));
            runOnUiThread(() -> {
                // 更新UI
                bannerAdapter.setDataList(banner.getData());
            });
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}).start();
```



加载大图片优化处理方案

```java
final BitmapFactory.Options options = new BitmapFactory.Options();
// inJustDecodeBounds = true, 将不返回实际的bitmap，也不给其分配内存空间这样就避免内存溢出了。
options.inJustDecodeBounds = true;
BitmapFactory.decodeResource(NativeJavaApiActivity.this.getResources(), R.drawable.image, options);
// 计算尺寸压缩
options.inSampleSize = calculateInSampleSize(options, image.getMeasuredWidth(), image.getMeasuredHeight());
options.inJustDecodeBounds = false;
final Bitmap bitmap = BitmapFactory.decodeResource(NativeJavaApiActivity.this.getResources(), R.drawable.image, options);
```

```java
public static int calculateInSampleSize(BitmapFactory.Options options, int maxWidth, int maxHeight) {

    //这里其实是获取到默认的高度和宽度，也就是图片的实际高度和宽度
    final int height = options.outHeight;
    final int width = options.outWidth;

    //默认采样率为1，也就是不变嘛。
    int inSampleSize = 1;


    //===============核心算法啦====================
    if (width > maxWidth || height > maxHeight) {
        if (width > height) {
            inSampleSize = Math.round((float) height / (float) maxHeight);
        } else {
            inSampleSize = Math.round((float) width / (float) maxWidth);
        }

        final float totalPixels = width * height;

        final float maxTotalPixels = maxWidth * maxHeight * 2;

        while (totalPixels / (inSampleSize * inSampleSize) > maxTotalPixels) {
            inSampleSize++;
        }
    }
    //=============核心算法end================
    return inSampleSize;
}

```



Get 和 Post 请求封装

```java
public void sendRequest(String url, String requestMethod, Comment data, HashMap<String, Object> params) {
    ProgressDialog progressDialog = ProgressDialog.show(this, "", "正在努力加载中...");
    progressDialog.setCancelable(true);
    new Thread(() -> {
        try {
            final Gson gson = new Gson();
            String tempUrl = url;
            // 处理Params信息
            StringBuilder stringBuilder;
            if (!params.isEmpty()) {
                stringBuilder = new StringBuilder("?");
                final Iterator<Map.Entry<String, Object>> iterator = params.entrySet().iterator();
                while (iterator.hasNext()) {
                    final Map.Entry<String, Object> entry = iterator.next();
                    final Object value = entry.getValue();
                    final String key = entry.getKey();
                    stringBuilder.append(key);
                    stringBuilder.append("=");
                    stringBuilder.append(value);
                    if (iterator.hasNext()) {
                        stringBuilder.append("&");
                    }
                }
                tempUrl += stringBuilder;
            }
            Log.d(TAG, "sendRequest: " + tempUrl);
            final HttpURLConnection urlConnection = (HttpURLConnection) new URL(tempUrl).openConnection();
            urlConnection.setRequestMethod(requestMethod);
            urlConnection.addRequestProperty("Content-Type", "application/json");
            urlConnection.connect();

            // POST 请求传递Body参数
            if (data != null) {
                final String toJson = gson.toJson(data);
                urlConnection.getOutputStream().write(toJson.getBytes());
            }
            if (urlConnection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                final String readLine = bufferedReader.readLine();
                Log.d(TAG, readLine);
                runOnUiThread(progressDialog::dismiss);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }).start();
}
```



### 3、OkHttp

​		一般在Java平台上，我们会使用Apache HttpClient作为Http客户端，用于发送 HTTP 请求，并对响应进行处理。比如可以使用http客户端与第三方服务(如SSO服务)进行集成，当然还可以爬取网上的数据等。OKHttp与HttpClient类似，也是一个Http客户端，提供了对 HTTP/2 和 SPDY 的支持，并提供了连接池，GZIP 压缩和 HTTP 响应缓存功能。

```groovy
implementation("com.squareup.okhttp3:okhttp:4.10.0")
```

```java
public class RequestUtil {
    private static final String TAG = "RequestUtil";

    public static final MediaType REQUEST_BODY_TYPE_JSON = MediaType.get("application/json");
    public static final MediaType REQUEST_BODY_TYPE_IMAGE = MediaType.get("image/jpeg");

    public static void request(Context context, String url, String method, RequestBody requestBody, RequestCallBack requestCallBack) {
        final ProgressDialog progressDialog = ProgressDialog.show(context, "", "正在努力加载中...");
        final OkHttpClient client = new OkHttpClient.Builder().build();
        final Request request = new Request.Builder()
            .url(url)
            .method(method, requestBody)
            .addHeader("Content-Type", "application/json")
            .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                progressDialog.dismiss();
                Log.d(TAG, "请求失败: " + e);
                if (requestCallBack != null) {
                    requestCallBack.onFailed(0, e.getMessage());
                }
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                progressDialog.dismiss();
                Log.d(TAG, "请求成功: " + response.code());
                if (response.code() == HttpURLConnection.HTTP_OK && response.body() != null) {
                    if (requestCallBack != null) {
                        requestCallBack.onSuccess(response.body().string());
                    }
                } else {
                    if (requestCallBack != null) {
                        requestCallBack.onFailed(response.code(), response.message());
                    }
                }
            }
        });
    }

    public interface RequestCallBack {
        void onSuccess(Object data);

        void onFailed(int errorCode, String errorMessage);
    }
}

```

```java
// GET 请求
String path = "http:192.168.1.168:9999/getParams?uuid=1213456&uuContent=我是Get Params携带的信息";
RequestUtil.request(OkHttpRequestActivity.this, path, "GET", null, new RequestUtil.RequestCallBack() {
    @Override
    public void onSuccess(Object data) {

    }

    @Override
    public void onFailed(int errorCode, String errorMessage) {

    }
});


// POST 请求
String path = "http:192.168.1.168:9999/postParams?uuid=1213456&uuContent=我是Post Params携带的信息";
final Comment comment = new Comment(UUID.randomUUID().toString(), "我是Post Body携带的信息");
RequestUtil.request(OkHttpRequestActivity.this, path, "POST", FormBody.create(new Gson().toJson(comment), RequestUtil.REQUEST_BODY_TYPE_JSON), null);


// 单文件上传
String path = "http:192.168.1.168:9999/upload/single";
final String filePath = getFilesDir() + File.separator + "3714a37f2db6d6534623139ee88e609c.jpg";
final File file = new File(filePath);
RequestBody requestBody = new MultipartBody.Builder()
    .addFormDataPart("file", file.getName(), RequestBody.create(file, MediaType.parse("image/jpeg")))
    .build();
RequestUtil.request(OkHttpRequestActivity.this, path, "POST", requestBody, null);
```

 

### 4、Retrofit

​		retrofit是现在比较流行的网络请求框架，可以理解为okhttp的加强版，底层封装了Okhttp。准确来说，Retrofit是一个RESTful的http网络请求框架的封装。因为网络请求工作本质上是由okhttp来完成，而Retrofit负责网络请求接口的封装。

Retrofit 本职工作过程：

​		App应用程序通过Retrofit请求网络，实质上是使用Retrofit接口层封装请求参数、Header、Url等信息，之后由okhttp来完成后续的请求工作。在服务端返回数据后，okhttp将原始数据交给Retrofit，Retrofit根据用户需求解析。

```groovy
// json解析
implementation 'com.google.code.gson:gson:2.7'
// retrofit2
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
// json 转化器
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```



```java
public class RetrofitManager {
    private static final Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("http:192.168.1.168:9999")
        .addConverterFactory(GsonConverterFactory.create())
        .build();

    private RetrofitManager() {
    }

    public static Retrofit getRetrofit() {
        return retrofit;
    }
}
```

```java
public interface ApiService {
    @GET("/friend/json")
    Call<ArticleResult> selectFunAndroidArticle();

    @GET("/getParams")
    Call<ResponseBody> get_params_query(@Query("uuid") String uuid, @Query("uuContent") String uuContent);

    @GET("/getParams")
    Call<ResponseBody> get_params_queryMap(@QueryMap Map<String, Object> params);

    @POST("/postParams")
    Call<ResponseBody> post_params_queryMap_body(@QueryMap Map<String, Object> params, @Body Map<String, Object> body);

    @POST("/postParams")
    Call<ResponseBody> post_params_queryMap_body(@QueryMap Map<String, Object> params, @Body Comment comment);

    @Multipart
    @POST("/upload/single")
    Class<ResponseBody> upload_file_single(@Part MultipartBody.Part part);

    @Multipart
    @POST("/upload/multiple")
    Class<ResponseBody> upload_file_single(@Part List<MultipartBody.Part> parts);
}
```

```java
// GET 请求
final Call<ArticleResult> call = RetrofitManager.getRetrofit().create(ApiService.class).selectFunAndroidArticle();
call.enqueue(new Callback<ArticleResult>() {
    @Override
    public void onResponse(Call<ArticleResult> call, Response<ArticleResult> response) {
        final int code = response.code();
        Log.d(TAG, "code: " + code);
        if (code == HttpURLConnection.HTTP_OK) {
            final ArticleResult articleResult = response.body();
            Log.d(TAG, "onResponse: " + articleResult);
        }
    }

    @Override
    public void onFailure(Call<ArticleResult> call, Throwable t) {
        progressDialog.dismiss();
        Log.d(TAG, "onFailure: " + t.getMessage());
    }
});
```

```java
// 文件上传
final File file = new File(path);
final RequestBody requestBody = RequestBody.create(file, MediaType.parse("image/jpg"));
MultipartBody.Part part = MultipartBody.Part.createFormData("file", file.getName(), requestBody);
RetrofitManager.getRetrofit().create(ApiService.class).upload_file_single(part).enqueue(new Callback<ResponseBody>() {
    @Override
    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
        final int code = response.code();
        Log.d(TAG, "code: " + code);
        if (code == HttpURLConnection.HTTP_OK) {
            try {
                Log.d(TAG, "onResponse: " + response.body().string());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onFailure(Call<ResponseBody> call, Throwable t) {
        Log.d(TAG, "onFailure: " + t.getMessage());
    }
});
```


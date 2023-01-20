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

## Activity组件

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





## Application 对象

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






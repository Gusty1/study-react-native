# 學習 React Native

## 課程網址

- [課程網址(上)](https://www.bilibili.com/video/BV1FP4y1M7j2/?p=1&vd_source=aff2c79bf7cf75bc493437621849a68d '課程網址(上)')
- [課程網址(下)](https://www.bilibili.com/video/BV18q4y1Y7M5/?spm_id_from=333.337.search-card.all.click '課程網址(下)')
- 別人寫的，遇到問題時這邊可能有答案。[筆記](https://www.bilibili.com/read/cv18201766/ '筆記')

## React Native 建造 & 啟動

### 建造

1. 先 cd 到你想要的目錄
2. 輸入 npx create-expo-app，然後會叫你輸入專案名稱
3. 輸入 npm install -g expo-cli(之前有執行過的話，就不用再次執行了)

### 啟動

輸入 npx expo start 或 npm start
啟動成功後會有很多選項給你選，然後啟動時可能會警告甚麼東西沒裝好，通常會給修復指令，記得把指令執行。

#### Android 啟動

1. 電腦上執行模擬器
   要先裝 android studio 的模擬器，然後下載最新的 SDK；npm start 前模擬器要先啟好。
   ![android_start](https://cdn.jsdelivr.net/gh/gusty1/Study_ReactNative@main/images/android_start.png 'android啟動')

2. 手機啟動
   先去 play 商店裝 expo，然後掃 QR code 或直接輸入網址

---

## CSS

### flex

影片說 RN 都是使用 flex 佈局，[flex 說明](https://www.casper.tw/css/2017/07/21/css-flex/ 'flex 說明')
以下提供幾個常用的 css

```javascript
flexDirection: 'row', //設定軸線方向
justifyContent: 'flex-start', //主軸對齊
alignItems: 'center', //交錯軸的對齊設定
```

### StyleSheet

```javascript
import { StyleSheet } from 'react-native'

export default function App() {
  return <View style={styles.mainContainer} />
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 50,
  },
})
```

RN 中使用 CSS 可以像 React 一樣直接寫在組件的 style 裡，但推薦做法是用 StyleSheet.create 建一個新的 obj，然後在這個 obj 裡寫各自的 css

### Shadow 設定

android 若要開啟陰影效果需要加上 elevation，值決定陰影的強度。
ios 不用特別設定

```css
elevation: 8, /*android開啟陰影效果*/
shadowColor: 'black',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowRadius: 6,
shadowOpacity: 0.26,
```

### 常數使用

開發中我們會把一些常用的變量設定為常數，這樣維護和修改都方便，CSS 使用也一樣。
![css常數設定](https://cdn.jsdelivr.net/gh/gusty1/Study_ReactNative@main/images/constants_css.png 'css常數設定')

```javascript
//color.js
export default {
  primary: '#0080FF',
  second: 'gray',
}

//use
import Colors from '../constants/color'

return <Button title="Reset" color={Colors.second} />
```

```javascript
//default-styles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyText: {
    fontFamily: 'Playpen-Sans',
  },
})

//use
import DefaultStyles from '../constants/default-styles'

return <Text style={DefaultStyles.bodyText}>ABCDE</Text>
```

---

## 基礎元件

請參考[官方文件](https://reactnative.cn/ '官方文件')

### Image

使用本地圖片和網路圖片方法不一樣

- 本地:source={require('../assets/images/final.jpg')}
- 網路:source={{
      uri: '圖片網址',
    }}

```javascript
import { Image } from 'react-native'

return (
  <Image
    //網路加載的動畫效果是用淡出的，fadeDuration設定淡出秒數
    fadeDuration={300}
    style={styles.image}
    //本地使用
    source={require('../assets/images/final.jpg')}
    //網路圖片使用
    source={{
      uri: 'https://pic2.zhimg.com/v2-d2463ca56aa8253227b1bb164ea74efd_b.jpg',
    }}
    //設定圖片的resize模式cover、contain、center...
    resizeMode="contain"
  />
)
```

### ICON

expo 有提供一些 icon。
[官方文件](https://docs.expo.dev/guides/icons/ '官方文件')
[icon 種類](https://icons.expo.fyi/Index 'icon 種類')

```javascript
import { AntDesign } from '@expo/vector-icons'

return (
  <View>
    //name不能省略
    <AntDesign name="verticleleft" size={24} color="yellow" />
  </View>
)
```

**RN 預設的 Button 不能使用這個 icon，要在 Button 顯示 icon 必須自訂 Button 組件**

```javascript
//自訂Button範例
return (
  <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  </TouchableOpacity>
)
```

不過以後開發我想都會用到第 3 方組件，而第 3 方組件都會提供有 icon 的 button，所以大概知道就好。

### DrawerLayoutAndroid

[官方文件](https://reactnative.dev/docs/drawerlayoutandroid '官方文件')
如其名，只有 Android 才能用的東西。
就是一個可以設定左開或右開的側邊菜單

```javascript
const drawer = useRef(null)
//通常都會包在最初的View的第一個，如果要啟動的button不在原本的組件內，可以把drawer傳給要啟動的組件

//開啟的方法
function openDrawer() {
  drawer.current.openDrawer()
}

;<View style={styles.container} onLayout={onLayoutRootView}>
  <DrawerLayoutAndroid
    ref={drawer}
    //width只接受數字
    drawerWidth={300}
    drawerPosition={'left'}
    //菜單裡面的組件
    renderNavigationView={Description}>
    <View>
      <Text>...</Text>
    </View>
  </DrawerLayoutAndroid>
</View>
```

### PanResponder

[官方文件](https://reactnative.dev/docs/panresponder '官方文件')
手勢控制，從移動方向判斷上下左右滑。

```javascript
const panResponder = React.useRef(
  PanResponder.create({
    // Ask to be the responder: 要求成為響應者
    /*
    這邊設定有些會擋到原本的button之類的，就是可以滑動，
    但原本的button點擊也都被判斷成原地滑動。
    所以下面是我自己研究出，可以滑動又不會影響原本button的設定(不一定有用)
    */
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    // onMoveShouldSetPanResponder: (evt, gestureState) => true,
    // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      console.log('開始移動')
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log('正在移動')
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      console.log('移動結束')
      console.log(
        '结束移动：X轴移动了：' +
          gestureState.dx +
          '，Y轴移动了：' +
          gestureState.dy
      )
      if (gestureState.dx > 50) {
        console.log('由左向右')
        drawer.current.openDrawer()
      } else if (gestureState.dx < -50) {
        console.log('由右向左')
      } else if (gestureState.dy > 50) {
        console.log('由上向下')
      } else if (gestureState.dy < -50) {
        console.log('由下向上')
      }
    },
  })
).current

return (
  //在要判斷滑動的view裡放panResponder
  <View {...panResponder.panHandlers}>
    <Text>...</Text>
  </View>
)
```

---

## 螢幕翻轉

設定 app 要縱向還是橫向，在 app.json 裡找到 orientation。

- portrait，縱向(預設)
- landscape，橫向
- default，默認(會隨螢幕翻轉)

如果是中途要固定螢幕轉向需要使用其它工具。[官方文件](https://docs.expo.dev/versions/latest/sdk/screen-orientation/ '官方文件')

npx expo install expo-screen-orientation

```javascript
import * as ScreenOrientation from 'expo-screen-orientation'

//將螢幕固定成橫向
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
  )
}
```

---

## 載入外部資源

### 字體

[官網說明](https://docs.expo.dev/versions/latest/sdk/splash-screen/ '官網說明')

1. npx expo install expo-splash-screen
2. 在 assets 新增 fonts 資料夾，然後把你下載的字體檔.ttf 放進去

```javascript
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

export default function App() {
  //先設定一個狀態，判斷字體是否已成功載入
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        /*
          loadAsync放一個{}，
          Playpen-Sans:自訂的字體名稱，看你要把你的字體叫什麼名字
          require('...'):你放的字體的相對路徑
        */
        await Font.loadAsync({
          'Playpen-Sans': require('./assets/fonts/PlaypenSans-VariableFont_wght.ttf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        //載入成功後將將狀態改為true
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  //等待字體載入成功，若還未成功return null
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  //View需要設定onLayout
  return (
    <View onLayout={onLayoutRootView}>
      <Text>...</Text>
    </View>
  )
}
```

3. 成功載入後可在 css 使用 fontFamily

```css
/*注意字體名稱是你前面loadAsync時自訂的名字*/
title: {
  fontfamily: 'Playpen-Sans';
}
```

---

## React Navigation

**影片中教的是 V3、V4，目前最新版的是 V6，我用的也是 v6，用法上差很多，所以請務必要去看官方文件**

[官方文件](https://reactnavigation.org/docs/getting-started/ '官方文件')
我想是因為在移動設備上的程式，並不像瀏覽器一樣，會紀錄上一頁、下一頁，所以才會用到這個工具，總之這個工具很重要。

一般開發都會先建一個 navigation 的資料夾，裡面會設定有哪些螢幕，然後將那些螢幕加入導航裡面，命名通常都是 XXXNavigator.js

- 螢幕配置設定

```javascript
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//引入自己的螢幕組件
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import Colors from '../constants/Colors'

const Stack = createNativeStackNavigator()

const defaultOption = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTintColor: Colors.headerColor,
  headerTitleAlign: 'center',
}

function MealsNavigator() {
  //配置螢幕設定
  return (
    <NavigationContainer>
      <Stack.Navigator
       {/*設定預設的style*/}
        screenOptions={{
          {/*標題欄是否顯示*/}
          headerShown: false,
          {/*螢幕切換的動畫*/}
          presentation: 'modal',
          headerStyle: {
            backgroundColor: Colors.primaryColor,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: Colors.headerColor,
          headerTitleAlign: 'center',
        }}
         {/*首次載入時要顯示的螢幕，預設會是下方螢幕第一個*/}
         initialRouteName="Categories">
        {/*name和component必填，options放螢幕相關的配置，顏色、字體、位置...*/}
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          {/*如果不要用上面的預設style新設定自己加*/}
          options={...}
        />
        <Stack.Screen name="CategoryMeals" component={CategoryMealScreen} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MealsNavigator
```

- 常用的導航跳轉

```javascript
//導航到指定的螢幕，跳到新螢幕會出現回上一頁的按鈕
props.navigation.navigate('MealDetail')
//回上一個螢幕
props.navigation.goBack()
//回到第一個螢幕(回首頁)
props.navigation.popToTop()
//替換一個螢幕，跟navigate的差別就是跳到新螢幕時不會有回上一頁的按鈕
props.navigation.replace('CategoryMeals')
```

- 導航跳轉傳遞參數

```javascript
//傳遞參數，跳轉的螢幕名稱後面接一個{}，放你要傳的參數
props.navigation.navigate('CategoryMeals', {
  categoryId: item.id,
})
//接收參數，props.route.params.你參數的key值
const catId = props.route.params.categoryId
```

- **依參數動態配置標題**

```javascript
//在你的螢幕配置裡(XXXNavigator.js)，把原本的option改成函式
return (
  <Stack.Screen
    name="CategoryMeals"
    component={CategoryMealScreen}
    {/*包route的{}不能省略*/}
    options={({ route }) => {
      {/*接收參數方法跟上面一樣*/}
      const catId = route.params.categoryId
      {/*對你的參數做處理*/}
      const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)

      {/*最後回傳一個{}*/}
      return {
        title: selectedCategory.title,
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: Colors.headerColor,
        headerTitleAlign: 'center',
        {/*設定header右邊要顯示東西，必須是一個function。左邊的叫headerLeft*/}
        headerRight:()=><Text>123</Text>
      }
    }}
  />
)
```

---

## react native screens

[官方文件](https://github.com/software-mansion/react-native-screens/tree/7994eda0f802c122b6c82818c207fa8f216b48ec '官方文件')

簡單來說性能優化。<s>雖然我看不出來有什麼差</s>

```javascript
npm install react-native-screens
```

```javascript
import { enableScreens } from 'react-native-screens'

//通常會在App.js裡啟用
enableScreens()

export default function App() {
  return <View>...</View>
}
```

## react-navigation-header-buttons

[官方文件](https://github.com/vonovak/react-navigation-header-buttons '官方文件')
優化 navigation 的 header button

```javascript
npm install --save react-navigation-header-buttons
```

```javascript
//範例:使用expo提供的icon
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.headerColor}
    />
  )
}

export default CustomHeaderButton
```

```javascript
//在你的header導航欄裡加入
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

headerRight: () => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      //如果item有2個以上就需要key
      key={'h1'}
      title="Favorite"
      //expo提供的icon名稱
      iconName="star"
      onPress={() => {
        return console.log('favorite')
      }}
    />
  </HeaderButtons>
),
```

## Bottom Tabs Navigator

底部導航欄

```javascript
npm install @react-navigation/bottom-tabs
```

```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

//需要將原本的header導航欄整個換掉
function MealsNavigator() {
  return (
    <NavigationContainer>
      {/*設定標題是否顯示*/}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/*主要就是將原本的Header導航欄包成一個組件，總之先做好header，bottom就會比較好弄。MyHomeStack是一個function，裡面就是放原本的header導航欄*/}
        <Tab.Screen name="Home" component={MyHomeStack} />
        {/*其他螢幕*/}
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
```

---

## 打包教學

[官方文檔](https://docs.expo.dev/build/setup/ '官方文檔')

1. 安裝 eas-cli

```console
npm install -g eas-cli
```

2. 登入 eas(expo)

```console
eas account:logout
```

3. eas build

```console
eas build:configure
```

輸入完後會問你要打包 ios 或 android

4. 根據官方說明修改 eas.json
   [官方說明](https://docs.expo.dev/build-reference/apk/ '官方說明')
   過程中可能會問你很多問題，如果不知道就全部說 yes 就對了

```console
eas build -p android --profile preview
```

打包完成後會給你一個 QRCode，是一個網址，連到 expo 的 dashboard，你可以直接在上面下載 apk。
若是要發佈到商店則需要多設定(我不會)。

## 其他

- 如果函數帶括號會是立即執行的，一般不會這樣用

```javascript
<Button title="add" onPress={addTextHandler()} />
```

- console.log()會顯示在 IDE 的 TERMINAL 裡
- android 模擬器，ctrl+M 可以開啟調適菜單
  ![Android調適菜單](https://cdn.jsdelivr.net/gh/gusty1/Study_ReactNative@main/images/debug.png 'Android調適菜單')

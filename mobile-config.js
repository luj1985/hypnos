App.info({
  id: 'com.schaeffler.assistant', // used as android package name
  name: 'Hypnos',
  description: '舍弗勒产品助手是一款实用的汽车零部件应用查询软件，可以帮您轻松找到舍弗勒汽车售后旗下所有乘用车产品及其车型应用信息。',
  author: 'Lu, Jun',
  email: 'luj1985@gmail.com',
  website: 'http://luj1985.github.com',
  version: '0.0.1'
});

App.icons({
  // iOS
  'iphone': 'resources/icons/launch-48x48.png',
  'iphone_2x': 'resources/icons/launch-48x48@2x.png',
  'ipad': 'resources/icons/launch-48x48.png',
  'ipad_2x': 'resources/icons/launch-48x48@2x.png',

  // Android
  'android_ldpi': 'resources/icons/launch-48x48.png',
  'android_mdpi': 'resources/icons/launch-48x48.png',
  'android_hdpi': 'resources/icons/launch-48x48.png',
  'android_xhdpi': 'resources/icons/launch-48x48.png'
});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/splash-800x1234.jpg',
  'iphone_2x': 'resources/splash/splash-800x1234@2x.jpg',
  'iphone5': 'resources/splash/splash-800x1234@2x.jpg',

  // Android
  'android_ldpi_portrait': 'resources/splash/splash-800x1234.jpg',
  'android_ldpi_landscape': 'resources/splash/splash-800x1234.jpg',
  'android_mdpi_portrait': 'resources/splash/splash-800x1234.jpg',
  'android_mdpi_landscape': 'resources/splash/splash-800x1234.jpg',
  'android_hdpi_portrait': 'resources/splash/splash-800x1234.jpg',
  'android_hdpi_landscape': 'resources/splash/splash-800x1234.jpg',
  'android_xhdpi_portrait': 'resources/splash/splash-800x1234.jpg',
  'android_xhdpi_landscape': 'resources/splash/splash-800x1234.jpg'
});

App.configurePlugin('com.ihavekey.weibo.oauth', {
  APP_KEY: '1557510073',
  REDIRECT_URL: 'https://api.weibo.com/oauth2/default.html',
  SCOPE: 'email'
});

App.setPreference('DisallowOverscroll', 'true');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('ShowSplashScreenSpinner', 'false');
App.setPreference('KeyboardShrinksView', 'false');
// App.setPreference('SuppressesIncrementalRendering', 'true');

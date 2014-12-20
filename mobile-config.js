App.info({
  name: 'Schaeffler Assistant',
  description: 'Schaeffler Assistant',
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

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');

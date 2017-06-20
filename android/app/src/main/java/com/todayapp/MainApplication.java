package com.todayapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import im.shimo.react.cookie.CookieManagerPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.wog.videoplayer.VideoPlayerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.remobile.video.RCTVideoPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CookieManagerPackage(),
            new ReactNativeYouTube(),
            new VideoPlayerPackage(),
            new VectorIconsPackage(),
            new RCTVideoPackage(),
            new ReactVideoPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

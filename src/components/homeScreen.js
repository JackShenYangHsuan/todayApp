/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  requireNativeComponent,
  Event,
  Picker,
  Button,
  Animated,
  Easing,
  AsyncStorage
} from 'react-native';

import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import Sound from 'react-native-sound';

import {
  setHomeButtonColor, setHomeTime, listPosts,
  toggleTooltip, setTooltipToggle, setMusicState,
  createAccountSuccess, set_video_genres_state_from_api,
  set_music_prefer_state_from_api, getVideo, getArticle, set_id_state
} from '../states/post-actions.js';

const ENTRIES1 = [
    {
        number: 5
    },
    {
        number: 10
    },
    {
        number: 15
    },
    {
        number: 20
    },
    {
        number: 25
    },
];

var teenage1 = new Sound('teenage1.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load teenage1', error);
    return;
  }
  console.log('duration teenage1 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var teenage2 = new Sound('teenage2.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load teenage2', error);
    return;
  }
  console.log('duration teenage2 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var teenage3 = new Sound('teenage3.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load teenage3', error);
    return;
  }
  console.log('duration teenage3 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var folk1 = new Sound('folk1.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load folk1', error);
    return;
  }
  console.log('duration folk1 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var folk2 = new Sound('folk2.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load folk2', error);
    return;
  }
  console.log('duration folk2 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var softrock1 = new Sound('softrock1.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load softrock1', error);
    return;
  }
  console.log('duration softrock1 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var softrock2 = new Sound('softrock2.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load softrock2', error);
    return;
  }
  console.log('duration softrock2 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});
var softrock3 = new Sound('softrock3.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load softrock3', error);
    return;
  }
  console.log('duration softrock3 in seconds: ' + teenage1.getDuration() + 'number of channels: ' + teenage1.getNumberOfChannels());
});

var children;

class HomeScreen extends Component {

  constructor(props) {
   super(props);
   this.widthValue = new Animated.Value(0);
   this.dotValue1 = new Animated.Value(0);
   this.dotValue2 = new Animated.Value(0);
   this.dotValue3 = new Animated.Value(0);
   this.state = {
     language:undefined
   };
 }

 componentWillMount = async() => {
        try{
           var value = await AsyncStorage.getItem('id');
           if(value!=null){
             this.props.dispatch(set_id_state(value));
           }else{
           }
        }catch(error){
            console.log(error);
        }
        this.props.dispatch(listPosts(0));
        this.props.dispatch(setHomeTime(15));
        this.props.dispatch(getArticle());
        // this.props.dispatch(getVideo('nba'));
        this.props.dispatch(set_video_genres_state_from_api());
        this.props.dispatch(set_music_prefer_state_from_api());

  }

  handleMyStuffPress = () =>{
    this.props.navigation.navigate('MyStuff')
  }
  handleVideoPress = () =>{
    this.props.navigation.navigate('Video')
  }
  handleArticlePress = () =>{
    this.props.navigation.navigate('Article')
  }
  handleCreatePress = () =>{
    this.props.navigation.navigate('Create');

  }
  handleSettingPress = () =>{
    this.props.navigation.navigate('Setting')
  }

  handle_time_button_click(time){
    this.props.dispatch(setHomeTime(time));
    this.props.dispatch(set_video_genres_state_from_api());
    // this.props.dispatch(listPosts(time));
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  renderChildren = (music_stage) => {
    if(music_stage[0] && !music_stage[1] && !music_stage[2]){
      return  <View style = {styles.dots}/>
    }
    else if(music_stage[0] && music_stage[1] && !music_stage[2]){
      return (
        <View>
        <View style = {styles.dots}/>
        <View style = {styles.dots}/>
        </View>
      )
    }
    else return (
      <View></View>
    )


  }

  stretchAnimate = () => {



    this.widthValue.setValue(0);
    this.dotValue1.setValue(0);
    this.dotValue2.setValue(0);
    this.dotValue3.setValue(0);
    isStretched = true;
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    };
    Animated.parallel([
      createAnimation(this.widthValue, 250, Easing.easeInElastic),
      createAnimation(this.dotValue1, 2000, Easing.ease, 400),
      createAnimation(this.dotValue2, 2000, Easing.ease, 600),
      createAnimation(this.dotValue3, 2000, Easing.ease, 800),
    ]).start()
    softrock1.stop(() => {
    });
    softrock2.stop(() => {
    });
    softrock3.stop(() => {
    });
  }

  playMusic = (music_stage) => {
    var number = 0;
    music_stage.map(m => {
      if(m == true){
        number += 1;
      }
    });

    if(number == 1){
      softrock1.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
    if(number == 2){
      softrock2.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
    if(number == 3){
      softrock3.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }

  }
// {this.renderChildren(music_stage)}
  render() {
    const {music_stage} = this.props;
    const widthStretch = this.widthValue.interpolate({
      inputRange: [0, 1],
      outputRange: [90, 150]
    });
    const dotStretch1 = this.dotValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    const dotStretch2 = this.dotValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    const dotStretch3 = this.dotValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    const slides = ENTRIES1.map((entry, index) => {
            return (
                <View key={`entry-${index}`} style={styles.circle}>
                    <Text style={styles.timeText}>{ entry.number }</Text>
                </View>
            );
        });
    var dot1 = '#AA3A3A';
    var dot2 = '#AA3A3A';
    var dot3 = '#AA3A3A';
    if(music_stage[0]){
      dot1 = 'white';
    }
    if(music_stage[1]){
      dot2 = 'white';
    }
    if(music_stage[2]){
      dot3 = 'white';
    }
    return (
      <View style = {styles.container}>

        <Image style = {styles.arrow} source = {require('../icons/arrow.png')}/>

        <View style = {styles.time}>

        <Carousel
             sliderWidth={360}
             itemWidth={90}
             firstItem={2}
             inactiveSlideScale={0.94}
             inactiveSlideOpacity={0.6}
             enableMomentum={false}
             showsHorizontalScrollIndicator={false}
             snapOnAndroid={true}
             removeClippedSubviews={false}
             inactiveSlideScale = {0.7}
             onSnapToItem = {(slideIndex) => {this.handle_time_button_click((slideIndex+1)*5)} }
           >
            {slides}

           </Carousel>


        </View>

        <View style = {styles.content}>
          <View style = {styles.myStuffView}>
            <TouchableOpacity style = {styles.myStuff}
              onPress = {this.handleMyStuffPress}
            >
              <Image style = {styles.icon} source = {require('../icons/homeStuff.png')}/>
              <Text style = {styles.text}>MY STUFF</Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.videoView}>
            <TouchableOpacity
              onPress = {this.handleVideoPress}
              style = {styles.video}>
              <Image style = {styles.icon} source = {require('../icons/homeVideo.png')}/>
              <Text style = {styles.text}>VIDEO</Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.articleView}>
            <TouchableOpacity
              onPress = {this.handleArticlePress}
              style = {styles.article}>
              <Image style = {styles.icon} source = {require('../icons/homeArticle.png')}/>
              <Text style = {styles.text}>ARTICLE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style = {styles.footer}>
          <TouchableOpacity
            onPress = {this.handleCreatePress}
          >
            <Image style = {styles.icon} source = {require('../icons/add.png')}/>
          </TouchableOpacity>


            <TouchableOpacity
              onPress={this.stretchAnimate}
              onLongPress={() => this.playMusic(music_stage)}
            >







              <Animated.View
                style={[styles.musicView, {width:widthStretch}]}
              >
                <Animated.View
                  style={[styles.unable_dots, {opacity:dotStretch1}, {backgroundColor:`${dot1}`}]}
                />
                <Animated.View
                  style={[styles.unable_dots, {opacity:dotStretch2}, {backgroundColor:`${dot2}`}]}
                />
                <Animated.View
                  style={[styles.unable_dots, {opacity:dotStretch3}, {backgroundColor:`${dot3}`}]}
                />
              </Animated.View>
            </TouchableOpacity>


          <TouchableOpacity
            onPress = {this.handleSettingPress}
          >
            <Image style = {styles.icon} source = {require('../icons/profile.png')}/>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({


  container:{
    flex:1,
    display:'flex',
    backgroundColor:'white'
  },

  arrow:{
    width:25,
    height:20,
    alignSelf:'center',
    marginTop:40,
    position:'absolute'
  },
  time:{
    flex:1.5,
    paddingTop:80,
    backgroundColor:'transparent'
  },
  circle:{
    width:80,
    height:80,
    borderWidth:2,
    borderRadius:100,
    borderColor:'#E2E2E2',
    justifyContent:'center',
    marginLeft:10
  },
  timeText:{
    fontSize:35,
    fontWeight:'500',
    color:'#FD4D3A',
    alignSelf:'center',
    backgroundColor:'transparent',
  },
  content:{
    flex:4,

  },
  icon:{
    width:35,
    height:35,
    marginLeft:40,
    marginTop:20
  },
  text:{
    backgroundColor:'transparent',
    fontSize:25,
    letterSpacing:2,
    color:'white',
    fontWeight:'600',
    position:'absolute',
    marginLeft:100,
    marginTop:23
  },
  myStuffView:{
    flex:1,
  },
  myStuff:{
    width:'90%',
    height:'70%',
    backgroundColor:'#87C1E5',
    alignSelf:'center',
    borderWidth:1,
    borderRadius:100,
    borderColor:'#87C1E5'
  },
  video:{
    width:'90%',
    height:'70%',
    backgroundColor:'#A8E587',
    alignSelf:'center',
    borderWidth:1,
    borderRadius:100,
    borderColor:'#A8E587'
  },
  article:{
    width:'90%',
    height:'70%',
    backgroundColor:'#E587A0',
    alignSelf:'center',
    borderWidth:1,
    borderRadius:100,
    borderColor:'#E587A0'
  },
  videoView:{
    flex:1,

  },
  articleView:{
    flex:1,

  },

  footer:{
    flex:1,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:40
  },
  musicContainer:{
    width:90,
    height:40,
    borderRadius:100,
    marginLeft:35,
    marginTop:15,
    justifyContent:'center'
  },
  musicIcon:{
    width:20,
    height:25,
    alignSelf:'center'
  },
  musicView: {
    height: 40,
    borderColor:'#FD4D3A',
    borderWidth:1,
    borderRadius:100,
    backgroundColor:'#FD4D3A',
    marginLeft:35,
    marginTop:15,
    justifyContent:'center',
    flexDirection: 'row'
  },
  unable_dots: {
    width: 16,
    height: 16,
    // backgroundColor:'#AA3A3A',
    borderRadius:12,
    alignItems: 'center',
    marginTop: 11,
    marginLeft: 8,
    marginRight: 8
  },
  dots: {
    width: 16,
    height: 16,
    // backgroundColor:'blue',
    borderRadius:12,
    alignItems: 'center',
    marginTop: 26,
    marginLeft: 70,
    marginRight: 8,
    position:'absolute',
    zIndex:100
  }
});

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home,
      ...state.Music,
      ...state.Registor,
      ...state.Video_genres,
      ...state.Music_prefer,
      ...state.nav
    };
})(HomeScreen);

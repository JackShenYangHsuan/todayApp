/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  Button
} from 'react-native';

import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import {
  setHomeButtonColor, setHomeTime, listPosts,
  toggleTooltip, setTooltipToggle, setMusicState,
  createAccountSuccess, set_video_genres_state_from_api,
  set_music_prefer_state_from_api, getVideo, getArticle
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

class HomeScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {
     language:undefined
   };
 }

 componentWillMount() {
        this.props.dispatch(listPosts(0));
        this.props.dispatch(setHomeTime(10));
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
    this.props.navigation.navigate('Create')
  }
  handleSettingPress = () =>{
    this.props.navigation.navigate('Setting')
  }

  handle_time_button_click(time){
    this.props.dispatch(setHomeTime(time));
    // this.props.dispatch(listPosts(time));
  }


  render() {

    const slides = ENTRIES1.map((entry, index) => {
            return (
                <View key={`entry-${index}`} style={styles.circle}>
                    <Text style={styles.timeText}>{ entry.number }</Text>
                </View>
            );
        });


    return (
      <View style = {styles.container}>

        <Image style = {styles.arrow} source = {require('../icons/arrow.png')}/>

        <View style = {styles.time}>

        <Carousel
             sliderWidth={360}
             itemWidth={90}
             firstItem={1}
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

          <View style = {styles.musicView}>
            <Image style = {styles.musicIcon} source = {require('../icons/music.png')}/>
          </View>

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
  musicView:{
    width:90,
    height:40,
    borderColor:'#FD4D3A',
    borderWidth:1,
    borderRadius:100,
    backgroundColor:'#FD4D3A',
    marginLeft:35,
    marginTop:15,
    justifyContent:'center'
  },
  musicIcon:{
    width:20,
    height:25,
    alignSelf:'center'
  }
});

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home,
      ...state.Music,
      ...state.Registor,
      ...state.Video_genres,
      ...state.Music_prefer
    };
})(HomeScreen);

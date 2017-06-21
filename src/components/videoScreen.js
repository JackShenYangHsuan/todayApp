/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  WebView,
  Image
} from 'react-native';

import Swiper from "react-native-deck-swiper";
import {connect} from 'react-redux';
import {
  getVideo
} from '../states/post-actions.js';

var randomId = Math.floor(Math.random() * 21);

class VideoScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {
     swipedAllCards: false,
   };
 }

  handleSwipedAll  = () => {
    this.setState({
      swipedAllCards: true
    });
  };
  handleGoBack = () => {
    const { goBack } = this.props.navigation;
    const {genres} = this.props;
    var abled_genres = genres.filter(g => {
      if(g.able == true){
        return g;
      }
    });
    let genres_length = abled_genres.length;
    var randomGenre = Math.floor(Math.random() * genres_length);
    this.props.dispatch(getVideo(abled_genres[randomGenre].topic));

    // console.log(randomGenre);

    console.log(abled_genres);

    goBack();
  }

  // componentWillMount() {
  //   const {genres} = this.props;
  //   var abled_genres = genres.filter(g => {
  //     if(g.able == true){
  //       return g;
  //     }
  //   });
  //   let genres_length = abled_genres.length;
  //   var randomGenre = Math.floor(Math.random() * genres_length);
  //   this.props.dispatch(getVideo(abled_genres[randomGenre].topic));
  //
  // }


  render() {

    const {video, genres, HomeTime} = this.props;

        var title = [];
        var arr = [];
        var url = [];
        var uploader = [];
        var video_time = [0, 0, 0];
        var count = 0;
        if(HomeTime == 5){
          let v = video.data.results.map(r => {
              let video_time_array = r.length.split(":");
              if(video_time_array.length == 3){
                video_time[count] = parseInt(video_time_array[0])*60*60 + parseInt(video_time_array[1])*60 + parseInt(video_time_array[2]);
              }
              if(video_time_array.length == 2){
                video_time[count] = parseInt(video_time_array[0])*60 + parseInt(video_time_array[1]);
              }
              if(video_time[count] < 330 && count < 3){
                title[count] = r.title;
                url[count] = r.link;
                arr[count] = [r.link, r.title];
                uploader[count] = r.user.name;
                count = count + 1;
                return r;
              }
          });
        }
        else if(HomeTime == 10){
          let v = video.data.results.map(r => {
              let video_time_array = r.length.split(":");
              if(video_time_array.length == 3){
                video_time[count] = parseInt(video_time_array[0])*60*60 + parseInt(video_time_array[1])*60 + parseInt(video_time_array[2]);
              }
              if(video_time_array.length == 2){
                video_time[count] = parseInt(video_time_array[0])*60 + parseInt(video_time_array[1]);
              }
              if(video_time[count] < 630 && video_time[count] > 330 && count < 3){
                title[count] = r.title;
                url[count] = r.link;
                arr[count] = [r.link, r.title];
                uploader[count] = r.user.name;
                count = count + 1;
                return r;
              }
          });
        }
        else if(HomeTime == 15){
          let v = video.data.results.map(r => {
              let video_time_array = r.length.split(":");
              if(video_time_array.length == 3){
                video_time[count] = parseInt(video_time_array[0])*60*60 + parseInt(video_time_array[1])*60 + parseInt(video_time_array[2]);
              }
              if(video_time_array.length == 2){
                video_time[count] = parseInt(video_time_array[0])*60 + parseInt(video_time_array[1]);
              }
              if(video_time[count] < 930 && video_time[count] > 630 && count < 3){
                title[count] = r.title;
                url[count] = r.link;
                arr[count] = [r.link, r.title];
                uploader[count] = r.user.name;
                count = count + 1;
                return r;
              }
          });
        }
        else if(HomeTime == 20){
          let v = video.data.results.map(r => {
              let video_time_array = r.length.split(":");
              if(video_time_array.length == 3){
                video_time[count] = parseInt(video_time_array[0])*60*60 + parseInt(video_time_array[1])*60 + parseInt(video_time_array[2]);
              }
              if(video_time_array.length == 2){
                video_time[count] = parseInt(video_time_array[0])*60 + parseInt(video_time_array[1]);
              }
              if(video_time[count] < 1230 &&count < 3){
                title[count] = r.title;
                url[count] = r.link;
                arr[count] = [r.link, r.title];
                uploader[count] = r.user.name;
                count = count + 1;
                return r;
              }
          });
        }
        else if(HomeTime == 25){
          let v = video.data.results.map(r => {
              let video_time_array = r.length.split(":");
              if(video_time_array.length == 3){
                video_time[count] = parseInt(video_time_array[0])*60*60 + parseInt(video_time_array[1])*60 + parseInt(video_time_array[2]);
              }
              if(video_time_array.length == 2){
                video_time[count] = parseInt(video_time_array[0])*60 + parseInt(video_time_array[1]);
              }
              if(video_time[count] < 1530 && count < 3){
                title[count] = r.title;
                url[count] = r.link;
                arr[count] = [r.link, r.title];
                uploader[count] = r.user.name;
                count = count + 1;
                return r;
              }
          });
        }
        else{
          title[0] = video.data.results[randomId].title;
          url[0] = video.data.results[randomId].link;
          uploader[0] = video.data.results[randomId].user.name;
        }

    // let arr = [];
    if(!arr.length) {
      // url.map(p => {
      //   arr.push([p]);
      // })
      arr.push([`Oops, we cannot find any ${HomeTime}-minute videos` ])
    }
    // else arr.push(['No videos'])

    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>

          <Swiper
              cards={arr}
              renderCard={(card) => {
                if(arr[0][0] != `Oops, we cannot find any ${HomeTime}-minute videos`){
                  return (

                      <View style={styles.card}>

                        <View style = {styles.topCover}/>
                        <View style = {styles.bottomCover}/>
                        <View style = {styles.titleContainer}>
                          <Text style = {styles.VideoTitle}> {card[1]} </Text>
                        </View>
                          <WebView
                          source={{uri: `${card[0]}`}}
                          style={[{marginTop: 150}, {marginBottom:5},]}
                          contentInset = {{top: 0, left: 20, bottom: 0, right: 20}}
                          scrollEnabled = 'false'
                          >

                        </WebView>
                      </View>
                  )
                }
                else return (
                  <View style={styles.card}>
                    <View style = {styles.stuffView}>
                      <Text style={styles.title}>{card[0]}</Text>
                    </View>
                  </View>
                )
              }}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={this.handleSwipedAll}
              cardIndex={0}
              backgroundColor={'white'}
              disableBottomSwipe='true'
              disableTopSwipe='true'
              childrenOnTop='true'
              onSwipedAll = {() => this.handleGoBack()}
              verticalSwipe = {false}
              disableBottomSwipe={true}
              disableTopSwipe={true}
              >
          </Swiper>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner:{
    width:300,
    height:150
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#A8E587',
    backgroundColor: 'white',
  },
  titleContainer:{
    height:100,
    width:300,
    marginTop:40,
    alignSelf:'center',
    position:'absolute',
    zIndex:100,
  },
  VideoTitle:{
    fontSize:20,
    fontWeight:'400',
    color:'#55A52A',
    letterSpacing:1,
    textAlign:'center',
    marginTop:50
  },
  topCover:{
    backgroundColor:'white',
    width:327,
    height:100,
    position:'absolute',
    zIndex:100,
    marginTop:95,
  },
  bottomCover:{
    backgroundColor:'white',
    width:327,
    height:155.5,
    position:'absolute',
    zIndex:100,
    marginTop:380,
    alignSelf:'center'
  },
  noCard: {
    flex: 1,
    justifyContent: 'center',
  },

  bottomText: {
    textAlign: 'center',
    marginTop:'30%',
    width:'100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    backgroundColor: 'transparent',
    color:'#55A52A'
  },
  stuffView:{
    flex:3,
    backgroundColor:'transparent',
    justifyContent:'center'
  },
});

export default connect((state) => {
    return {
      ...state.Home,
      ...state.Video_genres,
      ...state.Video
    };
})(VideoScreen);

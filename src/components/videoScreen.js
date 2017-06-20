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
  WebView
} from 'react-native';

import Swiper from "react-native-deck-swiper";
import {connect} from 'react-redux';

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
    goBack();
  }

  render() {

    const {video, genres, HomeTime} = this.props;

        var title = ['', '', ''];
        var url = ['', '', ''];
        var uploader = ['', '', ''];
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




    return (
      <View style={styles.container}>
          <Swiper
              cards={[[url[0]], [url[1]], [url[2]]]}
              renderCard={(card) => {
                  return (
                      <View style={styles.card}>
                          <WebView
                          source={{uri: `${card[0]}`}}
                          style={{marginTop: 10}}
                          contentInset = {{top: 160, left: 0, bottom: 0, right: 0}}
                          scrollEnabled = 'false'
                          />
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
              >
          </Swiper>
          {
            this.state.swipedAllCards?
              <View style = {styles.noCard}>
                <Text style={styles.bottomText}>Oops, there are no more articles for you</Text>
                <TouchableOpacity onPress={this.handleGoBack}>
                  <View>
                    <Text style={styles.bottomText}>Go back</Text>
                  </View>
                </TouchableOpacity>
              </View>
            : <View></View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A8E587',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  noCard: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  bottomText: {
    textAlign: 'center',
    marginTop:'30%',
    width:'100%',
  }
});

export default connect((state) => {
    return {
      ...state.Home,
      ...state.Video_genres,
      ...state.Video
    };
})(VideoScreen);

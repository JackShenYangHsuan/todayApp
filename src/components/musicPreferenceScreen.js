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
  Image,
  ScrollView,
  TextInput,
  Switch,
  KeyboardAvoidingView
} from 'react-native';

import {connect} from 'react-redux';
import Swiper from "react-native-deck-swiper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  set_video_genres, sent_video_genres_to_api, set_video_genres_state_from_api, input_video
} from '../states/post-actions.js';
import {
  set_music_prefer, sent_music_prefer_to_api, set_music_prefer_state_from_api
} from '../states/post-actions.js';

class MusicPreferences extends Component {

  constructor(props) {
   super(props);
   this.state = {
     falseSwitchIsOn: true,
   };
 }

 handle_music_prefer_click(topic){
      var {prefer} = this.props;

      prefer = prefer.map(p => {
            if(p.topic == topic){
              p.able = !p.able;
            }

            return p;

        });


      this.props.dispatch(set_music_prefer(prefer));

    }
  handle_save_music_prefer_click(prefer){
      this.props.dispatch(sent_music_prefer_to_api(prefer));
  }


  render() {

    const {prefer} = this.props;

    let children = prefer.map(g => {
          if(g.able == true){
            return (
              <View style = {{marginTop:10}}>
                <View style = {styles.enableCircle} />
                <TouchableOpacity style = {styles.textBtn} onPress= {() => this.handle_music_prefer_click(g.topic)} >
                  <Text style = {styles.enableText}> {g.topic} </Text>
                </TouchableOpacity>
              </View>
            );
          }else{
            return (
              <View style = {{marginTop:10}}>
                <View style = {styles.disableCircle} />
                <TouchableOpacity style = {styles.textBtn} onPress= {() => this.handle_music_prefer_click(g.topic)} >
                  <Text style = {styles.disableText}> {g.topic} </Text>
                </TouchableOpacity>
              </View>
            );
          }
        });


    return (
      <KeyboardAwareScrollView style = {{backgroundColor:'white'}}>

        <View>
          <Text style = {styles.title}>Music Preferences</Text>
        </View>

        <View>



        </View>

        <View style = {styles.content}>
            {children}
        </View>


        <View style = {styles.doneView}>
          <TouchableOpacity
            onPress = {() => this.handle_save_music_prefer_click(prefer)}
            style = {styles.doneRec}>
            <Text style = {styles.doneText}>Save</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize:20,
    fontWeight:'300',
    color:'#244048',
    alignSelf:'center',
    marginTop:35,
    marginBottom:10
  },
  inputView:{
    width:'100%',
    height:40,
    marginTop:5,
  },
  content:{
    marginTop:70,
    marginLeft:20
  },
  enableText:{
    fontSize:20,
    letterSpacing:1,
    fontWeight:'300',
    color:'#FD4D3A'
  },
  disableText:{
    fontSize:20,
    letterSpacing:1,
    fontWeight:'300',
    color:'#244048'
  },
  textBtn:{
    width:'70%',
    marginLeft:30,
  },
  enableCircle:{
    position:'absolute',
    width:20,
    height:20,
    borderColor:'#FD4D3A',
    borderWidth:1,
    borderRadius:100,
    backgroundColor:'#FD4D3A',
  },
  disableCircle:{
    position:'absolute',
    width:20,
    height:20,
    borderColor:'#244048',
    borderWidth:1,
    borderRadius:100,
    backgroundColor:'white',
  },
  textInput:{
    height:40,
    marginTop:15,
    marginRight:30,
    textAlign:'center',
    padding:'2%',
    width:'80%',
    borderWidth:2,
    borderRadius:9,
    alignSelf:'center',
    borderColor:'#D1D1D1'
  },

  add:{
    width:30,
    height:30,
    position:'absolute',
    marginLeft:330,
    marginTop:-34
  },

  doneRec:{
    backgroundColor:'#99DFF4',
    width:325,
    height:50,
    alignSelf:'center',
    borderColor:'#99DFF4',
    borderWidth:2,
    borderRadius:10,
    justifyContent:'center'
  },
  doneView:{
    position:'absolute',
    marginTop:550,
    alignSelf:'center'
  },
  doneText:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'600',
    color:'white',
  }
});

export default connect((state) => {
  return {
    ...state.Music_prefer
  };
})(MusicPreferences);

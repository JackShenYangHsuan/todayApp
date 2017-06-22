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
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput,
  Switch,
  AsyncStorage
} from 'react-native';

import Swiper from "react-native-deck-swiper";
import {connect} from 'react-redux';


class SettingScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {
     falseSwitchIsOn: true,
   };
 }

 handlePlaceSettingPress = () =>{
   this.props.navigation.navigate('PlaceSetting')
 }
 handleVideoGenresPress = () =>{
   this.props.navigation.navigate('VideoGenres')
 }
 handleMusicPreferencePress = () =>{
   this.props.navigation.navigate('MusicPrefernce')
 }
 goBack = () => {
   const { goBack } = this.props.navigation;
   goBack();
 }
 handleLogout = async () =>{
   try{
      await AsyncStorage.removeItem('id');
   }catch(error){
       console.log(error);
   }
   this.props.navigation.navigate('Login');
   
 }

  render() {
    return (
      <View style = {styles.container}>
      <TouchableOpacity onPress = {this.goBack}>
        <Image style = {styles.backBtn} source = {require('../icons/backBtn.png')}/>
      </TouchableOpacity>
        <View style = {styles.welcomeView}>
          <Text style = {styles.titleWelcome}>Welcome,</Text>
          <Text style = {styles.titleName}>Jack</Text>
        </View>

        <View style = {styles.listView}>
          <TouchableOpacity
              onPress = {this.handlePlaceSettingPress}
              style = {styles.listRow}>
              <Text style = {styles.listText}>Home & Office</Text>
              <Image style = {styles.icon} source = {require('../icons/settingsHome.png')}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress = {this.handleVideoGenresPress}
            style = {styles.listRow}>
            <Text style = {styles.listText}>Video Genres</Text>
            <Image style = {styles.icon} source = {require('../icons/settingsVideo.png')}/>
          </TouchableOpacity>

          <TouchableOpacity
            onPress = {this.handleMusicPreferencePress}
            style = {styles.listRow}>
            <Text style = {styles.listText}>Music Preferences</Text>
            <Image style = {styles.icon} source = {require('../icons/settingsMusic.png')}/>
          </TouchableOpacity>

          <TouchableOpacity
            style = {styles.listRow}>
            <Text style = {styles.listText}>Terms of Use</Text>
            <Image style = {styles.icon} source = {require('../icons/settingsTerms.png')}/>
          </TouchableOpacity>
        </View>

        <View style = {styles.footerView}>
            <TouchableOpacity
            onPress = {this.handleLogout}
            style = {styles.logoutView}>
              <Text style = {styles.logoutText}>Logout</Text>
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
  backBtn:{
    width:28,
    height:20,
    marginTop:40,
    marginLeft:25,
    position:'absolute',

  },
  titleWelcome:{
    fontSize:20,
    fontWeight:'300',
    color:'#242F38',
    marginTop:50,
    marginLeft:30,
  },
  titleName:{
    fontSize:30,
    fontWeight:'700',
    color:'#FD4D3A',
    marginLeft:30,
  },
  welcomeView:{
    marginTop:50,
    flex:2,
  },
  listView:{
    flex:3,
    display:'flex',
    marginLeft:30,
    marginRight:45
  },
  footerView:{
    flex:2,
  },
  listText:{
    width:200,
    fontSize:20,
    fontWeight:'300',
    color:'#244048'
  },
  listRow:{
    flex:1,
    borderBottomWidth:1,
    borderBottomColor:'#D8D8D8',
    marginTop:2,
    paddingTop:27
  },
  icon:{
    width:50,
    height:50,
    marginLeft:250,
    marginTop:15,
    position:'absolute'
  },
  logoutView:{
    marginTop:100,
    backgroundColor:'#E2E2E2',
    width:150,
    height:40,
    alignSelf:'center',
    borderColor:'#E2E2E2',
    borderWidth:1,
    borderRadius:9,
    justifyContent:'center'
  },
  logoutText:{
    alignSelf:'center',
    color:'white',
    fontSize:15,
    fontWeight:'800'
  }
});

export default connect((state) => {
  return {
    ...state.Registor,
    ...state.Login,
    ...state.Main_state
  };
})(SettingScreen);

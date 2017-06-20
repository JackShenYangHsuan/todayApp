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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class PlaceSettingScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {
     falseSwitchIsOn: true,
   };
 }
  render() {
    return (
      <KeyboardAwareScrollView style = {{backgroundColor:'white'}}>

        <View>
          <Text style = {styles.title}>Home & Office</Text>
        </View>

        <View>
          <Image style = {styles.icon} source = {require('../icons/settingsHome.png')}/>
          <Text style = {styles.subTitle}>Home</Text>

          <View style = {styles.inputView}>
            <TextInput
              style = {styles.textInput}
              placeholder="Enter home address"
            />
          </View>

          <Text style = {styles.or}>or</Text>
          <TouchableOpacity>
            <Text style = {styles.location}>Use current location</Text>
          </TouchableOpacity>
        </View>

        <View style = {{marginTop:20}}>

          <Image style = {styles.icon} source = {require('../icons/settingsOffice.png')}/>
          <Text style = {styles.subTitle}>Office</Text>

          <View style = {styles.inputView}>
            <TextInput
              style = {styles.textInput}
              placeholder="Enter office address"
            />
          </View>

          <Text style = {styles.or}>or</Text>
          <TouchableOpacity>
            <Text style = {styles.location}>Use current location</Text>
          </TouchableOpacity>
        </View>


        <View style = {styles.doneView}>
          <TouchableOpacity style = {styles.doneRec}>
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

  textInput:{
    height:50,
    marginTop:15,
    textAlign:'center',
    padding:'2%',
    width:'90%',
    borderWidth:2,
    borderRadius:9,
    alignSelf:'center',
    borderColor:'#D1D1D1'
  },

  icon:{
    width:50,
    height:50,
    marginLeft:20,
    marginTop:20
  },

  subTitle:{
    width:200,
    marginLeft:80,
    color:'#777777',
    fontWeight:'300',
    fontSize:25,
    marginTop:-35
  },

  or:{
    alignSelf:'center',
    fontSize:14,
    fontWeight:'400',
    color:'#95989A',
    marginTop:40
  },

  location:{
    alignSelf:'center',
    fontSize:17,
    fontWeight:'400',
    color:'#95989A',
    marginTop:10
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
    marginTop:70,
    marginBottom:100
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
    ...state.Place_setting
  };
})(PlaceSettingScreen);

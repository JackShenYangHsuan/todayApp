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
  registor_username, registor_password, createAccount,
  set_password_danger, set_username_danger, reset_registor,
  createAccountSuccess, findAccount
} from '../states/post-actions.js';


class RegisterScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {

   };
 }

 componentWillMount() {
 this.props.dispatch(reset_registor());
}
handleUserInputChange(text) {
 this.props.dispatch(registor_username(text));
 if(text){
   this.props.dispatch(set_password_danger(''));
   this.props.dispatch(set_username_danger(''));
 }
}
handlePasswordInputChange(text) {
 this.props.dispatch(registor_password(text));
}
handle_registor_click(username, password){

 if(!username){
   this.props.dispatch(set_username_danger('has-danger'));
   return;
 }
 if(!password){
   this.props.dispatch(set_password_danger('has-danger'));
   return;
 }
 this.props.dispatch(createAccount(username, password));
 this.props.dispatch(createAccountSuccess(true));
 this.props.dispatch(findAccount("", username, password));
 setTimeout(() => {
     // AsyncStorage.getItem('ids', (res) => {
     //   console.log(res);
     // });
     const {id} = this.props;
     if(id) {
       this.props.navigation.navigate('Home');
     }
     else {
       AlertIOS.alert(
         'You are dead wrong'
       );
     }
 }, 500)
}




  render() {

    const {registor_username_value, registor_password_value, password_danger, username_danger} = this.props;

    return (
      <KeyboardAwareScrollView style = {{backgroundColor:'white'}}>

        <View>
          <Text style = {styles.title}>Register an account</Text>
        </View>

        <View>



          <View style = {styles.inputView}>
            <TextInput
              style = {styles.textInput}
              placeholder="Username"
              value={this.props.inputValue} // controlled component
              onChangeText={text => this.handleUserInputChange(text)}
              returnKeyType = 'done'
            />
          </View>

        </View>

        <View style = {{marginTop:20}}>


          <View style = {styles.inputView}>
            <TextInput
              style = {styles.textInput}
              placeholder="Password"
              value={this.props.inputValue} // controlled component
              onChangeText={text => this.handlePasswordInputChange(text)}
              returnKeyType = 'done'
              secureTextEntry = 'true'
            />
          </View>

        </View>


        <View style = {styles.doneView}>
          <TouchableOpacity
            onPress = {() => this.handle_registor_click(registor_username_value, registor_password_value)}
            style = {styles.doneRec}>
            <Text style = {styles.doneText}>Create</Text>
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
    ...state.Registor,
    ...state.Main_state
    };
})(RegisterScreen);

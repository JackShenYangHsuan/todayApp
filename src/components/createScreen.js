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
  Switch
} from 'react-native';

import Swiper from "react-native-deck-swiper";
import {connect} from 'react-redux';


const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
class CreateScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {
     falseSwitchIsOn: true,
   };
 }
  render() {
    return (
      <ScrollView style = {{backgroundColor:'white'}}>
        <Text style = {styles.title}>Create an Event</Text>
        <View style = {styles.inputView}>
          <TextInput
            style = {styles.textInput}
            placeholder="What's on your mind?"
          />

        </View>

        <View style = {styles.timeView}>
          <Text style = {styles.subTitle0}>Estimated time</Text>
          <View style = {styles.minuteButtonView}>
            <TouchableOpacity style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>5</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>10</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>15</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>20</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>25</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style = {styles.deadlineView}>
            <Text style = {styles.subTitle}>Deadline</Text>
            <Switch
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.falseSwitchIsOn}
              onTintColor="#FD4D3A"
              style = {styles.deadlineSwitch}
            ></Switch>


        </View>

        <View style = {styles.placesView}>
            <Text style = {styles.subTitle}>Places</Text>
            <View style = {styles.placesIconView}>
              <TouchableOpacity style = {styles.placesIconContainer}>
                <Image
                style = {styles.icon}
                source = {require('../icons/office_disabled.png')}/>
                <Text style = {styles.placeText}>office</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.placesIconContainer}>
                <Image
                style = {styles.icon}
                source = {require('../icons/home_disabled.png')}/>
                <Text style = {styles.placeText}>home</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.placesIconContainer}>
                <Image
                style = {styles.icon}
                source = {require('../icons/anywhere_disabled.png')}/>
                <Text style = {styles.placeText}>anywhere</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style = {styles.doneView}>
          <TouchableOpacity style = {styles.doneRec}>
            <Text style = {styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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

  },
  inputView:{
    width:'100%',
    height:40,
    marginTop:30,
  },

  textInput:{
    height:50,
    padding:'5%',
    width:'90%',
    borderWidth:2,
    borderRadius:9,
    alignSelf:'center',
    borderColor:'#D1D1D1'
  },

  timeView:{
    justifyContent:'center',
    height:150
  },

  minuteButtonView:{
    display:'flex',
    flexDirection:'row',
    height:'42%',
    marginTop:20,
    marginLeft:'3%'
  },
  minutesButton:{
    flex:1,
  },
  circle:{
    height:60,
    width:60,
    borderColor:'#E2E2E2',
    borderWidth:1,
    borderRadius:100,
    justifyContent:'center',

  },
  minuteText:{
    textAlign:'center',
    backgroundColor:'transparent',
    fontSize:25,
    fontWeight:'400',
    color:'#FD4D3A'
  },
  subTitle0:{
    marginLeft:'5%',
    marginTop:50,
    fontSize:20,
    color:'#244048',
    fontWeight:'600',

  },
  subTitle:{
    marginLeft:'5%',
    marginTop:50,
    fontSize:20,
    color:'#244048',
    fontWeight:'600',
    width:'30%'
  },
  deadlineSwitch:{
    marginLeft:'80%',
    position:'absolute',
    marginTop:50
  },
  placesIconView:{
    display:'flex',
    flexDirection:'row',
    marginTop:'7%'
  },
  placesIconContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  icon:{
    width:50,
    height:50
  },
  placeText:{
    marginTop:'5%',
    fontSize:15,
    fontWeight:'600',
    color:'#4B4B4B'
  },
  doneRec:{
    backgroundColor:'#FD4D3A',
    width:300,
    height:50,
    alignSelf:'center',
    borderColor:'#FD4D3A',
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
      ...state.Create
    };
})(CreateScreen);

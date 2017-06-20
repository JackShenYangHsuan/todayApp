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
  DatePickerIOS,
} from 'react-native';

import Swiper from "react-native-deck-swiper";
import {connect} from 'react-redux';

import {
  createPost, setInputDanger, setTimeDanger, setDeadlineDanger,
  setPlaceDanger,setInputValue, toggleHasDeadline,
  setDeadline, setEstimateButtonColor, setDeadlineButtonColor, setClicked,
  setPlace, setEstimateTime, resetCreate, setLinkText
} from '../states/post-actions.js';

class CreateScreen extends Component {

  constructor(props) {
   super(props);
   this.state = {
     falseSwitchIsOn: true,
     date: new Date()
   };
 }

 onDateChange = (date) => {
   this.setState({date: date});
   this.props.dispatch(setDeadline(date.toLocaleDateString('en-US')));
   this.props.dispatch(setDeadlineDanger("is_false"));
 };

 handleInputChange = (text) => {
        this.props.dispatch(setInputValue(text));
        if (text) {
            this.props.dispatch(setInputDanger(false));
        }
}
handle_time_button_click = (time) =>{
      this.props.dispatch(setEstimateButtonColor(time));
      this.props.dispatch(setEstimateTime(time));
      this.props.dispatch(setTimeDanger("is_false"));

}
handle_place_button_click = (place) => {
    this.props.dispatch(setPlace(place));
    this.props.dispatch(setPlaceDanger("is_false"));
    this.props.dispatch(setClicked(place));

  }
handle_toggle_button_click = ()=> {
   this.props.dispatch(toggleHasDeadline());
   console.log(this.props)
}
handle_create = () => {
      if (!this.props.inputValue) {
          this.props.dispatch(setInputDanger(true));
          return;
      }
      if(this.props.estimate_time == -1){
        this.props.dispatch(setTimeDanger("is_true"));
        return;
      }
      if (this.props.has_deadline === true  && !this.props.deadline) {
          this.props.dispatch(setDeadlineDanger("is_true"));
          return;
      }
      if(!this.props.place){
        this.props.dispatch(setPlaceDanger("is_true"));
        return;
      }
      this.props.dispatch(createPost(this.props.place, this.props.deadline, this.props.estimate_time, this.props.inputValue, this.props.has_deadline, '1'));
      this.props.dispatch(resetCreate());
}


  render() {
    const {estimate_button_color} = this.props;
    return (
      <ScrollView style = {{backgroundColor:'white'}}>
        <Text style = {styles.title}>Create an Event</Text>
        <View style = {styles.inputView}>
          <TextInput
            style = {styles.textInput}
            placeholder="What's on your mind?"
            value={this.props.inputValue} // controlled component
            onChangeText={text => this.handleInputChange(text)}
            returnKeyType = 'done'
          />

        </View>

        <View style = {styles.timeView}>
          <Text style = {styles.subTitle0}>Estimated time</Text>
          <View style = {styles.minuteButtonView}>
            <TouchableOpacity
              onPress = {() => this.handle_time_button_click(5)}
              style = {styles.minutesButton}

              >
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>5</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = {() => this.handle_time_button_click(10)}
              style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>10</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = {() => this.handle_time_button_click(15)}
              style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>15</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = {() => this.handle_time_button_click(20)}
              style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>20</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = {() => this.handle_time_button_click(25)}
              style = {styles.minutesButton}>
              <View style = {styles.circle}>
                <Text style = {styles.minuteText}>25</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style = {styles.deadlineView}>
            <Text style = {styles.subTitle}>Deadline</Text>
            <Switch
              onValueChange={this.handle_toggle_button_click}
              value={this.props.has_deadline}
              onTintColor="#FD4D3A"
              style = {styles.deadlineSwitch}
            ></Switch>
            {this.state.falseSwitchIsOn &&
            <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={this.onDateChange}
            />
          }

        </View>

        <View style = {styles.placesView}>
            <Text style = {styles.subTitle}>Places</Text>
            <View style = {styles.placesIconView}>
              <TouchableOpacity
                onPress = {() => this.handle_place_button_click('office')}
                style = {styles.placesIconContainer}>
                <Image
                style = {styles.icon}
                source = {require('../icons/office_disabled.png')}/>
                <Text style = {styles.placeText}>office</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress = {() => this.handle_place_button_click('home')}
                style = {styles.placesIconContainer}>
                <Image
                style = {styles.icon}
                source = {require('../icons/home_disabled.png')}/>
                <Text style = {styles.placeText}>home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress = {() => this.handle_place_button_click('anywhere')}
                style = {styles.placesIconContainer}>
                <Image
                style = {styles.icon}
                source = {require('../icons/anywhere_disabled.png')}/>
                <Text style = {styles.placeText}>anywhere</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style = {styles.doneView}>
          <TouchableOpacity
            onPress = {this.handle_create}
            style = {styles.doneRec}>
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

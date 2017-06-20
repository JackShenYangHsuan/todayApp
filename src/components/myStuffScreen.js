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
  Button
} from 'react-native';

import {connect} from 'react-redux';
import Swiper from "react-native-deck-swiper";
import navigationOptions from "react-navigation";
import {
  listPosts, setMystuffButtonColor, resetTime,
  donePost, setMystuffPostNumber, setHomeTime,
  plusMusicStage
} from '../states/post-actions.js';

// let arrCard = [];

class MyStuffScreen extends Component {

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

  componentWillMount() {
        this.props.dispatch(listPosts(0));
  }


  render() {
    const { goBack } = this.props.navigation;
    const {posts, HomeTime, Mystuff_button_color, post_number} = this.props;
    const arr = [];
    let arrCard = posts.map(p => {
      if(p.time == HomeTime)
        arr.push([p.text, p.deadline]);
    })
    console.log(arr.length);
    return (
      <View style={styles.container}>


      <Swiper

            cards={arr}
              renderCard={(card) => {
                  return (

                      <View style={styles.card}>
                        <View style = {styles.stuffView}>
                          <Text style={styles.title}>{card[0]}</Text>
                          <Text style={styles.subTitle}>( Deadline: {card[1]} )</Text>
                        </View>
                        <View style = {styles.timeView}>
                          <Text style = {styles.notYet}>not yet, I still need... </Text>
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
                        <TouchableOpacity style = {styles.doneView}>

                            <Text style = {styles.doneText}>
                              DONE
                            </Text>

                        </TouchableOpacity>
                      </View>
                  )
              }}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={this.handleSwipedAll}
              cardIndex={0}
              backgroundColor={'white'}
              disableBottomSwipe='true'
              disableTopSwipe='true'
              >
          </Swiper>
        
          {
            this.state.swipedAllCards?
              <View style = {styles.noCard}>
                <Text style={styles.bottomText}>Great! You have finished all your stuff!</Text>
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
    borderColor: '#87C1E5',
    backgroundColor: 'white',
    display:'flex',
    justifyContent:'center'
  },
  noCard: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '600',
    backgroundColor: 'transparent',
    color:'#FD4D3A'
  },
  bottomText: {
    textAlign: 'center',
    marginTop:'30%',
    width:'100%',
  },
  subTitle:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '100',
    marginTop:'5%',
    color:'#2A729F'
  },
  stuffView:{
    flex:3,
    backgroundColor:'transparent',
    justifyContent:'center'
  },
  timeView:{
    flex:4,
    justifyContent:'center'
  },
  doneView:{
    flex:1,
    backgroundColor:'#2A729F',
    justifyContent:'center',
    borderColor:'#2A729F',
    borderWidth:2,
    borderRadius:8
  },
  minuteButtonView:{
    display:'flex',
    flexDirection:'row',
    height:'20%',
    marginTop:'5%',
    marginLeft:'3%'
  },
  minutesButton:{
    flex:1,
  },
  circle:{
    height:'95%',
    width:'80%',
    borderColor:'#E2E2E2',
    borderWidth:2,
    borderRadius:100,
    justifyContent:'center',

  },
  minuteText:{
    textAlign:'center',
    backgroundColor:'transparent',
    fontSize:20,
    color:'#2A729F'
  },
  notYet:{
    marginLeft:'5%',
    fontSize:13,
    color:'#2A729F',
    fontWeight:'600'
  },

  doneText:{
    textAlign:'center',
    justifyContent:'center',
    color:'white',
    fontSize:20,
    fontWeight:'700'
  }
});

export default connect((state) => {
    return {
      ...state.ListPosts,
      ...state.Home,
      ...state.Mystuff,
      ...state.Music
    };
})(MyStuffScreen);

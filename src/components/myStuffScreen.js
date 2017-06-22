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
import Animation from 'lottie-react-native';
import anim1 from '../icons/heart.json';
import anim from '../icons/fire.json';
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
     animate: false
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
  handle_time_button_click(time, id){
  this.props.dispatch(setMystuffButtonColor(time));
  this.props.dispatch(resetTime(id, time));
  this.props.dispatch(setMystuffButtonColor(0));
  this.props.dispatch(setHomeTime(0));
  const { goBack } = this.props.navigation;
  goBack();
}
handle_done_button_click = (id) => {

  this.props.dispatch(donePost(id));
  this.props.dispatch(setHomeTime(15));
  this.props.dispatch(plusMusicStage());
  const { goBack } = this.props.navigation;
  this.setState({
    animate: true
  })
  // setTimeout(() => {
  //     goBack();
  // }, 10000)

}

  componentWillMount() {
        this.props.dispatch(listPosts(0));

  }
  // componentDidMount(){
  //   console.log(this.state);
  //   if(this.state.animate) {
  //     console.log('playyyyyyyyy');
  //     setTimeout(() => {
  //         this.anim.play();
  //     }, 5000)
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    const { goBack } = this.props.navigation;
    if (prevState.animate !== this.state.animate) {
      setTimeout(() => {
          this.anim.play();
          this.anim1.play();
          setTimeout(() => {
              goBack();
          }, 3000)
      }, 100)

    }
  }
  goBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  setAnim = (anim) => {
    this.anim = anim;
  }
  setAnim1 = (anim1) => {
    this.anim1 = anim1;
  }
  play = () => {
    this.anim.play();
  }

  render() {
    const { goBack } = this.props.navigation;
    const {posts, HomeTime, Mystuff_button_color, post_number} = this.props;
    const arr = [];


    let arrCard = posts.map(p => {
      if(p.time == HomeTime)
        arr.push([p.text, p.deadline, p.id]);

    })
    if(!arr.length) arr.push(['You have done everything!', 'None']);
    console.log(arr);

    if(this.state.animate) return (
      <View style = {{flex:1}}>

      <Animation
          ref={this.setAnim1}
          style={{
            width: 500,
            height: 300,
            position:'absolute',
            backgroundColor:'transparent',
            marginLeft:-30,
            marginTop:70,
            zIndex:100
          }}
          loop={false}
          source={anim1}
          autoPlay = {true}
        />

      <Animation
          ref={this.setAnim}
          style={{
            width: 375,
            height: 677,
            position:'absolute',
            backgroundColor:'transparent',
            marginLeft:0,
            marginTop:0,
            zIndex:100
          }}
          loop={false}
          source={anim}
          autoPlay = {true}
        />


        </View>

      )




    else return (
      <View style={styles.container}>
      <View>
        <TouchableOpacity onPress = {this.goBack}>
          <Image style = {styles.backBtn} source = {require('../icons/backBtn.png')}/>
        </TouchableOpacity>
      </View>


      <View style = {styles.swiperContainer}>
      <Swiper
            cards={arr}
              renderCard={(card) => {
                if(arr[0][1] != 'None'){
                  return (
                    <View style={styles.card}>
                      <View style = {styles.stuffView}>
                        <Text style={styles.title}>{card[0]}</Text>
                        <Text style={styles.subTitle}>( Deadline: {card[1]} )</Text>
                      </View>
                      <View style = {styles.timeView}>
                        <Text style = {styles.notYet}>not yet, I still need... </Text>
                        <View style = {styles.minuteButtonView}>
                          <TouchableOpacity
                            onPress = {() => this.handle_time_button_click(5,card[2])}
                            style = {styles.minutesButton}>
                            <View style = {styles.circle}>
                              <Text style = {styles.minuteText}>5</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress = {() => this.handle_time_button_click(10,card[2])}
                            style = {styles.minutesButton}>
                            <View style = {styles.circle}>
                              <Text style = {styles.minuteText}>10</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress = {() => this.handle_time_button_click(15,card[2])}
                            style = {styles.minutesButton}>
                            <View style = {styles.circle}>
                              <Text style = {styles.minuteText}>15</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress = {() => this.handle_time_button_click(20,card[2])}
                            style = {styles.minutesButton}>
                            <View style = {styles.circle}>
                              <Text style = {styles.minuteText}>20</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress = {() => this.handle_time_button_click(25,card[2])}
                            style = {styles.minutesButton}>
                            <View style = {styles.circle}>
                              <Text style = {styles.minuteText}>25</Text>
                            </View>
                          </TouchableOpacity>

                        </View>
                      </View>
                      <TouchableOpacity
                        onPress = {() => this.handle_done_button_click(card[2])}
                        style = {styles.doneView}>

                          <Text style = {styles.doneText}>
                            DONE
                          </Text>

                      </TouchableOpacity>
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
              childrenOnTop = 'true'
              onSwipedAll = {() => goBack()}
              style = {styles.swiper}
              verticalSwipe = {false}

              >
          </Swiper>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex'
  },
  swiperContainer:{
    flex:12,
    justifyContent:'center'
  },
  swiper:{

    position:'absolute',
    backgroundColor:'transparent'
  },
  override:{
    marginTop:10

  },
  // light:{
  //   width:'90%',
  //   height:'10%',
  //   backgroundColor:'#BDE4FC',
  //   flex:1,
  //   position:'absolute',
  //   marginTop:25,
  //   zIndex:100,
  //   alignSelf:'center'
  // },
  backBtn:{
    width:28,
    height:20,
    marginTop:40,
    marginLeft:25,
    position:'absolute',
    zIndex:100,
    backgroundColor:'red'
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#87C1E5',
    backgroundColor: 'white',
    display:'flex',
    justifyContent:'center',
    height:'100%',

  },
  noCard: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    backgroundColor: 'transparent',
    color:'#2A729F'
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

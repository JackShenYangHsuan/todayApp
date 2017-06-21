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

class ArticleScreen extends Component {

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
    var randomId = Math.floor(Math.random() * 7);
    const {article} = this.props;
    const arr = [];
    console.log(randomId);
    arr[0] = [article[randomId].url];
    arr[1] = [article[randomId+1].url];
    arr[2] = [article[randomId+2].url];


    return (
      <View style={styles.container}>
          <Swiper

              cards={arr}
              renderCard={(card) => {
                  return (
                      <View style={styles.card}>
                        <WebView
                        source={{uri: card[0]}}
                        style={{marginTop: 10}}
                        contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}
                        scrollEnabled = 'true'
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
              verticalSwipe = {false}
              
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
    borderColor: '#D63E66',
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
    };
})(ArticleScreen);

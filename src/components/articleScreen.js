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
  TouchableOpacity
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

    const {article} = this.props;
        let title = article.title;
        let image = article.img;
        let content = article.content;
        if(!content){
          title = data.title;
          image = data.image;
          content = data.content;
        }


    return (
      <View style={styles.container}>
          <Swiper
              cards={[['title1','content1'], ['title2','content2'], ['title3','content3']]}
              renderCard={(card) => {
                  return (
                      <View style={styles.card}>
                          <Text style={styles.title}>{card[0]}</Text>
                          <Text style={styles.title}>{card[1]}</Text>
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

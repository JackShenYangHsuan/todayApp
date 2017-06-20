import React from 'react';
import {BackHandler} from 'react-native';


import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {search} from './states/search';
import {toast} from './states/toast';
import {
  ListPosts, Home, Create, Mystuff, Music,
  Login, Registor, Main_state, Place_setting,
  Video_genres, Music_prefer, Video
} from 'states/post-reducers.js';

import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import Article from './components/article';
import PostFormScreen from './components/PostFormScreen';
import ForecastScreen from './components/ForecastScreen';

const AppNavigator = StackNavigator({
    Today: {screen: TodayScreen},
    Forecast: {screen: ForecastScreen},
    PostForm: {screen: PostFormScreen}
}, {
    headerMode: 'none'
});

class AppWithStyleAndNavigator extends React.Component {
    render() {
        return (

                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}/>

        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0)
                return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state => ({
    nav: state.nav
}))(AppWithStyleAndNavigator);

// Nav reducer
const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Today'}));
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

// Create Redux store

const store = createStore(combineReducers({
        ListPosts,
        Home,
        Create,
        Mystuff,
        Music,
        Login,
        Registor,
        Main_state,
        Place_setting,
        Video_genres,
        Music_prefer,
        Video
    }), compose(applyMiddleware(thunkMiddleware)));


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}

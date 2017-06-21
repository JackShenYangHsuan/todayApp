import React from 'react';
import {BackHandler} from 'react-native';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';

import {
  ListPosts, Home, Create, Mystuff, Music,
  Login, Registor, Main_state, Place_setting,
  Video_genres, Music_prefer, Video
} from './states/post-reducers.js';

import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';

import ArticleScreen from './components/articleScreen';
import CreateScreen from './components/createScreen';
import HomeScreen from './components/homeScreen';
import MyStuffScreen from './components/myStuffScreen';
import PlaceSettingScreen from './components/placeSettingScreen';
import SettingScreen from './components/settingScreen';
import VideoScreen from './components/videoScreen';
import VideoGenresScreen from './components/videoGenresScreen';
import MusicPreferenceScreen from './components/musicPreferenceScreen';
import LoginScreen from './components/loginScreen';
import RegisterScreen from './components/registerScreen';



const AppNavigator = StackNavigator({
    Article: {screen: ArticleScreen},
    Create: {screen: CreateScreen},
    Home: {screen: HomeScreen},
    MyStuff: {screen: MyStuffScreen},
    PlaceSetting: {screen: PlaceSettingScreen},
    VideoGenres: {screen: VideoGenresScreen},
    MusicPrefernce: {screen: MusicPreferenceScreen},
    Setting: {screen: SettingScreen},
    Video: {screen: VideoScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},

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
const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Login'}));
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

// Create Redux store
const store = createStore(combineReducers({
    nav,
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
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}

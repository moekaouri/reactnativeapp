import React from "react";
import {  createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import VideosOverviewScreen from '../screens/video/VideosOverviewScreen';
import VideoDetailScreen from '../screens/video/VideoDetailScreen';
import ReduxTestScreen from '../screens/video/ReduxTestScreen';
import AuthScreen from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Regular'
  },
  headerBackTitleStyle: {
    fontFamily: 'OpenSans-Regular'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const VideosNavigator = createStackNavigator(
  {
    VideosOverview: VideosOverviewScreen,
    VideoDetail: VideoDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ReduxTestNavigator = createStackNavigator(
  {
    ReduxTest: ReduxTestScreen,   
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);




const VideoNavigator = createDrawerNavigator(
  {
    Videos: VideosNavigator,
    ReduxTest: ReduxTestNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
});


const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Video: VideoNavigator
});



export default createAppContainer(MainNavigator);

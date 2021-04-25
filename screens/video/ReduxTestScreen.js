import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as actions from '../../store/actions/count';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ReduxTestScreen = props => {
  const counting = useSelector((state) => state.counterReducer.counter);
  const dispatch = useDispatch();

  const increment = useCallback(async () => {
    await dispatch(actions.incrementCounter())
  }, [])

  const decrement = useCallback(async () => {
    await dispatch(actions.decrementCounter())
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.operator} onPress={() => decrement()}>
        <Text>-</Text>
      </TouchableOpacity>
      <View style={styles.count}>
      <Text>{counting}</Text>
      </View>
      <TouchableOpacity style={styles.operator} onPress={() => increment()}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};


ReduxTestScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ReduxTestScreen',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),

  };
};


const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  operator: {
    borderWidth: 1,
    padding: 10,
    width: 70,
    alignItems: 'center'
  },
  count: {
    borderWidth: 1,
    borderRadius: 80,
    width: 120,
    height: 120,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ReduxTestScreen;

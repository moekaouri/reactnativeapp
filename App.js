import React , {useState} from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';


import videosReducer from "./store/reducers/video";
import NavigationContainer from "./navigation/NavigationContainer";
import authReducer from "./store/reducers/auth";
import CounterReducer from './store/reducers/count';


const rootReducer = combineReducers({
  videos: videosReducer,
  auth: authReducer,
  counterReducer: CounterReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.warn}
        onFinish={() => {
          setFontLoaded(true);
        }
      }
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

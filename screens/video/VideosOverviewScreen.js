import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import VideoItem from "../../components/video/VideoItem";
import * as videosActions from "../../store/actions/video";
import Colors from "../../constants/Colors";
import { TextInput } from "react-native-gesture-handler";

const VideosOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [text, setText] = useState('');
  const videos = useSelector((state) => state.videos.availableVideos);
  const dispatch = useDispatch();

  const loadVideos = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(videosActions.fetchVideos());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadVideos
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadVideos]);

  useEffect(() => {
    setIsLoading(true);
    loadVideos().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadVideos]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("VideoDetail", {
     videoId: id,
      videoTitle: title,
    });
  };


  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadVideos}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && videos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No videos found!!!</Text>
      </View>
    );
  }
  const API_KEY='AIzaSyBPGRmV9Kt9ptSki8hqPKi9VPlmWOc6txM';

  const onPressSearch = text  => {
    //searchYt(text)
  }


  return (
    <View style={{marginBottom: 100}}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} value={text} onChangeText={text => setText(text)}/>
        <TouchableHighlight style={styles.searchButtonStyle}>
          <Button
            title="search"
            onPress={onPressSearch({text})}
            color="white"
          />
        </TouchableHighlight>
      </View>

      <FlatList
        onRefresh={loadVideos}
        refreshing={isRefreshing}
        data={videos}
        keyExtractor={(item) => item.title}
        renderItem={(itemData) => (
          <VideoItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
          </VideoItem>
        )}
      />
    </View>
  );
};

VideosOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Videos",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchContainer: {
    flexDirection: "row",
    margin: 20,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  searchButtonStyle: {
    color: "white",
    marginBottom: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    margin: 10,
  },
});

export default VideosOverviewScreen;

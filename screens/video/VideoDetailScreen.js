import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSelector } from 'react-redux';


const VideoDetailScreen = props => {
  const videoId = props.navigation.getParam('videoId');
  const selectedVideo = useSelector(state =>
    state.videos.availableVideos.find(prod => prod.id === videoId)
  );


  return (
    <ScrollView>
            <YoutubePlayer
            style={styles.image}
        height={300}
        play={true}
        videoId={selectedVideo.videoId}
      />
      <Text style={styles.title}>{selectedVideo.title}</Text>
      <Text style={styles.description}>{selectedVideo.description}</Text>
    </ScrollView>
  );
};

VideoDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('VideoTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: 25,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

export default VideoDetailScreen;

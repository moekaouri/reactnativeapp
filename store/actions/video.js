
import Video from '../../models/video';

export const SET_VIDEOS = 'SET_VIDEOS';



export const fetchVideos = () => {
  
  return async (dispatch) => {

    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=justin&type=video&key=AIzaSyBPGRmV9Kt9ptSki8hqPKi9VPlmWOc6txM'
      );
      //another api key: AIzaSyAZptDJc5ACc2aBxArswatOPc53BRnlwrk
//     'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLykzf464sU98e8WKKGxceq9wqkZMo-WoY&maxResults=15&part=snippet%2CcontentDetails&key=AIzaSyBPGRmV9Kt9ptSki8hqPKi9VPlmWOc6txM'
      const resData = await response.json();

      const loadedVideos = [];
      
      const result = Object.keys(resData.items).map(key => ({[key]: resData.items[key]}));
 
      for (var i =0; i<result.length; i++) {
        loadedVideos.push(
          new Video(
            i,
            result[i][i].snippet.title,
            result[i][i].snippet.description,
            result[i][i].snippet.thumbnails.medium.url,
            result[i][i].contentDetails.videoId,
          )
        );
      }

      dispatch({
        type: SET_VIDEOS,
        videos: loadedVideos,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
   
  };
};

//snippet.thumbnails.medium.url
//snipet.title
//snipet.descrption

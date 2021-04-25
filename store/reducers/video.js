
import {
  SET_VIDEOS
} from '../actions/video';

const initialState = {
  availableVideos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOS:
      return {
        availableVideos: action.videos,
      };
  }
  return state;
};

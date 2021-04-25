import { INCREMENT_COUNT, DECREMENT_COUNT } from "../actions/count";

const initialState = {
    counter: 0,
  };
  
  export default CounterReducer =  (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT_COUNT:
        return {
            ...state,
            counter: state.counter + 1,
        };

        case DECREMENT_COUNT:
            return {
              ...state,
              counter: state.counter - 1,
            };
    }
    return state;
  };

  
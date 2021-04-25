

export const INCREMENT_COUNT = "INCREMENT_COUNT";
export const DECREMENT_COUNT = "DECREMENT_COUNT";

export const incrementCounter = (payload) => {
    return {
        type: INCREMENT_COUNT,
        payload
    }
}

export const decrementCounter = (payload) => {
    return {
        type: DECREMENT_COUNT,
        payload
    }
}
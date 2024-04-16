import { configureStore } from 'redux';

const initialState = {
  title: 'Default Title',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};

export const store = configureStore(reducer);

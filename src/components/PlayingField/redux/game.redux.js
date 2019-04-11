import { push } from 'react-router-redux';
import fakeapi from '../../../utils/fakeapi/fakeapi';


export const moduleName = 'game';

export const POST_RESULT_GAME_START = `@${moduleName}/POST_RESULT_GAME_START`;
export const POST_RESULT_GAME_SUCCESS = `@${moduleName}/POST_RESULT_GAME_SUCCESS`;
export const POST_RESULT_GAME_FAILURE = `@${moduleName}/POST_RESULT_GAME_FAILURE`;

const initialState = {
  data: null,
  statusMessage: null,
  isFetching: false,
};

export default function game(state = initialState, { type, payload }) {
  switch (type) {
    case POST_RESULT_GAME_START:
      return { ...state, isFetching: true };
    case POST_RESULT_GAME_SUCCESS:
      return { ...state, statusMessage: payload, isFetching: false };
    case POST_RESULT_GAME_FAILURE:
      return { ...state, statusMessage: payload, isFetching: false };

    default:
      return state;
  }
}

export const postResultGamesData = body => (dispatch) => {
  dispatch({ type: POST_RESULT_GAME_START });

  let counter = 0;
  const repeatedRequest = async () => {
    counter++;
    try {
      const response = await fakeapi.post(body);
      const responseData = await response.json();

      if (response.status < 200 || response.status >= 300) {
        if (counter > 2) {
          dispatch({ type: POST_RESULT_GAME_FAILURE, payload: responseData.message });
          dispatch(push('/result'));
          return null;
        }
        return repeatedRequest();
      }
      dispatch({ type: POST_RESULT_GAME_SUCCESS, payload: 'Ого, вы выиграли! Поздравляем!' });
      dispatch(push('/result'));
      return null;
    } catch (error) {
      if (counter > 2) {
        dispatch({ type: POST_RESULT_GAME_FAILURE, payload: error });
        dispatch(push('/result'));
        return null;
      }
    }
    return null;
  };

  repeatedRequest();
};

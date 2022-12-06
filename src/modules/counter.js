import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 1초 뒤에 increase 혹은 decrease 함수를 디스패치하는 함수
// redux-thunk와 같이 함수를 액션으로 디스패치할 수 있게 도와주는 미들웨어가 없다면
// 이 함수는 디스패치되지 못함
export const increaseAsync = () => (dispatch) => {
	setTimeout(() => {
		dispatch(increase());
	}, 1000);
};
export const decreaseAsync = () => (dispatch) => {
	setTimeout(() => {
		dispatch(decrease());
	}, 1000);
};

const initialState = 0;

const counter = handleActions(
	{
		[INCREASE]: (state) => state + 1,
		[DECREASE]: (state) => state - 1,
	},
	initialState,
);

export default counter;

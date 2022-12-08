import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload안에 들어가지 않도록
// () => undefined를 두번째 파라미터로 넣어줌
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// 1초 뒤에 increase 혹은 decrease 함수를 디스패치하는 함수
// redux-thunk와 같이 함수를 액션으로 디스패치할 수 있게 도와주는 미들웨어가 없다면
// 이 함수는 디스패치되지 못함
// export const increaseAsync = () => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch(increase());
// 	}, 1000);
// };
// export const decreaseAsync = () => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch(decrease());
// 	}, 1000);
// };

// 이러한 제너레이터 함수를 사가라고 함
function* increaseSaga() {
	yield delay(1000); // 1초 기다림
	yield put(increase()); // 특정 액션을 디스패치
}

function* decreaseSaga() {
	yield delay(1000); // 1초 기다림
	yield put(decrease()); // 특정 액션을 디스패치
}

export function* counterSaga() {
	// takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해줌
	yield takeEvery(INCREASE_ASYNC, increaseSaga);
	// takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
	// 가장 마지막으로 실행된 작업만 수행함
	yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
	{
		[INCREASE]: (state) => state + 1,
		[DECREASE]: (state) => state - 1,
	},
	initialState,
);

export default counter;

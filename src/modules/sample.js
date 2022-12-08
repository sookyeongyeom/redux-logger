import * as api from '../api/api';
import { handleActions, createAction } from 'redux-actions';
import createRequestThunk from '../utils/createRequestThunk';
import { call, put, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';
import createRequestSaga from '../utils/createRequestSaga';

// 하나의 요청 당 세개의 액션
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수
// 시작했을 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치함
// export const getPost = (id) => async (dispatch) => {
// 	dispatch({ type: GET_POST }); // 요청 시작 알림
// 	try {
// 		const response = await api.getPost(id);
// 		dispatch({
// 			type: GET_POST_SUCCESS,
// 			payload: response.data,
// 		}); // 요청 성공 알림
// 	} catch (e) {
// 		dispatch({
// 			type: GET_POST_FAILURE,
// 			payload: e,
// 			error: true,
// 		}); // 요청 실패 알림
// 		throw e; // 추후 컴포넌트단에서 에러를 조회할 수 있게 해줌
// 	}
// };
// export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getPost = createAction(GET_POST, (id) => id);

// export const getUsers = () => async (dispatch) => {
// 	dispatch({ type: GET_USERS }); // 요청 시작 알림
// 	try {
// 		const response = await api.getUsers();
// 		dispatch({
// 			type: GET_USERS_SUCCESS,
// 			payload: response.data,
// 		}); // 요청 성공 알림
// 	} catch (e) {
// 		dispatch({
// 			type: GET_USERS_FAILURE,
// 			payload: e,
// 			error: true,
// 		}); // 요청 실패 알림
// 		throw e; // 추후 컴포넌트단에서 에러를 조회할 수 있게 해줌
// 	}
// };
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
export const getUsers = createAction(GET_USERS);

// function* getPostSaga(action) {
// 	yield put(startLoading(GET_POST));
// 	// 파라미터로 action을 받아오면 액션 정보 조회 가능
// 	try {
// 		// call을 사용하면 Promise를 반환하는 함수를 호출하고 기다릴 수 있음
// 		// 첫번째 파라미터는 호출할 함수, 나머지 파라미터는 해당 함수에 넣을 인수임
// 		// api.getPost(action.payload)
// 		const post = yield call(api.getPost, action.payload);
// 		yield put({
// 			type: GET_POST_SUCCESS,
// 			payload: post.data,
// 		});
// 	} catch (e) {
// 		yield put({
// 			type: GET_POST_FAILURE,
// 			payload: e,
// 			error: true,
// 		});
// 	}
// 	yield put(finishLoading(GET_POST));
// }
const getPostSaga = createRequestSaga(GET_POST, api.getPost);

// function* getUsersSaga() {
// 	yield put(startLoading(GET_USERS));
// 	try {
// 		const users = yield call(api.getUsers);
// 		yield put({
// 			type: GET_USERS_SUCCESS,
// 			payload: users.data,
// 		});
// 	} catch (e) {
// 		yield put({
// 			type: GET_USERS_FAILURE,
// 			payload: e,
// 			error: true,
// 		});
// 	}
// 	yield put(finishLoading(GET_USERS));
// }
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
	yield takeLatest(GET_POST, getPostSaga);
	yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태
const initialState = {
	post: null,
	users: null,
};

const sample = handleActions(
	{
		[GET_POST_SUCCESS]: (state, action) => ({
			...state,
			post: action.payload,
		}),
		[GET_USERS_SUCCESS]: (state, actions) => ({
			...state,
			users: actions.payload,
		}),
	},
	initialState,
);

export default sample;

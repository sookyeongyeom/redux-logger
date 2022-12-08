import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import sample from './sample';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ counter, sample, loading });

// 루트 사가 생성
export function* rootSaga() {
	// all은 여러 사가를 합쳐주는 역할을 함
	yield all([counterSaga()]);
}

export default rootReducer;

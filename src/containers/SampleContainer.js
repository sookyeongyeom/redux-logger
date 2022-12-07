import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, getUsers } from '../modules/sample';
import Sample from '../components/Sample';

const SampleContainer = () => {
	const { post, users } = useSelector(({ sample }) => ({
		post: sample.post,
		users: sample.users,
	}));
	const { loadingPost, loadingUsers } = useSelector(({ loading }) => ({
		loadingPost: loading['sample/GET_POST'],
		loadingUsers: loading['sample/GET_USERS'],
	}));
	const dispatch = useDispatch();
	const getPostDsp = useCallback((id) => dispatch(getPost(id)), [dispatch]);
	const getUsersDsp = useCallback(() => dispatch(getUsers()), [dispatch]);

	useEffect(() => {
		// async 함수는 useEffect의 파라미터로 넣을 수 없기 때문에
		// 그 내부에서 async 함수를 선언하고 호출해주어야 함
		const fn = async () => {
			try {
				await getPostDsp(1);
				await getUsersDsp();
			} catch (e) {
				// 요청 실패 예외 처리
				console.log(e);
			}
		};
		fn();
	}, [getPostDsp, getUsersDsp]);

	return <Sample post={post} users={users} loadingPost={loadingPost} loadingUsers={loadingUsers} />;
};

export default React.memo(SampleContainer);

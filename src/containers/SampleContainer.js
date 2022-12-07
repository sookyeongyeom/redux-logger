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
		getPostDsp(1);
		getUsersDsp();
	}, [getPostDsp, getUsersDsp]);

	return <Sample post={post} users={users} loadingPost={loadingPost} loadingUsers={loadingUsers} />;
};

export default React.memo(SampleContainer);

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, getUsers } from '../modules/sample';
import Sample from '../components/Sample';

const SampleContainer = () => {
	const { post, users, loadingPost, loadingUsers } = useSelector(({ sample }) => ({
		post: sample.post,
		users: sample.users,
		loadingPost: sample.loading.GET_POST,
		loadingUsers: sample.loading.GET_USERS,
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { auth } from '/store/actions/userAction/userAction';

const Auth = (SpecificComponent, option, adminRoute = null) => {
	//null    =>  아무나 출입이 가능한 페이지
	//true    =>  로그인한 유저만 출입이 가능한 페이지
	//false   =>  로그인한 유저는 출입 불가능한 페이지

	const AuthenticationCheck = props => {
		let user = useSelector(state => state.user);
		const dispatch = useDispatch();

		useEffect(() => {
			//To know my current status, send Auth request
			dispatch(auth()).then(response => {
				//Not Loggined in Status
				if (!response.payload.isAuth) {
					if (option) {
						props.history.push('/login');
					}
					//Loggined in Status
				} else {
					//supposed to be Admin page, but not admin person wants to go inside
					if (adminRoute && !response.payload.isAdmin) {
						props.history.push('/');
					}
					//Logged in Status, but Try to go into log in page
					else {
						if (option === false) {
							props.history.push('/');
						}
					}
				}
			});
		}, []);
		return <SpecificComponent />;
	};
	return AuthenticationCheck;
};

export default Auth;

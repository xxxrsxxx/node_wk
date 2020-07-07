import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const LandingPage = (props) => {
	useEffect(() => {
		// fetch('/api/test', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// }).then(response => {
		// 	console.log('cors test', response);
		// });
	}, []);

	const onClickHandler = () => {
		axios.get(`/api/users/logout`)
			.then(response => {
				if (response.data.success) {
					props.history.push("/login")
				} else {
					alert('로그아웃 failed')
				}
			})
	}
	console.log("LandingPage",props);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection:'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
			}}>
			<h2>시작 페이지</h2>
			<button onClick={onClickHandler}>로그아웃</button>
		</div>
	);
}

export default withRouter(LandingPage);


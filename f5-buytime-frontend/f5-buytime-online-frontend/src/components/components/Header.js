import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios';
import styled from 'styled-components';

import plus from '../../img/plus.png';
import back from '../../img/back.png';
import logoutImg from '../../img/logout.png';
import { getBearerHeader } from '../../utils';
import { LOGOUT } from '../../helpers/api';
import { BEARER } from '../../helpers/constants';

class Header extends React.Component {
	logout = () => {
		const headerBearer = getBearerHeader();
		axios.get(LOGOUT, headerBearer)
			.then(({ data, status }) => {
				if (status === 201 || status === 200) {
					localStorage.removeItem(BEARER);
					this.props.history.push('/');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	
	render() {
		const { backTo, backTitle, isLogout, title, linkToCreate } = this.props;
		return (
			<HeaderWrapper>
				{backTo ? <Link to={backTo}>
						<BackWrapper>
							<ImgWrapper><img src={back} alt="back"/></ImgWrapper>
							<BackTitle>{backTitle}</BackTitle>
						</BackWrapper>
					</Link> :
					<Title>Buytime Online</Title>
				}
				<Title>{title}</Title>
				<div>
					{isLogout && <Logout onClick={this.logout}><img src={logoutImg} alt="logout"/></Logout>}
					{linkToCreate ? <Link to={linkToCreate}><img src={plus} alt="logo"/></Link> : <div/>}
				</div>
			</HeaderWrapper>
		);
	}
}

export default withRouter(Header);

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 38px 0;
`;

const Title = styled.h3`
	font-family: Montserrat;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 29px;
`;

const BackTitle = styled.h3`
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 20px;
	padding-left: 18px;
	padding-top: 8px;
`;

const BackWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const ImgWrapper = styled.div`
	padding-top: 4px;
`;

const Logout = styled.button`
	margin-right: 30px;
	border: none;
	background: transparent;
	cursor: pointer;
	
	& img {
		height: 32px;
	}
`;

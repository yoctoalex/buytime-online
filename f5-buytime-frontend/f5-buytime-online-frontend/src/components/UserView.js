import axios from "axios";
import React from 'react';
import styled from 'styled-components';

import userPic from '../img/user-pic.png';
import Header from './components/Header';
import { Layout } from './style';
import { GET_USER_BY_ID } from '../helpers/api';
import { getBearerHeader } from '../utils';

class UserView extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
		this.lotId = this.props.match.params.lotId;
	}
	
	componentDidMount() {
		const { id } = this.props.match.params;
		const header = getBearerHeader();
		axios.get(`${GET_USER_BY_ID}${id}`, header)
			.then(({ status, data }) => {
				if (status === 201 || status === 200) {
					this.setState({ name: data.name, email: data.email, login: data.login});
				}
			})
			.catch((error) => {
				if (error.response.status === 401) {
					this.props.history.push('/');
				}
			});
	}
	
	render() {
		const { name, email } = this.state;
		
		return (
			<Layout>
				<Header title="User Info" backTo={`/lot/${this.lotId}`} backTitle="View Full Catalog" />
				<Block>
					<div>
						<img src={userPic} alt=""/>
					</div>
					<Info>
						<Name dangerouslySetInnerHTML={{"__html": name}} />
						<Email dangerouslySetInnerHTML={{"__html": email}} />
					</Info>
				</Block>
			</Layout>
		)
	}
}

UserView.propTypes = {};

UserView.defaultProps = {};

export default UserView;

const Name = styled.h4`
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 22px;
`;

const Email = styled.h4`
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 22px;
	text-transform: capitalize;
	color: #4B4B4B;
`;

const Block = styled.div`
	padding-top: 60px;
	display: flex;
	flex-direction: row;
`;

const Info = styled.div`
	padding-left: 35px;
`;

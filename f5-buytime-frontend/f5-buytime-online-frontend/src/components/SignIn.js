import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

import { Input, Button, Wrapper, Content } from './style';
import { AUTH } from '../helpers/api';
import { BEARER } from '../helpers/constants';
import { AUTHORIZATION_FAILED } from '../helpers/notifications';

class SignIn extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	onSignIn = (event) =>  {
		event.preventDefault();
		const { login, password } = this.state;
		if (!login || !password ) return false;
		
		
		axios.post(AUTH, {
			login: login.trim(),
			password: password.trim()
		})
			.then(({ status, data}) => {
				if (status === 200 && data.bearer) {
					localStorage.setItem(BEARER, data.bearer);
					this.props.history.push('/lots');
				} else if(status === 200) {
					this.props.onShowToast({ message: data, isSuccess: false });
				}
			})
			.catch(() => {
					this.props.onShowToast({ message: AUTHORIZATION_FAILED, isSuccess: false });
			});
	};
	
	onInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	
	render() {
		return (
			<Wrapper>
				<Content>
					<h1 className="display-1">Buytime Online</h1>
						<Block>
							<Input autoComplete="off" name="login" type="email" placeholder="Your login*" onChange={this.onInputChange} />
							<Input autoComplete="off" name="password" type="password" placeholder="Password*" onChange={this.onInputChange} />
						</Block>
						<Block>
							<Button onClick={this.onSignIn} size="large">Sign in</Button>
						</Block>
					<Back>
						<Link to="/signup">Sign up</Link>
					</Back>
				</Content>
			</Wrapper>
		)
	}
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;

const Block = styled.div`
	padding-top: 40px;
`;

const Back = styled.div`
	padding-top: 10px
	text-align: right;
	
	a {
		color: #000;
	}
	
	&:hover a {
		color: #000;
		text-decoration: underline;
	}
`;


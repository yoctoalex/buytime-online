import React, { Component } from 'react';
import axios from 'axios'

import styled from 'styled-components'
import { strings } from '../constants/strings';
import { GreenButtonBig } from "./button/green-button";
import { Input, GreenLink } from './style';
import { FIELDS_REQUIRED } from '../helpers/notifications';
import { REGISTER } from '../helpers/api';
import { PASSWORD_ERRO_MESSAGE, REGISTRATION_FAILED } from '../helpers/notifications';
import { BEARER } from '../helpers/constants';

const { singUp } = strings;

class SignUp extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	onSignIn = (event) =>  {
		event.preventDefault();
		const { name, login, password, confirm} = this.state;
		
		if (name && login && password &&  confirm) {
			
			if (password !== confirm) {
				return this.props.onShowToast({ message: PASSWORD_ERRO_MESSAGE, isSuccess: false});
			}
			
			axios.post(REGISTER, {
				...this.state
			})
				.then(({ data, status }) => {
					if (status === 201 && data.bearer) {
						localStorage.setItem(BEARER, data.bearer);
						this.props.history.push('/lots');
					} else if(status === 200) {
						this.props.onShowToast({ message: data, isSuccess: false });
					}
				})
				.catch(() => {
					this.props.onShowToast({ message: REGISTRATION_FAILED, isSuccess: false });
				});
		} else {
			return this.props.onShowToast({ message: FIELDS_REQUIRED, isSuccess: false});
		}
	};
	
	onInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	
	render() {
		return (
			<Form autoComplete='false'>
				<Title>{singUp.title}</Title>
				<SubTitle>{singUp.subtitle} <GreenLink onClick={() => this.props.changeContent('login')}>{singUp.linkTitle}</GreenLink></SubTitle>
				<FormTitle>{singUp.formTitle}</FormTitle>
				<div>
					<Input autoComplete='off' name="name" type="text" placeholder={singUp.namePlaceholder} onChange={this.onInputChange} />
					<Input autoComplete='off' name="login" type="text" placeholder={singUp.loginPlaceholder} onChange={this.onInputChange} />
					<Input autoComplete='off' name="password" type="password" placeholder={singUp.passwordPlaceholder} onChange={this.onInputChange} />
					<Input autoComplete='off' name="confirm" type="password" placeholder={singUp.confirmPasswordPlaceholder} onChange={this.onInputChange} />
				</div>
				<Block>
					<GreenButtonBig type="submit" onClick={this.onSignIn}>
						{singUp.submitButtonLabel}
					</GreenButtonBig>
				</Block>
			</Form>
		)
	}
}

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;

const Title = styled.h3`
	font-weight: 600;
	font-size: 18px;
	text-transform: uppercase;
	text-align: center;
`;

const SubTitle = styled.h4`
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	text-align: center;
`;

const Form = styled.form`
	max-width: 365px;
  margin: auto;
`;

const FormTitle = styled.p`
	font-size: 18px;
	padding-top: 50px;
`;

const Block = styled.div`
	text-align: center;
	padding-top: 42px;
`;

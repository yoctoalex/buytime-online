import axios from "axios";
import React, { useState } from 'react';
import styled from 'styled-components';
import { strings } from "../constants/strings";
import { AUTH } from "../helpers/api";
import { BEARER } from "../helpers/constants";
import { AUTHORIZATION_FAILED } from "../helpers/notifications";
import { GreenLink, Input } from "./style";
import { GreenButtonBig } from "./button/green-button";

const { login } = strings;

export const LogIn = ({ changeContent, ...props }) => {
	
	const [state, setState] = useState({ login: '', password: '' });
	const onSignIn = (event) =>  {
		event.preventDefault();
		const { login, password } = state;
		if (!login || !password ) return false;
		
		
		axios.post(AUTH, {
			login: login.trim(),
			password: password.trim()
		})
			.then(({ status, data}) => {
				if (status === 200 && data.bearer) {
					localStorage.setItem(BEARER, data.bearer);
					props.history.push('/lots');
				} else if (status === 201 || status === 200) {
					props.onShowToast({ message: data, isSuccess: false, newPage: true });
					props.history.push('/block');
				}
			})
			.catch(() => {
				props.onShowToast({ message: AUTHORIZATION_FAILED, isSuccess: false });
			});
	};
	
	const onInputChange = (event) => {
		setState(({
			...state,
			[event.target.name]: event.currentTarget.value
		}));
	};
	return (
		<Form autoComplete='false'>
			<Title>{login.title}</Title>
			<SubTitle>{login.subtitle} <GreenLink>{login.linkTitle}</GreenLink></SubTitle>
			<FormTitle>{login.formTitle}</FormTitle>
			<div>
				<Input autoComplete="off" name="login" type="email" placeholder={login.loginPlaceholder} onChange={onInputChange} />
				<Input autoComplete="off" name="password" type="password" placeholder={login.passwordPlaceholder} onChange={onInputChange} />
			</div>
			<Block>
				<GreenButtonBig onClick={onSignIn} size="large">{login.submitButtonLabel}</GreenButtonBig>
			</Block>
		</Form>
	)
};

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

import React from 'react';
import styled from 'styled-components';
import { Logo } from './components/logo/index.js'
import { NavBar } from './components/nav-bar';
import { strings } from '../../constants/strings';
import { META_DATE } from '../../helpers/constants';

const headerPadding = META_DATE ? '100px' : '50px';

const { header: { headerOptions, activeHeader, loginLabel, signUpLabel } } = strings;

const setMenuList = (isAuth = false) => {
	if (isAuth) {
		return headerOptions;
	}
	return headerOptions;
	//return headerOptions.slice(-1);
};

export const Header = (props) => (
	<Content>
	<Wrapper theme={props.theme} isAuth={props.isAuth}>
		<Logo theme={props.theme}/>
		<NavBar
			headerOptions={setMenuList(props.isAuth)}
			greenBtnLabel={signUpLabel}
			pureBtnLabel={loginLabel}
			{...props}
		/>
	</Wrapper>
	</Content>
);

Header.propTypes = {};

const Content = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
	position: ${(props => props.theme.position || 'absolute')};
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	width: 99%;
	margin: auto;
	padding: 20px 35px;
	padding-top: ${props => props.isAuth ? '20px' : headerPadding}
`;


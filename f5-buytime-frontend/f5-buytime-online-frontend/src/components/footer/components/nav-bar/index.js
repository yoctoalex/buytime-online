import React from 'react';
import styled from 'styled-components';
import { GreenButton } from '../../../../components/button/green-button';
import { DefaultButton } from '../../../../components/button/default-button';

export const NavBar = ({ headerOptions = [], pureBtnLabel, greenBtnLabel, black }) => (
	<Wrapper>
		{headerOptions.map(item => <NavBarButton key={item} black>{item}</NavBarButton>)}
		{pureBtnLabel && <DefaultButton>{pureBtnLabel}</DefaultButton>}
		{greenBtnLabel && <ButtonWrapper>
			<GreenButton>{greenBtnLabel}</GreenButton>
		</ButtonWrapper>}
	</Wrapper>
);

NavBar.propTypes = {};

const Wrapper = styled.nav`
	& :last-of-type {
		padding-right: 0;
	}
`;

const ButtonWrapper = styled.div`
	margin-left: 15px;
	display: inline-block;
`;

const NavBarButton = styled.a`
	font-family: Montserrat, sans-serif;
	font-weight: 600;
	font-size: 18px;
	color: ${(props) => props.black ? '#000' : '#fff' };
	text-transform: uppercase;
	padding-right: 67px;
`;

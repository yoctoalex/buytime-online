import React from 'react';
import styled from 'styled-components';
import { Logo } from '../header/components/logo/index.js'
import { NavBar } from '../header/components/nav-bar';
import { strings } from '../../constants/strings';
import logoBlack from '../../img/logos/logo-black.svg';

const { layout: { footer: { footerOptions } }} = strings;

export const Footer = () => (
	<Wrapper>
		<Logo theme={{ bg: logoBlack, width: '106px' }} />
		<NavBar
			theme={{ color: '#000' }}
			headerOptions={footerOptions}
			footer
		/>
	</Wrapper>
);

Footer.propTypes = {};

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 1280px;
	margin: auto;
	padding: 8px 32px;
`;


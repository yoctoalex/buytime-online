import React from 'react';
import styled from 'styled-components';

export const Logo = (props) => (
	<LogoWrapper {...props} href='/'>
		<Img src={props.theme.bg}  theme={props.theme} alt="auction logo" />
	</LogoWrapper>
);

Logo.propTypes = {};

const LogoWrapper = styled.a`
	font-size: 42px;
	font-family: Montserrat, sans-serif;
	color:${props => props.theme.color ? props.theme.color: '#fff'};
`;

const Img = styled.img`
	${(props) => props.theme.width ? `width: ${props.theme.width}` : 'min-width: 150px;'}
`;


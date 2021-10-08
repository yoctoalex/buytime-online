import React from 'react';
import styled from 'styled-components';

export const Logo = (props) => (
	<LogoWrapper black href=''>Auction</LogoWrapper>
);

Logo.propTypes = {};

const LogoWrapper = styled.a`
	font-size: 42px;
	font-family: Montserrat, sans-serif;
	color: ${(props) => props.black ? '#000' : '#fff' };
`;


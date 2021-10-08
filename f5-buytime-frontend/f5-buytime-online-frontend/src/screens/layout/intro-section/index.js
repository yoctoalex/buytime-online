import React from 'react';
import styled from 'styled-components'
import bgIntr from '../../../img/introduction/bg-intr.jpg';
import { strings } from '../../../constants/strings';
import { GreenButton } from '../../../components/button/green-button';
import { ContentBlock } from '../../../components/content-block';

const { layout: { introduction: { title, buttonLabel } } } = strings;

const IntroSection = ({ showModal }) => (
	<Wrapper>
		{/*<Image src={bgIntr}/>*/}
		<ContentBlock>
			<Title>{title}</Title>
			<GreenButton >{buttonLabel}</GreenButton>
		</ContentBlock>
	</Wrapper>
);

IntroSection.propTypes = {};

export default IntroSection;

const Image = styled.img`
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
`;

const Wrapper = styled.div`    
	width: 100%;
	background-position: center;
  background-size: cover;
  position: relative;
  background: url(${bgIntr}) no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #464646;
  padding-bottom: 24px;
`;

const Title = styled.h1`
	font-family: Montserratsemibold, sans-serif;
	font-size: 42px;
	color: #fff;
	padding-top: 33vw;
	padding-bottom: 6px;
`;

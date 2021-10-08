import React from 'react';
import styled from 'styled-components';
import { ContentBlock } from '../../../components/content-block';
import PopularItemList from "./popular-item-list";
import { strings } from '../../../constants/strings';
const { layout: { popularSection: { title }}} = strings;

export const MostPopularSection = (props) => (
	<Wrapper>
		<ContentBlock>
			<TitleSection>{title}</TitleSection>
			<PopularItemList />
		</ContentBlock>
	</Wrapper>
);

MostPopularSection.propTypes = {};

const Wrapper = styled.div`
	background: #0F1012;
	padding: 54px 0 47px;
`;

const TitleSection = styled.h4`
	font-size: 26px;
	color: #EBF9FF;
	text-transform: uppercase;
	font-family: Montserratsemibold, sans-serif;
	text-align: center;
	margin-bottom: 50px;
`;

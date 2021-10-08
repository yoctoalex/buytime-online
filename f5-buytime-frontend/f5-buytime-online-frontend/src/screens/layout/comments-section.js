import React from 'react';
import styled from "styled-components";
import { ContentBlock } from "../../components/content-block";
import { strings } from '../../constants/strings';
import map from '../../img/commetnsSection/map.png';
import { MAP_BG } from '../../helpers/constants'

const { layout: { commentsSection: { title } }} = strings;

const CommentsSection = () => (
	<Wrapper>
		<TitleSection>{title}</TitleSection>
		<ContentBlock>
			<Image src={MAP_BG || map} />
		</ContentBlock>
	</Wrapper>
);

CommentsSection.propTypes = {};

CommentsSection.defaultProps = {};

export default CommentsSection;

const Wrapper = styled.div`
	background: #373737;
	padding: 39px 0 47px;
	text-align: center;
`;

const TitleSection = styled.h4`
	font-size: 26px;
	color: #FFF
	text-transform: uppercase;
	font-family: Montserratsemibold, sans-serif;
	text-align: center;
	margin-bottom: 0;
`;

const Image = styled.img`
	width: 100%;
`;

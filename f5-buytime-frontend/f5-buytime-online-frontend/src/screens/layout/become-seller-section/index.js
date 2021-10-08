import React from 'react';
import { ContentBlock } from "../../../components/content-block";
import styled from 'styled-components'
import { GreenLink } from '../../../components/style';

import { strings } from '../../../constants/strings';

const { layout : { sellerSection: { steps, title, subtitle } } } = strings;

const BecomeSellerSection = () => (
	<ContentBlock>
		<Wrapper>
			<BlockLeft>
				<Title>{title}</Title>
				<div>
					<SubTitle>{subtitle}</SubTitle>
					<GreenLink>Learn more</GreenLink>
				</div>
			</BlockLeft>
			<Block>
				<ul style={{ marginBottom: 0 }}>
					{steps.map((item, index) =>
						<List key={item.title}>
							<NumberBlock>
								<Number>{++index}</Number>
							</NumberBlock>
							<div>
								<ListTitle>{item.title}</ListTitle>
								<ListContent>{item.text}</ListContent>
							</div>
						</List>)}
				</ul>
			</Block>
		</Wrapper>
	</ContentBlock>
);

BecomeSellerSection.propTypes = {};

export default BecomeSellerSection;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 50px 0;
`;

const Block = styled.div`
	width: 40%;
`;

const BlockLeft = styled.div`
	width: 50%;
	display: flex;
  flex-direction: column;
  padding-top: 83px;
`;

const Title = styled.h2`
	font-family: Montserratsemibold, sans-serif;
	font-size: 42px;
	line-height: 50px;
	text-transform: uppercase;
	margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
	font-family: Montserratmedium, sans-serif;
	font-size: 18px;
	margin-bottom: 0.5rem;
`;

const Number = styled.div`
	color: #fff;
	text-align: center;
	font-size: 24px;
	background: #4F4F4F;
	width: 38px;
	height: 38px;
	border-radius: 100%;
`;

const List = styled.li`
	display: flex;
	flex-direction: row;
	
	&:last-child p {
		margin-bottom: 0
	}
`;

const NumberBlock = styled.div`
	padding-right: 30px;
`;

const ListTitle = styled.h5`
	font-size: 18px;
	color: #000;
	font-family: Montserratsemibold, sans-serif;
	text-transform: uppercase;
	margin-bottom: 0;
`;

const ListContent = styled.p`
	font-size: 14px;
	color: #000;
	margin-bottom: 2em;
`;

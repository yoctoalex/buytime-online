import React, { PropsType } from 'react';
import { Link } from 'react-router-dom';

import styled from "styled-components";
import { Count } from "./Lots/Lots";
import { setTimeCount } from '../utils';
import pic2 from '../img/default/pic2.jpg';
import { SERVER_API } from '../helpers/api';

export const ProductItem = ({ title, amount, margin, maxBid, id, description, auction_ends, photos }) => {
	const [ string, isSoon ] = setTimeCount(auction_ends);
	return (
		<LotItem margin={margin} isSoon={isSoon} >
			<ImgBlock>
				<img src={`${photos && photos[0] ? `${SERVER_API}${photos[0]}` : pic2}`} />
			</ImgBlock>
			<LotTitle>{title} </LotTitle>
			<ShortDescription>{description && description.split('\n').map((item, index) => (
				<React.Fragment key={index}>
					{item}<br/>
				</React.Fragment>
				))[0]}</ShortDescription>
			<Count>${amount || maxBid}</Count>
			{margin && <LinkWrapper to={`lot/${id}`}>View this lot ></LinkWrapper>}
		</LotItem>
	);
};
const LinkWrapper = styled(Link)`
	color: #0DA95E;
	text-transform: uppercase;
	font-weight: 600;
	font-size: 13px;
	padding-top: 15px;
  display: block;
	&:hover {
		color: #0DA95E;
		font-weight: 800;
		text-decoration: underline;
	}
`;

const ImgBlock = styled.div`
	width: 190px;
	height: 159px;
	margin-bottom: 17px;
	text-align: center;
	
	& img {
		max-width: 100%;
    max-height: 100%;
	}
`;

const LotItem = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-size: 16px;
	color: #fff;
	padding: 20px;
	background: #FFFFFF;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	width: 230px;
	position: relative;
	margin: ${props => props.margin || '0'}
	
	&:after {
		content: 'Ends Soon';
		display: ${props => props.isSoon ? 'block' : 'none'};
		position: absolute;
		right: -15px;
		top: 30px;
		background: #A90D0D;
		border-radius: 2px;
		padding: 3px 4px;
		z-index: 1000;
	}
`;

const LotTitle = styled.div`
	font-size: 18px;
	color: #000;
	font-family: Montserrat, sans-serif;
	font-weight: 600;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 190px;
`;

const ShortDescription = styled.div`
	font-size: 13px;
	color: #000;
	font-family: Montserrat, sans-serif;
	font-weight: 500;
	padding-bottom: 5px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 190px;
`;

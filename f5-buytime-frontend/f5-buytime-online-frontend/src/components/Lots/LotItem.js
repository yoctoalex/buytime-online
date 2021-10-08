import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultImg from '../../img/defaultImg.png';
import { Count } from './Lots';

const LotItem = ({ id, title, maxBid}) => (
	<ContentInfo>
		<Info>
			<img src={defaultImg} alt='lot' />
			<InfoBlock>
				<UseName>{title}</UseName>
				<Count>$ {maxBid}</Count>
			</InfoBlock>
		</Info>
		<LinkBlock>
			<LinkWrapper to={`lot/${id}`}>View lot</LinkWrapper>
		</LinkBlock>
	</ContentInfo>
);

export default LotItem;

const InfoBlock = styled.div`
	padding-left: 30px;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ContentInfo = styled.div`
	display: flex;
	width: 100%;
	padding-bottom: 30px;
	align-items: center;
`;

const LinkWrapper = styled(Link)`
	display: block;
	color: #000;
  background-color: transparent;
  border-color: #000;
  text-shadow: none;
  width: 100%;
  line-height: 40px;
  padding: 0 15px;
  font-size: 16px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #000;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    border: 1px solid #000;
	  color: #000;
  }
  
  &:nth-of-type(2) {
	  border: 1px solid red;
	  color: red;
  }
  
  &:hover:nth-of-type(2) {
	  border: 1px solid red;
	  color: red;
  }
`;

const Info = styled.div`
	display: flex;
	width: 80%;
`;

const LinkBlock = styled.div`
	width: 20%;
`;

const UseName = styled.div`
	font-size: 18px;
`;

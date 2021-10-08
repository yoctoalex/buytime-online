import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Wrapper } from '../style';
import TopLots from './TopLots';

class Landing extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isSign: false,
			isLanding: true,
		}
	}
	
	render() {
		return (
			<Wrapper>
				<Content>
					<h1 className="display-1">Buytime Online</h1>
					<ButtonBlock>
						<LinkWrapper to="/signin">Sign in</LinkWrapper>
						<LinkWrapper to="/signup">Sign up</LinkWrapper>
					</ButtonBlock>
					<TopLots />
				</Content>
			</Wrapper>
		)
	}
}

export default Landing;

const ButtonBlock = styled.div`
	display: flex;
	flex-direction: row;
	padding-top: 70px;
	width: 500px;
	margin: 0 auto;
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
  margin: 15px;
  
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

const Content = styled.div`
	text-align: center;
	margin: auto;
`;

import React from "react";
import styled from 'styled-components';
import { GreenButtonSmall } from '../../components/button/green-button';
import { Input } from '../../components/style';

export const LotHeader = ({ showModal }) => (
	<Wrapper>
		<Block>
			<SearchField type="text" placeholder="Search..." />
			<SelectField>
				<option>Sort by most popular</option>
			</SelectField>
		</Block>
		<GreenButtonSmall onClick={() => showModal('addItem')}>+ Add watch</GreenButtonSmall>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	padding: 0 35px 0 40px;
	justify-content: space-between;
`;

const Block = styled.div`
	display: flex;
`;

const SearchField = styled(Input)`
	background: transparent;
	border: 2px solid #FFFFFF;
	color: #fff;
	width: 210px;
	margin: 0;
	align-self: center;
	
	&::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #fff;
    font-size: 12px;
	}
	&::-moz-placeholder { /* Firefox 19+ */
	  color: #fff;
	  font-size: 12px;
	}
	&:-ms-input-placeholder { /* IE 10+ */
	  color: #fff;
	  font-size: 12px;
	}
	&:-moz-placeholder { /* Firefox 18- */
	  color: #fff;
	  font-size: 12px;
	}
`;

const SelectField = styled.select`
  height: 40px;
  padding: 12px 12px;
  font-size: 14px;
  line-height: 40px;
  border: 1px solid #848484;
  border-radius: 5px;
  width: 209px;
  color: #fff;
  background: transparent;
  border: 2px solid #FFFFFF;
  margin-left: 20px;
  align-self: center;
  
  & option {
    color: #fff;
  }
`;

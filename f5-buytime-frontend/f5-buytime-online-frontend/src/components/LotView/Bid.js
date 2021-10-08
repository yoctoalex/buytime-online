import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";

const Bid = ({ amount, user, lotId }) => (
	<BidItem>
		<UserItem to={`/user/${user.id}/${lotId}` } dangerouslySetInnerHTML={{"__html": user.name}} />
		<Participants>$ {amount}</Participants>
	</BidItem>
);

export default Bid;

const BidItem = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 15px 0;
`;

const UserItem = styled(Link)`
	font-family: Montserrat;
	font-size: 18px;
	color: #000;
	
	&:hover {
		text-decoration: underline;
		color: #000;
		font-weight: bold;
	}
`;

export const Participants = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 152.38%;
	text-transform: capitalize;
	color: #000000;
`;


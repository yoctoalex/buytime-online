import axios from "axios";
import React from 'react';

import styled from 'styled-components';
import { GET_TOP_LOTS } from "../../helpers/api";
import moment from "moment";
import { Count } from "../Lots/Lots";

class TopLots extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			topLot: [],
		};
	}
	
	componentDidMount() {
		axios.get(`${GET_TOP_LOTS}`)
			.then((response) => {
				const { status } = response;
				console.log(response.data );
				if (status === 201 || status === 200) {
					this.setState({ topLot: response.data.map(item => {
						item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
						return item;
					})});
				}
			})
			.catch((error) => {
			console.log(error);
			})
	}
	
	render() {
		const { topLot } = this.state;
		return (
			<Wrapper>
				{topLot.length > 0 && <>
					<Title>Top 5</Title>
				<ListBlock>
					<tbody align="left">
					{topLot.map((lot, index) => (
							<ListItem key={lot.id}>
								<TableBlock>{++index} </TableBlock>
								<TableBlock>{lot.title} </TableBlock>
								<TableBlock>{lot.userName} </TableBlock>
								<TableBlock>{lot.date}</TableBlock>
								<TableBlock><Count>$ {lot.amount}</Count></TableBlock>
							</ListItem>
						))}
					</tbody>
				</ListBlock>
				</>}
			</Wrapper>
		)
	}
}

TopLots.propTypes = {};

TopLots.defaultProps = {};

export default TopLots;

const Wrapper = styled.div``;

const Title = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	font-size: 23px;
	line-height: 22px;
	text-transform: uppercase;
	padding-bottom: 30px;
	padding-top: 60px;
`;

const ListBlock = styled.table`
	font-family: Montserrat;
	font-style: normal;
	font-size: 16px;
`;

const TableBlock = styled.td`
	padding: 15px;
	font-family: Montserrat;
	font-style: normal;
	font-size: 16px;
	border: 1px solid black;
  border-collapse: collapse;
`;

const ListItem = styled.tr`
	padding: 15px;
	font-family: Montserrat;
	font-style: normal;
	font-size: 16px;
`;


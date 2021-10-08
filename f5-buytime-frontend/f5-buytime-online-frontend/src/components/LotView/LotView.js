import React from 'react';
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import { GET_LOT_BY_ID } from '../../helpers/api';
import { getBearerHeader } from '../../utils';
import { Count } from '../Lots/Lots';
import Bid, { Participants } from './Bid';

class LotView extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lot: {},
			bids: [],
		};
	}
	
	componentDidMount() {
		const { id } = this.props.match.params;
		const headerBearer = getBearerHeader();
		axios.get(`${GET_LOT_BY_ID}${id}`, headerBearer)
			.then((response) => {
				const { status } = response;
				if (status === 201 || status === 200) {
					const { data } = response;
					this.setState({ lot: data.lot, bids: data.bids, userName: data.user.name });
				}
			})
			.catch((error) => {
				if (error.response.status === 401) {
					this.props.history.push('/');
				}
			});
	}
	
	render() {
		const { lot, bids, userName } = this.state;
		const { id } = this.props.match.params;
		
		return (
			<Layout>
				<Header title="View lot" backTo="/lots" backTitle="View Full Catalog" linkToCreate={`/addbid/${id}`} />
				<Title>{lot.title}</Title>
				<Description>Description {lot.description}</Description>
				<CountWrapper>
					<Count>$ {lot.maxBid || 0}</Count>
				</CountWrapper>
				<Description>Created by: {userName}</Description>
				<BidsBlock>
					<BidsHeader>
						<Participants>The Participants</Participants>
						<Participants>Bid</Participants>
					</BidsHeader>
					{bids.map(bid => <Bid key={bid.id} amount={bid.amount} user={bid.user} lotId={id} />)}
				</BidsBlock>
			</Layout>
		)
	}
}

LotView.propTypes = {};

LotView.defaultProps = {};

export default LotView;


const Layout = styled.div`
	flex: auto;
	padding: 0 20px;
`;

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

const Description = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	max-width: 500px;
`;

const BidsBlock = styled.div`
	padding-top: 40px;
`;

const BidsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 10px;
`;

const CountWrapper = styled.div`
	padding: 30px 0;
`;

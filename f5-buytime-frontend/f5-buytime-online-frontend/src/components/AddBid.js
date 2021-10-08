import axios from "axios";
import React, { PropTypes } from 'react';
import styled from "styled-components";
import { DatePicker } from 'antd';
import moment from 'moment';

import Header from "./components/Header";
import { Layout, ContentBlock, Input, Button } from './style';
import { CREATE_BID, GET_LOT_BY_ID } from '../helpers/api';
import { getBearerHeader } from '../utils';
import { CREATE_BID_SUCCESS } from '../helpers/notifications';

class AddBid extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lot: {},
			amount: 0,
			date: null
		};
		this.headerBearer = getBearerHeader();
		this.lotId= this.props.match.params.id;
	}
	
	onInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	
	componentDidMount() {
		axios.get(`${GET_LOT_BY_ID}${this.lotId}`, this.headerBearer)
			.then((response) => {
				const { status } = response;
				if (status === 201 || status === 200) {
					this.setState({ lot: response.data.lot, date: moment(response.data.lot.date, 'YYYY-MM-DD HH:mm:ss') });
				}
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 401) {
					this.props.history.push('/');
				}
			})
	}
	
	addBid = () => {
		axios.post(CREATE_BID, {
			...this.state,
			lotId: this.lotId,
		}, this.headerBearer)
			.then(({ status }) => {
				if (status === 201) {
					this.props.onShowToast({ message: CREATE_BID_SUCCESS, isSuccess: true})
					this.props.history.push(`/lot/${this.lotId}`);
				}
			})
			.catch((error) => {
				if (error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
	};
	
	render() {
		const { lot, amount, date } = this.state;
		const { id } = this.props.match.params;
		return (
			<Layout>
				<ContentBlock>
					<Header backTitle="View lot" backTo={`/lot/${id}`} title='Full Catalog' />
					<Block>
						<Title>Item Title: {lot.title}</Title>
						<DatePicker showTime value={date} disabled />
						<Input name="amount" type="number" placeholder="Title" min={0} onChange={this.onInputChange} value={amount} />
					</Block>
					<ButtonWrapper>
						<Button onClick={this.addBid}>Add bid</Button>
					</ButtonWrapper>
				</ContentBlock>
			</Layout>
		)
	}
}

AddBid.propTypes = {};

AddBid.defaultProps = {};

export default AddBid;

const Title = styled.div`
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	font-size: 23px;
	line-height: 22px;
	padding-bottom: 30px;
	padding-top: 60px;
`;

const Block = styled.div`
	width: 100%
	max-width: 500px;
	padding-top: 30px;
`;

const ButtonWrapper = styled.div`
	max-width: 176px;
	margin: 30vh auto 0;
`;

import axios from "axios";
import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { Input, Button } from './style';
import photo from '../img/photo.png'
import { DatePicker } from 'antd';
import { CREATE_LOT } from '../helpers/api';
import { getBearerHeader } from '../utils';
import { LOT_EXPIRATION_DATE } from '../helpers/notifications';

class Lot extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
		}
	}
	
	onCreate = () => {
		const header = getBearerHeader();
		axios.post(CREATE_LOT, {
			...this.state
		}, header)
			.then((response) => {
				const { status } = response;
				if (status === 201) {
					this.props.history.push('/lots');
				}
				console.log(status);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					this.props.history.push('/login');
				}
			});
	};
	
	onInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	
	onChange = (date, dateString) => {
		this.setState({ 'auction_ends': dateString });
	};
	
	render() {
		const {title, description } = this.state;
		return (
			<>
				<Layout>
					<Header title="New Item" backTo="/lots" backTitle="View Full Catalog" />
					<div>
						<img src={photo} alt=""/>
						<Block>
							<DatePicker showTime onChange={this.onChange} placeholder={LOT_EXPIRATION_DATE} />
							<Input autoComplete="off" name="title" type="text" placeholder="Title" onChange={this.onInputChange} value={title} />
							<TextArea name="description" cols="30" rows="10" placeholder="Description" onChange={this.onInputChange} value={description} />
						</Block>
					</div>
					<ButtonWrapper>
						<Button onClick={this.onCreate}>Create</Button>
					</ButtonWrapper>
				</Layout>
			</>
		)
	}
}

Lot.propTypes = {};

Lot.defaultProps = {};

export default Lot;

const Layout = styled.div`
	flex: auto;
	padding: 0 20px;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 88px;
	border: 1px solid #848484;
	border-radius: 5px;
	padding: 6px 11px;
	font-size: 16px;
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

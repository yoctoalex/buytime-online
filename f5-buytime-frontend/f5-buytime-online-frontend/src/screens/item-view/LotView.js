import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';

import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { basePage } from '../../components/base-page/base-page';
import { CREATE_BID, GET_LOT_BY_ID, SERVER_API } from '../../helpers/api';
import back from "../../img/back-icon.png";
import { getBearerHeader, setTimeCount } from '../../utils';
import fb from '../../img/viewItem/fc.png';
import pint from '../../img/viewItem/pint.png';
import mail from '../../img/viewItem/mail.png';
import timerIcon from '../../img/timer.png';
import { GreenButtonSmall } from '../../components/button/green-button';
import { Bids } from './bids-table.js';
import pic2 from '../../img/default/pic2.jpg';

const LotView = (props) => {
	const lotId = props.match.params.id;
	const headerBearer = getBearerHeader();
	const [state, setState] = useState({ lot: {}, bids: [], userName: '', amount: '', dateLeft: null });
	
	useEffect(() => {
		
		fetchLotById();
	}, []);
	
		const fetchLotById = () => {
		const { id } = props.match.params;
		const headerBearer = getBearerHeader();
		return axios.get(`${GET_LOT_BY_ID}${id}`, headerBearer)
			.then((response) => {
				const { status, data } = response;
				if ((status === 201 && !data.lot) || (status === 200 && !data.lot)) {
					props.onShowToast({ message: data, isSuccess: false, newPage: true });
					return props.history.push('/block');
				}
				if (status === 201 || status === 200) {
					
					setState((s) => ({
						...s,
						lot: data.lot, bids: data.bids, userName: data.user.name, amount: data.lot.maxBid
					}));
					
					if (!state.dateLeft) {
						setState((s) => ({
							...s,
							dateLeft: setTimeCount(data.lot['auction_ends'])
						}));
					}
				}
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 401) {
					this.props.history.push('/');
				}
			});
	};
		
		const setBid = value => {
			const amount = state.amount ? state.amount + value : value;
			setState((s) => ({
				...s,
				amount
			}));
		};
		
		const setBidByInput = event => {
			const amount = parseInt(event.target.value);
			if (amount < state.lot.maxBid || isNaN(amount)) {
				return;
			}
			setState((s) => ({
				...s,
				amount
			}));
		};
	
	const addBid = async () => {
		axios.post(CREATE_BID, {
			amount: state.amount,
			lotId,
		}, headerBearer)
			.then((response) => {
				const { status, data } = response;
				if (status === 201 && data.results) {
					// props.onShowToast({ message: CREATE_BID_SUCCESS, isSuccess: true});
					fetchLotById();
					setState((s) => ({
						...s,
						amount: ''
					}))
				} else {
					props.onShowToast({ message: data, isSuccess: false, newPage: true });
					return props.history.push('/block');
				}
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 401) {
					props.history.push('/login');
				}
			});
	};
	
	return (
		<Wrapper>
			<ContentBlock>
				<BackBtn to="/lots">Back</BackBtn>
				<TimeCountWrapper>
					<TimeCount>
						{ state.dateLeft }
					</TimeCount>
					</TimeCountWrapper>
				<Content>
					<LeftBlock>
						{state.lot.photos && <CarouselBlock>
							<CarouselWrapper>
								{ state.lot.photos.length ? state.lot.photos.map((item, index) => <img style={{ width: '100%' }} src={`${SERVER_API}${item}`} key={index} />)
								: <img src={pic2} />}
							</CarouselWrapper>
						</CarouselBlock>}
						<ShareBlock>
							<p>Share with your friends</p>
							<ShareImgs>{[mail, fb, pint].map((pic, index) => <a key={index}><img src={pic} alt="Share with..."/></a>)}</ShareImgs>
						</ShareBlock>
					</LeftBlock>
					<div style={{ width: '100%' }}>
						<Title>{state.lot.title}</Title>
						<Bid>${state.lot.maxBid || 0}</Bid>
						<UserName>Sold by <span>{state.userName}</span></UserName>
						<LotDescription>{state.lot.description && state.lot.description.split('\n').map((item) => (
							<React.Fragment key={item}>
								{item}<br/>
							</React.Fragment>
							))}
						</LotDescription>
						<BidBlock>
							<div>
								<BidTitle>Strap type</BidTitle>
								{["Leather", "Textile", "Metal"].map(item => <BtnWrapper key={item} onClick={() => setBid(item)}>+ ${item}</BtnWrapper>)}
								<BidTitle>Quantity</BidTitle>
								<InputSmall type="number" placeholder="$" value={state.amount} onChange={(event) => setBidByInput(event)} />
								<BtnWrapper onClick={addBid}>Buy</BtnWrapper>
							</div>
							<BidListBlock>
								{ state.bids.length > 0 && <Bids bids={state.bids} maxBid={state.lot.maxBid}/> }
							</BidListBlock>
						</BidBlock>
					</div>
				</Content>
			</ContentBlock>
		</Wrapper>
	)
};

export default basePage(LotView);

const CarouselBlock = styled(Carousel)`
	width: 266px;
	background: #fff;
	
	border: 1px solid #DCDCDC;
	box-sizing: border-box;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);
	border-radius: 10px;
	padding: 20px 20px 0;
`;

const CarouselWrapper = styled(Carousel)`
	padding-bottom: 25px;
	& ul.slick-dots-bottom li button {
		background: #C4C4C4;
	}
	& ul.slick-dots-bottom li.slick-active button {
		background: #4F4E4E;
	}
`;

const Title = styled.h3`
	font-size: 26px;
	text-transform: uppercase;
	color: #151515;
	margin-bottom: 7px;
`;
const TimeCount = styled.span`
	font-weight: 600;
	font-size: 14px;
	text-transform: capitalize;
	color: #000;
	background: url(${timerIcon}) no-repeat;
	padding-left: 30px;
	line-height: 25px;
	display: inline-block;
`;
const TimeCountWrapper = styled.div`
	text-align: right;
	padding-bottom: 9px;
  padding-top: 2.8%;
  padding-right: 9.2%;

`;

const Bid = styled.div`
	font-weight: 600;
	font-size: 18px;
	text-transform: uppercase;
	color: #000;
	padding-bottom: 6px;
`;

const UserName = styled.div`
	font-weight: 600;
	font-size: 18px;
	color: #767676;
	padding-bottom: 15px;
	& span {
	color: #0DA95E;
	}
`;

const LotDescription = styled.div`
	font-weight: 500;
	font-size: 18px;
	color: #767676;
	padding-bottom: 43px;
	padding-top: 15px;
	border-top: 1px solid #d2d2d2;
`;

const BidBlock = styled.div`
	display: flex;
	flex-direction: row;
`;

const BidListBlock = styled.div`
	border-left: 1px solid #D2D2D2;
	padding-left: 30px;
`;

const InputSmall = styled.input`
	border: 1px solid #000000;
	border-radius: 10px;
	width: 89px;
	padding: 9px;
	color: #848484;
	font-weight: 600;
	font-size: 14px;
	margin-right: 21px;
`;

const BidTitle = styled.div`
	font-weight: 600;
	font-size: 18px;
	text-transform: capitalize;
	color: #000000;
	padding-bottom: 8px;
	padding-top: 26px;
	
	&:first-of-type {
		padding-top: 0;
	}
`;

const BtnWrapper = styled(GreenButtonSmall)`
	margin-right: 21px;
	text-transform: none;
	
	&:last-of-type {
		margin-right: 0;
	}
	&:nth-of-type(3) {
		margin-right: 33px;
	}
`;

const Content = styled.div`
	display: flex;
	max-width: 995px;
	margin: auto;
`;

const Wrapper = styled.div`
	padding-bottom: 30px;
	border-bottom: 1px solid #d2d2d2;
	border-top: 1px solid #d2d2d2;
	display: flex;
	flex-grow: 1;
`;

const LeftBlock = styled.div`
	padding-right: 80px;
`;

const BackBtn = styled(Link)`
	background: url(${back}) no-repeat;
	padding-left: 20px;
	font-size: 14px;
	color: #4F4E4E;
	text-transform: uppercase;
	&:hover {
		color: #000;
		text-decoration: underline;
	}
`;

const ShareImgs = styled.div`
	& img {
		margin-right: 15px;
	}
`;

const ShareBlock = styled.div`
	padding-top: 26px;
	p {
		font-size: 16px;
    margin-bottom: 9px;
	}
`;

const ContentBlock = styled.div`
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	padding-top: 40px;
`;

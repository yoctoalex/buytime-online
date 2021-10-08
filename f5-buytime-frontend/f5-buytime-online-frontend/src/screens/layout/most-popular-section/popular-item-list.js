import axios from "axios";
import React from 'react';

import styled from 'styled-components';
import { GET_TOP_LOTS } from "../../../helpers/api";
import moment from "moment";
import { Carousel } from 'antd';
import { ProductItem } from '../../../components/product-item';

const chunkArray = function(myArray, chunk_size){
	
	const arrayLength = myArray.length;
	const tempArray = [];
	let myChunk = [];
	
	for (let index = 0; index < arrayLength; index += chunk_size) {
		myChunk = myArray.slice(index, index + chunk_size);
		tempArray.push(myChunk);
	}
	
	return tempArray;
};

class PopularItemList extends React.Component {
	
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
				if (status === 201 || status === 200) {
					const data = response.data.map(item => {
							item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
							return item;
						});
					this.setState({ topLot: chunkArray(data, 3)});
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
					<CarouselWrapper>
						{topLot.map((lot, index) => (
							<SlideItem key={index}>
								{lot.map(item => <ProductItem key={item.id} { ...item }  /> )}
							</SlideItem>
						))}
					</CarouselWrapper>
				</>}
			</Wrapper>
		)
	}
}

PopularItemList.propTypes = {};

PopularItemList.defaultProps = {};

export default PopularItemList;

const Wrapper = styled.div``;

const SlideItem = styled.div`
	display: flex !important;
	justify-content: space-between !important;
	margin-bottom: 40px;
	padding: 0 15px;
`;

const CarouselWrapper = styled(Carousel)`
	&.slick-slider {
		padding-bottom: 40px;
	}
`;

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Pagination } from 'antd';
import { basePage } from "../base-page/base-page.js";
import { ProductItem } from "../product-item";

import { LotHeader } from './lot-header';
import { AUTHORIZATION_FAILED } from '../../helpers/notifications';
import { fetchItems } from '../../screens/app/redux/actions';
import { getItemsList } from '../../screens/app/redux/selectors';

class Lots extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lots: [],
			total: 0,
		};
	}
	
	getLots = async (page) => {
		const request = await this.props.fetchItems(page);
		const { lots } = this.props.data;
		if (!Array.isArray(lots) && request.data ) {
			this.props.onShowToast({ message: request.data, isSuccess: false, newPage: true });
			return this.props.history.push('/block');
		}
		if (request.error) {
			this.props.onShowToast({ message: AUTHORIZATION_FAILED, isSuccess: false });
			this.props.history.push('/');
		}
		
		if (!request.data) {
			this.props.onShowToast({ message: request.data, isSuccess: false });
		}
		
	};
	
	componentDidMount() {
		this.getLots(1);
	}
	
	onChange = (page) => this.getLots(page);
	
	render() {
		const { lots, total } = this.props.data;
		
		return (
			<Layout>
				<Wrapper>
					<>
					<LotHeader showModal={this.props.showModal} />
					<Content>
						{Array.isArray(lots) && lots.map(lot => <ProductItem margin="45px" key={lot.id} { ...lot } />)}
					</Content>
					<PaginationWrapper>
						<Pagination defaultCurrent={1} total={total || 0} onChange={this.onChange} />
					</PaginationWrapper>
					</>
				</Wrapper>
			</Layout>
		)
	}
}

const mapStateToProps = (state, ) => ({
	data: getItemsList(state)
});

const mapDispatchToProps = {
	fetchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(basePage(Lots));

const Wrapper = styled.div`
	max-width: 1280px;
	width: 100%;
	margin: 0 auto;
	padding-top: 47px;
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div`
	background: #373737;
	flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	flex-grow: 1;
	align-items: end
`;

export const Count = styled.span`
	color: #000;
	font-size: 18px;
`;

export const PaginationWrapper = styled.div`
	padding: 30px 30px 60px;
	text-align: center;
	& .ant-pagination-prev .ant-pagination-item-link,
	& .ant-pagination-next .ant-pagination-item-link,
	& .ant-pagination-item {
		border-color: transparent;
		background: none;
	}
	& .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis,
	& .ant-pagination-item-ellipsis,
	& .ant-pagination-item a {
		color: #ACACAC;
	}
	
	& .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis {
	color: #ACACAC;
	}
	
	& .ant-pagination-item-active a {
		color: #fff;
	}
	
	& .ant-pagination .ant-pagination-item:focus, & .ant-pagination .ant-pagination-item:hover {
    border-color: #fff;
     color: #fff;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
	}
	
	& .ant-pagination-item:focus a, & .ant-pagination-item:hover a {
	border-color: #fff;
     color: #fff;
      -webkit-transition: all 0.3s;
    transition: all 0.3s;
	}

	
	& .anticon {
		color: #fff;
	}
`;

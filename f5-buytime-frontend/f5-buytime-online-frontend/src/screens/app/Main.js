import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Lots from '../../components/Lots/Lots';
import LotView from '../../screens/item-view/LotView';
import AuthorizedRoute from '../../components/AuthorizedRoute';
import Layout from '../../screens/layout';
import SQLError from "../layout/sql-error";

class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			newPage: false
		};
	}
	
	onShowToast = ({ message, isSuccess, newPage }) => {
		if (newPage) {
			return this.setState({ message, isSuccess, newPage });
		}
		this.setState({ message, isSuccess, newPage });
		setTimeout(() => this.onCloseToast(), 9000);
	};
	
	onCloseToast = () => {
		this.setState({ message: ''});
	};
	
	render() {
		const { message, isSuccess, newPage } = this.state;
		return (
			<Router>
				{message && !newPage && <Message>
					<Content>
					{isSuccess ? <Success>{message}</Success> : <Error dangerouslySetInnerHTML={{"__html": message}} />}
					</Content>
				</Message>
				}
				<Switch>
					<Route exact path="/" render={props => <Layout {...props} onShowToast={this.onShowToast} />}/>
					<Route path="/landing" render={props => <Layout {...props} onShowToast={this.onShowToast} />}/>
					<Route path="/block" render={props => <SQLError {...props} markup={message} />} />
					<AuthorizedRoute path="/" component={PrimaryLayout} onShowToast={this.onShowToast} />
				</Switch>
			</Router>
		)
	}
}

export default Main;

const Message = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%
	padding: 20px;
	background: rgba(232, 230, 230, 0.9);
	text-align: center;
	z-index: 100000 !important;
`;

const Success = styled.div`
	color: green;
	font-size: 16px;
`;

const Error = styled.div`
	color: red;
	font-size: 16px;
`;

const Content = styled.div`

`;

const PrimaryLayout = ({ onShowToast }) => (
	<Switch>
		<Route exact path="/lots" render={(props) => <Lots {...props} onShowToast={onShowToast} />} />
		<Route exact path="/lot/:id" render={(props) => <LotView {...props} onShowToast={onShowToast} />} />
	</Switch>
);

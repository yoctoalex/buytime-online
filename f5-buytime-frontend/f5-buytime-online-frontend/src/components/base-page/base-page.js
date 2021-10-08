import React, { Component } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import { LogIn } from '../log-in';
import AddItem from '../add-item';
import Modal from '../modal';
import SignUp from '../SignUp';
import logoBlack from '../../img/logos/logo-black.svg';
import logoWhite from '../../img/logos/logo-white.svg'

export const basePage = Content => class HeaderFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleType: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.isLanding = props.history.location.pathname === '/landing' || props.history.location.pathname === '/';
		
		this.headerStyle = this.isLanding
			? { color: 'white', position: 'absolute', bg: logoWhite }
			: { color: 'black', position: 'relative', bg: logoBlack };
	}
	
	handleClick = (visibleType) => {
		this.setState({ visibleType });
	};
	
	handleCancel = () => {
		this.setState({ visibleType: '' });
	};
	
	getContent = type => {
		const content = {
			login: <LogIn changeContent={this.handleClick} {...this.props} />,
			signUp: <SignUp changeContent={this.handleClick} {...this.props} />,
			addItem: <AddItem changeContent={this.handleClick} {...this.props} />
		};
		return content[type] || null;
	};
	
	render() {
		const { visibleType } = this.state;
		return (
			<>
				<Modal
					visible={!!visibleType}
					handleCancel={this.handleCancel}
				>
					{ this.getContent(visibleType) }
				</Modal>
				<Header
					handleClick={this.handleClick}
					theme={this.headerStyle}
					isAuth={!this.isLanding}
				/>
					<Content showModal={this.handleClick} {...this.props} />
				<Footer/>
			</>
		)
	}
};



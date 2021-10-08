import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { BEARER } from '../helpers/constants';

class AuthorizedRoute extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			token: localStorage.getItem(BEARER),
		};
	}
	
	render() {
		const { component: Component, onShowToast } = this.props;
		const { token } = this.state;
		
		return (
			<Route
				render={props => (token
					? <Component {...props} onShowToast={onShowToast}/>
					: <Redirect to='/' />)}
			/>
		)
	}
}

AuthorizedRoute.propTypes = {};

AuthorizedRoute.defaultProps = {};

export default AuthorizedRoute;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens/app/App';
import { Provider } from 'react-redux'
import store from './screens/app/redux/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));


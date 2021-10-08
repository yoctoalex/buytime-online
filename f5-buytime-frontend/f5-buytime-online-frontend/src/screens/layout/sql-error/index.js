import React from 'react';

const SQLError = props => {
	
	const createMarkup = () => {
		return {__html: props.markup };
	};
	
	return (
		<div dangerouslySetInnerHTML={createMarkup()} />
	)
};

export default SQLError;

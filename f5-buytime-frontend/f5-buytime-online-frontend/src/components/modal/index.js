import React from 'react';
import styled from 'styled-components';
import { Modal as ModalAnt } from 'antd';

class Modal extends React.Component {
	
	render() {
		const { children } = this.props;
		return (
			<div>
				<ModalWrapper
					title=""
					visible={this.props.visible}
					onCancel={this.props.handleCancel}
					footer=""
					width="100%"
				>
					{ children }
				</ModalWrapper>
			</div>
		);
	}
}

export default Modal;

const ModalWrapper = styled(ModalAnt)`
	& .ant-modal-body {
		padding-top: 56px;
		padding-bottom: 45px;
	}
	& .ant-modal-content {
		width: 850px;
		margin: auto;
	}
	& .ant-modal-footer {
		text-align: center;
		border-top-color: transparent;
	}
	.ant-modal-close-x {
		font-size: 30px;
	}
`;

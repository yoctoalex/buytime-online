import { DatePicker } from "antd";
import axios from "axios";
import React, { PureComponent, useState } from "react";

import { connect } from "react-redux";
import styled from 'styled-components';
import { CREATE_LOT, GET_IMAGE_LINK } from "../../helpers/api";
import { LOT_EXPIRATION_DATE } from "../../helpers/notifications";
import { fetchItems } from "../../screens/app/redux/actions";
import { getBearerHeader, getBase64FromFile } from "../../utils";
import { GreenButtonBig } from "../button/green-button";
import { Input } from "../style";
import { strings } from "../../constants/strings";
import photo from '../../img/addItem/photo.png';

const { addItem } = strings;
const initialState = {
	title: '',
	'auction_ends': '',
	photos: [],
};

const useAddItem = () => {
	const [state, setState] = useState(initialState);
	
	const handleInput = (event) => {
		setState({
			...state,
			[event.target.name]: event.currentTarget.value,
		});
	};
	
	const uploadFile = (event) => {
		const { files } = event.target;
		// if (files.length < 3) return;
		setState({
			...state,
			photos: [...files]
		});
		
	};
	
	const onDateChange = (date, dateString) => {
		setState({
			...state,
			['auction_ends']: dateString
		});
	};
	
	return {
		state,
		handleInput,
		onDateChange,
		uploadFile,
	}
};

class Preview extends PureComponent {

render() {
	return (
		<ImagePreview>
			{this.props.photos.slice(0, 6).map(img => <img key={img.name} src={URL.createObjectURL(img)} />)}
		</ImagePreview>
	)
}
}

export const uploadImage = (image, props) => {
	const headerBearer = getBearerHeader();
	return axios.post(GET_IMAGE_LINK,
		image,
		headerBearer
	)
		.then((response) => {
			if (response.data.id) {
				return response.data.id;
			}
			props.onShowToast({ message: response.data, isSuccess: false, newPage: true });
			return props.history.push('/block');
		})
		.catch((error) => {
		
		});
	
};

const AddItem = (props) => {
	
	const {state, handleInput, onDateChange, uploadFile} = useAddItem();
	
	const onCreate = async (event) => {
		event.preventDefault();
		const header = getBearerHeader();
		
		const files = await Promise.all(state.photos.map(file => getBase64FromFile(file)));
		const photos = await Promise.all(files.map((file) => uploadImage(file, props)));
		
		axios.post(CREATE_LOT, {
			...state,
			photos
		}, header)
			.then((response) => {
				const { status, data } = response;
				if (status === 201 && data.results) {
					props.fetchItems();
					props.changeContent('');
				} else {
					props.onShowToast({ message: data, isSuccess: false, newPage: true });
					return props.history.push('/block');
				}

			})
			.catch((error) => {
				if (error.response.status === 401) {
					props.history.push('/login');
				}
			});
	};
	
	return (
		<Form autoComplete='false'>
			<Title>{addItem.title}</Title>
			<Content>
				<div>
					<Input autoComplete="off" name="title" type="text" placeholder={addItem.titlePlaceholder} onChange={handleInput} value={state.title} />
					<Input autoComplete="off" name="startingPrice" type="number" placeholder={addItem.startingPricePlaceholder} onChange={handleInput} value={state.number} />
					<DatePickerWrapper showTime onChange={onDateChange} placeholder={LOT_EXPIRATION_DATE} />
					<TextArea name="description" cols="30" rows="10" placeholder={addItem.descriptionPlaceholder} onChange={handleInput} value={state.description} />
				</div>
				<div>
					<ImageUpload>
						<label htmlFor="file-input">
							<img src={photo} />
						</label>
						<input style={{ display: 'none' }} id="file-input" type="file" onChange={uploadFile} multiple />
					</ImageUpload>
					<Preview photos={state.photos} />
				</div>
			</Content>
			<Block>
				<GreenButtonBig onClick={onCreate} size="large">{addItem.submitButtonLabel}</GreenButtonBig>
			</Block>
		</Form>
	);
};

const mapDispatchToProps = {
	fetchItems,
};

export default connect(null, mapDispatchToProps)(AddItem);

const DatePickerWrapper = styled(DatePicker)`
	& input.ant-calendar-picker-input.ant-input {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		&:hover {
			border: 1px solid #848484;
		}
		
		&::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	    color: #818181;
	    font-size: 12px;
		}
		&::-moz-placeholder { /* Firefox 19+ */
		  color: #818181;
		  font-size: 12px;
		}
		&:-ms-input-placeholder { /* IE 10+ */
		  color: #818181;
		  font-size: 12px;
		}
		&:-moz-placeholder { /* Firefox 18- */
		  color: #818181;
		  font-size: 12px;
		}
	}
`;

const ImageUpload = styled.div`
	padding-left: 22px;
`;

const ImagePreview = styled.div`
	padding-left: 22px;
	padding-top: 15px;
	
	& img {
		max-width: 40px;
		vertical-align: top
		margin: 10px;
		max-height: 33px;
	}
`;

const Title = styled.h3`
	font-weight: 600;
	font-size: 24px;
	text-transform: uppercase;
	text-align: center;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 88px;
	border: 1px solid #848484;
	border-radius: 5px;
	padding: 6px 11px;
	font-size: 14px;
	
	&::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	    font-size: 12px;
		}
		&::-moz-placeholder { /* Firefox 19+ */
		  font-size: 12px;
		}
		&:-ms-input-placeholder { /* IE 10+ */
		  font-size: 12px;
		}
		&:-moz-placeholder { /* Firefox 18- */
		  font-size: 12px;
		}
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 25px;
`;

const Form = styled.form`
	max-width: 575px;
  margin: auto;
`;

const Block = styled.div`
	text-align: center;
	padding-top: 42px;
`;

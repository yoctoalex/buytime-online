import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Intro from './intro-section';
import BecomeSellerSection from './become-seller-section';
import { MostPopularSection } from './most-popular-section/index';
import CommentsSection from './comments-section';
import { basePage } from '../../components/base-page/base-page.js';
import { META_DATE, META_DATA_URL, META_FROM_URL, APP_NO_NEAREST_STORE } from '../../helpers/constants';
import axios from "axios";
import {NearestStoreSection} from "./nearest-store-section";


const Layout = (props) => {
	const [meta, setMeta] = useState("");
	useEffect(() => {
		if (META_FROM_URL.toString().toLowerCase() === "true") {
			axios.get(META_DATA_URL)
				.then((response) => {
					const { status } = response;
					if (status === 201 || status === 200) {
						const data = response.data;
						setMeta(data.meta);
					}
				})
				.catch((error) => {
					console.log(error);
				})
		}
		else {
			setMeta(META_DATE);
		}
	}, [META_DATE, META_FROM_URL, META_DATA_URL]);

	return (<>
		{meta &&
		<BlockWrapper>
			<Block>
				<MeteInfo dangerouslySetInnerHTML={{"__html":  meta}} />
			</Block>
		</BlockWrapper>}
		<Intro {...props} />
		{ (APP_NO_NEAREST_STORE.toLowerCase() !== "true")
			? (<NearestStoreSection />)
			: undefined }
		<BecomeSellerSection />
		<MostPopularSection />
		<CommentsSection />
	</>);
};

export default basePage(Layout);

const BlockWrapper = styled.div`
  background: #000;
`;

const MeteInfo = styled.div`
  max-width: 1280px;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 14px 40px;
  color: #fff;
  text-align: right;
  margin: auto;
  width: 100%;
`;

const Block = styled.div`
  width: 99%;
`;

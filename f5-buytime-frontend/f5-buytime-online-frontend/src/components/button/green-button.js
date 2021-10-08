import styled from "styled-components";

export const GreenButton = styled.button`
	color: #EBF9FF;
	font-size: 18px;
	font-family: Montserratsemibold, sans-serif;
	background: #0DA95E;
	border-radius: 10px;
	border-color: #0da95e;
	border: 1px solid #0da95e;
	font-size: 18px;
	text-transform: uppercase;
	padding: 12px 20px;
	min-width: 140px;
	cursor: pointer;
`;

export const GreenButtonBig = styled(GreenButton)`
	min-width: 200px;
`;

export const GreenButtonSmall = styled(GreenButton)`
	min-width: 89px;
	padding: 11px;
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	color: #FFFFFF;
	padding: 8px 13px;
`;

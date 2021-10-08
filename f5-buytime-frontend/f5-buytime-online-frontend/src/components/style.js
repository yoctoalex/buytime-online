import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	max-width: 1100px;
	width: 100%;
  margin: auto;
  height: 100vh;
`;

export const Layout = styled.div`
	flex: auto;
	padding: 0 20px;
`;

export const Content = styled.div`
	width: 80%;
	max-width: 500px;
	margin: auto;
	text-align: center;
`;

export const ContentBlock = styled.div`
	width: 100%;
	max-width: 1100px;
`;

export const Input = styled.input`
  margin-bottom: 22px;
  height: 40px;
  padding: 12px 12px;
  font-size: 14px;
  line-height: 40px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #848484;
  border-radius: 5px;
  width: 100%;
  color: #4B4B4B;
  
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

export const Button = styled.button`
	color: #fff;
  background-color: transparent;
  border-color: #000;
  text-shadow: none;
  width: 100%;
  height: 40px;
  padding: 0 15px;
  font-size: 16px;
  border-radius: 4px;
  background: black;
`;

export const ButtonBlock = styled.div`
	display: flex;
	flex-direction: row;
	padding-top: 70px;
`;

export const GreenLink = styled.span`
	font-family: Montserratsemibold, sans-serif;
	color: #0DA95E;
	font-size: 18px;
	border-bottom: 1px solid #0DA95E;
	cursor: pointer;
	& hover {
		color: #0DA95E;
		font-weight: 600;
	}
`;

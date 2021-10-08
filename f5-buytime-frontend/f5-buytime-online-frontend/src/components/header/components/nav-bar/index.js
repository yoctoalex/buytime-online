import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import styled from 'styled-components';
import { GreenButton } from '../../../../components/button/green-button';
import { DefaultButton } from '../../../../components/button/default-button';
import user from '../../../../img/user.png';
import 'react-flags-select/css/react-flags-select.css';
import { strings } from '../../../../constants/strings';

import { META_DATE } from '../../../../helpers/constants';

const headerPadding = META_DATE ? '55px' : '10px';
const { layout: { introduction: { countrySelector, languageSelector } }} = strings;

// Todo: Kate move addition button to child
export const NavBar = ({ headerOptions = [], handleClick, theme, isAuth = false, footer }) => (
	<Wrapper>
		{headerOptions.map(item => <NavBarButton key={item} theme={theme}>{item}</NavBarButton>)}
		{!footer && (isAuth ?
				<MyAccountBtn>My account</MyAccountBtn>
				:
				<>
					<LanguageBlock>
						<ReactFlagsSelectWrapper
							className="menu-flags"
							defaultCountry={countrySelector.defaultCountry}
							customLabels={countrySelector.customLabels}
							countries={countrySelector.countries}
						/>
						<ReactSelectWrapper
							defaultCountry={languageSelector.defaultCountry}
							customLabels={languageSelector.customLabels}
							countries={languageSelector.countries}
						/>
					</LanguageBlock>
					<DefaultButton onClick={() => handleClick('login')}>Log in</DefaultButton>
					<ButtonWrapper style={{ marginLeft: '15px' }}>Sign Up</ButtonWrapper>
				</>)
		}
	</Wrapper>
);

NavBar.propTypes = {};

const Wrapper = styled.nav`

`;

const ReactFlagsSelectWrapper = styled(ReactFlagsSelect)`
	.flag-select__btn:after {
		border-top: 5px solid white;
	}
	
	.flag-select__btn[aria-expanded="true"]:after {
		border-bottom: 5px solid white;
	}

	.flag-select__option__label {
		text-transform: uppercase;
		color: #FFF;
		font-weight: 600;
	}

	li .flag-select__option__label {
		text-transform: uppercase;
		color: black;
		font-weight: 600;
	}

	& img {
		vertical-align: baseline;
	}
	& .country-flag .country-label {
		text-transform: uppercase;
		color: #FFF;
		font-weight: 600;
	}
	
	&.flag-select .flag-options .country-label {
		color: black;
	}
	
	& .country-flag img {
		width: 1.5em;
		height: 1.5em;
	}
	
	&.flag-select .arrow-down {
		color: #FFFFFF;
		opacity: 0.8;
		font-size: 1.5em;
	}
`;

const ReactSelectWrapper = styled(ReactFlagsSelectWrapper)`
	& .country-flag img {
			display: none;
		}
`;

const LanguageBlock = styled.div`
	position: absolute;
	top: ${headerPadding};
  right: 30px;
`;

const ButtonWrapper = styled(GreenButton)`
	margin-left: 15px;
	display: inline-block;
`;

const NavBarButton = styled.a`
	font-family: Montserrat, sans-serif;
	font-weight: 600;
	font-size: 18px;
	text-transform: uppercase;
	padding-right: 67px;
	padding-top: 22px;
  display: inline-block;
  color: ${props => props.theme.color || '#fff'};
  
  &:hover {
    color: ${props => props.theme.color || '#fff'};
    text-decoration: underline;
  }
`;

const MyAccountBtn = styled.button`
	font-size: 18px;
	text-transform: uppercase;
	line-height: 38px;
	color: #000000;
	border: none;
	font-weight: 600;
	padding-left: 40px;
	background: url(${user}) no-repeat;
	cursor: pointer;
`;

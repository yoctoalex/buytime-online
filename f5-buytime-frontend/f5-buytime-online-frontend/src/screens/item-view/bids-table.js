import React, { useState, useEffect } from 'react';
import moment from "moment";
import styled from 'styled-components';

export const Bids = ({ bids, maxBid }) => {
	const [hideList, setState] = useState(true);
	const showBids = () => setState(false);
	return (
		<table>
			<tbody>
				<Tr>
					<Th>About this item</Th>
					<Th />
				</Tr>
				<Tr>
					<Td>
						Between lugs:
					</Td>
					<Td>
						24.2 mm
					</Td>
				</Tr>
				<Tr>
					<Td>
						Case:
					</Td>
					<Td>
						gold
					</Td>
				</Tr>
				<Tr>
					<Td>
						Case diameter:
					</Td>
					<Td>
						39 mm
					</Td>
				</Tr>
				<Tr>
					<Td>
						Case shape:
					</Td>
					<Td>
						round
					</Td>
				</Tr>
			</tbody>
		</table>
	);
};

Bids.propTypes = {};

const Th = styled.th`
	font-weight: 600;
	font-size: 18px;
	text-transform: capitalize;
	color: #000000;
`;

const Tr = styled.tr`
 &.active td {
  color: #000;
 }
  &:not(:first-child){
  opacity: 0;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
`;

const Td = styled.td`
	font-size: 16px;
	text-transform: capitalize;
	color: #757575;
	padding-top: 11px;
	min-width: 210px;
`;
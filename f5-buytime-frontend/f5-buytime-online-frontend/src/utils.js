import moment from "moment";
import { BEARER } from './helpers/constants'

export const getBearerHeader = () => {
	return { headers: {'Bearer': localStorage.getItem(BEARER)}}
};

export const setTimeCount = endTime => {
	const eventTime = moment(endTime).valueOf();
	const currentTime = moment().valueOf();
	const leftTime = eventTime - currentTime;
	
	if (leftTime <= 0) return ['', false];
	const duration = moment.duration(leftTime, 'milliseconds');
	const string =  duration.days() + 'd ' + duration.hours()+ 'h ' + duration.minutes()+ 'm ' + duration.seconds() + 's';
	const isSoon = leftTime <= 3600000;
	
	return [string, isSoon ];
};

export const getBase64FromFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const fileInfo = {
				name: file.name,
				content: reader.result,
				type: file.type,
			};
			resolve(fileInfo);
		};
		reader.readAsDataURL(file);
	});
};

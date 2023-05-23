import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

export interface ITab {
	clasificationType: CLASIFICATION_TYPE;
	selected?: boolean;
	title?: string;
}

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

export interface ISubtabClasification {
	clasificationType: CLASIFICATION_TYPE;
	codField?: string;
	desField?: string;
	key: string;
	name: string;
	selected: boolean;
}

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';

export interface ISubtabClasification {
  clasificationType: CLASIFICATION_TYPE;
  name: string;
  key: string;
  selected: boolean;
  codField?: string;
  desField?: string;
}
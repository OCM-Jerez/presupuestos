import { CLASIFICATION_TYPE } from '../../../commons/util/util';

export interface IButtonClasification {
    clasificationType: CLASIFICATION_TYPE;
    name: string;
    key: string;
    selected: boolean;
    codigo?: string;
    descripcion?: string;
}
export interface IButtonAdicional {
    name: string;
    path: string;
    param?: string;
}

import { CLASIFICATION_TYPE } from '../types/clasification';

export interface IButtonClasification {
    clasificationType: CLASIFICATION_TYPE;
    name: string;
    key: string;
    selected: boolean;
    codigo?: string;
    descripcion?: string;
}

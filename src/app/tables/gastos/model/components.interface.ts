import { CLASIFICATION_TYPE } from "../../../commons/util/util";

export interface IButtonClasification {
    clasificationType: CLASIFICATION_TYPE;
    name: string;
    selected?: boolean;
}

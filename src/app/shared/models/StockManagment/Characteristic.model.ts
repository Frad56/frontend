import { CharacteristicTypeValue } from "../enum/Characteristic-type-value";

export class Characteristic{

    characteristicId!: number;
    name!: string;
    type!: CharacteristicTypeValue;
}
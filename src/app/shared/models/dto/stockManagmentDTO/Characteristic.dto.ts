import { CharacteristicTypeValue } from "../../enum/Characteristic-type-value";


export interface CharacteristicDTO {

  characteristicId: number;
  name: string;
  type: CharacteristicTypeValue;

}

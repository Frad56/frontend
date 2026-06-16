import { BusinessPartner } from "../BusinessPartner.model";

export interface Client extends BusinessPartner {

    clientId?: number;
    firstName:string;
    lastName:string;
  }
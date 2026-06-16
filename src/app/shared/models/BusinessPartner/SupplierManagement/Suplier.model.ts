import { BusinessPartner } from "../BusinessPartner.model";

export interface Supplier extends BusinessPartner {

  supplierId?: number;
  companyName:string;
  contactName:string;
  taxIdentificationNumber:string;
}
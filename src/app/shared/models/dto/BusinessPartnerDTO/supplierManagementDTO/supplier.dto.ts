import { BusinessPartnerDTO } from "../BusinessPartner.dto";

export interface SupplierDTO extends BusinessPartnerDTO {
    
    companyName:string;
    contactName:string;
    taxIdentificationNumber:string;
}
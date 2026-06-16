import { BusinessPartnerDTO } from "../BusinessPartner.dto";

export interface ClientDTO extends BusinessPartnerDTO {
    
   firstName:string;
    lastName:string;
}
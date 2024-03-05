export class OrgnForm
{
      
      
        orgn_id : number;  
        orgn_nm : string;  
        wb_url_tx : string;  
        addr1_tx : string;  
        addr2_tx : string;  
        city_nm : string;  
        cntct_nm : string;  
        cntct_ph : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param OrgnForm
     */
    constructor(OrgnForm)
    {
        console.log(OrgnForm)
        {
              
                this.orgn_id  = OrgnForm.orgn_id || '';  
                this.orgn_nm  = OrgnForm.orgn_nm || '';  
                this.wb_url_tx  = OrgnForm.wb_url_tx || '';  
                this.addr1_tx  = OrgnForm.addr1_tx || '';  
                this.addr2_tx  = OrgnForm.addr2_tx || '';  
                this.city_nm  = OrgnForm.city_nm || '';  
                this.cntct_nm  = OrgnForm.cntct_nm || '';  
                this.cntct_ph  = OrgnForm.cntct_ph || '';  
                this.crte_usr_id  = OrgnForm.crte_usr_id || '';  
                this.updte_usr_id  = OrgnForm.updte_usr_id || '';
        }
    }
}
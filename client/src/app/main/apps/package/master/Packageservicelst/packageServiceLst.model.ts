export class PckgeSrvcpkForm
{
      
      
        srvcpk_nm : string;  
        cre_srvce_id : number;  
        msp_cd : string;  
        srvcpk_hndlr_tx : string;  
        efcte_dt : string;  
        expry_dt : string;  
        bndle_type_id : number;  
        lckn_dys_ct : number;  
        srvcpk_type_id : number;  
        chrg_amnt : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param PckgeSrvcpkForm
     */
    constructor(PckgeSrvcpkForm)
    {
        console.log(PckgeSrvcpkForm)
        {
              
                this.srvcpk_nm  = PckgeSrvcpkForm.srvcpk_nm || '';  
                this.cre_srvce_id  = PckgeSrvcpkForm.cre_srvce_id || '';  
                this.msp_cd  = PckgeSrvcpkForm.msp_cd || '';  
                this.srvcpk_hndlr_tx  = PckgeSrvcpkForm.srvcpk_hndlr_tx || '';  
                this.efcte_dt  = PckgeSrvcpkForm.efcte_dt || '';  
                this.expry_dt  = PckgeSrvcpkForm.expry_dt || '';  
                this.bndle_type_id  = PckgeSrvcpkForm.bndle_type_id || '';  
                this.lckn_dys_ct  = PckgeSrvcpkForm.lckn_dys_ct || '';  
                this.srvcpk_type_id  = PckgeSrvcpkForm.srvcpk_type_id || '';  
                this.chrg_amnt  = PckgeSrvcpkForm.chrg_amnt || '';  
                this.crte_usr_id  = PckgeSrvcpkForm.crte_usr_id || '';  
                this.updte_usr_id  = PckgeSrvcpkForm.updte_usr_id || '';
        }
    }
}
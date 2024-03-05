export class ErpPrtnrsForm
{
      
      
        prtnr_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param ErpPrtnrsForm
     */
    constructor(ErpPrtnrsForm)
    {
        console.log(ErpPrtnrsForm)
        {
              
                this.prtnr_nm  = ErpPrtnrsForm.prtnr_nm || '';  
                this.crte_usr_id  = ErpPrtnrsForm.crte_usr_id || '';  
                this.updte_usr_id  = ErpPrtnrsForm.updte_usr_id || '';
        }
    }
}
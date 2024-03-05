export class ErpTmplePrtnrsForm
{
      
      
        tmple_id : number;  
        prtnr_id : number;  
        ara_type_id : number;  
        prcnt_ct : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param ErpTmplePrtnrsForm
     */
    constructor(ErpTmplePrtnrsForm)
    {
        console.log(ErpTmplePrtnrsForm)
        {
              
                this.tmple_id  = ErpTmplePrtnrsForm.tmple_id || '';  
                this.prtnr_id  = ErpTmplePrtnrsForm.prtnr_id || '';  
                this.ara_type_id  = ErpTmplePrtnrsForm.ara_type_id || '';  
                this.prcnt_ct  = ErpTmplePrtnrsForm.prcnt_ct || '';  
                this.crte_usr_id  = ErpTmplePrtnrsForm.crte_usr_id || '';  
                this.updte_usr_id  = ErpTmplePrtnrsForm.updte_usr_id || '';
        }
    }
}
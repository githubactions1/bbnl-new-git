export class ErpTmpleForm
{
      
      
        tmple_cd : string;  
        tmple_nm : string;  
        tmple_type_id : number;  
        tmple_dscrn_tx : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param ErpTmpleForm
     */
    constructor(ErpTmpleForm)
    {
        console.log(ErpTmpleForm)
        {
              
                this.tmple_cd  = ErpTmpleForm.tmple_cd || '';  
                this.tmple_nm  = ErpTmpleForm.tmple_nm || '';  
                this.tmple_type_id  = ErpTmpleForm.tmple_type_id || '';  
                this.tmple_dscrn_tx  = ErpTmpleForm.tmple_dscrn_tx || '';  
                this.crte_usr_id  = ErpTmpleForm.crte_usr_id || '';  
                this.updte_usr_id  = ErpTmpleForm.updte_usr_id || '';
        }
    }
}
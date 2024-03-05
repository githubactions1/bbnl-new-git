export class ErpTmpleTypeForm
{
      
      
        tmple_type_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param ErpTmpleTypeForm
     */
    constructor(ErpTmpleTypeForm)
    {
        console.log(ErpTmpleTypeForm)
        {
              
                this.tmple_type_nm  = ErpTmpleTypeForm.tmple_type_nm || '';  
                this.crte_usr_id  = ErpTmpleTypeForm.crte_usr_id || '';  
                this.updte_usr_id  = ErpTmpleTypeForm.updte_usr_id || '';
        }
    }
}
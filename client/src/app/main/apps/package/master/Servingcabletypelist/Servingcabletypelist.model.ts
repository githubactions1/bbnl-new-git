export class SrvingCbleTypeForm
{
      
      
        cble_type_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param SrvingCbleTypeForm
     */
    constructor(SrvingCbleTypeForm)
    {
        console.log(SrvingCbleTypeForm)
        {
              
                this.cble_type_nm  = SrvingCbleTypeForm.cble_type_nm || '';  
                this.crte_usr_id  = SrvingCbleTypeForm.crte_usr_id || '';  
                this.updte_usr_id  = SrvingCbleTypeForm.updte_usr_id || '';
        }
    }
}
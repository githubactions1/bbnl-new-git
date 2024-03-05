export class CafTypeForm
{
      
      
        caf_type_nm : string;  
        crte_user_id : number;  
        updte_user_id : number;

            /**
     * Constructor
     *
     * @param CafTypeForm
     */
    constructor(CafTypeForm)
    {
        console.log(CafTypeForm)
        {
              
                this.caf_type_nm  = CafTypeForm.caf_type_nm || '';  
                this.crte_user_id  = CafTypeForm.crte_user_id || '';  
                this.updte_user_id  = CafTypeForm.updte_user_id || '';
        }
    }
}
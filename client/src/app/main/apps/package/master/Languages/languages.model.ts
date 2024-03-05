export class LngeForm
{
      
      
        lnge_nm : string;  
        crte_user_id : number;  
        updte_user_id : number;

            /**
     * Constructor
     *
     * @param LngeForm
     */
    constructor(LngeForm)
    {
        console.log(LngeForm)
        {
              
                this.lnge_nm  = LngeForm.lnge_nm || '';  
                this.crte_user_id  = LngeForm.crte_user_id || '';  
                this.updte_user_id  = LngeForm.updte_user_id || '';
        }
    }
}
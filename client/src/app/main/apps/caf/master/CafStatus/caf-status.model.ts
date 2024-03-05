export class CafStsForm
{
      
      
        caf_sts_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param CafStsForm
     */
    constructor(CafStsForm)
    {
        console.log(CafStsForm)
        {
              
                this.caf_sts_nm  = CafStsForm.caf_sts_nm || '';  
                this.crte_usr_id  = CafStsForm.crte_usr_id || '';  
                this.updte_usr_id  = CafStsForm.updte_usr_id || '';
        }
    }
}
export class CtyForm
{
      
      
        ste_id : number;  
        dstrt_id : number;  
        cty_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param CtyForm
     */
    constructor(CtyForm)
    {
        console.log(CtyForm)
        {
              
                this.ste_id  = CtyForm.ste_id || '';  
                this.dstrt_id  = CtyForm.dstrt_id || '';  
                this.cty_nm  = CtyForm.cty_nm || '';  
                this.crte_usr_id  = CtyForm.crte_usr_id || '';  
                this.updte_usr_id  = CtyForm.updte_usr_id || '';
        }
    }
}
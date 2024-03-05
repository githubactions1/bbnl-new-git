export class SteForm
{
      
      
        ste_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param SteForm
     */
    constructor(SteForm)
    {
        console.log(SteForm)
        {
              
                this.ste_nm  = SteForm.ste_nm || '';  
                this.crte_usr_id  = SteForm.crte_usr_id || '';  
                this.updte_usr_id  = SteForm.updte_usr_id || '';
        }
    }
}
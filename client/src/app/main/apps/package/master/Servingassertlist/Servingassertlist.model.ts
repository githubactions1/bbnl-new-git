export class SrvingAsrtForm
{
      
      
        asrt_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param SrvingAsrtForm
     */
    constructor(SrvingAsrtForm)
    {
        console.log(SrvingAsrtForm)
        {
              
                this.asrt_nm  = SrvingAsrtForm.asrt_nm || '';  
                this.crte_usr_id  = SrvingAsrtForm.crte_usr_id || '';  
                this.updte_usr_id  = SrvingAsrtForm.updte_usr_id || '';
        }
    }
}
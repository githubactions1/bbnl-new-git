export class AgntPymntMdeForm
{
      
      
        pymnt_mde_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param AgntPymntMdeForm
     */
    constructor(AgntPymntMdeForm)
    {
        console.log(AgntPymntMdeForm)
        {
              
                this.pymnt_mde_nm  = AgntPymntMdeForm.pymnt_mde_nm || '';  
                this.crte_usr_id  = AgntPymntMdeForm.crte_usr_id || '';  
                this.updte_usr_id  = AgntPymntMdeForm.updte_usr_id || '';
        }
    }
}
export class MrchtOtltCtgryForm
{
      
      
        otlt_ctgry_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param MrchtOtltCtgryForm
     */
    constructor(MrchtOtltCtgryForm)
    {
        console.log(MrchtOtltCtgryForm)
        {
              
                this.otlt_ctgry_nm  = MrchtOtltCtgryForm.otlt_ctgry_nm || '';  
                this.crte_usr_id  = MrchtOtltCtgryForm.crte_usr_id || '';  
                this.updte_usr_id  = MrchtOtltCtgryForm.updte_usr_id || '';
        }
    }
}
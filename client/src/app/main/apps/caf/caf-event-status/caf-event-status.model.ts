export class CafEvntStsForm
{
      
      
        caf_evnt_sts_nm : string;  
        caf_evnt_sts_cd : string;  
        caf_evnt_sts_dscn_tx : string;  
        crte_user_id : number;  
        updte_user_id : number;

            /**
     * Constructor
     *
     * @param CafEvntStsForm
     */
    constructor(CafEvntStsForm)
    {
        console.log(CafEvntStsForm)
        {
              
                this.caf_evnt_sts_nm  = CafEvntStsForm.caf_evnt_sts_nm || '';  
                this.caf_evnt_sts_cd  = CafEvntStsForm.caf_evnt_sts_cd || '';  
                this.caf_evnt_sts_dscn_tx  = CafEvntStsForm.caf_evnt_sts_dscn_tx || '';  
                this.crte_user_id  = CafEvntStsForm.crte_user_id || '';  
                this.updte_user_id  = CafEvntStsForm.updte_user_id || '';
        }
    }
}
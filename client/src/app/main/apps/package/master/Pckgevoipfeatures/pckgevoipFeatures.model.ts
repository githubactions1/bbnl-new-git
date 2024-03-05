export class PckgeVoipFtrsForm
{
      
      
        ftre_nm : string;  
        cre_srvce_id : number;  
        ftre_cd : string;  
        ftre_hndlr_tx : string;  
        mx_pr_vle_ct : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param PckgeVoipFtrsForm
     */
    constructor(PckgeVoipFtrsForm)
    {
        console.log(PckgeVoipFtrsForm)
        {
              
                this.ftre_nm  = PckgeVoipFtrsForm.ftre_nm || '';  
                this.cre_srvce_id  = PckgeVoipFtrsForm.cre_srvce_id || '';  
                this.ftre_cd  = PckgeVoipFtrsForm.ftre_cd || '';  
                this.ftre_hndlr_tx  = PckgeVoipFtrsForm.ftre_hndlr_tx || '';  
                this.mx_pr_vle_ct  = PckgeVoipFtrsForm.mx_pr_vle_ct || '';  
                this.crte_usr_id  = PckgeVoipFtrsForm.crte_usr_id || '';  
                this.updte_usr_id  = PckgeVoipFtrsForm.updte_usr_id || '';
        }
    }
}
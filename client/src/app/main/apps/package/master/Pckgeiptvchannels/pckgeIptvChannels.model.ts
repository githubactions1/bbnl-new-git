export class PckgeIptvChnleForm
{
      
      
        chnle_nm : string;  
        cre_srvce_id : number;  
        chnle_cd : number;  
        chnle_hndlr_tx : string;  
        lnge_id : number;  
        brdcr_id : number;  
        msp_cd : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param PckgeIptvChnleForm
     */
    constructor(PckgeIptvChnleForm)
    {
        console.log(PckgeIptvChnleForm)
        {
              
                this.chnle_nm  = PckgeIptvChnleForm.chnle_nm || '';  
                this.cre_srvce_id  = PckgeIptvChnleForm.cre_srvce_id || '';  
                this.chnle_cd  = PckgeIptvChnleForm.chnle_cd || '';  
                this.chnle_hndlr_tx  = PckgeIptvChnleForm.chnle_hndlr_tx || '';  
                this.lnge_id  = PckgeIptvChnleForm.lnge_id || '';  
                this.brdcr_id  = PckgeIptvChnleForm.brdcr_id || '';  
                this.msp_cd  = PckgeIptvChnleForm.msp_cd || '';  
                this.crte_usr_id  = PckgeIptvChnleForm.crte_usr_id || '';  
                this.updte_usr_id  = PckgeIptvChnleForm.updte_usr_id || '';
        }
    }
}
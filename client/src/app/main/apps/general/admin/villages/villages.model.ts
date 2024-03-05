export class VlgeForm
{
      
      
        ste_id : number;  
        dstrt_id : number;  
        mndl_id : number;  
        vlge_nm : string;  
        vlge_cd : string;  
        ptnl_ct : number;  
        trgt_ct : number;  
        std_cd : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param VlgeForm
     */
    constructor(VlgeForm)
    {
        console.log(VlgeForm)
        {
              
                this.ste_id  = VlgeForm.ste_id || '';  
                this.dstrt_id  = VlgeForm.dstrt_id || '';  
                this.mndl_id  = VlgeForm.mndl_id || '';  
                this.vlge_nm  = VlgeForm.vlge_nm || '';  
                this.vlge_cd  = VlgeForm.vlge_cd || '';  
                this.ptnl_ct  = VlgeForm.ptnl_ct || '';  
                this.trgt_ct  = VlgeForm.trgt_ct || '';  
                this.std_cd  = VlgeForm.std_cd || '';  
                this.crte_usr_id  = VlgeForm.crte_usr_id || '';  
                this.updte_usr_id  = VlgeForm.updte_usr_id || '';
        }
    }
}
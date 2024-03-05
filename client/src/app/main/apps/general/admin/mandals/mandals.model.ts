export class MndlForm
{
      
      
        ste_id : number;  
        dstrt_id : number;  
        mndl_nm : string;  
        mndl_shrt_nm : string;  
        mndl_cd : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param MndlForm
     */
    constructor(MndlForm)
    {
        console.log(MndlForm)
        {
              
                this.ste_id  = MndlForm.ste_id || '';  
                this.dstrt_id  = MndlForm.dstrt_id || '';  
                this.mndl_nm  = MndlForm.mndl_nm || '';  
                this.mndl_shrt_nm  = MndlForm.mndl_shrt_nm || '';  
                this.mndl_cd  = MndlForm.mndl_cd || '';  
                this.crte_usr_id  = MndlForm.crte_usr_id || '';  
                this.updte_usr_id  = MndlForm.updte_usr_id || '';
        }
    }
}
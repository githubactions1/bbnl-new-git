export class DstrtForm
{
      
      
        ste_id : number;  
        dstrt_nm : string;  
        dstrt_cd : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param DstrtForm
     */
    constructor(DstrtForm)
    {
        console.log(DstrtForm)
        {
              
                this.ste_id  = DstrtForm.ste_id || '';  
                this.dstrt_nm  = DstrtForm.dstrt_nm || '';  
                this.dstrt_cd  = DstrtForm.dstrt_cd || '';  
                this.crte_usr_id  = DstrtForm.crte_usr_id || '';  
                this.updte_usr_id  = DstrtForm.updte_usr_id || '';
        }
    }
}
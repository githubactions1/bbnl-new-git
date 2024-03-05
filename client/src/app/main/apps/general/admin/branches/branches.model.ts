export class MrchtOtltForm
{
      
      
        otlt_nm : string;  
        otlt_cd : string;  
        otlt_ctgry_id : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param MrchtOtltForm
     */
    constructor(MrchtOtltForm)
    {
        console.log(MrchtOtltForm)
        {
              
                this.otlt_nm  = MrchtOtltForm.otlt_nm || '';  
                this.otlt_cd  = MrchtOtltForm.otlt_cd || '';  
                this.otlt_ctgry_id  = MrchtOtltForm.otlt_ctgry_id || '';  
                this.crte_usr_id  = MrchtOtltForm.crte_usr_id || '';  
                this.updte_usr_id  = MrchtOtltForm.updte_usr_id || '';
        }
    }
}
export class BrdcrForm
{
      
      
        brdcr_nm : string;  
        brdcr_cd : string;  
        cntct_nm : string;  
        cntct_ph : string;  
        crte_user_id : number;  
        updte_user_id : number;

            /**
     * Constructor
     *
     * @param BrdcrForm
     */
    constructor(BrdcrForm)
    {
        console.log(BrdcrForm)
        {
              
                this.brdcr_nm  = BrdcrForm.brdcr_nm || '';  
                this.brdcr_cd  = BrdcrForm.brdcr_cd || '';  
                this.cntct_nm  = BrdcrForm.cntct_nm || '';  
                this.cntct_ph  = BrdcrForm.cntct_ph || '';  
                this.crte_user_id  = BrdcrForm.crte_user_id || '';  
                this.updte_user_id  = BrdcrForm.updte_user_id || '';
        }
    }
}
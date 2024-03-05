export class SbstnForm
{
      
      
        sbstn_nm : string;  
        sbstn_unq_cd : string;  
        sbstn_type_id : number;  
        dstrct_id : number;  
        mndl_id : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param SbstnForm
     */
    constructor(SbstnForm)
    {
        console.log(SbstnForm)
        {
              
                this.sbstn_nm  = SbstnForm.sbstn_nm || '';  
                this.sbstn_unq_cd  = SbstnForm.sbstn_unq_cd || '';  
                this.sbstn_type_id  = SbstnForm.sbstn_type_id || '';  
                this.dstrct_id  = SbstnForm.dstrct_id || '';  
                this.mndl_id  = SbstnForm.mndl_id || '';  
                this.crte_usr_id  = SbstnForm.crte_usr_id || '';  
                this.updte_usr_id  = SbstnForm.updte_usr_id || '';
        }
    }
}
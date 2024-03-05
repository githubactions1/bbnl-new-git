export class SbstnTypeForm
{
      
      
        sbstn_type_nm : string;  
        sbstn_type_cd : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param SbstnTypeForm
     */
    constructor(SbstnTypeForm)
    {
        console.log(SbstnTypeForm)
        {
              
                this.sbstn_type_nm  = SbstnTypeForm.sbstn_type_nm || '';  
                this.sbstn_type_cd  = SbstnTypeForm.sbstn_type_cd || '';  
                this.crte_usr_id  = SbstnTypeForm.crte_usr_id || '';  
                this.updte_usr_id  = SbstnTypeForm.updte_usr_id || '';
        }
    }
}
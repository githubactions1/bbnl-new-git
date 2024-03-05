export class PckgeSrvcpkTypeForm
{
      
      
        srvcpk_type_nm : string;  
        srvcpk_type_cd : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param PckgeSrvcpkTypeForm
     */
    constructor(PckgeSrvcpkTypeForm)
    {
        console.log(PckgeSrvcpkTypeForm)
        {
              
                this.srvcpk_type_nm  = PckgeSrvcpkTypeForm.srvcpk_type_nm || '';  
                this.srvcpk_type_cd  = PckgeSrvcpkTypeForm.srvcpk_type_cd || '';  
                this.crte_usr_id  = PckgeSrvcpkTypeForm.crte_usr_id || '';  
                this.updte_usr_id  = PckgeSrvcpkTypeForm.updte_usr_id || '';
        }
    }
}
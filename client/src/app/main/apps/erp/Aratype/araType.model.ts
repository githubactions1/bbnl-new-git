export class AraTypeForm
{
      
      
        ara_type_cd : string;  
        ara_type_nm : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param AraTypeForm
     */
    constructor(AraTypeForm)
    {
        console.log(AraTypeForm)
        {
              
                this.ara_type_cd  = AraTypeForm.ara_type_cd || '';  
                this.ara_type_nm  = AraTypeForm.ara_type_nm || '';  
                this.crte_usr_id  = AraTypeForm.crte_usr_id || '';  
                this.updte_usr_id  = AraTypeForm.updte_usr_id || '';
        }
    }
}
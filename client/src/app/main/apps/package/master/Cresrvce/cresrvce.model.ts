export class CreSrvceForm
{
      
      
        cre_srvce_nm : string;  
        cre_srvce_cd : string;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param CreSrvceForm
     */
    constructor(CreSrvceForm)
    {
        console.log(CreSrvceForm)
        {
              
                this.cre_srvce_nm  = CreSrvceForm.cre_srvce_nm || '';  
                this.cre_srvce_cd  = CreSrvceForm.cre_srvce_cd || '';  
                this.crte_usr_id  = CreSrvceForm.crte_usr_id || '';  
                this.updte_usr_id  = CreSrvceForm.updte_usr_id || '';
        }
    }
}
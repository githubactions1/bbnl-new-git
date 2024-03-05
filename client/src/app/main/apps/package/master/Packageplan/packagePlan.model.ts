export class PckgePlnForm
{
      
      
        pckge_nm : string;  
        efcte_dt : string;  
        expre_dt : string;  
        caf_type_id : number;  
        chrge_at : number;  
        gst_at : number;  
        crte_usr_id : number;  
        updte_usr_id : number;

            /**
     * Constructor
     *
     * @param PckgePlnForm
     */
    constructor(PckgePlnForm)
    {
        console.log(PckgePlnForm)
        {
              
                this.pckge_nm  = PckgePlnForm.pckge_nm || '';  
                this.efcte_dt  = PckgePlnForm.efcte_dt || '';  
                this.expre_dt  = PckgePlnForm.expre_dt || '';  
                this.caf_type_id  = PckgePlnForm.caf_type_id || '';  
                this.chrge_at  = PckgePlnForm.chrge_at || '';  
                this.gst_at  = PckgePlnForm.gst_at || '';  
                this.crte_usr_id  = PckgePlnForm.crte_usr_id || '';  
                this.updte_usr_id  = PckgePlnForm.updte_usr_id || '';
        }
    }
}
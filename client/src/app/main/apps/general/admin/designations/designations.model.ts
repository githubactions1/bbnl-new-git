export class DsgnForm
{
      
      
        dsgn_nm : string;  
        d_in : boolean;

            /**
     * Constructor
     *
     * @param DsgnForm
     */
    constructor(DsgnForm)
    {
        console.log(DsgnForm)
        {
              
                this.dsgn_nm  = DsgnForm.dsgn_nm || '';  
                this.d_in  = DsgnForm.d_in || '';
        }
    }
}
export class EntrpeCstmrSubTypForm
{
      
      
        entrpe_type_id : number;  
        entrpe_sub_type_nm : string;

            /**
     * Constructor
     *
     * @param EntrpeCstmrSubTypForm
     */
    constructor(EntrpeCstmrSubTypForm)
    {
        console.log(EntrpeCstmrSubTypForm)
        {
              
                this.entrpe_type_id  = EntrpeCstmrSubTypForm.entrpe_type_id || '';  
                this.entrpe_sub_type_nm  = EntrpeCstmrSubTypForm.entrpe_sub_type_nm || '';
        }
    }
}
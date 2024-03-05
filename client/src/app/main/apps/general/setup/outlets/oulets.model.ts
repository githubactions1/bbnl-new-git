export class OuletForm
{
    otlt_nm: string;
    otlt_id: number;
    otlt_ctgry_id: number;
    otlt_ctgry_nm: string;
    mrcht_id: number;
    mrcht_nm: string;
            /**
     * Constructor
     *
     * @param ouletForm
     */
    constructor(ouletForm)
    {
        console.log(ouletForm)
        {
            this.otlt_nm = ouletForm.otlt_nm || '';
            this.otlt_id = ouletForm.otlt_id || '';
            this.otlt_ctgry_id = ouletForm.otlt_id || '';
            this.otlt_ctgry_nm = ouletForm.otlt_id || '';
            this.mrcht_id = ouletForm.mrcht_id || '';
            this.mrcht_nm = ouletForm.mrcht_nm || '';
        }
    }
}
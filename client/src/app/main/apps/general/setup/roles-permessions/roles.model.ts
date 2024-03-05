export class RolesForm
{
    rle_nm: string;
    rle_dscn_nm: any;

            /**
     * Constructor
     *
     * @param RolesForm
     */
    constructor(RolesForm)
    {
        console.log(RolesForm)
        {
            this.rle_nm = RolesForm.rle_nm;
            this.rle_dscn_nm = RolesForm.rle_dscn_nm || '';

        }
    }
}
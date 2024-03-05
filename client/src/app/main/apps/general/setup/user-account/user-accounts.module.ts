
export class UserAccountForm
{
    rle_id: number;rle_nm: string;mrcht_usr_id: number;mrcht_usr_nm: string;pwd_tx: string;emple_id: number
            /**
     * Constructor
     *
     * @param userForm
     */
    constructor(userForm)
    {
        console.log(userForm)
        {
            this.emple_id = userForm.emple_id || '';
            this.rle_id = userForm.rle_id || '';
            this.rle_nm = userForm.rle_nm || '';
            this.mrcht_usr_id = userForm.mrcht_usr_id || '';
            this.mrcht_usr_nm = userForm.mrcht_usr_nm || '';
            this.pwd_tx = userForm.pwd_tx || '';
            this.emple_id = userForm.emple_id || '';
        }
    }
}
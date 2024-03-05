import { DsUtils } from '@glits/utils';

export class Employee
{
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    jobTitle: string;
    email: string;
    phone: string;
    grp_id:number;
    grp_nm:string;
    /**
     * Constructor
     *
     * @param emp
     */
    constructor(emp)
    {
        {
            this.id = emp.emple_id ;
            this.name = emp.fst_nm || '';
            this.lastName = emp.lst_nm || '';
            this.avatar = emp.imge_url_tx || 'assets/images/avatars/profile.jpg';
            this.grp_id = emp.grp_id;
            this.grp_nm = emp.grp_nm;
            this.jobTitle = emp.dsgn_nm || '';
            this.email = emp.eml_tx || '';
            this.phone = emp.mble_ph || '';
        
        }
    }
}
export class EmployeeGroup
{
    id: string;
    name: string;
    

    /**
     * Constructor
     *
     * @param grp
     */
    constructor(grp)
    {
        {
            this.id = grp.grp_id ;
            this.name = grp.grp_nm || '';
          
        
        }
    }
}
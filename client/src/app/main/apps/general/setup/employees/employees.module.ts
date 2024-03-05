
export class EmployeeForm {
    mrcht_emp_id: number; mrcht_emp_nm: string; lst_nm: string; eml_tx: string; mbl_nu: number;
    dsgn_nm: string; dsgn_id: number; avatar: string;
    dob_dt: string; rlv_dt: string; adhr_nu: number; addrs_tx: string; wrk_eml_ts: string;
    wrk_ph: number; otlt_nm: string; crnt_in: number; otlt_id: number; bnk_id: number; emplt_ctry_id: number;
    mrcht_id: number; mrcht_usr_id: number;
    usrdtls;
    emple_nu: any;
    dprts_id: number;
    dstrt_id: number;
    dprt_nm: string;
    mndl_id: any;
    svm_id: any;
    dstrt_nm: string;
    mndl_nm: string;
    svm_nm: string;
    gndr_id: any;
    gndr_nm: any;
    /**
* Constructor
*
* @param employeeForm
*/
    constructor(employeeForm) {
        this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));

        console.log(employeeForm)
        {
            this.mrcht_emp_id = employeeForm.mrcht_emp_id || '';
            this.mrcht_emp_nm = employeeForm.mrcht_emp_nm || '';
            this.lst_nm = employeeForm.lst_nm || '';
            this.eml_tx = employeeForm.eml_tx || '';
            this.mbl_nu = employeeForm.mbl_nu || '';
            this.dsgn_nm = employeeForm.dsgn_nm || '';
            this.dsgn_id = employeeForm.dsgn_id || '';
            this.avatar = employeeForm.imge_url_tx || 'assets/images/avatars/profile.jpg';
            this.dprt_nm = employeeForm.dprnt_nm || '';
            this.dprts_id = employeeForm.dprts_id || '';
            this.dob_dt = employeeForm.dob_dt || '';
            this.adhr_nu = employeeForm.adhr_nu || '';
            this.addrs_tx = employeeForm.addrs_tx || '';
            this.wrk_eml_ts = employeeForm.wrk_eml_ts || '';
            this.wrk_ph = employeeForm.wrk_ph || '';
            this.otlt_nm = employeeForm.otlt_nm || '';
            this.crnt_in = employeeForm.crnt_in || 1;
            this.otlt_id = employeeForm.otlt_id || '';
            this.bnk_id = employeeForm.bnk_id || 1;
            this.emplt_ctry_id = employeeForm.emplt_ctry_id || 1;
            this.mrcht_id = employeeForm.mrcht_id || this.usrdtls.mrcht_id;
            this.mrcht_usr_id = employeeForm.mrcht_usr_id || this.usrdtls.mrcht_usr_id;
            this.dstrt_id = employeeForm.dstrt_id || '';
            this.mndl_id = employeeForm.mndl_id || '';
            this.svm_id = employeeForm.svm_id || '';
            this.dstrt_nm = employeeForm.dstrt_nm || '';
            this.mndl_nm = employeeForm.mndl_nm || '';
            this.svm_nm = employeeForm.svm_nm || '';
            this.gndr_nm = employeeForm.gndr_nm || '';
            this.gndr_id = employeeForm.gndr_id || '';


        }
    }
}
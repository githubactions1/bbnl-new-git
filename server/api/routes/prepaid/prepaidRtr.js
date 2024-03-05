var prpdRtr = require('express').Router();
var checkUser 			= require(appRoot +'/server/api/modules/general/auth/controllers/accessCtrl');
var prpdCtrl =  require(appRoot +'/server/api/modules/prepaid/controllers/prepaidCtrl');
var prpdWltCtrl =  require(appRoot +'/server/api/modules/prepaid/controllers/prepaidWalletCtrl');





/*
Initialize gets the conformed invoice details. It saves the summary payment record
and based on the payment method it goes through following flows
1.  LMO Wallet::
    Check the balance in LMO wallet
        select prpd_wlt_id,prpd_wlt_at from erp_prpd_wlt_lst_t 
        where prtnr_id=1 AND wlt_usr_id= <agnt_id from session>
        if no record is found insert a new record and get the prpd_wlt_id
    Insert into invoices, payment 
        erp_invce_lst_t
        erp_invce_dtl_t
        caf_pckge_prchse_dtl_t (update cycle and expiry dates)
        caf_pckge_prchse_hst_t
        INSERT INTO erp_prpd_pmnt_dtl_t(pymnt_at,pymnt_mde_id,pymnt_mthd_id,caf_id,lmo_agnt_id,caf_invce_id,cstmr_id,pymnt_dt,pymnt_ts,pymnt_prvdr_id,bnk_hndlr_nm,clbk_url_tx,pymnt_srce_id)

    update LMO wallet reducing the balance
        update erp_prpd_wlt_lst_t
        set prpd_wlt_at=prpd_wlt_at-< invoice transaction amount>
        where prtnr_id=1 AND 
        wlt_usr_id=<agnt_id from session>

    Insert into LMO transaction details
        INSER INTO erp_prpd_wlt_trnsn_dtl_t(prpd_wlt_id,trnsn_at,wlt_blnce_at,cmnt_tx,trnsn_type_id)
        trnsn_type_id -- select * from BSS_ONLINE_U.cstmr_trncn_type_lst_t
2.  Customer Wallet::
    Check customer wallet balance
        select prpd_wlt_id,prpd_wlt_at from erp_prpd_wlt_lst_t where prtnr_id=9 AND wlt_usr_id= <customer identifier>
        if no record is found insert a new record and get the prpd_wlt_id
    Insert into invoices erp_invce_lst_t,erp_invce_dtl_t, payment -erp_prpd_pmnt_dtl_t
    update customer wallet reducing the balance
        update Customer wallet reducing the balance
        update erp_prpd_wlt_lst_t
        set prpd_wlt_at=prpd_wlt_at-< invoice transaction amount>
        where prtnr_id=9 AND 
        wlt_usr_id= <customer identifier>
        INSER INTO erp_prpd_wlt_trnsn_dtl_t(prpd_wlt_id,trnsn_at,wlt_blnce_at,cmnt_tx,trnsn_type_id)
        trnsn_type_id -- select * from BSS_ONLINE_U.cstmr_trncn_type_lst_t
3.  dynamic QR code::
    Insert into temporary erp_prpd_invce_lst_t and erp_prpd_invce_dtl_t invoices, payment - erp_prpd_pmnt_dtl_t
    call CP to get Dynamic QR code passing the Payment ID (send payment details part of this call)
            select case when ps.mble_ap_in=1 THEN 'app' else 'web' END as pymnt_req_src,
                p.pymnt_id,
                p.pymnt_prvdr_id,
                p.bnk_hndlr_nm,
                p.pymnt_id as  mrchnt_trnsn_ref_nu,
                p.clbk_url as mrchnt_clbk_url,
                p.pymnt_id as amount,
                p.crte_usr_id as crte_usr_id,
                3 as clnt_id
                from erp_prpd_pmnt_dtl_t p
            join erp_prpd_pmnt_srce_lst_t ps on ps.pymnt_srce_id=p.pymnt_srce_id
    store the trasaction number returned by CP
        update erp_prpd_pmnt_dtl_t
        set bnk_rfnce_id=
        where pymnt_id=
    return the output from CP API 

4.  Payment gateway
    Insert into temporary erp_prpd_invce_lst_t and erp_prpd_invce_dtl_t invoices, payment - erp_prpd_pmnt_dtl_t
    call CP to initialize a trasaction and get the trasaction Id (send payment details part of this call)
        Pass: Payment details, payment ID, Invoice details, conform callback URL
        select case when ps.mble_ap_in=1 THEN 'app' else 'web' END as pymnt_req_src,
                p.pymnt_id,
                p.pymnt_prvdr_id,
                p.bnk_hndlr_nm,
                p.pymnt_id as  mrchnt_trnsn_ref_nu,
                p.clbk_url as mrchnt_clbk_url,
                p.pymnt_id as amount,
                p.crte_usr_id as crte_usr_id,
                3 as clnt_id
                from erp_prpd_pmnt_dtl_t p
            join erp_prpd_pmnt_srce_lst_t ps on ps.pymnt_srce_id=p.pymnt_srce_id
        NOTE: after completion of payment the callback url in CP will be called by the bank
                and CP calls the payment conformation API from BSS
    store the trasaction number returned by CP
        update erp_prpd_pmnt_dtl_t
        set bnk_rfnce_id=
        where pymnt_id=
    call the Billpay PG with the trasaction ID and make payment
5.  Intent Call 
    Insert into temporary erp_prpd_invce_lst_t and erp_prpd_invce_dtl_t invoices, payment - erp_prpd_pmnt_dtl_t
    call CP to initialize a trasaction and get the trasaction Id (send payment details part of this call)
            select case when ps.mble_ap_in=1 THEN 'app' else 'web' END as pymnt_req_src,
                p.pymnt_id,
                p.pymnt_prvdr_id,
                p.bnk_hndlr_nm,
                p.pymnt_id as  mrchnt_trnsn_ref_nu,
                p.clbk_url as mrchnt_clbk_url,
                p.pymnt_id as amount,
                p.crte_usr_id as crte_usr_id,
                3 as clnt_id
                from erp_prpd_pmnt_dtl_t p
            join erp_prpd_pmnt_srce_lst_t ps on ps.pymnt_srce_id=p.pymnt_srce_id
    store the trasaction number returned by CP
        update erp_prpd_pmnt_dtl_t
        set bnk_rfnce_id=
        where pymnt_id=
    make the intent call to an UPI APP and make payment with the transaction ID
        NOTE: after completion of payment the callback url in CP will be called by the bank
                and CP calls the payment conformation API from BSS

For all the cases the caf purchase table need to be updated
caf purchase history table need to inserted
the cycle dates in caf table need to be updated
    In case of new CAF
        Is this LMO payment ?
             The settings table need to be queried if the LMO have to pay full invoice amount/his share with any additional diductions
              update lmo_shre_pd_in=0,lmo_shre_wthd_in=1 (LMO share withheald)
              Update the caf_dtl_t with the enty_sts_id=6
        Is this customer payment
             Update the caf_dtl_t with the enty_sts_id=6         

*/
prpdRtr.post('/payment/invoice/initialize', checkUser.hasToken , prpdCtrl.payment_initializeCntrl);


/*  CONFORM A PAYMENT 
    ------------------
Called from Collect and Pay Conforming the payment with amount, transaction id, bank reference number,transaction status
   select trnsn_type_id from erp_prpd_pmnt_dtl_t
   where pymnt_id=
   trnsn_type_id and trnsn_type_nm are as follows (select * from erp_trnsn_type_lst_t order by 1)
        1	Topup LMO Wallet
        2	Customer Purchase Package/Invoices
        3	Transfter to another Wallet
        4	LMO Invoice Payment to subscriber
        5	Topup to Subscriber Wallet

    if Invoice payment(trnsn_type_id=2)
        Update the payment status of the invoice and payment
            INSERT INTO erp_invce_lst_t()
            select i.* erp_prpd_pmnt_dtl_t p
            join erp_prpd_invce_lst_t i on p.caf_invce_id=i.caf_invce_id
            where pymnt_id=;
            INSERT INTO erp_invce_dtl_t()
            select id.* erp_prpd_pmnt_dtl_t p
            join erp_prpd_invce_lst_t id on p.caf_invce_id=i.caf_invce_id
            where pymnt_id=; 
            update erp_prpd_pmnt_dtl_t
            set pymnt_sts_id=1 // Success
            where pymnt_id=
    if LMO topup(trnsn_type_id=1)
        update transaction status, 
            update erp_prpd_pmnt_dtl_t
            set pymnt_sts_id=1 // Success
            where pymnt_id=
        update LMO wallet update:
            update erp_prpd_wlt_lst_t
            set prpd_wlt_at=prpd_wlt_at+< topup amount>
            where prtnr_id=1 AND 
            wlt_usr_id= <lmo agent id>

    if Customer topup(trnsn_type_id=5)
        update transaction status, Customer wallet transaction history
            update erp_prpd_pmnt_dtl_t
            set pymnt_sts_id=1 // Success
            where pymnt_id=
        update customer wallet update:
            update erp_prpd_wlt_lst_t
            set prpd_wlt_at=prpd_wlt_at+< topup amount>
            where prtnr_id=9 AND 
            wlt_usr_id= <customer identifier>
*/
prpdRtr.get('/payment/confirm', checkUser.hasToken , prpdCtrl.get_lmos);

/*  This is called by the client(Mobile app/webapp) to see if the transaction is completed and conformed by CP
    Once it receives the conformation or failure the status is show in the frontend to the users
    This will check the transaction table for status based on the transaction ID
*/
prpdRtr.get('/payment/invoice/verify', checkUser.hasToken , prpdCtrl.get_lmos);

// select wt.*,w.prpd_wlt_at 
// from erp_prpd_wlt_lst_t w 
// join agnt_lst_t a  on w.wlt_usr_id=a.agnt_id
// 	and prtnr_id=1 
// 	AND wlt_usr_id=10689
// join erp_prpd_wlt_trnsn_dtl_t wt on w.prpd_wlt_id=wt.prpd_wlt_id
// order by wt.trnsn_ts
prpdRtr.get('/lmo/wallet/transactions', checkUser.hasToken , prpdWltCtrl.getLMOWltTransHstCtrl);

        // select prpd_wlt_id,prpd_wlt_at from erp_prpd_wlt_lst_t where prtnr_id=1 AND wlt_usr_id= <agnt_id from session>
        // if no record is found insert a new record
prpdRtr.get('/lmo/wallet/balance', checkUser.hasToken , prpdWltCtrl.getLMOWltBlnceCtrl);

        // select prpd_wlt_id,w.prpd_wlt_at 
        // from erp_prpd_wlt_lst_t w 
        //join agnt_lst_t a   on w.wlt_usr_id=a.agnt_id 
        // where prtnr_id=1 
        //       AND wlt_usr_id=10689
prpdRtr.get('/lmo/wallet/balance/:lmo_id', checkUser.hasToken , prpdWltCtrl.getLMOWltBlnceCtrl);
//prpdRtr.get('/lmo/wallet/load', checkUser.hasToken , prpdCtrl.get_lmos);

 /*
 Possible options for the LMO wallet topup are described here       
        1. dynamic QR
            INSERT INTO erp_prpd_pmnt_dtl_t(pymnt_at,pymnt_mde_id,pymnt_mthd_id,caf_id,lmo_agnt_id,cstmr_id,pymnt_dt,pymnt_ts,pymnt_prvdr_id,bnk_hndlr_nm,clbk_url_tx,pymnt_srce_id)
            call AP URL

        2. Payment gateway
        3. Intel call based
        */
prpdRtr.get('/payment/lmo/wallet/topup/initialize', checkUser.hasToken , prpdCtrl.get_lmos);

/* 
select pymnt_sts_id from erp_prpd_pmnt_dtl_t where pymnt_id=
(1 Success,0 No status/waiting from bank,2 Failed)
*/
prpdRtr.get('/payment/lmo/wallet/topup/verify', checkUser.hasToken , prpdCtrl.get_lmos);

// select wtt.trnsn_type_nm,wt.wlt_trnsn_id,wt.trnsn_at,wt.trnsn_dt,wt.trnsn_ts,wt.wlt_blnce_at,cmnt_tx
// from erp_prpd_wlt_lst_t w 
// 	join caf_dtl_t c on c.cstmr_id=w.wlt_usr_id 
// 		and w.prtnr_id=9
// 		and c.caf_id=200027403
// 	join erp_prpd_wlt_trnsn_dtl_t wt on w.prpd_wlt_id=wt.prpd_wlt_id
// 	join erp_trnsn_type_lst_t wtt on wt.trnsn_type_id=wtt.trnsn_type_id
// order by wt.trnsn_ts
prpdRtr.get('/customer/wallet/transactions', checkUser.hasToken , prpdWltCtrl.getCstWltTransHstCtrl);


        // select w.prpd_wlt_id,w.prpd_wlt_at 
        // from erp_prpd_wlt_lst_t w 
        // 	join caf_dtl_t c on c.cstmr_id=w.wlt_usr_id 
        // 		and w.prtnr_id=9
        // 		and c.caf_id=<caf_id from session>
        // if no record is found insert a new record
prpdRtr.get('/customer/wallet/balance', checkUser.hasToken , prpdWltCtrl.getCstWltBlnceCtrl);

        // select w.prpd_wlt_id,w.prpd_wlt_at 
        // from erp_prpd_wlt_lst_t w 
        // 	join caf_dtl_t c on c.cstmr_id=w.wlt_usr_id 
        // 		and w.prtnr_id=9
        // 		and c.caf_id=200027403
        // if no record is found insert a new record
prpdRtr.get('/customer/wallet/balance/:cstmr_id', checkUser.hasToken , prpdWltCtrl.getCstWltBlnceCtrl);

/*     
 Possible options for the customer wallet topup are described here       
       1. LMO Wallet, 
       2. Customer Wallet, 
       3. UPI QR 
       4. Payment Gateway 
       5. UPI App-Intent calls
        NOTE:: if the topup is from LMO wallet, the initialize need to happen in the corresponding LMO session
*/
prpdRtr.get('/payment/customer/wallet/topup/initialize', checkUser.hasToken , prpdCtrl.get_lmos);
prpdRtr.get('/payment/customer/wallet/topup/verify', checkUser.hasToken , prpdCtrl.get_lmos);

module.exports = prpdRtr;

/***************************
 *  Inserting into erp_prpd_invce_lst_t and erp_prpd_invce_dtl_t invoices, payment - erp_prpd_pmnt_dtl_t
 * 


for(i=0;i<pckges.length;i++){
    chrge_at+=pckges[i].chrge_at;
    msho_shre_at+=pckges[i].chrge_at;
    lmo_shre_at+=pckges[i].chrge_at;
}
*/
// deudctions caliculations  on MSO:
/***
 * select prtnr_id,dctn_nm,dctn_at,dctn_pct_ct,chrge_cde_id
    from erp_dctns_lst_t 
    where a_in=1 and prtnr_id=1
    for(i=0;i<dctns.length;i++){
        if(dctns[i].prtnr_id==1){
            msho_shre_at=msho_shre_at-dctns[i].dctn_at-(msho_shre_at*dctns[i].dctn_pct_ct);
        }
            
        if(dctns[i].prtnr_id==2){
            lmo_shre_at=lmo_shre_at-dctns[i].dctn_at-(lmo_shre_at*dctns[i].dctn_pct_ct);
        }     
    }
 */

// deudctions caliculations  on LMO:
// chrge_at*=1.18;
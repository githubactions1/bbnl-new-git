exports.PckgeSrvcpkSchema = { 
                                    "fields":  [ {"nm": "srvcpk_nm","type":"varchar(256)","required":"false"},
									 {"nm": "cre_srvce_id","type":"bigint(20)","required":"false"},
									 {"nm": "msp_cd","type":"varchar(45)","required":"true"},
									 {"nm": "srvcpk_hndlr_tx","type":"varchar(45)","required":"true"},
									 {"nm": "efcte_dt","type":"date","required":"true"},
									 {"nm": "expry_dt","type":"date","required":"true"},
									 {"nm": "bndle_type_id","type":"bigint(20)","required":"false"},
									 {"nm": "lckn_dys_ct","type":"int(11)","required":"true"},
									 {"nm": "srvcpk_type_id","type":"bigint(20)","required":"true"},
									 {"nm": "chrg_amnt","type":"int(11)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["srvcpk_id,srvcpk_nm,cre_srvce_id,bndle_type_id"],
                                    "keys": ["srvcpk_id"]
                                 };
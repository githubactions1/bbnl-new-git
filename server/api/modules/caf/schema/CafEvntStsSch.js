exports.CafEvntStsSchema = { 
                                    "fields":  [ {"nm": "caf_evnt_sts_nm","type":"varchar(120)","required":"true"},
									 {"nm": "caf_evnt_sts_cd","type":"varchar(45)","required":"true"},
									 {"nm": "caf_evnt_sts_dscn_tx","type":"varchar(1000)","required":"true"},
									 {"nm": "crte_user_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_user_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["caf_evnt_sts_id"],
                                    "keys": ["caf_evnt_sts_id"]
                                 };
exports.PckgeVoipFtrsSchema = { 
                                    "fields":  [ {"nm": "ftre_nm","type":"varchar(100)","required":"false"},
									 {"nm": "cre_srvce_id","type":"bigint(20)","required":"true"},
									 {"nm": "ftre_cd","type":"varchar(45)","required":"true"},
									 {"nm": "ftre_hndlr_tx","type":"varchar(45)","required":"true"},
									 {"nm": "mx_pr_vle_ct","type":"int(11)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["ftre_id,ftre_nm"],
                                    "keys": ["ftre_id"]
                                 };
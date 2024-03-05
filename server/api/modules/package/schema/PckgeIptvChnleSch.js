exports.PckgeIptvChnleSchema = { 
                                    "fields":  [ {"nm": "chnle_nm","type":"varchar(120)","required":"false"},
									 {"nm": "cre_srvce_id","type":"bigint(20)","required":"true"},
									 {"nm": "chnle_cd","type":"int(11)","required":"true"},
									 {"nm": "chnle_hndlr_tx","type":"varchar(45)","required":"true"},
									 {"nm": "lnge_id","type":"bigint(20)","required":"false"},
									 {"nm": "brdcr_id","type":"bigint(20)","required":"false"},
									 {"nm": "msp_cd","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["chnle_id,chnle_nm,lnge_id,brdcr_id"],
                                    "keys": ["chnle_id"]
                                 };
exports.CreSrvceSchema = { 
                                    "fields":  [ {"nm": "cre_srvce_nm","type":"varchar(120)","required":"false"},
									 {"nm": "cre_srvce_cd","type":"varchar(45)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["cre_srvce_id,cre_srvce_nm,cre_srvce_cd"],
                                    "keys": ["cre_srvce_id"]
                                 };
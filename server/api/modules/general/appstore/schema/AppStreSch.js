exports.AppStreSchema = { 
                                    "fields":  [ {"nm": "app_stre_nm","type":"varchar(120)","required":"false"},
									 {"nm": "app_stre_dscn_tx","type":"varchar(120)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["app_stre_id,app_stre_nm,app_stre_dscn_tx"],
                                    "keys": ["app_stre_id"]
                                 };
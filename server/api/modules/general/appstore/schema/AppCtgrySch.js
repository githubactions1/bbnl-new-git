exports.AppCtgrySchema = { 
                                    "fields":  [ {"nm": "app_ctgry_nm","type":"bigint(11)","required":"false"},
									 {"nm": "app_ctgry_dscn_tx","type":"varchar(120)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["app_ctgry_id,app_ctgry_nm,app_ctgry_dscn_tx"],
                                    "keys": ["app_ctgry_id"]
                                 };
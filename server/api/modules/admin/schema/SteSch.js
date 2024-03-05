exports.SteSchema = { 
                                    "fields":  [ {"nm": "ste_nm","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["ste_id"],
                                    "keys": ["ste_id"]
                                 };
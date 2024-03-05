exports.LngeSchema = { 
                                    "fields":  [ {"nm": "lnge_nm","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["lnge_id"],
                                    "keys": ["lnge_id"]
                                 };
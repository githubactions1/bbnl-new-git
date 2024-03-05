exports.SprtTmSchema = { 
                                    "fields":  [ {"nm": "tm_nm","type":"varchar(120)","required":"true"},
									 {"nm": "tm_dscn_tx","type":"varchar(1000)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["tm_id"],
                                    "keys": ["tm_id"]
                                 };
exports.SprtTcktCtgrySchema = { 
                                    "fields":  [ {"nm": "tckt_ctgry_nm","type":"varchar(120)","required":"true"},
									 {"nm": "tckt_ctgry_dscn_tx","type":"varchar(500)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["tckt_ctgry_id"],
                                    "keys": ["tckt_ctgry_id"]
                                 };
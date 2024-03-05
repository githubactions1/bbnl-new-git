exports.SprtTcktTypeSchema = { 
                                    "fields":  [ {"nm": "tckt_type_nm","type":"varchar(120)","required":"true"},
									 {"nm": "tckt_type_cd","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["tckt_type_id"],
                                    "keys": ["tckt_type_id"]
                                 };
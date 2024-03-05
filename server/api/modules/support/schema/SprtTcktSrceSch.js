exports.SprtTcktSrceSchema = { 
                                    "fields":  [ {"nm": "tckt_srce_nm","type":"varchar(120)","required":"true"},
									 {"nm": "tckt_srce_cd","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["tckt_srce_id"],
                                    "keys": ["tckt_srce_id"]
                                 };
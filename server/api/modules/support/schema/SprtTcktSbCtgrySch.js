exports.SprtTcktSbCtgrySchema = { 
                                    "fields":  [ {"nm": "tckt_sb_ctgry_nm","type":"varchar(120)","required":"true"},
									 {"nm": "tckt_ctgry_id","type":"bigint(20)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["tckt_sb_ctgry_id,tckt_ctgry_id"],
                                    "keys": ["tckt_sb_ctgry_id"]
                                 };
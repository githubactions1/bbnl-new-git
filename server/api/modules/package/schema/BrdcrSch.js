exports.BrdcrSchema = { 
                                    "fields":  [ {"nm": "brdcr_nm","type":"varchar(120)","required":"true"},
									 {"nm": "brdcr_cd","type":"varchar(45)","required":"true"},
									 {"nm": "cntct_nm","type":"varchar(120)","required":"true"},
									 {"nm": "cntct_ph","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["brdcr_id"],
                                    "keys": ["brdcr_id"]
                                 };
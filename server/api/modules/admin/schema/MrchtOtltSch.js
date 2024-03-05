exports.MrchtOtltSchema = { 
                                    "fields":  [ {"nm": "otlt_nm","type":"varchar(45)","required":"true"},
									 {"nm": "otlt_cd","type":"varchar(255)","required":"true"},
									 {"nm": "otlt_ctgry_id","type":"bigint(20)","required":"true"},
									 {"nm": "mrcht_id","type":"bigint(11)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["otlt_id,mrcht_id"],
                                    "keys": ["otlt_id"]
                                 };
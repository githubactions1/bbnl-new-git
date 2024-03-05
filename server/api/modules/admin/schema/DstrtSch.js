exports.DstrtSchema = { 
                                    "fields":  [ {"nm": "ste_id","type":"bigint(20)","required":"false"},
									 {"nm": "dstrt_nm","type":"varchar(120)","required":"true"},
									 {"nm": "dstrt_cd","type":"varchar(5)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["dstrt_id,ste_id"],
                                    "keys": ["dstrt_id"]
                                 };
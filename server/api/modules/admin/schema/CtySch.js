exports.CtySchema = { 
                                    "fields":  [ {"nm": "ste_id","type":"bigint(20)","required":"false"},
									 {"nm": "dstrt_id","type":"bigint(20)","required":"false"},
									 {"nm": "cty_nm","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["cty_id,ste_id,dstrt_id"],
                                    "keys": ["cty_id"]
                                 };
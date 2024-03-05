exports.MndlSchema = { 
                                    "fields":  [ {"nm": "ste_id","type":"bigint(20)","required":"false"},
									 {"nm": "dstrt_id","type":"bigint(20)","required":"false"},
									 {"nm": "mndl_nm","type":"varchar(120)","required":"true"},
									 {"nm": "mndl_shrt_nm","type":"varchar(255)","required":"true"},
									 {"nm": "mndl_cd","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["mndl_id,ste_id,dstrt_id"],
                                    "keys": ["mndl_id"]
                                 };
exports.VlgeSchema = { 
                                    "fields":  [ {"nm": "ste_id","type":"bigint(20)","required":"false"},
									 {"nm": "dstrt_id","type":"bigint(20)","required":"false"},
									 {"nm": "mndl_id","type":"bigint(20)","required":"false"},
									 {"nm": "vlge_nm","type":"varchar(120)","required":"true"},
									 {"nm": "vlge_cd","type":"varchar(120)","required":"true"},
									 {"nm": "ptnl_ct","type":"bigint(20)","required":"true"},
									 {"nm": "trgt_ct","type":"bigint(255)","required":"true"},
									 {"nm": "std_cd","type":"bigint(20)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["vlge_id,mndl_id,ste_id,dstrt_id"],
                                    "keys": ["vlge_id"]
                                 };
exports.SbstnSchema = { 
                                    "fields":  [ {"nm": "sbstn_nm","type":"varchar(45)","required":"true"},
									 {"nm": "sbstn_unq_cd","type":"varchar(45)","required":"true"},
									 {"nm": "sbstn_type_id","type":"bigint(20)","required":"false"},
									 {"nm": "dstrct_id","type":"bigint(20)","required":"false"},
									 {"nm": "mndl_id","type":"bigint(20)","required":"false"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["sbstn_id,sbstn_type_id,dstrct_id,mndl_id"],
                                    "keys": ["sbstn_id"]
                                 };
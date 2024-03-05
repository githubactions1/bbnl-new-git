exports.SrvingAsrtSchema = { 
                                    "fields":  [ {"nm": "asrt_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["asrt_id"],
                                    "keys": ["asrt_id"]
                                 };
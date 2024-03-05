exports.CafStsSchema = { 
                                    "fields":  [ {"nm": "caf_sts_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["caf_sts_id"],
                                    "keys": ["caf_sts_id"]
                                 };
exports.AgntPymntMdeSchema = { 
                                    "fields":  [ {"nm": "pymnt_mde_nm","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["pymnt_mde_id"],
                                    "keys": ["pymnt_mde_id"]
                                 };
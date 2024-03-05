exports.SrvingCbleTypeSchema = { 
                                    "fields":  [ {"nm": "cble_type_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["cble_type_id"],
                                    "keys": ["cble_type_id"]
                                 };
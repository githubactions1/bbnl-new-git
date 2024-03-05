exports.AraTypeSchema = { 
                                    "fields":  [ {"nm": "ara_type_cd","type":"varchar(45)","required":"true"},
									 {"nm": "ara_type_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["ara_type_id"],
                                    "keys": ["ara_type_id"]
                                 };
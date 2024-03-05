exports.ErpTmpleTypeSchema = { 
                                    "fields":  [ {"nm": "tmple_type_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["tmple_type_id"],
                                    "keys": ["tmple_type_id"]
                                 };
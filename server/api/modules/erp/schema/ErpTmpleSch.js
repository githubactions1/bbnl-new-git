exports.ErpTmpleSchema = { 
                                    "fields":  [ {"nm": "tmple_cd","type":"varchar(45)","required":"true"},
									 {"nm": "tmple_nm","type":"varchar(45)","required":"true"},
									 {"nm": "tmple_type_id","type":"bigint(20)","required":"true"},
									 {"nm": "tmple_dscrn_tx","type":"varchar(500)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["tmple_id"],
                                    "keys": ["tmple_id"]
                                 };
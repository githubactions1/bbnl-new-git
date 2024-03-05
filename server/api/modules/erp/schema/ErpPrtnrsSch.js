exports.ErpPrtnrsSchema = { 
                                    "fields":  [ {"nm": "prtnr_nm","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["prtnr_id"],
                                    "keys": ["prtnr_id"]
                                 };
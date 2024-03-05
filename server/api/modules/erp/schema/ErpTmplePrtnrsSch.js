exports.ErpTmplePrtnrsSchema = { 
                                    "fields":  [ {"nm": "tmple_id","type":"bigint(20)","required":"false"},
									 {"nm": "prtnr_id","type":"bigint(20)","required":"false"},
									 {"nm": "ara_type_id","type":"bigint(20)","required":"false"},
									 {"nm": "prcnt_ct","type":"bigint(11)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["tmple_prtnrs_rel_id,tmple_id,prtnr_id,ara_type_id"],
                                    "keys": ["tmple_prtnrs_rel_id"]
                                 };
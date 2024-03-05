exports.PckgePlnSchema = { 
                                    "fields":  [ {"nm": "pckge_nm","type":"varchar(120)","required":"true"},
									 {"nm": "efcte_dt","type":"date","required":"true"},
									 {"nm": "expre_dt","type":"date","required":"true"},
									 {"nm": "caf_type_id","type":"bigint(20)","required":"false"},
									 {"nm": "chrge_at","type":"decimal(10,2)","required":"true"},
									 {"nm": "gst_at","type":"decimal(10,2)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["pckge_id,caf_type_id"],
                                    "keys": ["pckge_id"]
                                 };
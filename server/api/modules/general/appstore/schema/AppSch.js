exports.AppSchema = { 
                                    "fields":  [ {"nm": "app_nm","type":"varchar(45)","required":"false"},
									 {"nm": "app_type_id","type":"bigint(11)","required":"false"},
									 {"nm": "pd_in","type":"tinyint(1)","required":"true"},
									 {"nm": "app_log_url_tx","type":"varchar(120)","required":"true"},
									 {"nm": "app_icn_tx","type":"varchar(120)","required":"true"},
									 {"nm": "app_clr_tx","type":"varchar(120)","required":"true"},
									 {"nm": "app_url_tx","type":"varchar(120)","required":"true"},
									 {"nm": "dscn_tx","type":"text","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["app_id,app_nm,app_type_id"],
                                    "keys": ["app_id"]
                                 };
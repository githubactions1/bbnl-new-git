exports.OrgnSchema = { 
                                    "fields":  [ {"nm": "orgn_id","type":"bigint(11)","required":"false"},
									 {"nm": "orgn_nm","type":"varchar(45)","required":"true"},
									 {"nm": "wb_url_tx","type":"varchar(255)","required":"true"},
									 {"nm": "addr1_tx","type":"varchar(255)","required":"true"},
									 {"nm": "addr2_tx","type":"varchar(255)","required":"true"},
									 {"nm": "city_nm","type":"varchar(45)","required":"true"},
									 {"nm": "cntct_nm","type":"varchar(45)","required":"true"},
									 {"nm": "cntct_ph","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["orgn_id"],
                                    "keys": ["orgn_id"]
                                 };
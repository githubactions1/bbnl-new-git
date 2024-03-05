exports.AppMdleSchema = { 
                                    "fields":  [ {"nm": "mdlet_nm","type":"varchar(120)","required":"false"},
									 {"nm": "mdlet_hndlr_nm","type":"varchar(120)","required":"false"},
									 {"nm": "mdlet_dscn_tx","type":"varchar(1000)","required":"true"},
									 {"nm": "swgr_fle_url_tx","type":"varchar(200)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["mdle_id,mdlet_nm,mdlet_hndlr_nm"],
                                    "keys": ["mdle_id"]
                                 };
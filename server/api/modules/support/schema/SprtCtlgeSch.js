exports.SprtCtlgeSchema = { 
                                    "fields":  [ {"nm": "ctlge_nm","type":"varchar(120)","required":"true"},
									 {"nm": "ctlge_dscn_tx","type":"varchar(1000)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["ctlge_id"],
                                    "keys": ["ctlge_id"]
                                 };
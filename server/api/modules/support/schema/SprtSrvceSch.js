exports.SprtSrvceSchema = { 
                                    "fields":  [ {"nm": "srvce_nm","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["srvce_id"],
                                    "keys": ["srvce_id"]
                                 };
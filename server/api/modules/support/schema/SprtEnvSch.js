exports.SprtEnvSchema = { 
                                    "fields":  [ {"nm": "env_nm","type":"varchar(120)","required":"true"},
									 {"nm": "env_cd","type":"varchar(45)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["env_id"],
                                    "keys": ["env_id"]
                                 };
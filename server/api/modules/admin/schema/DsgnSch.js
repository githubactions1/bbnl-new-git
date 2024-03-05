exports.DsgnSchema = { 
                                    "fields":  [ {"nm": "dsgn_nm","type":"varchar(120)","required":"true"},
									 {"nm": "d_in","type":"tinyint(1)","required":"false"},
									],
                                    "required": ["dsgn_id"],
                                    "keys": ["dsgn_id"]
                                 };
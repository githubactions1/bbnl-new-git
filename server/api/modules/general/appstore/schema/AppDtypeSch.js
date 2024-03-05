exports.AppDtypeSchema = { 
                                    "fields":  [ {"nm": "dtype_nm","type":"varchar(120)","required":"false"},
									 {"nm": "dtype_frmt_tx","type":"varchar(120)","required":"true"},
									 {"nm": "dtype_dscn_tx","type":"varchar(1000)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["dtype_id,dtype_nm"],
                                    "keys": ["dtype_id"]
                                 };
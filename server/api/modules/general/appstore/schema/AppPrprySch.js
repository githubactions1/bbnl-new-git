exports.AppPrprySchema = { 
                                    "fields":  [ {"nm": "mdle_id","type":"bigint(20)","required":"false"},
									 {"nm": "prpry_nm","type":"varchar(120)","required":"false"},
									 {"nm": "prpry_hndlr_nm","type":"varchar(120)","required":"false"},
									 {"nm": "dtype_id","type":"bigint(20)","required":"false"},
									 {"nm": "prpry_vlue_tx","type":"varchar(120)","required":"true"},
									 {"nm": "prpry_dscn_tx","type":"varchar(1000)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
									],
                                    "required": ["prpry_id,mdle_id,prpry_nm,prpry_hndlr_nm,dtype_id"],
                                    "keys": ["prpry_id"]
                                 };
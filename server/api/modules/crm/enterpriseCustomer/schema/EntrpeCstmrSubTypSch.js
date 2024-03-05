exports.EntrpeCstmrSubTypSchema = { 
                                    "fields":  [ {"nm": "entrpe_type_id","type":"bigint(20)","required":"true"},
									 {"nm": "entrpe_sub_type_nm","type":"varchar(120)","required":"true"},
									],
                                    "required": ["entrpe_sub_type_id,entrpe_type_id,entrpe_sub_type_nm"],
                                    "keys": ["entrpe_sub_type_id"]
                                 };
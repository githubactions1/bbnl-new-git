exports.GenreSchema = { 
                                    "fields":  [ {"nm": "genre_nm","type":"varchar(120)","required":"true"},
									 {"nm": "crte_usr_id","type":"bigint(20)","required":"true"},
									 {"nm": "updte_usr_id","type":"bigint(20)","required":"true"},
									],
                                    "required": ["genre_id"],
                                    "keys": ["genre_id"]
                                 };
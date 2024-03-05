exports.SprtAplctnSchema = { 
    "fields":  [ {"nm": "aplctn_nm","type":"varchar(120)","required":"true"},
     {"nm": "aplctn_cd","type":"varchar(45)","required":"true"},
     {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
     {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
    ],
    "required": ["aplctn_id"],
    "keys": ["aplctn_id"]
 };
exports.SprtTcktStsSchema = { 
    "fields":  [ {"nm": "tckt_sts_nm","type":"varchar(120)","required":"true"},
     {"nm": "icn_tx","type":"varchar(45)","required":"true"},
     {"nm": "crte_usr_id","type":"bigint(11)","required":"true"},
     {"nm": "updte_usr_id","type":"bigint(11)","required":"true"},
    ],
    "required": ["tckt_sts_id"],
    "keys": ["tckt_sts_id"]
 };
/********************************************************************************************
---------------------------------------------------------------------------------------------
File              : appConstants.js
Description       : All the constants used in the application are listed here.
---------------------------------------------------------------------------------------------
********************************************************************************************/


/********************************************************************************************
---------------------------------------------------------------------------------------------
Variable              : cafEventCodes
Description       : All the CAF Event Codes used in the application are listed here.
---------------------------------------------------------------------------------------------
********************************************************************************************/
var cafEventCodes = {
    "INSTALLED": 1
    , "ACTIVATED": 2
    , "SUSPENDED": 3
    , "TERMINATED": 4
    , "BLACKLISTED": 5
    , "UN_BLACKLISTED": 6
    , "RESUMED": 7
    , "BOX_CHANGE": 8
    , "LMO_LCO_MSO_CHANGE": 9
    , "ADDRESS_CHANGE": 10
    , "PACKAGE_CHANGE": 11
    , "ADDON_PACKAGE_ADDED": 12
    , "ADDON_PACKAGE_EXPIRED": 13
    , "INVOICE_GENERATED": 14
    , "PAYMENT_MADE": 15
    , "FLAGGED_AS_DISPUTED": 16
    , "UN_FLAGGED_AS_DISPUTED": 17
    , "BOX_ISSUE_ACCEPTED": 18
    , "TERMINATED_SERVICE": 19
    , "SUSPENDED_SERVICE": 20
    , "RESUMED_SERVICE": 21

};

/********************************************************************************************
---------------------------------------------------------------------------------------------
Variable              : cafEventCodes
Description       : All the CAF Status Codes used in the application are listed here.
---------------------------------------------------------------------------------------------
********************************************************************************************/
var cafStsCodes = {
    "PENDING_ACTIVATION": 1
    , "ACTIVATE": 2
    , "BLACKLISTED": 3
    , "SUSPENDED": 4
    , "TERMINATED": 5
};

/********************************************************************************************
---------------------------------------------------------------------------------------------
Variable              : appEntityCodes
Description       : All the App Entity Codes used in the application are listed here.
---------------------------------------------------------------------------------------------
********************************************************************************************/
var appEntityCodes = {
    "CAF": 1
    , "STB": 2
};

/********************************************************************************************
---------------------------------------------------------------------------------------------
Variable              : evntTxts
Description       : All the Event Text Messages used in the application are listed here.
---------------------------------------------------------------------------------------------
********************************************************************************************/
var evntTxts = {
    "INSTALLED": "STB INSTALLED"
    , "ACTIVATED": "CAF ACTIVATED"
    , "SUSPENDED": "CAF SUSPENDED"
    , "TERMINATED": "CAF TERMINATED"
    , "BLACKLISTED": "CAF BLACKLISTED"
    , "UN_BLACKLISTED": "CAF UN_BLACKLISTED"
    , "RESUMED": "CAF UN_BLACKLISTED"
    , "BOX_CHANGE": "CAF BOX CHNAGED FROM $MAC-OLD$ to $MAC-NEW"
    , "LMO_LCO_MSO_CHANGE": "CAF AGENT CHNAGED FROM $AGENT-OLD$ to $AGENT-NEW"
    , "ADDRESS_CHANGE": "CAF ADDRESS CHNAGED FROM $ADDRESS-OLD$ to $ADDRESS-OLD$"
};

exports.cafStsCodes = cafStsCodes;
exports.cafEventCodes = cafEventCodes;
exports.appEntityCodes = appEntityCodes;
exports.evntTxts = evntTxts;
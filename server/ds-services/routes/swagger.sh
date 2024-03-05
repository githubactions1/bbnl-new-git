
#URL_RESULTS=$(cat dsRoutes.js |awk '/ds-auto-comment-start/{flag=1;next}/ds-auto-comment-end/{flag=0}flag')
#echo $URL_RESULTS

APP_NAME="glits API ( Internal Use Only )"
API_VERSION="1.0.0"
URL_DOMAIN="localhost:4901"
API_BASE="/ds"


SWAGGER_START_BLOCK="{
  \"swagger\": \"2.0\",
  \"info\": {
    \"version\": \"$API_VERSION\",
    \"title\": \"$APP_NAME:\",
    \"license\": {
      \"name\": \"MIT\"
    }
  },
  \"host\": \"$URL_DOMAIN\",
  \"basePath\": \"$API_BASE\",
  \"schemes\": [
    \"http\"
  ],
  \"consumes\": [
    \"application/json\"
  ],
  \"produces\": [
    \"application/json\"
  ],"

SWAGGER_END_BLOCK="}"

SWAGGER_JSON=$SWAGGER_START_BLOCK

SWAGGER_JSON="$SWAGGER_JSON \"paths\": {"
cat dsRoutes.js |awk '/ds-auto-comment-start/{flag=1;next}/ds-auto-comment-end/{flag=0}flag'| while read -r line ; do  
    #REQ_METHOD=$(echo $line| cut -d'.' -f 2| cut -d'(' -f 1)
    #URL=$(echo $line| cut -d"'" -f 2)
   TRIP_LINE=$(echo "$line"|sed '/^$/d')
   LABLE=$(echo $TRIP_LINE|cut -d':' -f1|sed 's/^[ \t]*//;s/[ \t]*$//')
   VALUE=$(echo $TRIP_LINE|cut -d':' -f2|sed 's/^[ ]*//;s/[ ]*$//')
   if [ "$LABLE" = "@url" ]; 
   then
        echo $LABLE
        echo "\"$VALUE\" : {"
   fi

   if [ "$LABLE" = "@Method" ]; 
   then
        echo $LABLE
        echo "\"$VALUE\" : {"
   fi
   if [ "$LABLE" = "@summary" ]; 
   then
        echo "\"summary\" : \"$VALUE\" ,"
   fi
   if [ "$LABLE" = "@tags" ]; 
   then
        echo "\"tags\" : [\"$VALUE\" ],\"parameters\": ["
   fi
   if [ "$LABLE" = "@description" ]; 
   then
        DESC_TX=$VALUE
   fi
   #echo "REQ URL :: $REQ_METHOD" 
   #echo "URL :: $URL"

   if [ "$LABLE" = "@parameters-end" ]; 
   then
        echo "],
                \"responses\": {
                \"200\": {
                    \"description\": \"An paged array of pets\",
                    \"headers\": {
                    \"x-next\": {
                        \"type\": \"string\",
                        \"description\": \"$DESC_TX\"
                    }
                    }
                },
                        \"default\": {
                    \"description\": \"unexpected error\",
                    \"schema\": {
                    \"\$ref\": \"#/definitions/Error\"
                    }
                }
                }
            },"; 
            DESC_TX=""
   fi
 

done
SWAGGER_JSON="$SWAGGER_JSON }"   # Path End here
SWAGGER_JSON="$SWAGGER_JSON $SWAGGER_END_BLOCK"
echo $SWAGGER_JSON
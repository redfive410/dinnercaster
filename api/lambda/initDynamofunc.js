console.log('Loading function');
var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
var fun = function(event, context)
{
 var params = {
    RequestItems: {
   "DinnerCaster": [
            {
                PutRequest: {
                    Item: {
                        "DinnerName": "Perogies"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                         "DinnerName": "Ramen"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "DinnerName": "Thai"
                    }
                }
            },
	    {
                PutRequest: {
                    Item: {
                        "DinnerName": "Tacos"
                    }
                }
            }
        ]
    }
}


    docClient.batchWrite(params,function(err,data){
        if (err) console.log(err);
        else console.log(data);
    });
};
exports.handler = fun;

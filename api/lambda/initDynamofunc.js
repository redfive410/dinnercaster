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
                        "DinnerName": "Perogies",
                        "SundayScore": 5,
                        "MondayScore": 1,
                        "TuesdayScore": 1,
                        "WednesdayScore": 1,
                        "ThursdayScore": 1,
                        "FridayScore": 1,
                        "SaturdayScore": 1,
                        "ColdWeatherScore": 4,
                        "HotWeatherScore": 1,
                        "GeneralScore": 2
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                         "DinnerName": "Ramen",
                         "SundayScore": 5,
                         "MondayScore": 1,
                         "TuesdayScore": 1,
                         "WednesdayScore": 1,
                         "ThursdayScore": 1,
                         "FridayScore": 1,
                         "SaturdayScore": 1,
                         "ColdWeatherScore": 4,
                         "HotWeatherScore": 1,
                         "GeneralScore": 2
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                         "DinnerName": "Thai",
                         "SundayScore": 5,
                         "MondayScore": 1,
                         "TuesdayScore": 1,
                         "WednesdayScore": 1,
                         "ThursdayScore": 1,
                         "FridayScore": 1,
                         "SaturdayScore": 1,
                         "ColdWeatherScore": 4,
                         "HotWeatherScore": 1,
                         "GeneralScore": 2
                    }
                }
            },
	    {
                PutRequest: {
                    Item: {
                         "DinnerName": "Tacos",
                         "SundayScore": 5,
                         "MondayScore": 1,
                         "TuesdayScore": 1,
                         "WednesdayScore": 1,
                         "ThursdayScore": 1,
                         "FridayScore": 1,
                         "SaturdayScore": 1,
                         "ColdWeatherScore": 4,
                         "HotWeatherScore": 1,
                         "GeneralScore": 2
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
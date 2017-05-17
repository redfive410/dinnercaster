console.log('Loading function');
var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context) => {
 var params = {
    RequestItems: {
    "dinnercaster-v1.0": [
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Tacos",
                      "scores": '{ "GeneralScore": 5, "TuesdayScore": 5, "WednesdayScore": 1, "ColdWeatherScore": 5, "HotWeatherScore": 5}'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Ramen",
                      "scores": '{ "GeneralScore": 4, "TuesdayScore": 3, "WednesdayScore": 3, "ColdWeatherScore": 5, "HotWeatherScore": 1}'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Pho",
                      "scores": '{ "GeneralScore": 4, "TuesdayScore": 2, "WednesdayScore": 3, "ColdWeatherScore": 5,"HotWeatherScore": 1}'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Brewskis",
                      "scores": '{ "GeneralScore": 2, "TuesdayScore": 4, "WednesdayScore": 2, "ColdWeatherScore": 2,"HotWeatherScore": 2}'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Rubios",
                      "scores": '{ "GeneralScore": 4, "TuesdayScore": 4, "WednesdayScore": 2, "ColdWeatherScore": 4, "HotWeatherScore": 4}'
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

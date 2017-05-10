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
                      "attributes": "{ \
                        'GeneralScore': 5, \
                        'TuesdayScore': 5, \
                        'ColdWeatherScore': 5, \
                        'HotWeatherScore': 5}"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Ramen",
                      "attributes": "{ \
                        'GeneralScore': 4, \
                        'TuesdayScore': 2, \
                        'ColdWeatherScore': 5, \
                        'HotWeatherScore': 1}"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                      "dinnername": "Pho",
                      "attributes": "{ \
                        'GeneralScore': 4, \
                        'TuesdayScore': 2,\
                        'ColdWeatherScore': 5,\
                        'HotWeatherScore': 1}"
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

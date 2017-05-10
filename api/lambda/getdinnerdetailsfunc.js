var doc = require('aws-sdk');
var dynamo = new doc.DynamoDB();

exports.handler = (event, context) => {
  var params = {
    TableName : "dinnercaster-v1.0",
    KeyConditionExpression: "dinnername = :dinnername",
    ExpressionAttributeValues: {":dinnername": {"S":event.dinnername}}
  };
  dynamo.query(params, function(err, data){
    if (err)
      console.log(err, err.stack); // an error occurred
    else {
      context.succeed(data);}
  });
};

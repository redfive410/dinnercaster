var doc = require('aws-sdk');
var dynamo = new doc.DynamoDB();

exports.handler = (event, context) => {
  condition = {};
  condition["dinnername"] = {
    ComparisonOperator: 'EQ',
    AttributeValueList:[{S: event.DinnerName}]
  }

  var getParams = {
    TableName:'dinnercaster-v1.0',
    KeyConditions: condition
  };

  dynamo.query(getParams, function(err, data){
    if (err)
      console.log(err, err.stack); // an error occurred
    else {
      context.succeed(data);}
  });
};

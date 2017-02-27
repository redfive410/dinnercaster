var doc = require('aws-sdk');
var dynamo = new doc.DynamoDB();
var fun = function(event, context) {
condition = {};
condition["SuperHero"] = {
ComparisonOperator: 'EQ',
AttributeValueList:[{S: event.superhero}]
}
var getParams = {
TableName:'DinnerCaster',
KeyConditions: condition
};
dynamo.query(getParams, function(err, data){
if (err) console.log(err, err.stack); // an error occurred
else {
context.succeed(data);}
});
};
exports.handler = fun;

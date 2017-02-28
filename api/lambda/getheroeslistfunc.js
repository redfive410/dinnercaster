var doc = require('aws-sdk');
var dynamo = new doc.DynamoDB();
var fun = function(event, context) {
var getParams = {
TableName:'DinnerCaster'
};
dynamo.scan(getParams, function(err, data){
if (err) console.log(err, err.stack); // an error occurred
else {
context.succeed(data);
}
});
};
exports.handler = fun;

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
                        "SuperHero": "Batman",
			"Villain1": "Joker",
			"Villain2": "Bane",
			"Villain3": "Ras Al Ghul",
			"MissionStatus": "In Progress",
			"SecretIdentity": "Bruce Wayne"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                         "SuperHero": "Superman",
			 "Villain1": "Doomsday",
			 "Villain2": "General Zod",
			 "Villain3": "Lex Luthor",
			 "MissionStatus": "In progress",
			 "SecretIdentity": "Clark Kent"
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "SuperHero": "The Winchester Brothers",
			"Villain1": "Vampires",
			"Villain2": "Ghosts",
			"Villain3": "Werewolves",
			"MissionStatus": "Complete",
			"SecretIdentity": "Sam and Dean"
                    }
                }
            },
	    {
                PutRequest: {
                    Item: {
                        "SuperHero": "Iron Man",
			"Villain1": "Apocalypse",
			"Villain2": "Doctor Doom",
			"Villain3": "LOki",
			"MissionStatus": "In progress",
			"SecretIdentity": "Tony Stark"
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

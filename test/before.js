var aws = require('aws-sdk')
aws.config.update({region:process.env.REGION})
var sqs = new aws.SQS // this must come after config :/

sqs.createQueue({QueueName:'testing-person-signup'}, function(err, data) {
    if (err) console.log(err, err.stack)
    else     console.log(data)
});

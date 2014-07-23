var aws = require('aws-sdk')
aws.config.update({region:process.env.REGION})
var sqs = new aws.SQS // this must come after config :/

function EventQueue(name) {
    this.name = name
}

function _getUrl(name, cb) {
    sqs.listQueues({QueueNamePrefix:''}, function(err, data) {
        if (err) {
            cb(err)
        }
        else {
            var found = false

            data.QueueUrls.some(function(url) {
                found = url.indexOf(name) != -1
                if (found) cb(null, url)
                return found
            })

            if (!found) cb(new Error('sqs url could not be found for name'))
        }
    })
}

    
EventQueue.prototype.push = function push(message, cb) {
    _getUrl(this.name, function(err, url) {        
        sqs.sendMessage({MessageBody:JSON.stringify(message), QueueUrl:url}, cb)
    })
}

// gets a message and deletes it
EventQueue.prototype.pop = function pop(cb) {
    _getUrl(this.name, function(err, url) {        
        sqs.receiveMessage({QueueUrl:url, AttributeNames:['All']}, function (err, data) {
            if (data.Messages && data.Messages.length > 0) {
                var message = data.Messages[0]
                  , body = JSON.parse(message.Body)
                  , handle = message.ReceiptHandle

                sqs.deleteMessage({QueueUrl:url, ReceiptHandle:handle}, function(err, data) {
                    if (err) cb(err)
                    cb(null, body)
                })
            }
            else {
                cb()
            }
        })
    })
}

module.exports = EventQueue

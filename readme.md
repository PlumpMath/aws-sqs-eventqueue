# EventQueue

An array like abstraction of an Amazon SQS Queue for queueing event messages.

## Install
    
    npm i aws-sqs-event

## Example

    var EventQueue = require('aws-sqs-event')
    // assumes you have an AWS SQS queue created called 'person-signup'
    var signupQueue = new EventQueue('person-signup')

    signupQueue.push({username:'Karl', id:1}, console.log)

Expects environment variable to set the AWS region (as well as `./aws/credentials`).

    REGION=us-east-1 node my-script-that-uses-this-library.js
    

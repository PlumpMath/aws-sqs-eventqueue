# EventQueue

An array like abstraction of an Amazon SQS Queue for queueing events.

An example might be: 

    var signupQueue = new EventQueue('person-signup')
    signupQueue.push({username:'Karl', id:1})

Expects environment variable to set the AWS region (as well as `./aws/credentials`).

    REGION=us-east-1 node my-script-that-uses-this-library.js
    

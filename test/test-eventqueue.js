var test = require('tape')
  , EventQueue = require('./../')

test('exists', function(t) {
    t.plan(1)
    t.ok(EventQueue, 'the EventQueue exists, you are sane')  
    t.end()
})

test('can push', function(t) {
    t.plan(1)
    var signupQueue = new EventQueue('testing-person-signup')
    signupQueue.push({person:'brian', id:1}, function(err, d) {
        if (err) t.fail(err)
        t.ok(d, 'can push an object to the queue')
        t.end()
    })    
})

test('can pop', function(t) {
    t.plan(1)
    var signupQueue = new EventQueue('testing-person-signup')
    signupQueue.pop(function(err, d) {
        if (err) t.fail(err)
        t.ok(d, 'popped the message')
        t.end()
    })
})


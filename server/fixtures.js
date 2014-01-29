// Fixture data
if (Posts.find().count() === 0) {
    
    var now = new Date().getTime();
    
    // create two users
    var daddyId = Meteor.users.insert({
        profile: {
            name: 'Big Daddy'
        }
    });
    var daddy = Meteor.users.findOne(daddyId);
    
    var sisterId = Meteor.users.insert({
        profile: {
            name: 'Little Sister'
        }
    });    
    var sister = Meteor.users.findOne(sisterId);
    
    var telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sister._id,
        author: sister.profile.name,
        url: 'http://sistergreif.com/introducing-telescope/',
        submitted: now - 7 * 3600 * 1000,
        commentsCount: 2,
        upvoters: [],
        votes: 0,
        positiveRepCount : 0,
        negativeRepCount : 0,
        category : "",
        description : ""


    });
    Comments.insert({
        postId: telescopeId,
        userId: daddy._id,
        author: daddy.profile.name,
        submitted: now - 5 * 3600 * 1000,
        body: 'Are the bank account details accurate?'
    });
    Comments.insert({
        postId: telescopeId,
        userId: sister._id,
        author: sister.profile.name,
        submitted: now - 3 * 3600 * 1000,
        body: 'Yep. Bank account details are up to date.'
    });

    Posts.insert({
        title: 'Meteor',
        userId: daddy._id,
        author: daddy.profile.name,
        url: 'http://meteor.com',
        submitted: now - 10 * 3600 * 1000,
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });
    Posts.insert({
        title: 'The Meteor Book',
        userId: daddy._id,
        author: daddy.profile.name,
        url: 'http://themeteorbook.com',
        submitted: now - 12 * 3600 * 1000,
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });

    for (var i = 0; i < 10; i++) {
        Posts.insert({
            title: 'Test post #' + i,
            author: sister.profile.name,
            userId: sister._id,
            url: 'http://google.com/?q=test-' + i,
            submitted: now - i * 3600 * 1000,
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
    }
}

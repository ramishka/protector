// Fixture data
if (Posts.find().count() === 0) {

    var now = new Date().getTime();

    //Create default categories

    //Monetary Aid Category
    var catMoaidId = Categories.insert({
        name : "Monetary Donation", uname : "MONETARY"
    });
    //Gift Category
    var catGiftId = Categories.insert({
        name : "Gift", uname : "GIFT"
    });
    //Volunteer Category
    var catVolunteerId = Categories.insert({
        name : "Volunteer Work", uname : "VOLUNTEER"
    });
    
    // Create two users
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
        title: 'Cancer patient needs to raise $500 for medication.',
        userId: sister._id,
        author: sister.profile.name,
        url: 'http://www.believe.in',
        submitted: now - 7 * 3600 * 1000,
        commentsCount: 2,
        upvoters: [],
        votes: 0,
        positiveRepCount : 0,
        negativeRepCount : 0,
        categoryId : "MONETARY",
        description : "This patient requires an injection course that consists of 10 injections. Each injection costs $50."
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

    /*for (var i = 0; i < 10; i++) {
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
    }*/
}

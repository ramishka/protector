Negativereps = new Meteor.Collection('negativereps');

Meteor.methods({

    addNegativeRep: function(negativeRepAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(negativeRepAttributes.postId);
        // ensure the user is logged in
        
        if (!user)
            throw new Meteor.Error(401, "You need to login to flag for a post.");
        
        if (!negativeRepAttributes.body)
            throw new Meteor.Error(422, 'Please write some content.');
        
        if (!post)
            throw new Meteor.Error(422, 'You must flag a post');
        
        negativeRep = _.extend(_.pick(negativeRepAttributes, 'postId', 'body'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });
        
        // update the post with the number of comments
        Posts.update(negativeRep.postId, {$inc: {negativeRepCount: 1}}); //commentsCount is a field in posts object
        
        // now create a notification, informing the user that there's been a rep added
        createNegativeRepNotification(negativeRep);

        // create the comment, save the id
        negativeRep._id = Positivereps.insert(negativeRep);

        return negativeRep._id;

    }
});

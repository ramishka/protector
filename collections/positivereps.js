Positivereps = new Meteor.Collection('positivereps');

Meteor.methods({

    addPositiveRep: function(positiveRepAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(positiveRepAttributes.postId);
        // ensure the user is logged in
        
        if (!user)
            throw new Meteor.Error(401, "You need to login to vouch for a post.");
        
        if (!positiveRepAttributes.body)
            throw new Meteor.Error(422, 'Please write some content.');
        
        if (!post)
            throw new Meteor.Error(422, 'You must vouch a post');
        
        positiveRep = _.extend(_.pick(positiveRepAttributes, 'postId', 'body'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });
        
        // update the post with the number of comments
        Posts.update(positiveRep.postId, {$inc: {positiveRepCount: 1}}); //commentsCount is a field in posts object
        
        // now create a notification, informing the user that there's been a rep added
        createPositiveRepNotification(positiveRep);

        // create the comment, save the id
        positiveRep._id = Positivereps.insert(positiveRep);

        return positiveRep._id;

    }
});

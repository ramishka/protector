Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument, //ownsDocument is defined in permissions.js
    remove: ownsDocument
});

Posts.deny({
    update: function(userId, post, fieldNames) { //fieldNames has all the names of fields that are being edited
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0); //returns any fields that are not url or title, if >0, deny is true which means denied
    }
});

Meteor.methods({

post: function(postAttributes) {
    var user = Meteor.user(),
        postWithSameLink = Posts.findOne({
            url: postAttributes.url
        });

    // ensure the user is logged in
    if (!user)
        throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the post has a title
    if (!postAttributes.title)
        throw new Meteor.Error(422, 'Please fill in a headline');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
        throw new Meteor.Error(302, //Error code
            'This link has already been posted', //Error reason
            postWithSameLink._id); //additional info
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
        userId: user._id,
        author: user.username,
        submitted: new Date().getTime(),
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });


    //Update DB,
    var postId = Posts.insert(post);

    //Return new post id
    return postId;
},

upvote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
        throw new Meteor.Error(401, "You need to login to upvote");
    
    //find all the posts with this id that this user hasn't yet voted for, and update them in this way”
    Posts.update({
        _id: postId,
        upvoters: {$ne: user._id }
    }, {
        $addToSet: { upvoters: user._id },
        $inc: { votes: 1 }
    });
}
});

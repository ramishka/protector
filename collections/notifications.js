
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	update: ownsDocument
});

createCommentNotification = function(comment) { //This will be called when a post is added - from posts.js
	var post = Posts.findOne(comment.postId);
	if (comment.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: comment._id,
			commenterName: comment.author,
			read: false
		});
	}
};

createPositiveRepNotification = function(positiveRep) { //This will be called when a positive rep is added - from posts.js
	var post = Posts.findOne(positiveRep.postId);
	if (positiveRep.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: positiveRep._id,
			commenterName: positiveRep.author,
			read: false
		});
	}
};

createNegativeRepNotification = function(negativeRep) { //This will be called when a positive rep is added - from posts.js
	var post = Posts.findOne(negativeRep.postId);
	if (negativeRep.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: negativeRep._id,
			commenterName: negativeRep.author,
			read: false
		});
	}
};

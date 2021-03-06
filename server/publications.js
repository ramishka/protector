Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('categories', function() {
  return Categories.find();
});

Meteor.publish('positivereps', function() {
  return Positivereps.find();
});

Meteor.publish('negativereps', function() {
  return Negativereps.find();
});
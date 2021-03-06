Template.postVouch.events({
	
	'submit form': function(e, template) {
		
		e.preventDefault();
		var $body = $(e.target).find('[name=body]');
		var positiveRep = {
			body: $body.val(),
			postId: template.data._id
		};

		Meteor.call('addPositiveRep', positiveRep, function(error, commentId) { //Maps to a function in comment.js - functionName, functionParams, callbackFunction
			if (error){
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
	},

	'click .btn-success': function(e) {
		
		Router.go('newPosts'); 
	}
});



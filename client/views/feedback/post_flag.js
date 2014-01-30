Template.postFlag.events({
	
	'submit form': function(e, template) {
		
		e.preventDefault();
		var $body = $(e.target).find('[name=body]');
		var negativeRep = {
			body: $body.val(),
			postId: template.data._id
		};

		Meteor.call('addNegativeRep', negativeRep, function(error, commentId) { //Maps to a function in comment.js - functionName, functionParams, callbackFunction
			if (error){
				throwError(error.reason);
			} else {
				$body.val('');
			}
		});
	},

	'click .btn-danger': function(e) {
		
		Router.go('newPosts'); 
	}
});



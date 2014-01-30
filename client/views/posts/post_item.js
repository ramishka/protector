Template.postItem.helpers({

	ownPost: function() {
		return this.userId == Meteor.userId();
	},

	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},

	shortDescription : function () {
   		var maxLengthInPostsList = 250; 

   		if ( !_.isUndefined(this.description) && !_.isNull( this.description) && this.description.length > maxLengthInPostsList ) {
   			return this.description.substring(0, maxLengthInPostsList) + '...';
   		} else {
   			return this.description;
   		}
	}, 

	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-primary upvotable'; //Conditionally return button CSS class
		} else {
			return 'disabled';
		}
	},

	positiveRepClass : function () {
		var userId = Meteor.userId();
		if (userId && !_.include(this.positiveReppers, userId)) {
			return 'btn-success positiveReppable'; //Conditionally return button CSS class
		} else {
			return 'disabled';
		}
	},

	negativeRepClass : function () {
		var userId = Meteor.userId();
		if (userId && !_.include(this.negativeReppers, userId)) {
			return 'btn-danger negativeReppable'; //Conditionally return button CSS class
		} else {
			return 'disabled';
		}
	},

	facebookShareLink : function () {
		
		return 'http://www.google.com';// + getPostPageURL();
	},

	twitterShareLink : function () {
		return 'http://www.google.com';
	},

	linkedinShareLink : function () {

		return 'http://www.linkedin.com/shareArticle?mini=true&url=' + Router.routes['postPage'].url({_id: this._id });

	},

	gplusShareLink : function () {
		return 'http://www.google.com';
	}

	
	
});


Template.postItem.events({
	'click .upvotable': function(e) { //invoke on upvokable button class
		e.preventDefault();
		Meteor.call('upvote', this._id);
	},

	'click .positiveReppable': function(e) { //invoke on upvokable button class
		//e.preventDefault();
		//Meteor.call('upvote', this._id);
		//Router.go('postVouch'); //do routing here
	},

	'click .negativeReppable': function(e) { //invoke on upvokable button class
		//e.preventDefault();
		//Meteor.call('upvote', this._id);
	}

});


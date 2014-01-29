Template.categories.helpers({
	categories: function() {
		//return [{name : 'test'}]
		return Categories.find();
	}	
});

Template.category.helpers({
	categoryPostPath: function() {
		return Router.routes.postPage.path({_id: this.postId});
	}
});

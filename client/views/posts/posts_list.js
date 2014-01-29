/*Template.postsList.helpers({ //Replaced by the data context in router.js
    posts: function() {
        
        return Posts.find({}, {sort: {submitted: -1 }}); //sort by submitted field, descending
    }
});
*/

Template.postsList.helpers({
	hasMorePosts: function(){
		this.posts.rewind();
		return Router.current().limit() == this.posts.fetch().length;
	}
});

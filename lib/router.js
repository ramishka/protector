Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [ Meteor.subscribe('notifications') ];

    }
});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    limit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.limit()};
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    data: function() {
        return {
            posts: Posts.find({}, this.findOptions()),
            nextPath: this.nextPath()
        };
    }
});

NewPostsListController = PostsListController.extend({
    sort: {submitted: -1, _id: -1}, //Sort by creteria -submitted date
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
    }
});

BestPostsListController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1}, //Sort by creteria - no of votes, then by date
    nextPath: function() {
        return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
    }
});

Router.map(function() {

    this.route('home', {
        path: '/',
        controller: NewPostsListController
    });

    this.route('newPosts', {
        path: '/new/:postsLimit?',
        controller: NewPostsListController
    });

    this.route('bestPosts', {
        path: '/best/:postsLimit?',
        controller: BestPostsListController
    });


    //What is shown for each /posts/xyz path
    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function() {
            return [
            Meteor.subscribe('singlePost', this.params._id), //subscribing here as this data is only needed for the post page
            Meteor.subscribe('comments', this.params._id)
            ];
        },
        data: function() { return Posts.findOne(this.params._id); }
    });

    this.route('postEdit', {
        path: '/posts/:_id/edit',
        waitOn: function() {
            return Meteor.subscribe('singlePost', this.params._id); //Single post data required here - so subscribe
        },
        data: function() { return Posts.findOne(this.params._id); }
    });

    this.route('postSubmit', {
        path: '/submit',
        disableProgress : true
    });

    this.route('postsList', {
        path: '/:postsLimit?',
        controller: PostsListController
    });    

    var requireLogin = function() {
        if (!Meteor.user()) { //Check if user is logged in
            if (Meteor.loggingIn())
                this.render(this.loadingTemplate);
            else
                this.render('accessDenied');
            this.stop();
        }
    }

    Router.before(requireLogin, { only: 'postSubmit' }); //allow access only for logged in users
    Router.before(function() { clearErrors() });

});
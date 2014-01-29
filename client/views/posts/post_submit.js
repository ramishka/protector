Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        //Create a new posts object
        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        }

        //Call server Method
        Meteor.call('post', post, function(error, id) { //This maps to a method in posts.js //methodName, dataParam, callback function
            if (error) {
                // display the error to the user
                throwError(error.reason);
                if ( error.error === 302 )
                    Router.go('postPage', { _id: error.details })
            } else {
                Router.go('postPage', { _id: id });
            }
        });


    }
});


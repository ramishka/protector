// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(message) {

    Errors.insert({ message: message })

}

clearErrors = function() {

    Errors.remove({ seen: true });

}

Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});

Template.error.rendered = function() {
	var error = this.data;
	Meteor.defer(function() { //Excute just after render - set seen to true 1ms after template has been rendered
		Errors.update(error._id, {$set: {seen: true}});
	});
};

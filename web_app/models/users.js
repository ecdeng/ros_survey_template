var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var userSchema = new Schema({
	name: String,
	location: String,
	created_at: Date,
	updated_at: Date
});

userSchema.pre('save', function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;

	if(!this.created_at)
		this.created_at = currentDate;

	next();

});

userSchema.methods.dudify = function(){
	this.name = this.name + '-due';

	return this.name;
}

var User = mongoose.model('User', userSchema);

module.exports = User;
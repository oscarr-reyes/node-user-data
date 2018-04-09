const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

var User = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	age: {type: Number, required: false},
	date: {type: Date, required: false},

});

User.statics.findByName = function(name, callback){
	return this.find({name: name}, callback);
};

User.methods.getFullName = function(){
	return `${this.firstName} ${this.lastName}`;
};

module.exports = mongoose.model("User", User);
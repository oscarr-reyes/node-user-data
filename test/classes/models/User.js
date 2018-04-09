const chai   = require("chai");
const sinon  = require("sinon");
const expect = chai.expect;

const User = require("./../../../classes/models/User");

const testData = {
	firstName: "User",
	lastName: "Random"
};

describe("User model testing", function(){
	it("should be invalid if \"firstName\" is not present", function(done){
		let user = new User({
			lastName: testData.lastName
		});

		user.validate(function(error){
			expect(error.errors.firstName).to.exist;
			done();
		});
	});

	it("should be invalid if \"lastName\" is not present", function(done){
		let user = new User({
			firstName: testData.firstName
		});

		user.validate(function(error){
			expect(error.errors.lastName).to.exist;
			done();
		});
	});

	it("should return full name", function(){
		let user = new User(testData);

		let expected = `${testData.firstName} ${testData.lastName}`;
		let actual   = user.getFullName();

		expect(actual).to.equal(expected);
	});

	it("should find users by name", function(done){
		let result = [{
			firstName: "User", 
			lastName: "Random",
			age: 0,
			date: Date.now()
		}];

		sinon.stub(User, "find").yields(null, result);

		User.findByName("User", function(err, users){
			expect(users).to.have.lengthOf(1);
			done();
		});
	});
});
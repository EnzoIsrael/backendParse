module.exports = function(Parse, app){

	this.register = function(req, res){

		var body = req.body;
		console.log(body);	

		var	user = new Parse.User();
			user.set("username", body.username);
			user.set("password", body.password);
			user.set("email", body.email);
			user.set("nombres", body.nombres);
			user.set("apellidos", body.apellidos);
			user.set("telefono", body.telefono);

		user.signUp(null, {
			success: function(user) {
		    	return res.send(user);
		  	},
		  	error: function(user, error) {
		    	return res.send(error.message);
		  }
		});
	}

	this.getUser = function(req, res){

		var User = Parse.Object.extend("User")
		, 	query   = new Parse.Query(User)
		,   id      = req.query.id;

		query.get(id, {
			success: function(user) {  
				return res.send(user);	    
			 },
			 error: function(user, error) {
			    return res.send(error.message);
			  }
		});

	}

	return this;
}	
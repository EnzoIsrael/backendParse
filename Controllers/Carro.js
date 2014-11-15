module.exports = function(Parse, app){

	this.getCarro = function(req, res){

		var Carro = Parse.Object.extend("Carro")
		, 	query   = new Parse.Query(Carro)
		,   id      = req.query.id;

		query.get(id, {
			success: function(carro) {  
				return res.send(carro);	    
			 },
			 error: function(carro, error) {
			    return res.send(error.message);
			  }
		});

	}

	return this;
}	
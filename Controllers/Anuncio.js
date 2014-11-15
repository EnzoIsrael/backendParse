module.exports = function(Parse, app){

	this.showAll = function(req, res){

		var skip  = parseInt(req.query.page)
		,	limit = 20;

		var Anuncio = Parse.Object.extend("Anuncio")
		,	query   = new Parse.Query(Anuncio)
		,   now     = new Date()
		,   skip    = (parseInt(req.query.page) - 1) * limit;
	
		query.greaterThanOrEqualTo("fecha_fin", now);
		query.descending("createdAt");
		query.skip(skip);
		query.limit(limit);

		query.find({
		  success: function(anuncios) {
		  	return res.send(anuncios);	    
		  },
		  error: function(error) {
		    return res.send(error.message);
		  }
		});

	}

	this.showOne = function(req, res){

		var Anuncio = Parse.Object.extend("Anuncio")
		, 	query   = new Parse.Query(Anuncio)
		, 	obj     = {}
		,   id      = req.query.id;

		query.get(id, {
		  success: function(anuncio) {  
			return res.send(anuncio);	    
		  },
		  error: function(anuncio, error) {
		    return res.send(error.message);
		  }
		});

	}

	this.showFeatured = function(req, res){
		var Anuncio = Parse.Object.extend("Anuncio")
		,	query   = new Parse.Query(Anuncio)
		,   limit   = req.query.limit
		,   now     = new Date();

		query.equalTo("destacado", true);
		query.greaterThanOrEqualTo("fecha_fin", now);
		query.descending("createdAt");
		query.limit(limit);

		query.find({
		  success: function(anuncios) {
		  	return res.send(anuncios);	    
		  },
		  error: function(error) {
		    return res.send(error.message);
		  }
		});
	}

	this.showMostVisited = function(req, res){
		var Anuncio = Parse.Object.extend("Anuncio")
		,	query   = new Parse.Query(Anuncio)
		,   limit   = req.query.limit
		,   now     = new Date();

		query.greaterThanOrEqualTo("fecha_fin", now);
		query.descending("visitas");
		query.limit(limit);
		query.include('carro');

		query.find({
		  success: function(anuncios) {
		  	return res.send(anuncios);	    
		  },
		  error: function(error) {
		    return res.send(error.message);
		  }
		});
	}

	function getNestedCar(obj){
		var car = {
			tipo:obj.get("tipo"),
			modelo:obj.get("modelo"),
			marca:obj.get("marca"), 
			motor:obj.get("motor"),
			kilometraje:obj.get("kilometraje"),
			rendimiento:obj.get("rendimiento"),
			year:obj.get("year"),
			combustible:obj.get("combustible")
		}
	}



	this.filtro_query = function(req, res){
		var params = req.query;

		var getParams = {
			departamento: params.departamento,
			marca: params.marca,
			modelo: params.modelo,
			combustible: params.combustible,
			tipo_auto: params.tipo_auto,
			precio_1: params.precio_1,
			precio_2: params.precio_2,
		}

		var Carro = Parse.Object.extend("Carro");
		var Anuncio = Parse.Object.extend("Anuncio");
		var innerQuery = new Parse.Query(Carro);
		
		if(getParams.marca !== ''){
			innerQuery.equalTo("marca", getParams.marca);
		}
		if(getParams.modelo !== ''){
			innerQuery.equalTo("modelo", getParams.modelo);
		}
		if(getParams.combustible !== ''){
			innerQuery.equalTo("combustible", parseInt(getParams.combustible));
		}
		if(getParams.tipo_auto !== ''){
			innerQuery.equalTo("tipo", getParams.tipo_auto);
		}
						

		var query = new Parse.Query(Anuncio)
		,   now     = new Date();
		
		query.matchesQuery("carro", innerQuery);
		query.greaterThanOrEqualTo("fecha_fin", now);
		
		if(getParams.departamento !== ''){
			query.equalTo("departamento", getParams.departamento);
		}
		if(getParams.precio_1 !== ''){
			query.greaterThanOrEqualTo("precio", parseInt(getParams.precio_1));
		}
		if(getParams.precio_2 !== ''){
			query.lessThanOrEqualTo("precio", parseInt(getParams.precio_2));
		}	
		
		query.find({
		  success: function(anuncios) {
		    return res.send(anuncios);
		  },
		  error: function(error) {
		    return res.send(error.message);
		  }
		});
	}

	return this;
}	
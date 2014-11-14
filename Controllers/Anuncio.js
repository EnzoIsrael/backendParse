module.exports = function(Parse, app){

	this.showAll = function(req, res){

		var skip = parseInt(page)

		var Anuncio = Parse.Object.extend("Anuncio")
		,	query   = new Parse.Query(Anuncio)
		,   now     = new Date().toISOString()
		,   skip    = (parseInt(req.query.page) - 1) * 20;
	
		query.lessThanOrEqualTo("fecha_fin", now);
		query.descending("createdAt");
		query.skip(skip);
		query.limit(20);

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
		,   now     = new Date().toISOString();

		query.equalTo("destacado", true);
		query.lessThanOrEqualTo("fecha_fin", now);
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
		,   now     = new Date().toISOString();

		query.lessThanOrEqualTo("fecha_fin", now);
		query.descending("visitas");
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



	this.filtro_query = function(req, res){
		var params = req.query;

		var getParams = {
			departamento: params.departamento,
			marca: params.marca,
			modelo: params.modelo,
			combustible: parseInt(params.combustible),
			tipo_auto: params.tipo_auto,
			precio_1: parseInt(params.precio_1),
			precio_2: parseInt(params.precio_2),
			precio_mode: parseInt(params.precio_mode)
		}

		var Carro = Parse.Object.extend("Carro");
		var Anuncio = Parse.Object.extend("Anuncio");
		var innerQuery = new Parse.Query(Carro);
		innerQuery.equalTo("marca",getParams.marca);
		var query = new Parse.Query(Anuncio);
		query.matchesQuery("carro", innerQuery);
		query.find({
		  success: function(anuncios) {
		    return res.send(anuncios);
		  }
		});

		/*
		var Anuncio = Parse.Object.extend("Anuncio")
		,	query   = new Parse.Query(Anuncio);

		query.include("Carro");
		if(getParams.departamento !== ''){
			query.equalTo("departamento", getParams.departamento);
		}

		/*
		if(getParams.precio_mode == 3){
			query.greaterThanOrEqualTo("precio", getParams.precio_1);
			query.lessThanOrEqualTo("precio", getParams.precio_2);		
		}else if(getParams.precio_mode == 2){
			query.greaterThanOrEqualTo("precio", getParams.precio_1);
		}else if(getParams.precio_mode == 1){
			query.lessThanOrEqualTo("precio", getParams.precio_1);
		}

		query.find({
		  success: function(anuncios) {


		 for(var i = 0; i < anuncios.length;i++ ){
		 	var carro = anuncios[i].get("Carro");
			carro.fetch({
			  success: function(post) {
			    console.log(carro.get("marca"));
			  }
		    });
		 } 	

		  	return res.send(anuncios);	  
		  },
		  error: function(error) {
		    return res.send(error.message);
		  }
		});
		*/


	}


	return this;
}	
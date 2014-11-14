var express = require('express')
, app = express()
, server   = require('http').createServer(app)
, path = require('path')
, logger = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, session = require('express-session')
, swig = require('swig')
, Parse = require('parse').Parse;


var config = require('./config.js')
(app, express,Parse ,swig, path, logger, cookieParser, bodyParser, session);


var  rutas = {
        register_User : '/api/user/register',

        mostrar_anuncios: '/api/anuncios/all',
        mostrar_anuncio:  '/api/anuncio',
        filtro_anuncios:  '/api/fil_anuncio',
        destac_anuncios:  '/api/destac_anuncios',
        mas_vist_anuncios:'/api/mas_vist_anuncios'

                
    }     


var User  = require('./Controllers/User')(Parse,app);
var Carro = require('./Controllers/Carro')(Parse,app);
var Anuncio = require('./Controllers/Anuncio')(Parse,app);

// Usuario
app.post(rutas.register_User, User.register);

// Anuncio
app.get(rutas.mostrar_anuncios, Anuncio.showAll);
app.get(rutas.mostrar_anuncio, Anuncio.showOne);
app.get(rutas.filtro_anuncios, Anuncio.filtro_query);
app.get(rutas.destac_anuncios, Anuncio.showFeatured);
app.get(rutas.mas_vist_anuncios, Anuncio.showMostVisited);

app.get("/", function(req, res){
    res.render('index', {});
});

 var port = 3000;
 app.listen(port, function() {
    console.log("Listening on " + port);
 });



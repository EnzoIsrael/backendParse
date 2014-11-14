module.exports = function(app, express, Parse, swig, path, logger, cookieParser, bodyParser, session){

  Parse.initialize("qDmQ9qFM32F0XF7tncvzhLiNVp9UzKy4pdlXcqjb", "NoTtizOS1RIdDg0OWyTkmtDcECWGZJtOMRIo5oGh");

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'views'));
  app.set('view cache', false);
  swig.setDefaults({ cache: false });

  app.use(logger('dev'));
  app.use(bodyParser({limit: '50mb'}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  //app.use(session({secret: 'omcat;lol_3131iPhone.'}));
  app.use(express.static(path.join(__dirname, 'public')));


}
	

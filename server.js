HOST = null; // localhost
PORT = 8008;


var fu = require("./fu"),
    sys = require("sys"),
    url = require("url"),
    qs = require("querystring");

var channel = new function( )
{
	var messages = [];

	this.appendMessage = function( message, sentTime )
	{
		sys.puts( "time : " + sentTime + " message : " + message );
		var m = {text : message,
			 timestamp : sentTime};

		messages.push( m );
	};

	this.getMessages = function( )
	{
		return messages;
	}
};

fu.listen(Number(process.env.PORT || PORT), HOST);

fu.get("/", fu.staticHandler("index.html"));
fu.get("/style.css", fu.staticHandler("style.css"));
fu.get("/jquery-1.2.6.min.js", fu.staticHandler("jquery-1.2.6.min.js"));
fu.get("/logger.js", fu.staticHandler("logger.js"));
fu.get("/receive.js", fu.staticHandler("receive.js"));

fu.get("/send", function (req, res) {
  var text = qs.parse(url.parse(req.url).query).text;
  var sentTime = qs.parse(url.parse(req.url).query)._; 

  res.simpleJSON( 200 , {});
  channel.appendMessage( text, sentTime );
});

/*fu.get( "/recv", function( req, res ){
		channel.query( function( messages ){
			res.simpleJSON( 200, { messages : messages } );
			} );
		} );*/

fu.get( "/recv", function( req, res ){
	var messages = channel.getMessages( );
	var matching = [];
	while( messages.length > 0 )
	{
		matching.push(messages.shift());
	}

	if( matching.length > 0 ) 
	{
		res.simpleJSON( 200, { messages : matching } );
	}
        else
	{
		res.simpleJSON( 200, { messages : [] } );
	}
} );

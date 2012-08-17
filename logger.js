if( true && !( "logger" in window ) )
{


	function sendMessage( msg )
	{
		$.ajax({
			 cache 		: false,
		 	 type  		: "Get",
			 url   		: "http://192.168.45.157:8008/send",
			 dataType 	: "json",
			 data 		: {text : msg},
			 error 		: function( )
			 {
			 },
			 success	: function( data )
			 {
			 	//$('#log').html("got it...");	
			 }
			});
	}




	window.logger = 
	{
		log : function( message )
      		{
			sendMessage( message );
      		}
	}

}



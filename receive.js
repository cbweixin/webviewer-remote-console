
	var util = 
	{
		  //pads n with zeros on the left,
		  //digits is minimum length of output
		  //zeroPad(3, 5); returns "005"
		  //zeroPad(2, 500); returns "500"
		  zeroPad: function (digits, n) {
		    n = n.toString();
		    while (n.length < digits) 
		      n = '0' + n;
		    return n;
		  },
		  
		  //it is almost 8 o'clock PM here
		  //timeString(new Date); returns "19:49"
		  timeString: function (date) {
		    var minutes = date.getMinutes().toString();
		    var hours = date.getHours().toString();
		    var seconds = date.getSeconds().toString();
		    var milliSeconds = date.getMilliseconds().toString();
		    return this.zeroPad(2, hours) + ":" + this.zeroPad(2, minutes) + ":" +  
			    + this.zeroPad(2,seconds) + ":" + this.zeroPad(3,milliSeconds);
		  }
	};

	function addMessage ( text, time ) 
	{
  		if (text === null)
    		return;

		if( time == null || isNaN( parseInt( time )) )
		{
			time = new Date();
		}
		else if( ( time instanceof Date ) === false )
		{
			time = new Date( parseInt( time ) );
		}
		var content = '<div class="messageContainer">' +
			      '   <div class="date">' + util.timeString( time ) + '</div>' + 
			      '   <div class="message">' + text + '</div>' + 
			      '</div>';

		$("#log").append( content );

		scrollDown();
	}

	function scrollDown( )
	{
		window.scrollBy(0, 100000000000);
		$('#log').focus();
	}

	function longPoll( data )
	{
		 if (data && data.messages) 
		 {
    			for (var i = 0; i < data.messages.length; i++) 
			{
      				var message = data.messages[i];
				var time = message.timestamp;
				var text = message.text;

				addMessage( text, time );

			}
		 }
	}

	function recieveMessage(  )
	{ 
		setInterval( function( )
		{ 
			$.ajax({ cache: false
	 	       		 , type: "GET"
	 	       		 , url: "/recv"
	 	       		 , dataType: "json"
	 	       		 //, data: { since: CONFIG.last_message_time, id: CONFIG.id }
	 	       		 , error: function () {
	 	       		     addMessage( "long poll error. trying again...", new Date());
	 	       		     //don't flood the servers on error, wait 10 seconds before retrying
	 	       		     setTimeout(longPoll, 10*1000);
	 	       		   }
	 	       		 , success: function (data) {
	 	       		     //if everything went well, begin another request immediately
	 	       		     //the server will take a long time to respond
	 	       		     //how long? well, it will wait until there is another message
	 	       		     //and then it will return it to us and close the connection.
	 	       		     //since the connection is closed when we get data, we longPoll again
	 	       		     longPoll( data );
	 	       		   }
	 	       		 });
	
		}
		,500  );
	
	}

$(document).ready(function() {
	recieveMessage();
	} );


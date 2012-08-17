webviewer-remote-console
========================

remote console for safari webviewer to log debug info<br/>

1. Why to use it<br/>
Somtimes when you develop a native app which call webviewer to open certain page or render some ui, you will find some weird thing. Same page works fine on the safari browser but failed on webviewr. You may hope you have some debug tool in this case, or at least, you hope you could log some useful information and output it. This is the case this remote console could be used. 

2. How to use it<br/>
	1). include 'logger.js' in your page. for ex,<br/>
	<SCRIPT TYPE="text/javascript" LANGUAGE="JavaScript" SRC="http://hostname:port/logger.js"></SCRIPT><br/>
	port number could be configured in 'fu.js'.<br/>
	2). using logger.log( message ) in your code.<br/>
	3). start log server.<br/>
	You may need to install nodejs. after clone this project:<br/>
	git clone git@github.com:cbweixin/webveiwer-remote-console. you suppose to have a folder 'webviewr-remote-console'. enter this folder then type in "node server.js". <br/>
	4). on any other device, go to 'http://hostname:port' then you would see the log being printing. <br/>


Here is a blog for how it works:
http://jsdom.wordpress.com/2012/08/15/remote-console-for-webviewer-by-nodejs/


	

# ::::::::::::::::::::
# Program.js ---------
# Run with Whole - Compile with Whole.pkg



program
( 
	cmdline, 
	infile,
	":program"
)

[displayJSON]
{ 
	for(var n in stack) if (n!="read")
		displayJSON += "js ["+n+"] " + JSON.stringify( stack[n] ) + "\\n";
	
} ,  program {

	js.config = {read:js.JSON};
	js.config.read( js.program.cmdline );
	console.log( js.program.displayJSON(js.config) );
	
	return '';
	
} = 	{ if (stack != "") {
	
		js.program.infile = {};
		js.JSON( loadFile(stack), js.program.infile );
		console.log( js.program.displayJSON(js.program.infile) );    	
	}
	
   return '';

} , {
	
try { 
	var done = "::/ done /::";

   if (commandLine.first=="::"){
	
		js.program.cmdline = commandLine.next;

		// calling stack in execute mode
		var execute = js.program.stack;
		// ---
		
   }else{
		if (commandLine.first=="" || commandLine.length<1) 
			throw("Missing Arguments");
		
		// calling stack in a loop
		for (var n in commandLine)
			js.program.stack = commandLine[n];
		// ---
		
   }
 }catch(ex){
	 
    console.log("::Exception::" + ex);
    console.log("usage :\n" + js.str.usage);
	
 }

//finally
return done; 

}, str [usage]	{
	
  program :: "{json: 'string', list: [1,2,3]}",
  program file.json 
	
},


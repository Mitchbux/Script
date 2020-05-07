# ::::::::::::::::::::
# Program.js ---------
# Run with Whole - Compile with Whole.pkg



program
( 
	cmdline, 
	infile,
	":program"
)

# :::::::
# My first Indexer Filter : 
# Display the content of an object, JSON stringified

[displayJSON]
{ 
	for(var n in stack) if (n!="read")
		displayJSON += "js ["+n+"] " + JSON.stringify( stack[n] ) + "\\n";
	
} ,  

# :::::::
# My first stack, name it Program
# calls [displayJSON] according to options from commandline

program {

	js.config = {read:js.JSON};
	js.config.read( js.program.cmdline );
	
	//# The json from commandline is now an object : js.config
	//# [displayJSON] creates the content
	//# console.log write to the command line
	console.log( 
		js.program.displayJSON(js.config) 
	);
	
	//# My program stack does not creates information.
	return '';
	
} = 	{ if (stack != "") {
	
		//# The data is read from a file :
		js.program.infile = {};
	
		//# js.JSON reads the data
		//# loadFile opens the file from command line options
		//# [displayJSON] creates the content
		//# console.log write to the command line
		js.JSON( 
			loadFile(stack),   // JSON data input
			js.program.infile  // JSON data destination
		);
	
		console.log( 
			js.program.displayJSON(
				js.program.infile // the file content is now an Object
			) 
		);    	
	}
	
   return '';

} , {

//# To perform read/write on the disk
//# Try reading from the commandline options
//# And safely display usage message
//# I would catch any Error from this main stack (at the root of everything no name)
try { 
	
	//# This is my quit message.
	//# the programs return the message when everything is done
	var done = "::/ done /::";

  //# commandLine holds every options
  //# seperated in the command line by [space] character
  //# the first option determine wether to read from command line
  if (commandLine.first=="::"){
	
		//# the second option (next) is our JSON data
		//# the third option (next again) would not be used
		js.program.cmdline = commandLine.next;

		// calling stack in execute mode
		var execute = js.program.stack;
		// ---

   //# Otherwise, the program would read filenames from commandLine options
   //# calling the program stack for every filename
   }else{
	   
	   	//# the first option may not be empty, 
	   	//# it may refer to a command line aith at least one option
	   	//# throwing an error redirects to usage message
		if (commandLine.first=="" || commandLine.length<1) 
			throw("Missing Arguments");
		
		// calling stack in a loop for every option
		for (var n in commandLine)
			js.program.stack = commandLine[n];
		// ---
		
   }

 //# The error catch is a procedure where the console display usage message
 //# The main stack also provides information about the error
 //# Any error thrown in the whole script would ends here
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


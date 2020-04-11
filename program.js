# ::::/ program.js /::::
# run : whole program.js
# cc : whole.pkg program.js

('program :: "{json: `data`, list: [1,2,3]}"', 'program file.json')
[usage]{usage+='    ' + this + '\\n';},

program(
	inline,
	infile,

# How to create indexer filters
# the parameter can be found @ stack
# the result is built with the value of the indexer

[displayJSON]{

    for(var k in stack)
	displayJSON+='['+k+'] {'+stack[k]+'}\\n';

},

# ----
# program stack
# ----

"once:"), program {

  js.data = {};
  js.JSON( js.program.inline, js.data );
  console.log( js.program.displayJSON(js.data) );
	return '';
}={

  js.program.infile = stack;
  js.data = {};
  js.JSON( loadFile(stack), js.data );
  console.log( js.program.displayJSON(js.data) );
	return '';

} ,

# -----
# main stack loop
# takes argument and run the stack
# -----

{try { var done = "::/ done /::";

   if (scriptArgs[2]=="::"){
	js.program.inline = scriptArgs[3];
	var execute = js.program.stack;
	return done;
   }else{
	if (scriptArgs[2]=="" || scriptArgs.length<3) throw("::/ Missing Argument /::");
	js.program.stack = scriptArgs[2];
	return done;
   }
 }catch(ex){
    console.log(ex);
    console.log("usage :\n" + js.usage());
    return done;
}},


("script")

# //Hello world in an Indexer Filter
# //the js keyword suggest to treat the code as JSON data

js [hello] {say: {hello:"world"} },

# //This stack only logs Hello JSON data onto the console
# //There is only one item in Hello JSON data : say
{
	for(var o in js.hello)
		console.log(o + ' => ' +      // o is the only object [say]
		JSON.stringify(js.hello[o])); // js.hello[say] is an object, use stringify to display it
	
	//# this stack creates a 'script end.' message information
	return this.join('') + " end.";
}





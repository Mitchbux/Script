("script")

# //Hello world in an Indexer Filter
# //the js keyword suggest to treat the code as JSON data

js [hello] {say: {hello:"world"} },

# //This stack only logs Hello JSON data onto the console
# //There is only one item in Hello JSON data : say
{
	for(var say in js.hello)
		console.log(say + ' => ' +      // ['say'] is the only object
		JSON.stringify(js.hello[say])); // js.hello[say] is an object, use stringify to display it
	
	//# this stack creates a 'script end.' message information
	return this.join('') + " end.";
}





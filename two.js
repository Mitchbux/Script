("script")

js [hello] {say:{hello:"world"}},

{
	for(var v in js.hello)
		console.log(v + ' => ' + JSON.stringify(js.hello[v]));
	return this.join("") + " end.";
}





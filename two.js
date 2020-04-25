("script")

hello world ( 'hello' 'world' 
	[greet] { greet += '::' + this; },
{ return this.greet(); }),

# main stack
{
	return this.join("") 
  + js.hello.world; 
},




# ::::::::::::::::::::
# Program.js ---------
# Run with Whole - Compile with Whole.pkg



program( cmdline, infile, folder,

[shrink]{try{
	
	var file = stack.after("Fle'").before("'").split(":"); 
	var filename = file.first;var token = file.next;var level = file.next;
	level++;
	
	}catch(ex){throw("Unable to shrink");}
}

[compress]
{ 
	if (stack.file && stack.file !="")
	if (stack.out && stack.out !="")
	{
		var data = loadfile(stack.file);
		var addto = "";try{
			addto = loadfile(stack.out);
		}catch(ex){
			js.write.to(stack.out, "");
		}
		var compressed = "Fle '"+stack.file+":"+data.length+":0' '"+atob(data)+"'";
		
		//compression in
		
		var multiCompressed = "Mlt(Fle'/ok.txt:125:0',Fle'/test.txt:63:0', '43:1')";
		
		js.write.append(stack.out, compressed);
		return "ok";
	}
	throw("Internal stack mess");
},

[unshrink]{try{
	var file = stack.after("Fle'").before("'").split(":"); 
	var filename = file.first; var token = file.next; var level = file.next;
	if (level>0){
		level--;
	}
	
	}catch(ex){	throw("Unable to un-Shrink.");}
}

[extract]
{
}

[decompress]
{
	if (stack.item && stack.item !="")
	if (stack.from && stack.from !="")
	{
		var data = loadfile(stack.from);
		var name = stack.item;

		//decompression
		
		var extracted = "";
		
		js.write.to(name, extracted);
		return "ok";
	}
	throw("Internal stack mess");
}

# ----
# program stack
# ----

"once:"), program 
{
	if (stack.trim().beginsWith("{"))
		js.config = {read:js.JSON};
	else{
		js.config = {read:js.WON};swon.node="js.config";
	}
	
	js.config.read( js.program.cmdline );
	
	if (!js.config.file)
		throw("Missing Argument");
	if (!js.config.addto)
		throw("Missing Argument");
	
	foreach(var n in js.config.file)
	{
      var cfg ={file:js.config.stack[n], out:js.config.addto}
	  compress(cfg);
	}
	return '';
	
}={
	if (stack !=""){
	js.program.infile = stack;
	var config = {file:stack, out:(js.program.folder +".czw"};
	compress(config);
	}
	return '';

} ,

# -----
# main stack loop
# takes argument and run the stack
# -----

{try { var done = "::/ done /::";

//Extended script

js._write = {
	to : function(name, code){ writeFile(name, code);},
	indexer : function(name, code){ writeFile(name, code);},
	append : function(name,data){ var tmp=loadFile(name); writeFile(name, tmp+data); }
};

String.prototype.trim = function(){};
String.prototype.startsWith = function(strWith){};
String.prototype.endsWith = function(strWith){};
String.prototype.contains = function(strContains, strEndsWith){};
Array.prototype.hasValueWith = function(strWith, strEndsWith){};
Array.prototype.hasValueEqualTo = function(strValue){};
Array.prototype.hasValueLessThan = function(strValue){};
Array.prototype.hasValueGreaterThan = function(strValue){};
Array.prototype.hasNode = function(strNode){};
Array.prototype.hasNodeWith = function(strNode, strWith, strEndsWith){};
Array.prototype.hasNodeEqualTo = function(strNode, strValue){};
Array.prototype.hasNodeLessThan = function(strNode, strValue){};
Array.prototype.hasNodeGreaterThan = function(strNode, strValue){};

//Extra Cloud
function Cloud(){};
function Session(){};
function User(){};
function Post(){};
function Profile(){};

// ::Cloud::

Cloud.prototype.Users = [];
Cloud.prototype.Sessions = [];
 
Cloud.prototype.connect = function(user, token){var session = new Session(); session.Cloud = this; 
	session.User = this.Users.lookup(user); 
	if(this.acceptToken(session.User, token)){ this.Sessions.push(session);} 
	else {throw{'Token Refused'};} return session; };

Cloud.prototype.acceptToken = function(sessionUser, token){return true;};

Cloud.prototype.Users.lookup = function(user){return user;};

Cloud.prototype.api = (session, stack) =>{
	session.TransactionStart(this, user);
	session.toArray();session.fromJSON(stack);
	session.TransactionEnd();};

Cloud.prototype.singleAPI = (user, token, stack) =>{var session = this.Connect(user, token);
	session.TransactionStart(this, user);
	session.toArray();session.fromJSON(stack);
	session.TransactionEnd();};

Cloud.prototype.newID () => {guid();};

Cloud.prototype.getNodeWith(name, code){
	if (this.data[name]) return this.data[name][code] ?? [];
	else return [];
}

Cloud.prototype.setNodeWith(name, code, stack){
	if (!this.data[name]) this.data[name] = [];
	this.data[name][code] = stack;
}

Cloud.prototype.disconnect = function(session, user) {
	delete session.User;
	delete session.Profile;
	delete session.Post;
	delete session.Cloud;
	this.Sessions.remove(session);};


// ::Session::

Session.prototype.transactionStart = function(cloud, user){};
Session.prototype.transactionEnd = function(){
	if(this.Cloud.hasNode("action")){
		Cloud[User.action](this, User.stack);
	}
	if(this.User.hasNode("action")){
		User[User.action](this, User.stack);
	}
	if(this.Profile.hasNode("action")){
		Profile[Profile.action](this, Profile.stack);
	}
	if(this.Post.hasNode("action")){
		Post[Post.action](this, Post.stack);
	}
};
Session.prototype.User = [];
Session.prototype.Profile = [];
Session.prototype.Post = [];
Session.prototype.Cloud = [];
Session.prototype.toArray = function(){ var ids=[];
	if (this.User.hasNode('id'))
	if (this.User.Profiles.length==0)
	for(var n in ids = this.Cloud.getNodeWith('ProfileUserIDS',this.User.id);)
		this.User.Profiles.add(this.Cloud.getNodeWith('Profiles',ids[n]));
	
	if (this.Profile.hasNode('id'))
	if (this.Profile.Posts.length==0)
	for(var n in ids = this.Cloud.getNodeWith('PostProfileIDS',this.Profile.id);)
		this.Profile.Posts.add(this.Cloud.getNodeWith('Posts',ids[n]));
};
Session.prototype.fromJSON = function(stack){
	if (stack.trim().beginsWith("{"))js.config = {read:js.JSON};
	else{js.config = {read:js.WON};swon.node="js.config";}
	
	js.config.read(stack);
	if(js.config.hasNode("cloud")){this.Cloud.action=js.config.cloud.action;this.Cloud.stack=js.config.cloud.stack;};
	if(js.config.hasNode("user")){this.User.action=js.config.user.action;this.User.stack=js.config.user.stack;};
	if(js.config.hasNode("profile")){this.Profile.action=js.config.profile.action;this.Profile.stack=js.config.profile.stack;};
	if(js.config.hasNode("post")){this.Post.action=js.config.post.action;this.Post.stack=js.config.post.stack;};
};

// ::User::

User.prototype.create = function(session, stack){this.session = session; 
	this.id = session.Cloud.newID(); session.Cloud.setNodeWith('Users', this.id, stack); };
User.prototype.reload = function(session, stack){this.session = session; 
	session.User=session.Cloud.getNodeWith('Users', stack.id);};
User.prototype.update = function(session, stack){this.session = session; 
	session.Cloud.setNodeWith('Users', this.id, stack); };
User.prototype.Profiles = [];

// ::Profile::

Profile.prototype.create = function(session, stack){this.session = session; 
	this.id = session.Cloud.newID(); 
	session.Cloud.setNodeWith('Profiles', this.id, stack); 
	var ids = session.Cloud.getNodeWith('ProfileUserIDS', session.User.id); ids.push(this.id);
	session.Cloud.setNodeWith('ProfileUserIDS', session.User.id, ids); };
Profile.prototype.reload = function(session, stack){this.session = session; 
	session.Profile=session.Cloud.getNodeWith('Profiles', stack.id);};
Profile.prototype.update = function(session, stack){this.session = session; 
	session.Cloud.setNodeWith('Profiles', this.id, stack); };
Profile.prototype.Posts = [];

// ::Post::

Post.prototype.create = function(session, stack){this.session = session; this.id = session.Cloud.newID(); 
	session.Cloud.setNodeWith('Post', this.id, stack); 
	var ids = session.Cloud.getNodeWith('PostProfileIDS', session.Profile.id); ids.push(this.id);
	session.Cloud.setNodeWith('PostProfileIDS', session.Profile.id, ids); };
Post.prototype.reload = function(session, stack){this.session = session; 
	session.Post=session.Cloud.getNodeWith('Post', stack.id);};
Post.prototype.update = function(session, stack){this.session = session; 
	session.Cloud.setNodeWith('Post', this.id, stack); };
Post.prototype.Content = [];

//Extra compat
String.prototype.WQL = function(session){return {};};
String.prototype.SQLToWQL = function(session){return {};};

   if (commandLine.first=="::"){
		js.program.cmdline = commandLine.next;

		// calling stack in execute mode
		var execute = js.program.stack;
		// ---
		
   }else{
		//if (commandLine.first=="" || commandLine.length<1) 
			throw("Missing Arguments");
		
		//js.program.folder = os.workingDir();
		// calling stack in a loop
		//for (var n in commandLine)
		//	js.program.stack = commandLine[n];
		// ---
		
   }
 }catch(ex){
    console.log("::Exception::" + ex);
    console.log("usage :\n" + js.str.usage);
	
}return done; },

# -----
# Usage 
# -----

str [usage] {
    czw :: "{file: ['file.ext', 'file2.ext'], addto: 'archive.czw'}" 
	czw :: "file 'file.ext' 'file2.ext', addto 'archive.czw'"
	  >> add file.ext and file2.ext to archive.czw

    czw :: "{from: 'archive.czw'}" (TODO)
	czw :: "from 'archive.czw'" (TODO)
	
	  >> [TODO] Decompress whole archive.czw [/TODO]

    czw :: "{item: ['file.ext', 'file2.ext'], from: 'archive.czw'}" (TODO)
	czw :: "item 'file.ext' 'file2.ext', from 'archive.czw'" (TODO)
	
	  >> [TODO] Extract file.ext and file2.ext from archive.czw [/TODO]
	  
    czw file.ext file2.ext (TODO)
	
      >> [TODO] Create a new folder.czw with both files [/TODO]

    czw archive.czw (TODO)
	
      >> [TODO] Decompress whole archive.czw to current working directory [/TODO]


	  
	czw :API: "MyCloud api post [hasNodeLessThan] {price '1000'}" (TODO)
	czw :WQL: "MyCloud.post where(price < '1000')" (TODO)
	czw :SQL: "select * from post where post.price < 1000" (TODO)
	
	  >> [TODO] Retrieve posts from 'MyCloud' where price < '1000' [/TODO]

	czw :API: "MyCloud connect 'user' 'token', MyCloud api post( [reload] {id '1'},	[update] {location 'seattle'} )" (TODO)
	czw :WQL: "MyCloud.session('user' 'token') MyCloud.post where(id='1') location 'seattle'" (TODO)
	czw :SQL: "connect MyCloud; user 'user'; update post.location from post where post.id='1' values ('seattle');" (TODO)
	
	  >> [TODO] Update post ['1'] from 'MyCloud' to modify location according to 'seattle'

}


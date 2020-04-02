// from bellard.org/quickjs
import {loadFile} from "std"
import {open} from "std"
var writeFile = function(filename,content){var file=open(filename,"w");file.puts(content);file.close();};

// from nodejs :
//var fs = require('fs');
//var loadFile = function(filename){return fs.readFileSync(filename, "utf8");};
//var writeFile = function(filename,content){return fs.writeFileSync(filename,content,"utf8");};

//filesystem module
Object.defineProperty(Array.prototype,"load",  {
get: function(){if (!this._files)this._files=[];
this._files.add = function(filename){this.push( loadFile(filename) );};
 return this._files;},
set: function(stack){this._files=stack;}});
//filewrite module
Object.defineProperty(Array.prototype,"file", {
get: function(){if (!this._files)this._files=[];
this._files.indexer = function(name,code){writeFile(name,code);}; return this._files;},
set: function(stack){this._files=stack;}});
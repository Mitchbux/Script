//# import based on bellard.org/quickjs -- comment for Node JS
import {loadFile} from "std"
import {open} from "std"
var writeFile = function(filename,content){var file=open(filename,"w");file.puts(content);file.close();};

//# uncomment for Node JS
//var fs = require('fs');
//var loadFile = function(filename){return fs.readFileSync(filename, "utf8");};
//var writeFile = function(filename,content){return fs.writeFileSync(filename,content,"utf8");};

//globals
var js=[];

//Array extension
Array.prototype.index = 0;
Array.prototype.forEach = function(stack, body){for(var key=0;key<this.length;key++) body.apply(this[key], [stack]);}
Array.prototype.add = Array.prototype.push;
Object.defineProperty(Array.prototype,"first",{get: function(){return this[this.index=0];}, set: function(v){this[this.index=0] = v;}});
Object.defineProperty(Array.prototype,"next",{get: function(){return this[this.index<this.length?++this.index:this.length];}, set: function(v){this[this.index<this.length?++this.index:this.length]=v;}});
Object.defineProperty(Array.prototype, "theFirst",{get: function(){return (this.index==0);}});

Array.prototype.plus = function(){if (!this[-1]){this[-1] = [,[]];}else this.pus++;return this[this.mus][this.pus]=[];}
Array.prototype.minus = function(){if (!this[-1]){this[-1] = [,[]];}else this.mus--; this.pus=0;return this[this.mus]=[];}
Array.prototype.mus = -1;Array.prototype.pus = 1;

//default
Array.prototype.getter = function(){return this.join("");};
Array.prototype.toString = function(){return this.getter();}
Array.prototype.setter = function(stack){return this.value.getter(stack);};
Array.prototype.indexer = function(n,b){var e ="this.{n} = function(v){var {n} = ''; this.forEach(v, function(stack){" +b + "}); return {n}; };"; eval(e.replace("{n}",n)); };
Object.defineProperty(Array.prototype,"stack",{get: function(){ return this.getter();},set: function(stack){ return this.setter(stack);}});
Array.prototype.module=function(name, stack){ eval(`Object.defineProperty(Array.prototype,name,  {get: function(){if (!this._${name})this._${name}=[];${stack} return this._${name};},set: function(stack){if (!this._${name})this._${name}=stack;}});`);};
Array.prototype.module.indexer = function(name,code){this(name,"this._"+name+".indexer =function(name, code){this[name]=`"+code.replace("\\n", "\\\\n")+"`;};");};
Array.prototype.loader=function(name, stack){ eval(`Object.defineProperty(Array.prototype,name,  {get: function(){if (!this._${name})this._${name}=[];${stack} return this._${name};},set: function(stack){if (!this._${name})this._${name}=stack;}});`);};
Array.prototype.loader.indexer = function(name,stack){this(name, "this._"+name+".add = function(added){ this.push(`"+stack+"`); };");};



//parse XML  ::TODO::
//var fromXML = {tag: function(obj, name){return obj[name] = [];},attribute: function(obj, name, value){return obj["@"+name]=[];},content: function(obj, txt){obj.add(txt); return obj;}};
//Array.prototype.XML = function(xmlstr){}

//parse Wise Object Notation
var swon = {text:"", char:0, stack:"", until:function(a,b){var level=0; var result = "";
for(this.char++;this.char<this.text.length;this.char++){  if ((this.here+"")==b){if (level<=0) return result; else level--;}  result += this.here; if ((this.here+"")==a){level++;}}},
name: "", root: "js", node: "js", exist:{}, rootStack:["js"]};
Object.defineProperty(swon, "here", {get:function(){return this.text[this.char];}});

var bwon= [function(){swon.rootStack.push(swon.root); swon.root = swon.node;  return "";}, function(){swon.root = swon.rootStack.pop(); return "";}, function(){swon.node = swon.root; return "";}
, function(){var code = swon.until("{","}");code="function(stack){"+code+"}";if (swon.name=="="){return swon.node+".setter="+code+";";}else{return swon.node +".getter="+code+";"}}, function(){return "";}
, function(){var idx = swon.until("", "]"); var skip = swon.until("","{"); var cde = swon.until("{","}"); return swon.node + ".indexer("+doubleq(idx) + "," + doubleq(cde.replace("\n", "\\n"))+");"; }, function(){return "";}
, function(){var result = swon.node +".cell="+swon.node+".plus();"; swon.node += ".cell"; return result;}, function(){swon.stack = "value"; return "";}
, function(){var result = swon.node +".cell="+swon.node+".minus();"; swon.node += ".cell"; return result;}, function(){return "";}
, function(){var data = quote(swon.until("", "'")); return swon.node + ".add(" + data + ");";}, function(){var data = doubleq(swon.until("", "\"")); return swon.node + ".add(" + data + ");";}];
bwon.token= "(),{}[]+=-*'\"#";bwon.breaker= "(),{}[]+=-*'\"# \t\r\n";
bwon[-1] = function(){if (swon.stack=="")return ""; swon.name=swon.stack;if (swon.exist[swon.node + "." + swon.name] || swon.name=="module" || swon.name=="loader"){ swon.node += "."+swon.name; return ""; }else {swon.node += "."+swon.name; swon.exist[swon.node]={};return swon.node+"=[];";} };
var comment = bwon.token.indexOf("#");var quote = function(str){return "'" + str +"'";};var doubleq = function(str){return "\"" + str +"\"";};bwon[comment] = function(){var skip=swon.until("", "\n"); return "";};

Array.prototype.WON = function(wonstr){swon.text=wonstr; var result="";
for(swon.char=0;swon.char<swon.text.length;swon.char++){
  if (bwon.breaker.indexOf(swon.here)>-1){
   if (swon.stack.length>0){result +=bwon[-1]();+"\n"}
    swon.stack=""; result+=bwon[bwon.token.indexOf(swon.here)]();
    }else swon.stack += swon.here;} eval(result);};

//Parse Javascript Object Notatation
Array.prototype.JSON = function(jsonstr, obj){if (!obj)obj=this; eval("var json="+jsonstr+"; for(var k in json)obj[k]=json[k];"); };

//String extension
String.prototype.after =function (a){var s=this; if (s.indexOf(a)>-1)return s.substring(s.indexOf(a)+a.length);else return empty;}
String.prototype.before = function (b){var s=this; if (s.indexOf(b)>-1) return s.substring(0,s.indexOf(b));else return empty;}
String.prototype.replace = function(a,b){return this.split(a).join(b);}



js.module("load",
  "this._load.add = function(filename){this.push( loadFile(filename) );};"
);

js.module("write",
  "this._write.to = this._write.indexer = function(name, code){ writeFile(name, code);};"
);

js.module("str",
  "this._str.indexer =function(name, code){this[name]=code;};"
);

js.module("html",
"this._html.indexer = function(name, code){this[name]=code;};this._html.getter = function(){return `<!DOCTYPE html><style>${(this['css'] ? this.css : '')}</style><body><canvas/>${(this['body'] ? this.body : '') }</body><script>${( this['script'] ? this.script : '')}</script>\n`;};"
);

//todo : htmlscreenshot module : from video, html etc... 
//todo : using local http server
//webgl first attempt to render fragment shader
//Object.defineProperty(Array.prototype,"webgl",  {
//get: function(){if (!this._strings)this._strings=[];
//this._strings.indexer = function(name, code){this[name]=code;};
//this._strings.getter = function(){return loadFile("webgl.hed.js").replace("{fragment}", this.fragment).replace("{vertex}", this.vertex) +
//  loadFile("webgl.run.js");}; return this._strings;},
//set: function(stack){if (!this._strings)return; this._strings.body+=stack;}});

//var scriptArgs = process.argv.slice(1);

js.WON(loadFile(scriptArgs[1]));
console.log(js.toString());


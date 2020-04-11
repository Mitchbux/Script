# module xml example

module [xml] {<${name}>${code}</${name}>},

# Create XML Nodes --

root xml
[head] {title}
[node] {text} # comment/uncomment to see the result
[unused] {nc},

# loader json example

hello loader [json]{${js.hello.JSON(loadFile(added))}},

hello json ("file.json"),


# -- and stack mash up everything

root xml {return js.hello.world + (this.node? this.node: "node-not-found"); },

str [toc] {JSON::XML::},


## Global getter

{return js.str.toc + js.root.xml; }

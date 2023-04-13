const ansi = require("m.easyansi")
const fs = require("fs")
const prompt = require("prompt-sync")({ sigint: true });
 const shell = require('shelljs')

//console.log(file)
function stst(fn) {
  ttt = new Function('return (' + fn +")")()
  //console.log(typeof fn)
  if(typeof ttt == "boolean"){
     return new Function('return (' + fn +")")();
  }
 
};

function runfil(name){
  shell.exec('node '+name+".js")
}
var acceptedwords = [
  "lovar",
  "senum",
  "sedat",
  "sestr",
  "selis",
  "sefcc",
  "sefccfv",
  "stpri",
  "instpri",
  "nvpri",
  "innvpri",
  "nnadd",
  "nnvadd",
  "nnsub",
  "nnvsub",
  "nnsin",
  "nnvsin",
  "nnmul",
  "nnvmul",
  "nndiv",
  "nnvdiv",
  "nnexp",
  "nnset",
  "nnvset",
  "nnfloor",
  "nsadd",
  "nsrep",
  "nsvrep",
  "nladd",
  "nsvadd",
  "nlvadd",
  "nssub",
  "vcrpos",
  "nncurx",
  "nncury",
  "ntolin",
  "curhom",
  "fgcol",
  "bgcol",
  "rscol",
  "fgvcol",
  "bgvcol",
  "nnfgcol",
  "nnbgcol",
  "ndgtms",
  "ndgtmn",
  "ndgtsc",
  "ndgthr",
  "gtinp",
  "nvgtinp",
  "import",
  "if",
  "#"
]
var variables = {};
var loaded = "";
var commands;
function bypass(jsn){
  commands.push(jsn)
}
var customcommands = {
  
}

commands = {
  "#":function(){}, //comment
  "lovar": function(va){loaded = va},
  "stpri": function(str){console.log(str)},
  "instpri": function(str){process.stdout.write(str)},
  "nvpri": function(){console.log(variables[loaded])},
  "innvpri": function(){process.stdout.write(variables[loaded].toString())},
  "senum": function(variable){variables[variable] = 0},
  "nnfloor": function(){variables[loaded] = Math.floor(variables[loaded])},
  "sestr": function(variable){variables[variable] = ""},
  "sedat": function(variable){variables[variable] = new Date()},
  "selis": function(variable){variables[variable] = []},
  "sefcc": function(variable,code){variables[variable] = String.fromCharCode(code)},
  "sefccfv": function(variable,variable2){variables[variable] = String.fromCharCode(parseInt(variables[variable2]))},
  "ndgtms": function(variable){variables[variable] = variables[loaded].getTime()},
  "ndgtsc": function(variable){variables[variable] = variables[loaded].getSeconds()},
  "ndgtmn": function(variable){variables[variable] = variables[loaded].getMinutes()},
  "ndgthr": function(variable){variables[variable] = variables[loaded].getHours()},
  "nnadd": function(num = 1){variables[loaded] += parseInt(num)},
  "nnvadd": function(variable){variables[loaded] += variables[variable]},
  "nnsub": function(num = 1){variables[loaded] -= parseInt(num)},
  "nnvsub": function(v){variables[loaded] -= variables[v]},
  "nnmul": function(num = 2){variables[loaded] *= parseInt(num)},
  "nnvmul": function(variable){variables[loaded] *= variables[variable]},
  "nndiv": function(num = 2){variables[loaded] /= parseInt(num)},
  "nnvdiv": function(variable){variables[loaded] /= variables[variable]},
  "nnexp": function(num = 2){variables[loaded] **= parseInt(num)},
  "nnset": function(num = 0){variables[loaded] = parseInt(num)},
  "nnvset": function(v){variables[loaded] = parseInt(variables[v])},
  "nnvsin": function(v){variables[loaded] = Math.sin(variables[v])},
  "nnsin": function(v){variables[loaded] = Math.sin(parseInt(v))},
  "nsadd": function(str){variables[loaded] += str},
  "nsrep": function(newvar,times){variables[newvar] += variables[loaded].repeat(parseInt(times))},
  "nsvrep": function(newvar,times){variables[newvar] += variables[loaded].repeat(parseInt(variables[times]))},
  "nladd": function(str){variables[loaded].push(str)},
  "nsvadd": function(str){variables[loaded] += variables[str]},
  "nlvadd": function(str){variables[loaded].push(variables[str])},
  "nssub": function(num){variables[loaded] = variables[loaded].slice(0,num);},
  "ntolin": function(num){return "toline"+num;},
  "curhom": function(){ansi.cursorHome();},
  "nncurx": function(){ansi.cursorRight(variables[loaded]);},
  "nncury": function(){ansi.cursorDown(variables[loaded]);},
  "vcrpos": function(x,y){ansi.cursorTo(variables[x], variables[y]);},
  "fgcol": function(col){
    process.stdout.write(ansi.colorMode16(true,parseInt(col)))
  },
  "bgcol": function(col){
    process.stdout.write(ansi.colorMode16(false,parseInt(col)))
  },
  "fgvcol": function(v){
    process.stdout.write(ansi.colorMode16(true,variables[v]))
  },
  "bgvcol": function(v){
    process.stdout.write(ansi.colorMode16(false,variables[v]))
  },
  "nnfgcol": function(){
    process.stdout.write(ansi.colorMode16(true,variables[loaded]))
  },
  "nnbgcol": function(){
    process.stdout.write(ansi.colorMode16(false,variables[loaded]))
  },
  "import": function(filename){
    var filen = JSON.parse(fs.readFileSync(filename+"/"+filename+".json", 'utf8'));
    for(var i = 0; i < filen["cmdlist"].length; i++){
      var name = filen["cmdlist"][i]
      acceptedwords.push(name)
      commands[name] = runfil.bind(null, filename+"/"+name) //i could have made this way better
    }
  },
   "rscol": function(){process.stdout.write(ansi.resetModules());},
  "gtinp": function(text, v){variables[v] = prompt(text)},
  "nvgtinp": function(text){variables[loaded] = prompt(text)},
  "if": function(v,bool,to){
    if(stst(variables[v]+bool)){return "toline"+to;}
  }
}

var modnames = []
function cmdn(fullcommand){
  return fullcommand.split(" ")[0];
}
function cmda(fullcommand){
if(fullcommand.split(cmdn(fullcommand)+" ")[1] == undefined){
  return [];
}
  return fullcommand.split(cmdn(fullcommand)+" ")[1].split(",");
}

if(process.argv.length > 2){
  var file = fs.readFileSync(process.argv[2], "utf8").split("\n");
for(var i = 0; i < file.length; i++){
  if(acceptedwords.includes(cmdn(file[i]))){
    try{
    //console.log(customcommands)
      tv = commands[cmdn(file[i])](...cmda(file[i]));
      if(tv != undefined){i = parseInt(tv.split("toline")[1])-2;}
    }catch(e){console.log("** INTERNAL ERROR AT LINE "+(i+1) + ": "+e);}
  }else{
    console.log("** UNKNOWN COMMAND AT LINE "+(i+1));
    continue
  }
}
}else{
  console.log("welcome to nbasc shell")
  console.log("type .endprom to stop the program")
  var command = ""
  while(command != ".endprom"){
    command = prompt(">")
    try{
    commands[cmdn(command)](...cmda(command));
    }catch(e){
      console.log("syntax err")
    }
  }
}

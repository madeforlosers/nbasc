const ansi = require("m.easyansi"); //for colors and cursor pos
const fs = require("fs"); //for reading file
const prompt = require("prompt-sync")({ sigint: true }); //for gtinp, nvgtinp, and the shell
 const shell = require('shelljs'); //for modules
var ignoreInternalError = false;
var ignoreCommandError = false;

function stst(fn) { //for the "if" command, since i'm lazy
  ttt = new Function('return (' + fn +")")()
  if(typeof ttt == "boolean"){
     return new Function('return (' + fn +")")();
  }
};
function randomint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function runfil(name){ //for the "import" command
  shell.exec('node '+name+".js")
}
var acceptedwords = [ //all the accepted commands. I don't know why I have this here, but if I remove it it breaks everything.
  "iiner", //ignore internal errors
  "iucer", //ignore unknown command errors
  "lovar", //load variable
  "senum", //set number
  "sedat", //set date
  "sestr", //set string
  "selis", //set list
  "sefcc", //set from char code
  "sernd", //set random number
  "sefccfv", //set from char code from variable
  "stpri", //string print
  "instpri", //inline string print
  "nvpri", //next variable print
  "innvpri", //inline next variable print
  "nnadd", //next number add
  "nnvadd", //next number variable add
  "nnsub", //next number subtract
  "nnvsub", //next number variable subtract
  "nnsin", //next number sine wave
  "nnvsin", //next number variable sine wave
  "nnmul", //next number multiply
  "nnvmul", //next number variable multiply
  "nndiv", //next number divide
  "nnvdiv", //next number variable divide
  "nnexp", //next number exponent
  "nnset", //next number set
  "nnvset", //next number variable set
  "nnfloor", //next number floor
  "nsadd", //next string add
  "nsrep", //next string repeat
  "nsvrep", //next string variable repeat
  "nladd", //next list add
  "nsvadd", //next string variable add
  "nlvadd", //next list variable add
  "nssub", //next string subtract
  "vcrpos", //variable cursor position
  "nncurx", //next number cursor x
  "nncury", //next number cusror y
  "ntolin", //number to line
  "curhom", //cursor home
  "fgcol", //foreground color
  "bgcol", //background color
  "rscol", //reset color
  "fgvcol", //foreground variable color
  "bgvcol", //background variable color
  "nnfgcol", //next number foreground color
  "nnbgcol", //next number background color
  "ndgtms", //next date get milliseconds
  "ndgtmn", //next date get minute
  "ndgtsc", //next date get second
  "ndgthr", //next date get hour
  "gtinp", //get input
  "nvgtinp", //next variable get input
  "ifhigher", //if higher
  "iflower", //if higher
  "import", //import
  "if",
  "#", //comment
  "", //nothing
]
var variables = {}; //variables list
var loaded = "";
var commands;
commands = {
  "":function(){}, //nothing
  "#":function(){}, //comment
  "iiner": function(){ignoreInternalError=true},
   "iucer": function(){ignoreCommandError=true},
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
  "sernd": function(variable,min,max){variables[variable] = randomint(min,max)},
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
  "ifhigher": function(var1, var2, outputvar){variables[outputvar] = variables[var1]>variables[var2]?1:0},
  "iflower": function(var1, var2, outputvar){variables[outputvar] = variables[var1]<variables[var2]?1:0},
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

function cmdn(fullcommand){ //get name of command
  return fullcommand.split(" ")[0];
}
function cmda(fullcommand){ //get arguments of command
if(fullcommand.split(cmdn(fullcommand)+" ")[1] == undefined){
  return [];
}
  return fullcommand.split(cmdn(fullcommand)+" ")[1].split(",");
}

if(process.argv.length > 2){ 
  var file = fs.readFileSync(process.argv[2], "utf8").split("\n"); //read file
for(var i = 0; i < file.length; i++){ 
  if(acceptedwords.includes(cmdn(file[i]))){ //if command is in acceptedwords
    try{
      tv = commands[cmdn(file[i])](...cmda(file[i])); //run command
      if(tv != undefined){i = parseInt(tv.split("toline")[1])-2;} //if tv doesnt return undefined then go to line
    }catch(e){if(!ignoreInternalError){console.log("** INTERNAL ERROR AT LINE "+(i+1) + ": "+e);}} //internal error
  }else{
    if(!ignoreCommandError){console.log("** UNKNOWN COMMAND AT LINE "+(i+1));} //unknown command
    continue
  }
}
}else{ //shell
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

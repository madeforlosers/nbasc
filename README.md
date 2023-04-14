# nbasc 
*another really complicated language*<br>
*version 3801*

## Table Of Contents
1. Running Files
2. Running code in the shell
3. Declaring
4. Next Variable (NV) commands
5. Next Number (NN) commands
6. Next String (NS) commands
7. Next Date (ND) commands
8. Number commands
9. String commands
10. Variable commands
11. Misc. commands
12. `import` command and how to use modules
    - BE CAREFUL!
    - how to use
    - how to make your own module


## Running files
run `node nbasc.js [filename]`

## Running code in the shell
just run `node nbasc.js` 


## Declaring

### `senum [variable name]`
sets a number variable, the name declared in arguments

### `sestr [variable name]`
sets a string variable, the name declared in arguments

### `sedat [variable name]`
sets a date variable, the name declared in arguments

### `selis [variable name]`
sets a list variable, the name declared in arguments

### `sefcc [variable name],[char code]`
sets a variable to a character from a char code

### `sernd [variable name],[min],[max]`
sets a variable to a random number 

### `lovar [variable]`
loads a variable to be used.

## Next Variable (NV) commands

### `nvpri`
prints the current loaded variable to the screen.

### `nvgtinp [question]`
gets input from user and stores it to loaded variable

## Next Number (NN) commands

### `nnset [number = 0]`
sets the current loaded variable to a number

### `nnvset [variable name]`
sets the current loaded variable to a variable

### `nnadd [number = 1]`
adds a number to the current loaded variable

### `nnvadd [variable name]`
adds a variable to the current loaded variable

### `nnsub [number = 1]`
subtracts a number to the current loaded variable

### `nnvsub [variable name]`
subtracts a variable to the current loaded variable

### `nnmul [number = 2]`
multiplies the current loaded variable by a number

### `nnvmul [variable name]`
multiplies the current loaded variable by a variable

### `nndiv [number = 2]`
divides the current loaded variable by a number

### `nnvdiv [variable name]`
divides the current loaded variable by a variable

### `nnexp [number = 2]`
exponentiates the current loaded variable by a number

### `nnsin [number]`
sets the current loaded variable to a sine wave, using a number

### `nnvsin [variable name]`
sets the current loaded variable to a sine wave, using a variable

### `nncurx`
sets the cursor x to the current loaded variable

### `nncury`
sets the cursor y to the current loaded variable

### `nnfgcol`
sets the text color to the current loaded variable

### `nnbgcol`
sets the background color to the current loaded variable

## Next String (NS) commands

### `nsadd [string]`
adds a string to the current loaded variable

### `nsvadd [number variable]`
adds a variable to the current loaded variable

### `nssub [number]`
subtracts the last n characters in a string

### `nsvsub [number variable]`
subtracts the last n characters in a string (from a variable)

### `nsrep [new variable name], [times]`
creates a new variable (`[new variable name]`) that contains the currently loaded string repeated n amount of times (`[times]`)

### `nsvrep [new variable name], [number variable]`
creates a new variable (`[new variable name]`) that contains the currently loaded string repeated n amount of times (from a variable)

## Next List (NL) commands

### `nladd [string]`
adds a string to the current loaded list

### `nlvadd [variable name]`
adds the content of a variable to the current loaded list

## Next Date (ND) commands

### `ndgtms [new variable name]` 
creates a new variable and sets it to the milliseconds of the current loaded date variable

### `ndgtsc [new variable name]` 
creates a new variable and sets it to the seconds of the current loaded date variable

### `ndgtmn [new variable name]` 
creates a new variable and sets it to the minutes of the current loaded date variable

### `ndgthr [new variable name]` 
creates a new variable and sets it to the hours of the current loaded date variable

## Number commands

### `ntolin [line number]`
moves to a certain line number

### `fgcol [number]`
sets the text color to a number

### `bgcol [number]`
sets the background color to a number


## String commands

### `stpri [string]`
prints a string to the console

### `instpri [string]`
prints an inline string to the console

## Variable commands

### `vcrpos [x],[y]`
moves the cursor to an x and y coordinate, using variables

### `fgvcol [variable name]`
sets the cursor text color to the content of a variable

### `bgvcol [variable name]`
sets the background cursor text color to the content of a variable

### `if [variable],[expression],[line number]`
checks if the variable (concatenated with the expression) is true, and if it is it moves to the line number. if not it continues

### `ifhigher [var1],[var2],[variable name]`
checks if var1 is higher than var2. if it is, it sets the variable (declared in the arguments as `variable name`) to a 1. if not, it sets it to a 0.

### `iflower [var1],[var2],[variable name]`
checks if var1 is lower than var2. if it is, it sets the variable (declared in the arguments as `variable name`) to a 1. if not, it sets it to a 0.

## Misc. commands

### `curhom`
sets the cursor to the home

### `rscol`
resets the color of the text and background

### `gtinp [question],[variable]`
gets input from user and stores it to variable

### `iiner`
ignores internal commands if they're bugging you too much.

### `iucer`
ignores unknown command errors if they're bugging you too much.

## `import` command and how to use modules
### BE CAREFUL! *this can be used to import malicious commands and may ruin your system, check the command code before you use them!*

`import` is to import files to use new commands. currently its using a really bad way to do this, and I have yet to find a better way to do it.

if you need to know, it gets the command list from a JSON file and runs Javascript files with the same name (functions for the command)

### how to use 

1. download the module folder
2. put this in your `.nbasc` file: `import [module name]`, replace the [module name] with the module name

### how to make your own module

1. make a folder with the name of the module
2. make a JSON file with the same name in the folder
3. in the JSON file, make a property named "cmdlist" and in there, put an array filled with strings of the command names. this is all you'll need the JSON file for
4. make JavaScript files with the names of the commands to be able to run in the folder, should look like this:
```json
{
  "cmdlist":[
    "your",
    "commands",
    "here"
  ]
}
```


5. bam you're done

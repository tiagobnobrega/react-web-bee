#TODO README

##Running the Project

###npm Scripts
####start
Start server project only. Should be used for production.
    
    > npm start
####dev
Starts server project in dev mode (nodemon) and client project (webpack) with aggregated console
 
     > npm run dev
####dev-split
   Starts server project in dev mode (nodemon) and client project (webpack) with splitted console
   
       > npm run dev-split
####build
   Starts client webpack build process

    > npm run build

####dev-client
   Starts server project in production mode and client project (webpack)

    > npm run dev-client
    
####dev-client
   Starts client project (webpack) only
       
    > npm run client
    
    
##npm Configuration

###Global npm configuration

Don't create package-lock file <br/>

    > npm config set package-lock false

##Webstorm configuration
###Eslint fix command

To configure eslint commend. eslint must be installed globally

    > npm install eslint -g

We need to know install full path:

    >npm config get prefix

full path is: "<NPM_PREFIX>\eslint"
 
Windows example: "C:\Program Files\nodejs\eslint.cmd"

Access: File => Settings => Tools => External Tools

Create new command

<ESLINT_FULL_PATH> "$FilePath$" --fix

* Parameter:
  --fix "$FilePath$"
* Working Directory:
  $ProjectFileDir$
  
You can also register a keymap:

Access: File => Settings => Keymap

1. Find command in "External Tools"
1. Add keyboard shortcut
const fs = require('fs'); //imported FileSystem moudle
const path = require('path');  //imported Path moudle
let txtWasFound = false;

searchApp();//Run the APP

function searchApp(){
    if(process.argv[2]==null || process.argv[3]==null)//Running application without any parameter prints a simple help message
    console.log('USAGE: node search [EXT] [TEXT]');
    else{
        const EXT = process.argv[2];
        const TEXT = process.argv[3];
        searchFunc(__dirname,EXT,TEXT);
    }
}

function searchFunc(currentFile,Ext,Textstr){

   
    const serchresults = findFilesInDir(currentFile,Ext);
   

    if(serchresults == null)
    {
        console.log("no file was found");
        return;
    }

    else{    
        serchresults.forEach(file => {
            const fileContent = fs.readFileSync(file);
            const regex = new RegExp('\\b' + Textstr + '\\b');
            if (regex.test(fileContent)) {
                console.log(file);
                txtWasFound = true;
            }
        });
        if(!txtWasFound)
        {
            console.log("no file was found");
        }  

    }
}

function findFilesInDir(currentFile,Ext){

    let results = [];

    if (!fs.existsSync(currentFile)){
        console.log("directory " ,currentFile , "does not found" );
        return;
    }

    const files=fs.readdirSync(currentFile);
    for(let i=0;i<files.length;i++){ 

        const filename=path.join(currentFile,files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()){
            results = results.concat(findFilesInDir(filename,Ext)); 
        }
        else if (filename.indexOf(Ext)>=0) {          
            results.push(filename);
        }
    }

    return results;
}



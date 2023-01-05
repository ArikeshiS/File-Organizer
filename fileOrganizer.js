//console.log("World");
// Task:1 - how to take input from terminals
//let input = process.argv[2];
//console.log(input);
let fs = require("fs");
let path = require("path");
let folderPath = process.argv[2];
// Assumption No folder inside our folder

//Task:2 - Read Folder
let folderExists = fs.existsSync(folderPath);

let extensions = {
    Audio:[".mp3"],
    Video:[".mp4",".mkv"],
    Document:[".docx",".pptx",".pdf"],
    Image:[".png",".jpeg"]
};

if(folderExists)
{
    console.log("valid");
    let files = fs.readdirSync(folderPath);
    //console.log(files);
    for(let i=0; i<files.length; i++)
    {
        let ext = path.extname(files[i]);
        let nameOfFolder = giveFolderName(ext);
        console.log("Ext--",ext,"Folder--",nameOfFolder);
        let pathOfFolder = path.join(folderPath, nameOfFolder)
        if(fs.existsSync(pathOfFolder))
        {
            moveFile(folderPath, pathOfFolder,files[i]);
        }
        else
        {
            fs.mkdirSync(pathOfFolder);
            moveFile(folderPath, pathOfFolder,files[i]);
        }
    }

}
else
{
    console.log("invalid");
}

// Task:3 - Differentiate files on basis of extension
function giveFolderName(ext)
{
    for(let key in extensions)
    {
        let extArr = extensions[key];
        for(let i=0; i<extArr.length; i++)
        {
            if(extArr[i] == ext)
            {
                return key;
            }
        }
    }
    return 'Others';
}

function moveFile(FolderPath, pathOfFolder, fileName)
{
    let sourcePath = path.join(folderPath, fileName);
    let destinationPath = path.join(pathOfFolder, fileName);
    fs.copyFileSync(sourcePath, destinationPath);
    fs.unlinkSync(sourcePath);
}
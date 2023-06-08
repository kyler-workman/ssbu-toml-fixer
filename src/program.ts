import { ModCategory, ModInfo, NameToCategoryMapping } from "./Models";
import fs from 'fs'

export function runScript():void{
    var runningDirectory = process.argv[2]

    if(!(runningDirectory && fs.existsSync(runningDirectory))){
        console.log("Run this program by dragging your mods directory over 'Start.bat'")
        return;
    }

    var modFolderList = fs.readdirSync(runningDirectory);
    modFolderList.forEach(modFolderName => processModFolder(runningDirectory, modFolderName));
}

function processModFolder(runningDirectory:string, modFolderName:string){
    var modInfo = getModInfo(modFolderName);
    var tomlFilePath = `${runningDirectory}/${modFolderName}/info.toml`

    if(!modInfo){
        logFileAction('ERROR', modFolderName, "Invalid folder name, skipping")
    }else if(fs.existsSync(tomlFilePath)){
        var properCategoryName = NameToCategoryMapping[modInfo.category];
        var properDisplaynameLine = `display_name = "${modFolderName}"`;
        var properCategoryLine = `category = "${properCategoryName}"`;

        var tomlFile = fs.readFileSync(tomlFilePath).toString().split('\n');
        var tomlFileIsEdited = false;

        var displaynameLine = tomlFile.findIndex(v => /^display_name\s?=\s?/.test(v))
        if(displaynameLine != -1){
            var displayNameSearch = /"(.*?)"/.exec(tomlFile[displaynameLine]);
            if(displayNameSearch && displayNameSearch[1]){
                var displayNameValue = displayNameSearch[1];
                if(displayNameValue != modFolderName){
                    tomlFileIsEdited = true;
                    tomlFile[displaynameLine] = properDisplaynameLine
                }
            }
        }else{
            tomlFileIsEdited = true;
            tomlFile.push(properDisplaynameLine);
        }

        var categoryLine = tomlFile.findIndex(v => /^category\s?=\s?/.test(v))
        if(categoryLine != -1){
            var categorySearch = /"(.*?)"/.exec(tomlFile[categoryLine])
            if(categorySearch && categorySearch[1]){
                var existingCategoryValue = categorySearch[1];
                if(existingCategoryValue != properCategoryName){
                    tomlFileIsEdited = true;
                    tomlFile[categoryLine] = properCategoryLine
                }
            }
        }else{
            tomlFileIsEdited = true;
            tomlFile.push(properCategoryLine)
        }

        if(tomlFileIsEdited){
            logFileAction('EDIT', modFolderName,'Existing file found, updating fields')
            var newFile = tomlFile.join('\n');
            fs.writeFileSync(tomlFilePath, newFile);
        }else{
            logFileAction('NONE', modFolderName,'Existing file found, matches format')
        }

    }else{
        logFileAction('NEW', modFolderName, "Missing .toml file, creating")
    }
}

function getModInfo(modFolderName:string):ModInfo|null{
    var info:ModInfo|null = null;

    var splitName = modFolderName.split('-');
    if(splitName.length>0){
        var category = splitName[0].toLocaleLowerCase().trim();
        if(Object.keys(NameToCategoryMapping).includes(category)){
            info = {
                category: category as ModCategory,
                fullName: modFolderName
            }
        }
    }

    return info;
}

type FileAction = 'NEW'|'EDIT'|'NONE'|'ERROR'
var fileActionNameMaxLength = 5
function logFileAction(action:FileAction, modFolderName:string, message:any){
    console.log(`[ ${action.padEnd(fileActionNameMaxLength, ' ')} ] ${modFolderName} | ${message}`)
}
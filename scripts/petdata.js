const fs = require('fs');
const path = require('path');

function saveData(dataToSave, username){

    filePath = "../data/petinfo.txt";
    const absolutePath = path.join(__dirname, filePath);

    // Read the file synchronously
    const data = fs.readFileSync(absolutePath, 'utf-8');

    // Split the file content by newline and count the lines
    const lines = data.split('\n').length + 1;

    const toSave = "\n" + lines + ":" + username + ":" + dataToSave.join(":");

    console.log(toSave);

    fs.appendFileSync(absolutePath, toSave);






}



function filterData(criteria){
    //console.log(criteria);

    filePath = "../data/petinfo.txt";
    const absolutePath = path.join(__dirname, filePath);

    // Read the file synchronously
    const data = fs.readFileSync(absolutePath, 'utf-8');

    // Split the file content by newline and count the lines
    const lines = data.split('\n');
    let results = "";
    let match = true;
    for(let line in lines){
        match = true
        //criteria1 : cat or dog
        if(!lines[line].includes(criteria[0]+":")){
            match = false;
        }
        
        //criteria2: gender
        if(!lines[line].includes(criteria[1]) && criteria[1] != "nopref"){
            match = false;
        }

        //criteria3" agre
        if(!lines[line].includes(criteria[2]) && criteria[2] != "noprefage"){
            match = false;
        }

        //criteria4: breed
        if(Array.isArray(criteria[3])){
            let breed = false;
            for(num in criteria[3]){ 
                if(lines[line].includes(criteria[3][num]) || criteria[3][num] == "nobreedpref"){
                    breed = true;
                }
            }
            if(breed == false){
                match = false;
            }
        } else {
            if(!lines[line].includes(criteria[3]) && criteria[3] != "nobreedpref"){
                match = false;
            }
        }

        //criteria5: companions
        if(Array.isArray(criteria[4])){
            for(num in criteria[4]){
                if(!lines[line].includes(criteria[4][num]) && criteria[4][num] != "notfriendly"){
                    match = false;
                }
            }
            

        } else {
            if(!lines[line].includes(criteria[4]) && criteria[4] != "notfriendly"){
                match = false;
            }
        }


        if(match == true){
            lines[line] = lines[line].replace("smallkids", "likes small kids");
            lines[line] = lines[line].replace("likescats", "likes cats");
            lines[line] = lines[line].replace("likesdogs", "likes dogs");
            lines[line] = lines[line].replace("othegen", "other gender");
            lines[line] = lines[line].replace("notfriendly", "not friendly");
            results = results + "+" + lines[line];
        }
    }

    
    return results;



}



module.exports = {
    saveData,
    filterData
}


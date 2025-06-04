function validate(){

    console.log("validate!");
    let valid = true


    if(!checkChecked("dogOrCat")){
        console.log("checkcheck works")
        valid = false;
    }

    if(!checkChecked("gender")){
        console.log("checkcheck gender works")
        valid = false;
    }

    if(!checkChecked("age")){
        console.log("checkcheck age works")
        //return false;
    }



    //check breed preference
    let pref = [];
    pref[0] = document.getElementById("pixel");
    pref[1] = document.getElementById("lineart");
    pref[2] = document.getElementById("mutt");
    pref[3] = document.getElementById("domestic");
    pref[4] = document.getElementById("y2k");
    pref[5] = document.getElementById("nobreedpref");
    let prefCheck = false;
    for(i = 0; i < 6; i++){
        if(pref[i].checked){
            prefCheck = true;
        }
    }
    if(prefCheck == false){
        console.log("prefCheck works!");
        valid = false;
    }

    let friendly = [];
    friendly[0] = document.getElementById("likesdog");
    friendly[1] = document.getElementById("likescats");
    friendly[2] = document.getElementById("smallkids");
    friendly[3] = document.getElementById("notfriendly");
    let compCheck = false;
    for(i = 0; i < 4; i++){
        if(friendly[i].checked){
            compCheck = true;
        }
    }
    if(compCheck == false){
        console.log("compCheck works!");
        valid = false;
    }


    
    
    if(valid){
        document.getElementById("submit").disabled=false;
    } else{
        document.getElementById("submit").disabled=false;
    }
    return;

}

function checkChecked(inputName){
    let query = 'input[name="' + inputName + '"]:checked'
    type = document.querySelector(query);
    if(type == null){
        console.log(inputName +  " empty");
        return false;
    }

    return true;

}
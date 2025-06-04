function validate(){

    console.log("validate!");
    let valid = true;


    let lname = document.getElementById("lastName").value;
    if(lname == ""){
        console.log("empty lname");
        valid = false;
    }
    let fname = document.getElementById("firstName").value;
    if(fname == ""){
        console.log("empty fname");
        valid = false;
    }
    let email = document.getElementById("email").value;
    if(email == ""){
        console.log("empty email");
        valid = false;
    }

    let regex = /^[a-z]+[0-9a-z.-_]*[0-9a-z]*@[0-9a-z\-]*\.[a-z][a-z]+/
    if(email.search(regex) == -1){
        console.log("bad email");
        valid = false;
    } else {
        console.log("good email!");
    }








    if(!checkChecked("dogOrCat")){
        console.log("checkcheck works")
        valid = false;
    }

    if(!checkChecked("gender")){
        console.log("checkcheck gender works")
        valid = false;
    }

    age = document.getElementById("age").value;
    if(age == "none"){
        console.log("no age selected!")
        valid = false;
    }



    //check breed preference
    let pref = [];
    pref[0] = document.getElementById("pixel");
    pref[1] = document.getElementById("lineart");
    pref[2] = document.getElementById("mutt");
    pref[3] = document.getElementById("domestic");
    pref[4] = document.getElementById("y2k");
    pref[5] = document.getElementById("other");
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

    let comment = document.getElementById("comment").value;
    if(comment == ""){
        console.log("no comment");
        valid = false;
    }
    console.log("frontend has been called");
    let str;
    if(valid){

       document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
    
    return ;

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
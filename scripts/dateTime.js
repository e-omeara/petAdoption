function getDateTime(){
    console.log("refresh");
    const d = new Date();
    document.getElementById("dateTime").innerHTML = d.toString().slice(0,25);
    
}
getDateTime();
setInterval("getDateTime()", 500);
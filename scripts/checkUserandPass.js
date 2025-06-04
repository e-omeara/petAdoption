function checkPassword(pwd) {
    //pwd must be at least 4 characters long
    if (pwd.length < 4) {
        return false;
    }

    //pwd must have at least one number
    if (!/\d/.test(pwd)) {
        return false;
    }

    //pwd must have at least one letter
    if (!/[a-zA-Z]/.test(pwd)) {
        return false;
    }
    //pwd must contains letters and numbers only
    if (!/^[a-zA-Z0-9]+$/.test(pwd)) {
        return false;
    }

    return true;
}

function checkUserName(usr) {
    //usr must contain only letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(usr)) {
        return false;
    }

    return true;
    
}


function checkUserNameUnique(usr) {

    const filePath = '../data/login.txt'; 
    const fs = require('fs');
    const path = require('path');
    const absolutePath = path.join(__dirname, filePath);

    // Read the file synchronously
    const data = fs.readFileSync(absolutePath, 'utf-8');
    // Split the file content into lines
    const lines = data.split('\n');
    // Parse each line into an object
    const logins = lines.map(line => {
        let [username, password] = line.split(':');
        return { username: username.trim(), password: password.trim() };
    });

    for(const login of logins) {
        if (login.username.toLowerCase() === usr.toLowerCase()) {
            return false;
        }
    }
    
    return true;

}


//parse through the login.txt files to check if the username and password are correct
function parseLogins(usr, pwd){

    const filePath = '../data/login.txt'; 
    const fs = require('fs');
    const path = require('path');
    const absolutePath = path.join(__dirname, filePath);

    // Read the file synchronously
    const data = fs.readFileSync(absolutePath, 'utf-8');

    // Split the file content into lines
    const lines = data.split('\n');

    // Parse each line into an object
    const logins = lines.map(line => {
        let [username, password] = line.split(':');
        return { username: username.trim(), password: password.trim() };
    });

    for (const login of logins) {
        if (login.username.toLowerCase() === usr.toLowerCase() && login.password === pwd) {
            return true;

        }
    }
    return false;

}




module.exports = {
    checkPassword,
    checkUserName,
    checkUserNameUnique,
    parseLogins
  };
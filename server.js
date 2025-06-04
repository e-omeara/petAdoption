const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // Import express-session
const auth = require('./scripts/checkUserandPass.js'); // Import the authentication script
const info = require('./scripts/petdata.js');
const fs = require('fs');


const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a secure key
    resave: false, // Prevents resaving session if it hasn't been modified
    saveUninitialized: false, // Prevents saving uninitialized sessions
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
   //home page
    res.render('index', {
        big1: 'Adopt a ',
        small: 'digi',
        big2: 'cat/Dog !'
    });
    
});



app.get('/search', (req, res) => {
    //search for a pet
    res.render('search', {
        big1: 'Find a ',
        small: 'digi',
        big2: 'pet !'
    });

    
});

app.post('/search', (req, res) => {
    //process search form
    const body = Object.values(req.body);
    let results = info.filterData(body);
    
    let html = results.split("+").slice(1);
    
    res.render('pets', {
        big1: 'Browse ',
        small: 'digi',
        big2: 'pets !',
        pet: html
    });

    
});

app.get('/catcare', (req, res) => {
    // cat care page
    res.render('catcare', {
        big1: '',
        small: 'digi',
        big2: 'cat care !'
    });

    
});

app.get('/dogcare', (req, res) => {
    // dog care page
    res.render('dogcare', {
        big1: '',
        small: 'digi',
        big2: 'dog care !'
    });

    
});

app.get('/giveaway', (req, res) => {
    //giveaway a pet page
    if (req.session.user && req.session.user.loggedIn) {
        res.render('giveaway', {
            big1: 'Giveaway a ',
            small: 'digi',
            big2: 'pet !'
        });
        console.log("session user: " + req.session.user.username);
    } else {
        res.redirect('/login');
    }


    
});

app.post('/giveaway', (req, res) => {
    //process giveaway form
    console.log(req.body);

    const body = Object.values(req.body);
    console.log(body);
    info.saveData(body, req.session.user.username);
    res.render('givesuccess', {
        big1: 'Giveaway success!',
        small: '',
        big2: ''
    });
   

});


app.get('/contactus', (req, res) => {
    //contact us page
    res.render('contactus', {
        big1: 'Contact Us :p',
        small: '',
        big2: ''
    });

    
});

app.get('/disclaimer', (req, res) => {
    //disclaimer page
    res.render('disclaimer', {
        big1: 'Disclaimer &#128123; ',
        small: '',
        big2: ''
    });

    
});

app.get('/createaccount', (req, res) => {
    // create an account
    res.render('createaccount', {
        big1: 'Create an account',
        small: '',
        big2: '',
        message: ''
    });

    
});


app.post('/createaccount', (req, res) => {
    //process create accountdata
    const username = req.body.username;
    const password = req.body.password;
    //validate username and password
    if(!auth.checkUserName(username)){
        res.render('createaccount', {
            big1: 'Create an account',
            small: '',
            big2: '',
            message: 'Your username must contain only digits and numbers and be at least 4 characters long'
        });
        
        
    } else if(!auth.checkUserNameUnique(username)){
        res.render('createaccount', {
            big1: 'Create an account',
            small: '',
            big2: '',
            message: 'That username is already taken!'
        });

    } else if(!auth.checkPassword(password)){
        res.render('createaccount', {
            big1: 'Create an account',
            small: '',
            big2: '',
            message: 'Invalid password'
        });

    } else {
        // write login info to file
        const filePath = './data/login.txt'; 
        const absolutePath = path.join(__dirname, filePath);
        const loginInfo = "\n" + username + ":" + password;
        try {
            fs.appendFileSync(absolutePath, loginInfo);
        } catch (err) {
            console.error('Error writing to file:', err);
            res.render('createaccount', {
                big1: 'Create an account',
                small: '',
                big2: '',
                message: 'An error occurred while creating your account. Please try again.'
            });
        }


        res.render('success', {
            big1: 'Create Account Successful',
            small: '',
            big2: ''
        })
    }



}


)

app.get('/login', (req, res) => {
    //login page
    res.render('login', {
        big1: 'Enter your username and password to login',
        small: '',
        big2: '',
        message: ''
    });

    
});

app.post('/authenticate', (req, res) => {
    //validate login info
    const username = req.body.username;
    const password = req.body.password;
    //check parameters not null
    if (!username || !password) {
        return res.render('login', {
            big1: 'Enter your username and password to login',
            small: '',
            big2: '',
            message: 'Username and password are required.'
        });
    }

    // Check if the username and password are correct
    if (auth.parseLogins(username, password)) {
        // Store user information in session
        req.session.user = { username: username, loggedIn: true };
        console.log("authenticated as " + username);
        res.redirect('/giveaway');
    } else {
        res.render('login', {
            big1: 'Enter your username and password to login',
            small: '',
            big2: '',
            message: 'Invalid username or password'
        });
    }
});

app.get('/logout', (req, res) => {
    //logout from account
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out.');
        }
    });
    res.render('logout', {
        big1: 'Goodbye',
        small: '',
        big2: ''
    });
   

    
});




// Listening on port 3000
app.listen(port, () => {
    console.log('The server is listening on port 3000.');
});




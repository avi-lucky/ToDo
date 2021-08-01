// // route for when user submits login details
// function logIn() {
// axios.post("/users/login", function(req, res) {
//   // make input not case sensitive
//   req.body.email = req.body.email.toLowerCase();
//   req.body.password = req.body.password.toLowerCase();

//   // look up username in database
//   Account.find({ username: req.body.username }, function(err, doc) {
//     if (err) throw err;

//     // if nothing is returned, render login page with error message
//     if (!doc.length) {
//       res.render("login", { message: "Username or password is incorrect." });
//     } else {
//       // compare password with hashed password
//       bcrypt.compare(req.body.password, doc[0].password, function(err, result) {
//         if (err) throw err;

//         //if they match, redirect to index.
//         if (result == true) {
//           console.log("hash matches");

//           // create session using passport js
//           req.login(doc[0]._id, function(err) {
//             if (err) throw err;
//             req.session.user = req.body.username;

//             res.redirect("../");
//           });

//           //if not, redirect back to login.
//         } else {
//           console.log("hash does not match");
//           res.render("login", {
//             message: "Username or password is incorrect."
//           });
//         }
//       });
//     }
//   });
// });
// }

// // middleware which makes input lowercase and checks if it is valid.
// function validateRegister() {
//   return function(req, res, next) {
//     // make input not case sensitive
//     req.body.username = req.body.username.toLowerCase();
//     req.body.password = req.body.password.toLowerCase();

//     if (
//       validator.isAlphanumeric(req.body.username) &&
//       validator.isAlphanumeric(req.body.username)
//     ) {
//       console.log("authentication = " + req.isAuthenticated());
//       return next();
//     }
//     res.render("register", { message: "Invalid input. Try again." });
//   };
// }

// SignIn
function logIn() {
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value
    console.log(email) 
    console.log(password)   
  axios.post("/users/login", {
   email: email,
   password: password,
  })
  .then(function (response) {
    localStorage.setItem('token', response.data.token)
    res.send( user, response.data.token )
    console.log(response);
    console.log(response.data.token)
    location.replace('/views/tasks.js')
  })
  .catch(function (error) {
    console.log(error);
  })
}

// function logIn() {
// 	const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
    
// 	axios.post('/users/login', {
// 		email: email,
// 		password: password
// 	})
// 		.then(function (response) {
// 			console.log('signin res', response);
// 			if (response.data.success && response.data.isLogged) {
// 				location.replace('/views/task.ejs')

// 			}//end of if
// 			else if (response.data.message == "Authentication failed. Wrong password.") {
// 				location.reload();
// 				alert('Wrong password.');
// 			}
// 			else if (response.data.message == "Authentication failed. User not found.") {
// 				location.reload();
// 				alert('Username not found! Please sign Up!');
// 			}
// 		})
// }


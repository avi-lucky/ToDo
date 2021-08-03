// SignUp
function signUp() {
    const name = document.getElementById("name").value  
    const email = document.getElementById("email").value  
	const password = document.getElementById("password").value
	const confirmPassword = document.getElementById("confirmPassword").value 
  axios.post("/users", {
     name: name,
     email: email,
	 password: password,
	 confirmPassword: confirmPassword
  })
  .then(function (response) {
    console.log(response);
    console.log(response.data)
    location.replace('./signin.ejs')
  })
  .catch(function (error) {
    console.log(error);
  })
}

// function signUp() {
//     const username = document.getElementById("username").value  
// 	const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const passwordConfirm = document.getElementById("passwordConfirm").value;
//     // var password = '';
//     if(password===passwordConfirm)
//         {
//             alert('ok');
//             password=passwordConfirm;
//         }
//         else{
//              alert('password is not matching with repeat password');
//              return false;
//         }
//     //var password = pass;
// 	if (email && password===passwordConfirm) {
// 		axios.post('/users', {
//             name: name,
// 			email: email,
// 			password: password
// 		})
// 			.then(function (response) {
// 				if (response.data.status == "added successfully") {
// 					location.replace('/views/signin.ejs');
// 				} else {
// 					location.reload();
// 					alert('already signed Up!  Please login');

// 				}
// 			})

// 	} else {
// 		location.reload();
// 		alert('email or password cannot be null!!');
// 	}
// }
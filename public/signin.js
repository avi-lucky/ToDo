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
    // res.send( user, response.data.token )
    console.log(response);
    console.log(response.data.token)
    location.replace('./task.ejs')
  })
  .catch(function (error) {
    console.log(error);
  })
}

// // Forgot Password
// function forgotPassword() {
//   const forgotpassword = document.getElementById("forgotpassword").value
//   console.log(forgotpassword)
//   axios.patch("/users/forgot", {
//     password: password
//   },{
//     headers: {
//       Authorization : ('Bearer ', localStorage.getItem("token"))
//     }})
//   .then(function (response) {
//     console.log(response);
//     console.log(response.data)
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }
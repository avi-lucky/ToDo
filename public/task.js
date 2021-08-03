// add contact
const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

btn.addEventListener('click', addToDo);

function addToDo() {
    const pending = document.querySelector('.pending');
    const completed = document.querySelector('.completed');

    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';

    if(input.value !==''){
        newLi.textContent = input.value;
        input.value = '';
        pending.appendChild(newLi);
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
        newLi.appendChild(editBtn);
    }

    checkBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        parent.remove();
        completed.appendChild(parent);
        checkBtn.style.display = 'none'
    })

    delBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        parent.remove();
    })

    editBtn.addEventListener('click', function(){
        const parent = this.parentNode;
        editBtn.onclick = function() {
            modal.style.display = "block";
        }
    })
}

    // var modal = document.getElementById("myModal");
    // var editBtn = document.getElementById("button");
//     editBtn.addEventListener('click', function(){
//         const parent = this.parentNode;
//         btn.onclick = function() {
//             modal.style.display = "block";
//           }
//     })
// }
    
//     axios.post("/tasks", {
//         description: description,
//         completed: completed
//     },{
//     headers: {
//       Authorization : ('Bearer ', localStorage.getItem("token"))
//     }})
//     .then(function (response) {
// 			if (response) {
//             return response
// 			}
// 		})
// 		.then(function (res) {
            
//             if(res.data.status==='todo already exist')
//                 {
//                     alert('Todo is already exist')
//                     console.log(response)
//                     console.log(response.data)
//                     location.reload()
//                 }
//                 else{
//             listAfterAdd()
//                 }
// 		})
// 		.catch(function (error) {
// 			console.log(error)
// 		})
// }

// function listTodo() {

// 	axios.get('/tasks')
// 		.then(function (response) {
// 			for (var i = 0; i < response.data.result.length; i++) {
//                  var li = document.createElement("li");
//                  var span = document.createElement();
//                  var txt = document.createTextNode()
//                  span.className = "close";
//                  span.appendChild(txt);
//         var inputValue = response.data.result[i].text
//         var t = document.createTextNode(inputValue)              
//         li.appendChild(span);
                 
        
//         var span2 = document.createElement("SPAN");
//         span2.appendChild(t);
//         span2.className = "data";
//         li.appendChild(span2);
        
//         var sign = document.createTextNode("\u2713");
        

//         if(response.data.result[i].completed == true)
//             {
//                 span2.appendChild(sign);
//             }

//         span.addEventListener("click", deleteTodo, false);
//         span2.addEventListener('click', checkTodo, false);
      
        
//         document.getElementById("myUL").appendChild(li);

//             }
//         });
// }

// // function listAfterAdd()
// //  { 
// //     var li = document.createElement("li");
// //     var inputValue = document.getElementById("myInput").value;
// //     document.getElementById("myInput").value = "";
// //     var t = document.createTextNode(inputValue);

// //     var span = document.createElement("SPAN");
// //     var txt = document.createTextNode("\u00D7");
// //     span.className = "close";
// //     span.appendChild(txt);
// //     li.appendChild(span);
// //         var span2 = document.createElement("SPAN");
// //         span2.appendChild(t);
// //         span2.className = "data";
// //         li.appendChild(span2);
        
  
// //         span.addEventListener("click", deleteTodo, false);
// //         span2.addEventListener('click', checkTodo, false);
        
  
// //         document.getElementById("myUL").appendChild(li);
// // }

// // delete task
// function deleteToDo(id) {
//     console.log("Tet")
//     console.log(id)
//     axios.delete("/tasks/"+ id + "/delete", {
//       headers: {
//         Authorization : ('Bearer ', localStorage.getItem("token"))
//       },
//     })
//     .then(function (response) {
//       console.log(response);
//       console.log(response.data)
//       location.reload()
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//   // update task
// function updateToDo(id) {
//     console.log(id)
//     const description = document.getElementById("description").value
//     const completed = document.getElementById("completed").value
//     console.log(description)
//     console.log(completed)
//     axios.patch("/tasks/"+ id + "", {
//         description: description,
//         completed: completed
//     },{
//     headers: {
//       Authorization : ('Bearer ', localStorage.getItem("token"))
//     }})
//     .then(function (response) {
//       console.log(response);
//       console.log(response.data)
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
    
// // function checkTodo()
// // {
// //         var str = this.parentElement.textContent;
// //         var last='';
// //         var completed=true;
// //         var sign = String.fromCharCode(parseInt(2713,16))
// //         last=str.slice(str.length-1);
// //         if(last === sign)
// //             {
// //                 var n=str.length-1;
// //                 text = str.slice(1,n);
// //                 var t = document.createTextNode(text);
                    
// //                 completed=false;

// //                 // this.appendChild(t);
// //             }
// //             else{
// //                     text = str.slice(1);
// //                     completed=true;
// //                     var sign = document.createTextNode("\u2713");
// //                     this.appendChild(sign);
// //             }

// //         axios.post('/api/check', {
// //         completed: completed,
// //         text: text
// //         })
// //         .then(function (response) {
// //             if(response)
// //                 {
// //         console.log(response);
// //         location.reload();
// //                 }
// //         })
// //         .catch(function (error) {
// // 			console.log(error);
// // 		});
// // }
        
// // listTodo();

// logout
function logOut() {
    console.log(localStorage.getItem("token"))
    axios.post('/users/logout', {
    },
      {
      headers: {
        Authorization : ('Bearer ', localStorage.getItem("token"))
      }
    }).then((response) => {
      console.log("Logged Out")
      localStorage.removeItem("token");
      location.replace('/')
    }).catch ((error) => {
      console.log(error)
      console.log(localStorage.getItem("token"))
    })
  }
  


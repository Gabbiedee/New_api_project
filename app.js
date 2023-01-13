const fetchPost = document.getElementById('fetch-post-btn');
const mainTable = document.querySelector('.main-table');
const tableContainer = document.querySelector('.table-container')
const tbody = document.getElementById('tbody');
const table = document.querySelector('table')
const endpoint =  'https://jsonplaceholder.typicode.com/posts';
const message = document.createElement('div');
message.className = 'message'

// add event listener for fetch post
fetchPost.addEventListener('click', myPost);

async function myPost() {
    

    const response = await fetch (endpoint)

    const data = await response.json();

    const newData = data.slice(0,10)

    let tableData = "";
    newData.forEach(post => {
    
        tableData += `<tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td><button class ="read" onclick ="readPost(${post.id})">R</button>
        <button class ="update" onclick="updatePost(${post.id})">U</button>
        <button class="delete">D</button></td>
        </tr>`
        
        tbody.innerHTML = tableData
    });
}


// fetch data function
async function readPost(postid){

    const newPost = endpoint + "/" + postid;

    const data = await fetch(newPost);

    const newData = await data.json();

    const form = document.createElement('form');
    form.className = 'myform'
    form.innerHTML = `<h2>${newData.id}</h2> <br>
    <hr> <br>
    <h4>${newData.title}</h4> <br>
    <hr> <br>
    <p>${newData.body}</p>
    <button class="done-reading">Done</button>`
    mainTable.appendChild(form);

    // remove form
   form.addEventListener('click', (e)=>{
    let target = e.target;
    if(target.className == 'done-reading' ){
        target.parentElement.remove()
    }
   })
}

async function updatePost(postid){

    const newPost = endpoint + "/" + postid;

    const data = await fetch(newPost);

    const newData = await data.json();

    const form2 = document.createElement('form');
    form2.className = 'myform2'
    form2.innerHTML = `<h2>${newData.id}</h2> <br>
    <hr> <br>
    <label>Title</label>
    <input type="text">
    <label>Body</label>
    <textarea name="" id="" rows="7"></textarea>
    <button class="submit">Submit</button>`
    mainTable.appendChild(form2);

    // create form 2
   form2.addEventListener('click', (e)=>{
    let target = e.target;
    if(target.className == 'submit' ){
        target.parentElement.remove()
 // tableContainer.appendChild(message);
        tableContainer.insertBefore(message, document.querySelector('.main-table'));
        setMessage(`Updated Successfully`)
        // call a setimeout function
        setTimeout(function(){
            //code goes here
            message.remove()
       }, 3000);
    }
   })
}


// my delete function
table.addEventListener('click', deletePost)
function deletePost(e){
    let target = e.target
   if(target.className == 'delete'){ 
    if (confirm('are you sure?')) {
        target.parentElement.parentElement.remove();
      }
   }
  
}


function setMessage (msg, color) {
    message.textContent = msg;
    message.style.color = color;
    // message.style.textAlign = 'center';
}

const form = {
    username: document.getElementById('name'),
    password: document.getElementById('password'),
    email: document.getElementById('email'),
    submit: document.getElementById('register'),
}

form.submit.addEventListener('click', function(e){
    e.preventDefault()

    let user = {
        name: form.username.value,
        password: form.password.value,
        email: form.email.value
    }
    
    let usersArray = []
    
    if(localStorage.getItem("userArray")){
        usersArray = usersArray = JSON.parse(localStorage.getItem('usersArray'));
    }
    
    usersArray.push(user)
    
    localStorage.setItem('usersArray', JSON.stringify(usersArray));

    let xhr = new XMLHttpRequest();

        console.log(user)

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                const obj = JSON.parse(xhr.responseText)
                alert(`POST Successful for user: /name: ${obj.name}, email: ${obj.email}`)
            }
        }

        xhr.onload = function(){
            console.log("Request Complted")
        }

        xhr.open("POST", "/test");
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(user));
})


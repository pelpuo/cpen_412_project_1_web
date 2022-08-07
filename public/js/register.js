const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirm_password")
const firstName = document.querySelector("#first_name")
const lastName = document.querySelector("#last_name")

const registerBtn = document.querySelector("#register")



registerBtn.addEventListener("click", () =>{


    if(confirmPassword.value !== password.value){
        document.querySelector("#error").innerHTML = "Passwords do not match";
        document.querySelector("#error").classList.remove("hidden")
    }else if(
    email.value == "" || 
    password.value == "" || 
    firstName.value == "" || 
    lastName.value == "" || 
    confirmPassword.value == ""){
        document.querySelector("#error").innerHTML = "All fields must be filled";
        document.querySelector("#error").classList.remove("hidden")
    }else{
        registerUser();
    }

    
})

const registerUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(
            {
                "email":email.value,
                "password":password.value, 
                "first_name":firstName.value,
                "last_name":lastName.value
            }),
        redirect: 'follow'
      };

    fetch("/api/v1/register", requestOptions)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(res.success){
            alert("Registration successful. Proceed to login")
            email.value = ""
            password.value = ""
            confirmPassword.value = ""
            firstName.value = ""
            lastName.value = ""
        }else if(res.error){
            document.querySelector("#error").innerHTML = res.error;
            document.querySelector("#error").classList.remove("hidden")
        }
    })
}
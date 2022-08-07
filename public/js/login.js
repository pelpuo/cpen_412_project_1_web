const email = document.querySelector("#email")
const password = document.querySelector("#password")

const loginBtn = document.querySelector("#login")



loginBtn.addEventListener("click", () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({"email":email.value,"password":password.value}),
        redirect: 'follow'
      };

    fetch("/api/v1/login", requestOptions)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(res.success){
            localStorage.setItem("token",res.data.token)
            window.location.href = "./home"
        }else if(res.error){
            document.querySelector("#error").innerHTML = res.error;
            document.querySelector("#error").classList.remove("hidden")
        }
    })

    // console.log("clicked")
    // console.log(email.value, password.value)
})
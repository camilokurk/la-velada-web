const btn = document.getElementById("dark-mode")

btn.addEventListener("click", handleClick);

function handleClick(){
    const activated = document.body.classList.toggle("darkmode")
    localStorage.setItem("page-dark-mode", activated)
    if(activated === true){
        btn.setAttribute("aria-label", "activar el modo claro")
    }else{
        btn.setAttribute("aria-label", "activar el modo oscuro")
    }
    
}

if(localStorage.getItem("page-dark-mode") === "true"){
    document.body.classList.add("darkmode")
    btn.setAttribute("aria-label", "activar el modo claro")
}
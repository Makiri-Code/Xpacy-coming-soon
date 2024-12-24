const navBtns = document.querySelector('.nav-buttons');
const menuIcon =document.querySelector('.fa-bars');
const input = document.getElementById('e-mail');
const form = document.querySelector('.form');

menuIcon.addEventListener('click', () => {
    navBtns.classList.toggle('show-menu')
    if(menuIcon.classList[1] === 'fa-bars'){
        menuIcon.classList.replace('fa-bars', 'fa-x')
    } else {
        menuIcon.classList.replace('fa-x', 'fa-bars')
    }
});

let user = {};

input.addEventListener('change', (e) => {
    const {name, value} = e.target
    if (name) {
        user[name] = value; // Append to user object
    } else {
        console.warn("Input element is missing a 'name' attribute");
    }
    console.log(user)
});

const postUser = async (user) => {
    
   try{

        const response = await fetch('https://app.xpacy.com/newsletter/subscribe', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        const data = await response.json();
        if (!response.ok) {
            console.error("Error from server:", data.message || response.status);
        } else {
            console.log("Success:", data.message);
        }
   }
   catch(error) {
    console.log(error, 'error submiting response')
   }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    postUser(user);
})

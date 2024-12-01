// const gname= document.getElementById('join-inp');
// const u_name= document.getElementById('name-inp');
// const u_id= document.getElementById('id-inp');
const form = document.getElementById('form')
//popup
const pop = document.getElementById('pop')

// const login_data = []

form.addEventListener('submit',e=>{
    popup()
})

function popup(){
    setTimeout(()=>{
        pop.style.display = "block" ;
    },2000)        
}

export default login_data
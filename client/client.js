// import {io} from "/socket.io-client"

const socket = io("http://localhost:3000")

const msg_inp = document.getElementById("msg-inp") 
const msg_send = document.getElementById("msg-send")
const text_area = document.getElementById("msg-content")
const form = document.querySelector('.text-area')
const grp_title = document.getElementById('grp-title')
const grp_mem = document.querySelector('.user-list')

// const msg_list =[]
// const username = 'Pravin'
// const room ='Pondy'
const {room,name,id} =Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

socket.emit('joinRoom',{name,room,id})

//console.log({room,name,id})

socket.on('msg',msg=>{
    console.log(msg)
    add_msg(msg)
})


socket.on('roomUsers',({room,users})=>{
    add_groupName(room);
    add_groupMem(users);
    console.log(add_groupMem(users))
})


form.addEventListener("submit",e=>{
    e.preventDefault();
    const text = msg_inp.value
    
    socket.emit('chat-msg',text)

    msg_inp.value=""   
    msg_inp.focus()
    
    // add_msg(text)
    // console.log(text)
    // const message = msg_inp.value
    // console.log(msg_list);
})

function add_msg(text){
    const div = document.createElement('div')
    div.className= 'msg-container'
    div.innerHTML = `
        <p class="text-details"><span class="user-id">${text.username}</span><span class="time">${text.time}</span></p>
        <p class="text-data">${text.text}</p>
    `
    text_area.appendChild(div)

    text_area.scrollTop = text_area.scrollHeight
    // msg_list.push(msg_inp.value)
    // text_area.innerHTML = msg_list
}

function add_groupName(room){
    grp_title.value = room
}

function add_groupMem({users}){
    // grp_mem.innerHTML = users.map(user => {
    //     return `<li>${user.username}</li>`;
    // }).join('');
    console.log(users)
}




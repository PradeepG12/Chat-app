// const login_data=require('../login')
const users= []

function joinUser(soc_id,username,room,id){
    const user = {soc_id,username,room,id}
    users.push(user)
    return user
}

function getCurrentUser(id){
    return users.find(user=> user.soc_id === id)
}

function userLeave(id){
    const index = users.findIndex(user=>user.soc_id === id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

function getRoomUsers(room){
    return users.filter(user=>user.room === room)
}

module.exports = {joinUser,getCurrentUser,users,userLeave,getRoomUsers}
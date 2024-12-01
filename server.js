// const path = require('path')
const http = require('http')
const express = require('express')
const socketio= require('socket.io')
const textFormat = require('./utils/textFormat')
const {joinUser, getCurrentUser,users,getRoomUsers,userLeave} = require('./utils/user')

const app = express()
const server = http.createServer(app)

const io = socketio(server, 
  { 
    cors: 
    { 
      origin: "http://127.0.0.1:5500"
    }
  }
)
const PORT = 3000 || process.env.PORT
const botName = 'Chat Bot'

io.on('connection',socket=>{
  console.log("New user is connected : "+socket.id)
  
  // console.log(users)

  socket.on('joinRoom',({name,room,id})=>{

    const user = joinUser(socket.id,name,room,id)

    socket.join(user.room)
    //welcome new user

    socket.emit('msg',textFormat(botName,'Hey u r connected'))
    
    //send all users except msg sender
    socket.broadcast.to(user.room).emit('msg',textFormat(botName,`${user.username} is connected`))

    io.to(user.room).emit('roomUsers',{
      room:user.room,
      username:getRoomUsers(user.room)
    })
  })
  
  socket.on('chat-msg',msg=>{
    //console.log(textFormat("Pradeep",msg))
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('msg',textFormat(user.username,msg))
    
    console.log(user.username+"====>")
  })
  
  socket.on('disconnect',()=>{
    const user = userLeave(socket.id)

    io.to(user.room).emit('msg',
      textFormat(botName,`A ${user.username} is left the chat`))
    
    // io.to(user.room).emit('roomUsers',{
    //   room:user.room,
    //   users:getRoomUsers(user.room)
    // })
  })
})


server.listen(PORT,()=>console.log("Server is running on : ",{PORT}))
class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets...!"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)}))})),$("#btn").click((function(){let s=$("#msg").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codeial"})})),e.socket.on("receive_message",(function(s){console.log("message recieved",s.message);let o=$("<li>"),n="other-message";s.user_email==e.userEmail&&(n="user-message"),o.append($("<span>",{html:s.message})),o.append($("<sub>",{html:s.user_email})),o.addClass(n),$("#messages").append(o)}))}}
class ChatEngine{constructor(e,t,s){this.chatBox=$("#"+t),this.userEmail=s,this.friendId=e,this.socket=io.connect("http://3.88.36.130:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets...!"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:e.friendId}),e.socket.on("user_joined",(function(e){console.log("a user joined!",e)}))})),console.log("chiittar"),$("#btn").click((function(t){t.preventDefault();let s=$("#msg").val();$("#msg").val(""),""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:e.friendId})})),e.socket.on("receive_message",(function(t){console.log("message received",t.message);let s=$("<li>"),o="other-message";t.user_email==e.userEmail&&(o="user-message"),s.append($("<span>",{html:t.message})),s.append($("<sub>",{html:"<br>"+t.user_email})),s.addClass(o),$("#messages").append(s)}))}}(function(){let e=$(".chat-button");console.log(e.length),console.log(e.attr("href")),e.click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(this).attr("href"),success:function(e){console.log(e),new ChatEngine(e.data.friend._id,"chatbox",e.data.myid),new Noty({theme:"relax",text:"Entered the chat room",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e)}})}))})();
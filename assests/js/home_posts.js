{   
  // method to submit the form data for new post using AJAX
  let createPost = function(){
      let newPostForm = $('#new-post-form');
      let plain_form=document.querySelector('#new-post-form');
      newPostForm.submit(function(e){
          e.preventDefault();
          
          formData = new FormData(plain_form);
           $("#post-data").val("");

          $.ajax({
              type: 'post',
              url: '/posts/create',
              dataType: 'json',
              contentType: false,
              processData: false,
              data: formData,
              success: function(data){
                  $("#post-pic-choose").val("");
                  let newPost = newPostDom(data.data.post);
                  $('#posts-list-container>ul').prepend(newPost);
                  deletePost($(' .delete-post-button', newPost));

                  // call the create comment class
                  new PostComments(data.data.post._id);
                  new ToggleLike($(' .toggle-like-button', newPost));
                  new Noty({
                      theme: 'relax',
                      text: "Post published!",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();

              }, error: function(error){
                  console.log(error.responseText);
              }
          });
      });
  }


  // method to create a post in DOM
  let newPostDom = function(post){
      //console.log(post);
      return $(`<li id="post-${post._id}">
 <div class="post-wrapper" >
     <div class="post-header">
            <div class="post-avatar" >
                <img
                  src="${user.avatar}"
                  alt="user-pic"
                />
                <div>
                  <span class="post-author"> ${post.user.name}</span>
                  <span class="post-time">a minute ago</span>
                </div>
            </div>   
            
              <div class="post-content">
              <img src="${post.postpic}" alt="${post.user.name}" id="post-pic" style="max-height:300px ;" >
              <h4>${post.content}</h4>
              </div>
            <div class="post-actions">
            
                <small>
                    <a class="delete-post-button"  href="/posts/destroy/${post.id}">X</a>
                </small>
               
                <div class="post-like">
                    <span> 
                          <a class="toggle-like-button" data-likes="${post.likes.length}"  href="/likes/toggle/?id=${post._id}&type=Post">
                        ${post.likes.length} 
                         <img
                         src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                         alt="likes-icon"
                         />
                         </a> 
                    </span>
                </div>
                 <div class="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>${post.comments.length}</span>
                </div>
              </div>

            <div class="post-comments">
                        <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}" >
                            <input type="submit" value="Add Comment">
                        </form>
            </div>
            <div class="post-comments-list" >
            
               <ul id="post-comments-${post._id}">
                              
               </ul>
                   
            </div>   
   </div>  
</div>  
                  
              </li>`);
  }


  // method to delete a post from DOM
  let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
              type: 'get',
              url: $(deleteLink).prop('href'),
              success: function(data){
                  $(`#post-${data.data.post_id}`).remove();
                  new Noty({
                      theme: 'relax',
                      text: "Post Deleted",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();
              },error: function(error){
                  console.log(error.responseText);
              }
          });

      });
  }





  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function(){
      $('#posts-list-container>ul>li').each(function(){
          let self = $(this);
          let deleteButton = $(' .delete-post-button', self);
          deletePost(deleteButton);

          // get the post's id by splitting the id attribute
          let postId = self.prop('id').split("-")[1]
          new PostComments(postId);
      });
    }
  createPost();
  convertPostsToAjax();
 }
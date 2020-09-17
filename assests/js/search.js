{
    let createsearch= function(){
        let newsearchForm= $('#search-form');

        newsearchForm.submit(function (e) {
          e.preventDefault();

          $.ajax({
            type: 'post',
            url: '/search',
            data: newsearchForm.serialize(),

            success: function (data) {
                 console.log("hello");
              $("#search-data").val("");
              $(".search-results>ul").empty();
              for (u of data.data.result) {
                console.log("hello", u);
                let newitem = newsearchDom(u);
                $(".search-results>ul").prepend(newitem);
              }
            },
            error: function (error) {
              console.log(error.responseText);
            },
          });
        });
    }


    let newsearchDom=function(u){
        return $(`<li class="search-results-row">
              <img
                src="${u.avatar}"
                alt="${u._id}"
              />
              <span> <a href="/users/profile/${u._id}">${u.name}</a></span>
            </li>`);
    }

    createsearch();
}
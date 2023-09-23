

const containerUserInfo = document.getElementById('postUser')
const containerPosts = document.getElementById("containerPosts");
let size = 0;
let idPost;
const BaseUrl =  `https://tarmeezacademy.com/api/v1/`;

function handlclick (userId){
    window.location =  `./post.html?pageid=${userId}`
}

function setUpPosts ( realuserid , userId , usernamePost , profile_image , postImage , titlePost , contentPost , comment_count , value ,EditValue , ValueContainer) {
    // create main div =  card 
    const mainDiv = document.createElement('div');
    mainDiv.className = 'card mt-5 shadow';
    // data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
    if (value){

        mainDiv.onclick = () => { window.location =  `./post.html?pageid=${userId}`}; 
        
    }
   
    //create card header

    const headDiv = document.createElement('div');
    headDiv.className = "card-header d-flex";
     
    // create content of header of card 

    // create profile image

    const profile_img = document.createElement('img');
    profile_img.src = profile_image ;
    profile_img.style.cssText = "width :40px;border-radius :50% ; height : 40px ; border : 2px solid gray";
    
    profile_img.onclick = () =>{
        mainDiv.onclick = ()=>{}
        window.location = `profile.html?userid=${realuserid}`
    }
    // create username 

    const username = document.createElement('h3');
    username.className = 'me-3';
    username.innerHTML = usernamePost;

    // appending parts = [ username + profile_image   + editbutton] => header of card 

    // create btn
        if(EditValue){
            const btnDiv = document.createElement('div');
            btnDiv.className = 'divEdit';
            btnDiv.style.cssText = " display : flex ; width : 100% ; justify-content: end;";
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.id = "btn-edit"
            btn.innerHTML = 'edit';

            const btns = document.createElement('button');
            btns.className = 'btn btn-danger ';
            btns.style.marginRight = '10px'
            btns.innerHTML = 'delet'
            // data-bs-toggle= ="" data-bs-whatever="@mdo"
            
             btn.onclick = (e)=>{
                mainDiv.onclick = (e) =>{}
                btn.setAttribute('data-bs-toggle',"modal");
                btn.setAttribute('data-bs-target','#updatePost');
                e.target.click()
                if(size == 1){
                    document.getElementById('updatePostTitle').value = titlePost ;
                    document.getElementById('updatePostContent').value = contentPost;
                    idPost = userId;
                    size = 0 ;
                }
                else{
                    ++size;
                }
            }
            btns.onclick =()=>{
                mainDiv.onclick = () =>{};
                let urlDeleted = `${BaseUrl}posts/${userId}`;
                let child = new FormData();
                child.append('_method' , 'delete')
                let head = {
                    'authorization' : `Bearer ${window.localStorage.getItem('token')}`
                }
    
                axios.delete(urlDeleted, {headers : head})
                .then((res)=>{
                    alert("success delete")
                    window.location.reload(true)
                })
                .catch((err)=>{
                    console.log(err);
                    alert('delet not seccuse')
                })
                
            }
            btnDiv.appendChild(btns);
            btnDiv.appendChild(btn);
            headDiv.appendChild(profile_img);
            headDiv.appendChild(username);
            headDiv.appendChild(btnDiv);
        }
    
        else{
            headDiv.appendChild(profile_img);
            headDiv.appendChild(username);
        }
    
    

    // appending header in main div = card 

    mainDiv.appendChild(headDiv);


    // ###### end with header of card ####

    // start with body of card 

    // create body of card

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body';
    
    // create content of body card

    // create image of card 

    const bodyImg = document.createElement("img");
    bodyImg.src = postImage;
    bodyImg.style.cssText = "width :100%; height : 300px; border : 2px solid gray";


    // create title of card

    const title  = document.createElement('h5');
    title.className = "card-title";
    title.innerHTML = titlePost
    // create body content of card 

    const content = document.createElement('p');
    content.className = 'card-text';
    content.innerHTML = contentPost
    
    // create seperateur  

    const hr = document.createElement('hr');


    // create comment + icon div 

    const commentDiv = document.createElement("div");
    commentDiv.style.cursor = 'pointer';
    commentDiv.id = 'createComments';
    if( ! value ){
        // mainDiv[""] = ;
        // mainDiv[] = 
        mainDiv.setAttribute('data-bs-toggle' ,"modal" );
        mainDiv.setAttribute("data-bs-target" , "#createCommentModale")

    }
    // create comment + icon 
     const icon = document.createElement('i');
     icon.className ='fa-solid fa-pen';

     const comment = document.createElement('span');
     comment.className = "pe-2";
     comment.innerHTML = `(${comment_count}) comment`;
    //  appading comment div 
    
    commentDiv.appendChild(icon);
    commentDiv.appendChild(comment);

    //  appding in body of card 

    bodyDiv.appendChild(bodyImg);
    bodyDiv.appendChild(title);
    bodyDiv.appendChild(content);
    bodyDiv.appendChild(hr);
    bodyDiv.appendChild(commentDiv);

    // appending in main div
    
    mainDiv.appendChild(bodyDiv);
    if ( ValueContainer){
        containerUserInfo.appendChild(mainDiv);
    }
    else{
        containerPosts.appendChild(mainDiv);
    }
}





function handlBtn (){
    const token = window.localStorage.getItem('token');
    const element = document.querySelectorAll(".posts.mt-5 .card.mt-5.shadow .divEdit");
    
    if (token !== null){
        
        document.getElementById("logingroupe").style.setProperty("display" , "none" , "important")
        document.getElementById("logoutgroupe").style.setProperty("display" , "flex" , "important")
        if(document.getElementById("add-post") !== null) {
            document.getElementById("add-post").style.setProperty("display" , "block" , "important")
        }
        element.forEach(element => {
            element.style.display = 'flex'
        });
    }
    else{

        document.getElementById("logingroupe").style.setProperty("display" , "flex" , "important");
        document.getElementById("logoutgroupe").style.setProperty("display" , "none" , "important");
        if(document.getElementById("add-post") !== null) {
            document.getElementById("add-post").style.setProperty("display" , "none" , "important")
        }
        element.forEach ( element => {
            element.style.display = 'none'
        });
        
    }
}




const btnLogin = document.getElementById('loginButton');
         
// function of login 

btnLogin.onclick = () =>{
    
    const url =  `${BaseUrl}login`
    const usernameData = document.getElementById("loginUserame").value;
    const passwordData = document.getElementById("loginPassword").value;
    if ( usernameData !== null && passwordData !== null){

        body = {
            username : usernameData ,
            password : passwordData
        }
        axios.post( url , body )
        .then((res) => {
            window.localStorage.setItem("token" ,res.data.token);
            window.localStorage.setItem("user",JSON.stringify(res.data.user));
            handlBtn();
            alert("login succes")
            document.getElementById('closeLogin').click();
        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
    }
   
}
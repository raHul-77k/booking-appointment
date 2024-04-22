function userDetails(event){
    event.preventDefault();
    console.log('we are in userDetails onclick function');
    const Name=event.target.Name.value;
    const Phone=event.target.Phone.value;
    const Email=event.target.Email.value;
     const obj={
        Name,
        Phone,
        Email
     };
     console.log(obj);
     axios.post('http://localhost:4000/admin/add-user',obj)
     .then(response=>{
        console.log('axios post');
        console.log(response);
        showUserOnScreen(response.data.newUserDetails);
        
     });
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:4000/admin/get-user')
    .then((response)=>{
        console.log('in window loader axios get');
        console.log(response.data.alluser);
        for(var i=0;i<response.data.alluser.length;i++){
            showUserOnScreen(response.data.alluser[i]);
        }
       
    }).catch(err=>{
        console.log(err);
        console.log('axios error window get');
    }
        );
});
 function showUserOnScreen(users){
    document.getElementById('Name').value="";
    document.getElementById('Phone').value="";
    document.getElementById('Email').value="";
    const uL=document.getElementById('ullist');
    const newLi=document.createElement('li');
    const dltbtn=document.createElement('button');
    dltbtn.textContent='DELETE';
    dltbtn.id='delete';
    const editbtn=document.createElement('button');
    editbtn.textContent='EDIT';
    editbtn.id='edit';
    dltbtn.addEventListener('click',(event)=>{
        console.log('in delete functionality');
       console.log('object sent to router');
        console.log(users);
        
        axios.delete(`http://localhost:4000/admin/delete/${users.id}`)
        .then(response=>{
            console.log('in delete axios then');
            console.log(response);
            uL.removeChild(event.target.parentElement);
            console.log('child deleted from uL');
        }).catch(err=>console.log(err));
    });
    newLi.textContent=`${users.name} ${users.phone} ${users.email}` ;
    newLi.appendChild(dltbtn);    
    newLi.appendChild(editbtn);    
    uL.appendChild(newLi);

};
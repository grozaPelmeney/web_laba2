
let ROOT_URL = 'http://localhost:8000/';


function Validation(email,psw)
{
    
    if(email == '')
    {
        alert('Не заполнен email');
        return false;    
    }
    
    if(psw == '')
    {
        alert('Не заполнен ПАРОЛЬ');
        return false;    
    }
    
    if(psw.length < 6)
    {
      alert('Длинна пароля - минимум 6 символов');
      return false;
    }
    return true;
}



const onLoad = async() => {
  console.log('loaded doc');


  document.getElementById('login-button').onclick = async() =>{

  
  let email = document.getElementById('email').value;
  let psw = document.getElementById('psw').value;

  
  if(!Validation(email,psw)){
        return 0;
  }
  
    

const login_data = {
    email:email,
    password:psw,
    }

    console.log(login_data);

   
    let response = await fetch(`${ROOT_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(login_data),
  });
  console.log(response.json());
  console.log(response.status);
  // if(response.status == 401)
  // {
  //   alert("Слишком короткое или длинное имя")
  // } 
  if(response.status == 400)
  {
    alert("Неправильный email или пароль")
    return 0;
  } 
  
  window.location.href = ROOT_URL + 'list';
  // if(response.status == 403)
  // {
  //   alert("короткий пароль")
  // } 

  
  alert(password);
};

};
document.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('DOMContentLoaded', onLoad);

let ROOT_URL = 'http://localhost:8000/';


function Validation(email,userName,psw,pswRepeat)
{
    if(userName == '')
    {
        alert('Не заполнен ИМЯ');
        return false;    
    }
    if(email == '')
    {
        alert('Не заполнен email');
        return false;    
    }
    if(pswRepeat == '')
    {
        alert('Вы не подтвердили пароль');
        return false;    
    }
    if(psw == '')
    {
        alert('Не заполнен ПАРОЛЬ');
        return false;    
    }
    if(psw.localeCompare(pswRepeat))
    {
      alert('Пароли не совпадают');
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


  document.getElementById('register-button').onclick = async() =>{
  let email = document.getElementById('email').value;
  let userName = document.getElementById('userName').value;
  let psw = document.getElementById('psw').value;
  let pswRepeat = document.getElementById('psw-repeat').value;


  
  if(!Validation(email,userName,psw,pswRepeat)){
        return 0;
  }
  
    

const register_data = {
    name:userName,
    email:email,
    password:psw,
    }

    console.log(register_data);

   
    let response = await fetch(`${ROOT_URL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(register_data),
  });
  console.log(response.status);
  if(response.status == 401)
  {
    alert("Слишком короткое или длинное имя")
    return 0;
  } 
  if(response.status == 402)
  {
    alert("Неправильный email или пользовательс таким email уже зарегестрирован")
    return 0;
  } 
  if(response.status == 403)
  {
    alert("короткий пароль")
    return 0;
  } 

  alert("Вы успешно зарегестрированы");
  window.location.href = ROOT_URL;
};

};
document.addEventListener('DOMContentLoaded', onLoad);
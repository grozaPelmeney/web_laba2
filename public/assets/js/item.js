
let ROOT_URL = 'http://localhost:8000/';



async function getItem(){
    let response = await fetch(`${ROOT_URL}item_car`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      return response;
   
  }



const onLoad = async() => {
  
  console.log('loaded doc');
  const id = location.pathname.split('/')[2];
  let response = await fetch(`${ROOT_URL}item_car?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
 
  const item = await response.json();

  for (key in item) {
    const tableRow = document.getElementById(key);
    if(tableRow != null)
    {
      const td = document.createElement("td");
      td.textContent = item[key];
      console.log(td);
      tableRow.appendChild(td);
    }
  }
  
  image = document.getElementById("loaded-photo");
  image.src = item.main_photo;



  

  document.getElementById("go-to-redact").onclick = async() =>{
    window.location.href = ROOT_URL + 'redact/' + id;
  }

};

document.addEventListener('DOMContentLoaded', onLoad);

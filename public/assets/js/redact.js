
let ROOT_URL = 'http://localhost:8000/';



///////////////////////////////////////////////////
function onPhotoLoad(e)
{
  
    const target = e.target;
    if (!target.files.length) {
        alert('Ничего не загружено');
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function() {
        document.getElementById("loaded-photo").src = fileReader.result;
    }

    fileReader.readAsDataURL(target.files[0]);
}


async function getAllItems(){
    let response = await fetch(`${ROOT_URL}show_base`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      return response;
   
  }




  async function getAllFeatures(){
    let response = await fetch(`${ROOT_URL}show_feature`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
  
      return await response.json();
   
  }
  
  
  async function getAllBases(){

    let response = await fetch(`${ROOT_URL}show_base`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
  
      return await response.json();
   
  }
  









const onLoad = async() => {
  
///////////////////////
  document.getElementById("input-photo").onchange = (e) =>{
    onPhotoLoad(e);
  }

  document.getElementById("button-photo").onclick = () =>{

    document.getElementById("input-photo").click();
    
  }
////////////////////


  const id = location.pathname.split('/')[2];
  let response = await fetch(`${ROOT_URL}item_car?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
 
  const item = await response.json();

  for (key in item) {
    const input = document.getElementById(key);
    if(input != null)
    {
      input.value = item[key];
      console.log(input);
     
    }
  }
  
  image = document.getElementById("loaded-photo");
  image.src = item.main_photo;

////////////////////////////////////////////////////////////////////////

  document.getElementById("button-save-info").onclick = async() =>{


    let isEmpty = false;
    const divs = document.getElementsByClassName("input-row");
    
    let carInfo = []
  
    let i = 0;
    for(const div of divs)
    {
      const inputElements = div.querySelectorAll("input, select");
      carInfo[i++] =  (inputElements[0].value);
    }
  
  
  
  
    let newCar = {
          id_car:id,
          name:carInfo[2],
          engine_volume:carInfo[3],
          power:carInfo[4],
          torque:carInfo[5],
          fuel:carInfo[6],
          tires:carInfo[7],
          weight:carInfo[8],
          sizes:carInfo[9],
          fuel_tank_volume:carInfo[10],
          
          description:document.getElementById("description").value,
          
          id_feature:document.getElementById("feature-select")[document.getElementById("feature-select").selectedIndex].id,
          id_base:document.getElementById("base-select")[document.getElementById("base-select").selectedIndex].id,
    };
  
    const new_photo = ((document.getElementById("loaded-photo").src).split("base64,")[1]);

  
    if(new_photo != null)
    {
      newCar["photo"] = new_photo;
    }
    console.log(newCar);
    
    for (key in newCar) {
      
      if((newCar[key] == null || newCar[key] == "") && key != "photo")
      {
        isEmpty=true;
      }
    }
  
    console.log(newCar);
    
    if(isEmpty)
    {
      alert("Не все поля заполнены");
      return 0;
    }
  
    console.log(newCar);
  
    let response = await fetch(`${ROOT_URL}update_car`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newCar),
    });
  
  
    
    
    window.location.href = ROOT_URL + 'item/' + id;
    
   console.log(carInfo);
  
  }








  let features = await getAllFeatures();
  console.log(features);
  
  const selectFeature =  document.getElementById("feature-select");
  for (const feature of features) {
    const option = document.createElement("option");
    option.id = feature.id
    option.textContent = feature.name;
  
    selectFeature.appendChild(option);
  }
  
  let bases = await getAllBases();
  const baseFeature =  document.getElementById("base-select");
  for (const base of bases) {
    const option = document.createElement("option");
    option.id = base.id
    option.textContent = base.name;
  
    baseFeature.appendChild(option);
  }











  console.log('loaded doc');

  document.getElementById('catalog').onclick = () => {
    window.location.href = ROOT_URL + 'list';
  };

document.getElementById("button-delete").onclick = async() => {
  let response = await fetch(`${ROOT_URL}delete_car?id_car=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },

  });

  window.location.href = ROOT_URL + 'list';
}
  
 
};

document.addEventListener('DOMContentLoaded', onLoad);


let ROOT_URL = 'http://localhost:8000/';




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



const onLoad = async() => {
  console.log('loaded doc');

/////////////////////////////////photo
  document.getElementById("input-photo").onchange = (e) =>{
    onPhotoLoad(e);
  }

  document.getElementById("button-photo").onclick = () =>{

    document.getElementById("input-photo").click();
    
  }

/////////////////////////////////load features and bases

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

/////////////////////////////////load info 

document.getElementById("button-send-info").onclick = async() =>{


  let isEmpty = false;
  const divs = document.getElementsByClassName("input-row");
  
  let carInfo = []

  let i = 0;
  for(const div of divs)
  {
    const inputElements = div.querySelectorAll("input, select");
    carInfo[i++] =  (inputElements[0].value);
  }




  const newCar = {
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
        photo:((document.getElementById("loaded-photo").src).split("base64,")[1]),
  
        id_feature:document.getElementById("feature-select")[document.getElementById("feature-select").selectedIndex].id,
        id_base:document.getElementById("base-select")[document.getElementById("base-select").selectedIndex].id,
  };

 
  
  for (key in newCar) {
    
    if(newCar[key] == null || newCar[key] == "")
    {
      isEmpty=true;
    }
    
  }


  
  if(isEmpty)
  {
    alert("Не все поля заполнены");
    return 0;
  }

  console.log(newCar);

  let response = await fetch(`${ROOT_URL}create_car`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newCar),
  });


  const resp = await response.json();
  
  window.location.href = ROOT_URL + 'item/' + resp.id;
  
 console.log(carInfo);

}
 ///////////////////////////////////////////////////////////add base
document.getElementById("button-add-base").onclick = async() =>{
  
  const name = document.getElementById("base-input").value;
  const new_base = {
    name:name,
  }

  let isEmpty = false;
  for (key in new_base) {
    
    if(new_base[key] == null || new_base[key] == "")
    {
      isEmpty=true;
    }
    
  }
  if(isEmpty)
  {
    alert("Не все поля заполнены");
    return 0;
  }

  let response = await fetch(`${ROOT_URL}create_base`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(new_base),
  });
  console.log(response.json()); 
 
}


 ///////////////////////////////////////////////////////////add feature
 document.getElementById("button-add-feature").onclick = async() =>{
 
  const name = document.getElementById("feature-input").value;
  const new_feature = {
    name:name,
  }

  let isEmpty = false;
  for (key in new_feature) {
    
    if(new_feature[key] == null || new_feature[key] == "")
    {
      isEmpty=true;
    }
    
  }
  if(isEmpty)
  {
    alert("Не все поля заполнены");
    return 0;
  }







  let response = await fetch(`${ROOT_URL}create_feature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(new_feature),
  });
  console.log(response.json()); 
 
}

};

document.addEventListener('DOMContentLoaded', onLoad);

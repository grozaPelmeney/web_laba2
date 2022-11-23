
let ROOT_URL = 'http://localhost:8000/';




async function getAllItems(){
    let response = await fetch(`${ROOT_URL}show_car`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      return await response.json();
   
  }



const onLoad = async() => {
  
  console.log('loaded doc');

  //document.getElementById('catalog').onclick = async() => {
    let items = await getAllItems();
    
    for (const item of items) {
    const element = document.createElement("div");
    element.classList.add("item");

    const title = document.createElement("p");
    title.textContent = item.name;
    
    const href = document.createElement("a");
   

    const button = document.createElement("button");
    button.classList.add("go-to-item");
    button.id = item.id;
    button.textContent = "Подробнее";
    
    const image = document.createElement("img");
    image.src = item.main_photo;
    
    href.appendChild(button);
    element.appendChild(image);
    element.appendChild(title);
    element.appendChild(href);
    document.querySelector(".content").appendChild(element);
    




    ////////////////////////////////////////
  
  }

  
  const elements = document.getElementsByClassName("go-to-item");
  
  for(const element of elements)
  {
    element.onclick = async() =>{
      window.location.href = ROOT_URL + 'item/' + element.id;
      }
  }
 
};

document.addEventListener('DOMContentLoaded', onLoad);



//Formulario
const form = document.getElementById("text-input");

//Input de la ciudad
const cityInput = document.getElementById("cityInput");



const waitMsgContainer = document.getElementById("cityText")


//Texto "Ingrese una ciudad" debe ser ELIMINADO
const waitMsg = document.getElementById("cityContainer")


const cardContainer = document.querySelector(".card-container")
//Guardamos el array de ciudades
//*? .........................................................
let cities = JSON.parse(localStorage.getItem('cities'))|| [];

// Funcion para guardar en el local storage

const saveLocalStorage = (citiesList) =>{
    localStorage.setItem('cities', JSON.stringify(citiesList));
}
//*? .........................................................


//Funcion para renderizar el clima HTML

const renderCity =city =>{
    return `
    



    <div class="weather-card animate">
    <div class="closeMarkSpan "><i class="closeMark close fa-sharp fa-solid fa-xmark" data-id="${city.id}"></i></div>

      <div class="weather-info-container">

              <h2 class="weather-title">${city.name}</h2>
              <p class="weather-description">${city.weather[0].description}</p>
              <div class="weather-temp-container">
                <span class="weather-temp">${Math.round(Number(city.main.temp) - 273) }°</span>
                <span class="weather-st">>${Math.round(Number(city.main.feels_like) - 273)}° ST</span>
              </div>
            </div>
            <div class="weather-img-container">
            <img src="./assets/img/${city.weather[0].icon}.png" alt="weather image">
            </div>
            <div class="weather-extra-container">
              <div class="weather-minmax-container">
                <span class="weather-span"><i class="fa-solid fa-arrow-up-long"></i>Max: ${Math.round(Number(city.main.temp_max) - 273)}º</span>
                <span class="weather-span"><i class="fa-solid fa-arrow-down-long"></i>Min: ${Math.round(Number(city.main.temp_min) - 273)}º</span>
         </div>
       <span class="weather-humidity"${city.main.humidity}% Humedad</span>
    </div>
    </div>

    `
}


//Funcion para la logica de renderiado 


const renderCitiesList = citiesList =>{
    cardContainer.innerHTML= citiesList.map(city => renderCity(city)).join("")
}

//Buscar la ciudad
const searchCity = async event =>{
    event.preventDefault();
    //capturar valor del input
    const searchedCity = cityInput.value.trim();
    if(searchedCity === ""){
        alert("Por favor ingrese una ciudad");
        return;
    }



    // Pasar valor del input a la funcion requestCity del archivo request.js
    const fetchedCity = await requestCity(searchedCity);
    
    //Alerta por si no existe una ciudad con ese nombre
    if(!fetchedCity.id){
        alert('La ciudad ingresada no existe.');
        form.reset();
        return;
    }
    //Si la ciudad ya fue agregada a la lista de ciudades
    else if(cities.some(city => city.id === fetchedCity.id)){
        alert("Ya estamos mostrando el clima de esa ciudad")
        form.reset();
        return;
    }

    cities = [fetchedCity, ...cities];
    renderCitiesList(cities);
    saveLocalStorage(cities);
    hideWaitMsg(cities.length);

    form.reset();
}
//funcion para ocultar el mensaje cuando ya tengamos una ciudad
const hideWaitMsg = city =>{
    if(city.length !== 0){
       waitMsg.classList.add("hidden");
       
        return;
    }
    else{
        
        waitMsg.classList.remove("hidden");
        //waitMsgContainer.createElement('<p id="cityContainer">Ingrese una ciudad</p>')
    }
}


//Funcion para eliminar una ciudad
const removeCity = event =>{
    //Si el objeto que clickeamos no contiene la clase "close" se retorna
    if(!event.target.classList.contains('close')) return;
    //Sino
    //Guardamos el dataset de la etiqueta <i></i> (la X para cerrar una card)
    const filterId = Number(event.target.dataset.id);
    //Si el usuario confrima el querer borrar la pagina elimina la ciudad a traves de su id utiliando un filter
    if(window.confirm('¿Estas seguro que queres eliminar esta card de clima?')){
        cities = cities.filter(city => city.id !== filterId);
        renderCitiesList(cities);
        saveLocalStorage(cities);
        hideWaitMsg(cities);
    }

}

const init = ()=>{

    renderCitiesList(cities);
    
    hideWaitMsg(cities)
    
    form.addEventListener('submit',searchCity)
    cardContainer.addEventListener('click', removeCity);
};


init();

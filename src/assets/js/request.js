const key= "3e69345982e760a68675c6c8db7165ea";



const requestCity = async(city) =>{
    const baseURL ='https://api.openweathermap.org/data/2.5/weather';

    const query = `?q=${city}&appid=${key}`;

    const response = await fetch(baseURL + query)
    const json = await response.json();

    return json;
};

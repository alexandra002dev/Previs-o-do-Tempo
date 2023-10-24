let aviso = document.querySelector(".aviso");

document.querySelector(".busca").addEventListener("submit", async (event)=>{
    event.preventDefault();
    let input = document.querySelector("#searchInput").value;

    if(input != ""){
      limparInfo();
      mostrarAviso("Carregando...")
      let url =` https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b74023e8fa691037aaa1c471c00e4782&units=metric&lang=pt_br`;
      let resultado = await fetch(url);
      let json = await resultado.json();
      
      if(json.cod === 200){
        mostrarInfo({
            name: json.name,
            pais: json.sys.country,
            temperatura: json.main.temp,
            iconTemp: json.weather[0].icon,
            ventoVelocidade: json.wind.speed,
            ventoAngulo: json.wind.deg

        });
      }else{
        limparInfo();
        mostrarAviso("Não encontramos essa localização");
      }
      
    }else{
      limparInfo();
    }
});
function mostrarInfo(json){
    mostrarAviso("");
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.pais}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temperatura}<span>ºC</span>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.ventoVelocidade}<span>km/h</span>`;
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.ventoAngulo-90}deg)`;
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.iconTemp}@2x.png`);
    document.querySelector(".resultado").style.display = "block";
}

function mostrarAviso(msg){
    aviso.innerHTML = msg;
}

function limparInfo(){
  mostrarAviso("");
  document.querySelector(".resultado").style.display = "none";
}
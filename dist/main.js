(()=>{async function e(e){try{const n=await async function(e){const t=await fetch("https://api.weatherapi.com/v1/current.json?key=20f112c532fa4178a5f12253232203&q="+function(e){return"number"==typeof e?e:e.replace(/ /g,"+")}(e));return t.json()}(e),{location:r,condition:c,temperatureF:a,temperatureC:o}=function(e){return{location:e.location.name,condition:e.current.condition.text,temperatureF:e.current.temp_f,temperatureC:e.current.temp_c}}(n);return function(e,n,r,c){new t(e,n,r,c),document.getElementById("searchError").style.display="none"}(r,c,a,o),n}catch(e){console.error(e),document.getElementById("searchError").style.display="block"}}function t(e,t,n,r){this.location=e,document.getElementById("location").innerHTML=e,this.conition=t,document.getElementById("condition").innerHTML=t,this.temperatureF=n,this.temperatureC=r,temperature=document.getElementById("temperature"),temperature.innerHTML=function(e,t){return temperature.classList.contains("farenheit")?e+" °F":t+" °C"}(n,r),document.getElementById("changeUnit").addEventListener("click",(function(){temperature.innerHTML=function(e,t){return temperature.classList.contains("farenheit")?(temperature.classList.remove("farenheit"),temperature.classList.add("celsius"),t+" °C"):(temperature.classList.remove("celsius"),temperature.classList.add("farenheit"),e+" °F")}(n,r)}))}document.getElementById("changeUnit");const n=document.getElementById("locationQ");document.getElementById("submit").addEventListener("click",(function(){event.preventDefault();let t=n.value;e(t),console.log(t),n.value=""})),document.getElementById("temperature").classList.add("farenheit"),e("London")})();
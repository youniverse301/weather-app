(()=>{const e=document.getElementById("locationQ");document.getElementById("submit").addEventListener("click",(function(){event.preventDefault();let t=e.value;document.getElementById("temperature").classList.add("farenheit"),n(t),e.value=""}));let t="London";async function n(e){try{const n=await async function(e){const t=await fetch("https://api.weatherapi.com/v1/current.json?key=20f112c532fa4178a5f12253232203&q="+function(e){return"number"==typeof e?e:e.replace(/ /g,"+")}(e));return t.json()}(e),{location:c,condition:o,temperatureF:a,temperatureC:i}=function(e){return{location:e.location.name,condition:e.current.condition.text,temperatureF:e.current.temp_f,temperatureC:e.current.temp_c}}(n);return function(e,t,n,c){new r(e,t,n,c),document.getElementById("searchError").style.display="none"}(c,o,a,i),t=e,n}catch(e){console.error(e),document.getElementById("searchError").style.display="block"}}function r(e,t,n,r){document.getElementById("location").innerHTML=e,document.getElementById("condition").innerHTML=t;let c="farenheit",o=n;const a=document.getElementById("temperature");a.innerHTML=function(e,t){return document.getElementById("temperature").classList.contains("farenheit")?e+" °F":t+" °C"}(o,c),document.getElementById("changeUnit").addEventListener("click",(function(){"farenheit"===c?(c="celsius",o=r+" °C"):(c="farenheit",o=n+" °F"),a.innerHTML=o}))}document.getElementById("temperature").classList.add("farenheit"),n(t)})();
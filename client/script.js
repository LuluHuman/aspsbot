function generate() {
  const element = document.createElement("div")
  const button = document.getElementById("generate")
  element.className = "loader";

  
  button.innerHTML = ""
  button.appendChild(element); 
  
  const Http = new XMLHttpRequest();
  const url = 'https://asps.mason-bot.xyz/get';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    document.location.href = Http.responseText
  }
}
// <b>Currently Editing Site</b> <div id="web-loader" class="page-loader" style="text-align: center;"><div class="loader" style="width: 120px; height: 120px; border: 10px solid #dd8844; border-top: 10px solid #8c3fff; "></div></div>
  
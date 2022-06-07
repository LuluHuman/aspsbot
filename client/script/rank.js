const rankc = document.getElementById("list")
function makeTxt(rank,name,xp,lvl,pfp){
	const rankp = document.createElement("p");
	const row = document.createElement("div");
	const img = document.createElement("img");
	row.style = "margin: 20px;"
	img.width = "50"
	img.src = pfp
	if(rank == 1){
		rankp.style="color: #FFD700;"
	}
	if(rank == 2){
		rankp.style="color: #C0C0C0;"
	}
	if(rank == 3){
		rankp.style="color: #CD7F32;"
	}
  rankp.innerHTML = `${rank}. ${name} •   XP:${xp} Level: ${lvl}`
  rankc.appendChild(row)
	row  .appendChild(rankp)
	row  .appendChild(img)
}

function getRanks() {
    return fetch('https://asps.mason-bot.xyz/getRanks',
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch(error => console.warn(error));
}

async function Main(){

	var count = 0
	const lb = await getRanks()
 console.log(lb)
	for (let user in lb) {
		count++
		let name = user.split(";")[0]
		let pfp = user.split(";")[1]
		let xp = lb[user]

		var lvl = 0
    if(xp >= 1000 && xp < 2000){lvl = 1}
    if(xp >= 2000 && xp < 4000){lvl = 2}
    if(xp >= 4000 && xp < 5000){lvl = 3}
    if(xp >= 5000 && xp < 6000){lvl = 4}
    if(xp >= 6000 && xp < 8000){lvl = 5}
    if(xp >= 8000 && xp < 9000){lvl = 6}
    if(xp >= 9000 && xp < 10000){lvl = 7}
    if(xp >= 10000 && xp < 11000){lvl = 8}
    if(xp >= 11000 && xp < 12000){lvl = 9}
    if(xp >= 12000){lvl = 10}
		makeTxt(count,name,xp,lvl,pfp)
	}
}

Main()
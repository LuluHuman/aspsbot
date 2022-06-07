fetch("https://*URL/getGuild")
  .then(response => {
    return response.blob()
  })
  .then(data => {
    return data.text()
  })
  .then(stringData => {
    const data = JSON.parse(stringData)
		console.log(data)
    if (data.errors) {
      document.getElementById("guildIcon").src = `https://mason-bot.xyz/assets/Angry.png`
      document.getElementById("guildIcon").width = "128"
      document.title = "Mason Bot - Invalid server id"
      document.getElementById("guildName").innerHTML = "Invalid server id"
      document.getElementById("info").innerHTML = ""
      return
    }
    if (!data.icon) {
      document.getElementById("guildIcon").src = `https://mason-bot.xyz/assets/guildIcon.png`
    } else {
      document.getElementById("guildIcon").src = `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=128`
    }
    document.title = "Dashboard"
    document.getElementById("guildName").innerHTML = data.name
    document.getElementById("info").innerHTML = `
          Members: ${data.memberCount} | Region: ${data.region}
          `

		const logs = document.getElementById("logs")
		const list = JSON.parse(data.log)
		for (var intDate in list) {
				 var jsonList = list[intDate]
				const tr = document.createElement("tr");
				tr.style="text-align: center;"
				const date = document.createElement("td");
				date.innerHTML = intDate
				const user = document.createElement("td");
				user.innerHTML = jsonList.user
				const activity = document.createElement("td");
				activity.innerHTML = jsonList.action
				
				logs.appendChild(tr);
				tr.appendChild(date);
				tr.appendChild(user);
				tr.appendChild(activity);
		}
  })


var wConnect = false
var connected = false
var ws

function getViews() {
	ws.send(JSON.stringify({getViews: true}))
}

function getClicks() {
	ws.send(JSON.stringify({getClicks: true}))
}

function sendMsg(sendData, bypass=false) {
	if (ws.readyState == WebSocket.OPEN && (connected || bypass)) {
		ws.send(JSON.stringify(sendData))
	}
}

function connectToServer() {
	if (ws) {
		if (ws.readyState == WebSocket.OPEN) {
			ws.close()
		}
	}
	console.log("Connecting...")
	connected = false
	ws = new WebSocket("wss://server.silverspace.online:443")
	ws.addEventListener("open", (event) => {
		ws.send(JSON.stringify({connect: "silver"}))
	})
	
	ws.addEventListener("message", (event) => {
		let msg = JSON.parse(event.data)
		if (msg.connected) {
			console.log("Connected")
            connected = true
			ws.send(JSON.stringify({view: id}))
		}
		if (msg.ping && !document.hidden) {
			ws.send(JSON.stringify({ping: true}))
		}
		if (msg.views) {
			console.log(JSON.stringify(msg.views))
		}
		if (msg.clicks) {
			console.log(JSON.stringify(msg.clicks))
		}
        if (msg.history) {
            chat = msg.history
			setTimeout(() => {
				chatC.off.y = ui.measureText(30*su, chat.join(" \n"), {wrap: chatC.width-30*su}).lines*-30*su*ui.fontSizeMul*ui.spacingMul + chatC.height - 15*su
				chatC.loff.y = chatC.off.y
			}, 1000)
        }
        if (msg.chat) {
            chat.push(msg.chat)
            if (chat.length > 100) {
				chat.splice(0, 1)
			}
			let tscroll2 = ui.measureText(30*su, chat.join(" \n"), {wrap: chatC.width-30*su}).lines*-30*su*ui.fontSizeMul*ui.spacingMul + chatC.height - 15*su
			if (Math.abs(chatC.off.y - tscroll2) < 400*su) {
				tscroll = tscroll2
           		tscrolling = true
			}
        } 
        if (msg.deleteMsg) {
            chat.splice(msg.deleteMsg, 1)
			let tscroll2 = ui.measureText(30*su, chat.join(" \n"), {wrap: chatC.width-30*su}).lines*-30*su*ui.fontSizeMul*ui.spacingMul + chatC.height - 15*su
			if (chatC.off.y < tscroll2) {
				tscroll = tscroll2
           		tscrolling = true
			}
        }
	})

	ws.addEventListener("close", (event) => {
		console.log("Disconnected")
		wConnect = true
	})
}

connectToServer()
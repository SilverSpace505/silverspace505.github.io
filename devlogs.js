
var devlogs = [
    ["I have recently figured out that my website could look a lot more professional if i use html instead of js canvas, in english this just means that i don't like how pixelated everything is, and so i'm fixing it. This is going to take me a while as my previous ui system had 2000 lines of code, and i'll need to rewrite all of it for the new strat, and i'll also need to adapt all my recent js games into the new ui system because it would make them keep up to date with any bugfixes i make. Here, you can see my progress so far. https://basic2.silverspace.online - i can't be bothered making it a actual link sry lol", "2024/2/23", [["assets/devlogs/basic2.webp", 1.47]]],
    ["I've made the devlog system, so i'll be a able to give updates on what i'm doing, currently i'm planning on making a better 3d engine, or just getting transparent faces working, i might also work on making my game engine usable for others. Since i feel like it could be useful to some people. \n \nI'm also going to work on making quadtree particles for a bit, it's basically life 1-3 but it runs 10x faster, and it should be able to handle very large amounts of particles with some careful coding.", "2024/2/18", ["assets/devlog.png", "assets/devlogs/quadtree-particles.webp"]],
    ["hmm, seems you've reached the end of the devlogs, i guess we have to wait until Silver does some more coding lol.", "2024/493/588", []],
]


var devlogY = 0

function devlogsTick() {
    ui.text(sidebar / 2, 50 * su, 75 * su, "Devlogs", {align: "center"})

    backButton.set(sidebar / 2, 150*su, sidebar*0.9, 50*su)
	backButton.basic()
	backButton.textSize = 35 * su
	backButton.textOff = -60 * su / 2
	backButton.bgColour = [0.25 * 255, 0.25 * 255, 0.25 * 255, 1]
	backButton.draw()
	ui.img(sidebar / 2 + 40 * su, 150 * su, 45 * su, 45 * su, hubImg)

	if (backButton.hovered() && mouse.lclick) {
		backButton.click()
		page = "silver"
	}
    
    let lines = ui.text(10 * su, 150 * su + 55 * su * 1, 20 * su, "Here, you can find updates on what i've done recently, or what i'm doing currently, i might put in some links for beta games in some cases.", {wrap: sidebar - 10 * su}).lines

    ui.rect(sidebar / 2, 150 * su + 55 * su * 1 + lines * 20 * su + 10 * su, sidebar, 5 * su, [255, 255, 255, 1])

    ui.setC(content)

    let y = 50*su
    let i = 0
    for (let devlog of devlogs) {
        i++
        y += 30*ui.fontSizeMul*su*ui.text(50*su, y, 30*su, devlog[0], {wrap: 1000*su}).lines + 50*su
        if (devlog[2].length > 0) {
            let x = 0
            for (let i in devlog[2]) {
                if (typeof devlog[2][i] == "string") {
                    ui.img(200*su+x, y+100*su, 300*su, 300*su, ui.getImg(devlog[2][i]))
                    x += 315*su
                } else {
                    ui.img(200*su*devlog[2][i][1]+x, y+100*su, 300*su*devlog[2][i][1], 300*su, ui.getImg(devlog[2][i][0]))
                    x += 300*su*devlog[2][i][1]+15*su
                }
            }
            y += 315*su
        }
        if (i < devlogs.length) ui.rect(content.width/2, y-25*su-30*su*ui.fontSizeMul/2, content.width, 5*su, [50, 50, 50, 1])
    }
    devlogY = y
    ui

    content.drawScroll({x: 10*su, y: 10*su}, 10*su)

    ui.setC()
}
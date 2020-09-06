const {createCanvas, loadImage, registerFont } = require("canvas")

registerFont("./fonts/Gayathri-Bold.ttf", { family: "Gayathri" })

function generateImage(width, height, backgroundColor, textColor) {
    if(width > 2048 || height > 2048)
        throw "The width or height can't be larger than 2048 pixels."

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = backgroundColor === undefined ? "#5ca0b9" : backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let fontSize = height / 5
    ctx.font = `${fontSize}px Gayathri`
    ctx.fillStyle = textColor === undefined ? "black" : textColor
    const text = `${width} x ${height}`

    let textMeasure = ctx.measureText(text)

    while(textMeasure.width >= canvas.width - (height * 0.1)) {
        fontSize -= 5
        ctx.font = `${fontSize}px Gayathri`
        textMeasure = ctx.measureText(text)
    }

    ctx.fillText(text, (canvas.width / 2) - (textMeasure.width / 2), (canvas.height / 2) + (textMeasure.emHeightDescent / 2))

    return canvas.toBuffer("image/png")
}

module.exports = { generateImage }
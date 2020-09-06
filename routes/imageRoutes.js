const router = require("express").Router()

const { generateImage } = require("../services/imageGenerator")

router.get("/:width/:height", (req, res) => {
    try {
        const image = generateImage(parseInt(req.params.width), parseInt(req.params.height))

        res.write(image, () => {
            console.log("Image was served.")
            res.end()
        })
    } catch(err) {
        res.status(400).send("Something went wrong: " + err)
    }
    
})

router.get("/:width/:height/:backgroundColor", (req, res) => {
    try {
        let color = getCorrectColor(req.params.backgroundColor)
        const image = generateImage(parseInt(req.params.width), parseInt(req.params.height), color)

        res.write(image, () => {
            console.log("Image was served.")
            res.end()
        })
    } catch(err) {
        res.status(400).send("Something went wrong: " + err)
    }
    
})

function getCorrectColor(colorString) {
    let color = colorString
    if(colorString.length > 4 && colorString.substring(0, 4).match("hex:")) {
        color = `#${colorString.substring(4)}`
    }

    return color
}

router.get("/:width/:height/:backgroundColor/:textColor", (req, res) => {
    try {
        const backgroundColor = getCorrectColor(req.params.backgroundColor)
        const textColor = getCorrectColor(req.params.textColor)
        const image = generateImage(parseInt(req.params.width), parseInt(req.params.height), backgroundColor, textColor)

        res.write(image, () => {
            console.log("Image was served.")
            res.end()
        })
    } catch(err) {
        res.status(400).send("Something went wrong: " + err)
    }
    
})

module.exports = router
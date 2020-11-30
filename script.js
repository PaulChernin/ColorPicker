let img = new Image()
img.crossOrigin = "Anonymous"

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')


function loadImageByURL(url) {
    img.src = url
}

let urlInput = document.getElementById('urlInput')
let urlSubmitButton = document.getElementById('urlSubmitButton')

urlSubmitButton.addEventListener('click', function() {
    let url = urlInput.value
    loadImageByURL(url)
})

img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

function pick(x, y) {
    let pixel = ctx.getImageData(x, y, 1, 1)
    let rgb = pixel.data
    
    return rgb
}

function rgbString(rgb) {
    return 'rgb(' + rgb[0] + ', ' + 
                    rgb[1] + ', ' +
                    rgb[2] + ')'
}

canvas.addEventListener('click', function(e) {
    let x = e.offsetX,
        y = e.offsetY

    let rgb = pick(x, y)

    let currentColor = document.getElementsByClassName('current-color')[0]
    currentColor.style.background = rgbString(rgb)

    let rgbValue = document.getElementsByClassName('rgb-value')[0]
    rgbValue.innerHTML = rgbString(rgb)
})

let defaultSrc = 'https://i.vimeocdn.com/video/703876203_1280x720.jpg'
loadImageByURL(defaultSrc)
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
    let rgba = pixel.data
    
    return rgba
}

function rgbaString(rgba) {
    return 'rgba(' + rgba[0] + ', ' + 
                    rgba[1] + ', ' +
                    rgba[2] + ', ' +
                    rgba[3] + ')'
}

canvas.addEventListener('click', function(e) {
    let x = e.offsetX,
        y = e.offsetY

    let rgba = pick(x, y)

    let currentColor = document.getElementsByClassName('current-color')[0]
    currentColor.style.background = rgbaString(rgba)

    let rgbaValue = document.getElementsByClassName('rgba-value')[0]
    rgbaValue.innerHTML = rgbaString(rgba)
})

let defaultSrc = 'https://i.vimeocdn.com/video/703876203_1280x720.jpg'
//loadImageByURL(defaultSrc)

//transparent image example: https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png
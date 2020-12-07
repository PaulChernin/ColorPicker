let img = new Image()
//img.crossOrigin = "Anonymous"

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')


function loadImageByURL(url) {
    img.src = url
}

// let urlInput = document.getElementById('urlInput')
// let urlSubmitButton = document.getElementById('urlSubmitButton')

// urlSubmitButton.addEventListener('click', function() {
//     let url = urlInput.value
//     loadImageByURL(url)
// })

img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

let fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', handleFile)

function handleFile(event) {
    let file = event.target.files[0]
    console.log(file)
    let reader = new FileReader()

    reader.onload = function(event) {
        img.src = event.target.result
    }

    reader.readAsDataURL(file)

}


function pick(x, y) {
    let pixel = ctx.getImageData(x, y, 1, 1)
    let rgba = pixel.data
    
    return rgba
}

function toRgba(arr) {
    return 'rgba(' + arr.join() + ')'
}

function to2digitHex(x) {
    let c = x.toString(16)
    if (c.length == 1)
        c = '0' + c
    return c
}

function toHex(arr) {
    return '#' + to2digitHex(arr[0]) +
                 to2digitHex(arr[1]) +
                 to2digitHex(arr[2])
}

function toCmyk(arr) {
    let r = arr[0] / 255
    let g = arr[1] / 255
    let b = arr[2] / 255

    let _k = 1 - Math.max(r, g, b)
    if (_k == 1) {
        return 'CMYK: 0%, 0%, 0%, 100%'
    }

    let c = Math.round(100 * (1 - r - _k) / (1 - _k))
    let m = Math.round(100 * (1 - g - _k) / (1 - _k))
    let y = Math.round(100 * (1 - b - _k) / (1 - _k))
    let k = Math.round(_k)

    return `CMYK: ${c}%, ${m}%, ${y}%, ${k}%`
}


function showColor(color) {
    let currentColorBlock = document.getElementsByClassName('current-color')[0]
    currentColorBlock.style.background = toRgba(color)
    
    let rgbaValue = document.getElementsByClassName('rgba-value')[0]
    rgbaValue.innerHTML = toRgba(color)
    let hexValue = document.getElementsByClassName('hex-value')[0]
    hexValue.innerHTML = toHex(color)
    let cmykValue = document.getElementsByClassName('cmyk-value')[0]
    cmykValue.innerHTML = toCmyk(color)
    
}

function addColorToPalette(color) {
    if (color === null) return
    
    let palette = document.getElementById('palette')
    let paletteColor = document.createElement('DIV')
    paletteColor.classList.add('palette__color')
    paletteColor.style.background = toRgba(color)
    palette.prepend(paletteColor)

    if (palette.children.length > 5) {
        console.log('o')
        palette.removeChild(palette.lastElementChild)
    }

}

let currentColor = null

canvas.addEventListener('click', function(e) {
    let x = e.offsetX,
    y = e.offsetY
    
    addColorToPalette(currentColor)
    let color = pick(x, y)
    showColor(color)
    currentColor = color
})

// let defaultSrc = 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png'
//let defaultSrc = 'https://i.vimeocdn.com/video/703876203_1280x720.jpg'
//loadImageByURL(defaultSrc)


let img = new Image()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


function loadImageByURL(url) {
    img.src = url
}

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
    
    return pixel.data
}

function toRgb(arr) {
    return 'rgb(' + arr.slice(0, 3).join() + ')'
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
    currentColorBlock.style.background = toRgb(color)
    
    let rgbValue = document.getElementsByClassName('rgb-value')[0]
    rgbValue.innerHTML = toRgb(color)
    let hexValue = document.getElementsByClassName('hex-value')[0]
    hexValue.innerHTML = toHex(color)
    let cmykValue = document.getElementsByClassName('cmyk-value')[0]
    cmykValue.innerHTML = toCmyk(color)
}

const MAX_COLOR_BLOCKS = 8

let nextColorBlock = 1

function addColorToPalette(color) {
    if (color === null) return
    
    colorBlock = document.querySelector('#palette :nth-child(' + nextColorBlock + ')')
    colorBlock.style.background = toRgb(color)
    
    nextColorBlock++
    
    if (nextColorBlock == MAX_COLOR_BLOCKS + 1) {
        nextColorBlock = 1
    }
}

canvas.addEventListener('click', function(e) {
    let x = e.offsetX,
    y = e.offsetY
    
    let color = pick(x, y)
    showColor(color)
    addColorToPalette(color)
})

const colorBlocks = Array.from(document.getElementById('palette').children)

function colorStringToArray(str) {
    let array = str.split(', ')
    array[0] = array[0].substr(4)
    array[2] = array[2].substr(0, array[2].length - 1)
    return array
}

colorBlocks.forEach(element => {
    element.addEventListener('click', e => {
        let el = e.toElement
        let colorString = el.style.backgroundColor

        let color = colorStringToArray(colorString)
        
        showColor(color)
    })
});
function makeLetters() {
    var size = 0
    if (window.innerHeight < window.innerWidth) {
        size = window.innerHeight
    } else {	
        size = window.innerWidth
    }
    
    var circleContainer = document.querySelector(".circle-container")
    circleContainer.parentNode.style.width = `calc(${size}px - 12vh)`
    circleContainer.parentNode.style.height = `calc(${size}px - 12vh)`

    const ContainerWidth = circleContainer.clientWidth
    const ContainerHeight = circleContainer.clientHeight

    var divLetters = Array.from(circleContainer.querySelectorAll(".letter"))

    var index = 0
    var angle = 0
    var radius = (((ContainerHeight * .966) / 2) - (divLetters[0].clientHeight / 2))
    for (letter of divLetters) {
        var width = letter.clientWidth
        var height = letter.clientHeight

        var step = (2 * Math.PI) / circleContainer.childElementCount

        var x = Math.round(ContainerWidth / 2 + radius * Math.cos(angle) - width / 2)
        var y = Math.round(ContainerHeight / 2 + radius * Math.sin(angle) - height / 2)

        letter.style.left = x + "px"
        letter.style.top = y + "px"

        circleContainer.replaceChild(letter, circleContainer.children[index])

        angle += step
        index++
    }
}

window.addEventListener("resize", makeLetters)

makeLetters()
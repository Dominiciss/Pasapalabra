var pasapalabra = document.querySelector(".pasapalabra")
var circleContainer = pasapalabra.querySelector(".circle-container")
var divLetters = Array.from(circleContainer.querySelectorAll(".letter"))
var letterSaved = ""
var indexSaved = 0

divLetters.forEach((letter, index) => {
    letter.addEventListener("click", () => {
        var register = pasapalabra.querySelector(".register")

        divLetters.forEach((letter_) => {letter_.style.backgroundColor = "transparent"})

        register.querySelector(".word").value = (letter.getAttribute("word") == null) ? "" : letter.getAttribute("word")
        register.querySelector(".hint").value = (letter.getAttribute("hint") == null) ? "" : letter.getAttribute("hint")

        pasapalabra.querySelector(".title").setAttribute("hidden", "true")
        register.setAttribute("hidden", "false")

        letter.style.backgroundColor = "var(--secondary)"

        indexSaved = index
        letterSaved = letter
    })

    circleContainer.replaceChild(letter, circleContainer.children[index])
})

pasapalabra.querySelector(".register > .submit").addEventListener("click", () => {
    divLetters.forEach((letter_) => {letter_.style.backgroundColor = "transparent"})

    var register = pasapalabra.querySelector(".register")

    pasapalabra.querySelector(".title").setAttribute("hidden", "false")
    register.setAttribute("hidden", "true")

    var word = register.querySelector(".word").value
    var hint = register.querySelector(".hint").value

    letterSaved.setAttribute("word", word)
    letterSaved.setAttribute("hint", hint)

    circleContainer.replaceChild(letterSaved, circleContainer.children[indexSaved])
})


document.querySelector(".create").addEventListener("click", () => {
    getRequest = ""
    divLetters.forEach((letter, index) => {
        var word = letter.getAttribute("word")
        var hint = letter.getAttribute("hint") 
        getRequest += `letter${index}=["${(word == null) ? "" : word}","${(hint == null) ? "" : hint}"]&`
    })
    window.location = "./pages/game.html?" + getRequest
})
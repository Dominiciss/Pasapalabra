var pasapalabra = document.querySelector(".pasapalabra")
var circleContainer = pasapalabra.querySelector(".circle-container")
var divLetters = Array.from(circleContainer.querySelectorAll(".letter"))
var letterSaved = ""
var indexSaved = 0

divLetters.forEach((letter, index) => {
    letter.addEventListener("click", () => {
        var register = pasapalabra.querySelector(".register")

        divLetters.forEach((letter_) => { letter_.style.backgroundColor = "transparent" })

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

pasapalabra.querySelector(".register > .return").addEventListener("click", () => {
    divLetters.forEach((letter_) => { letter_.style.backgroundColor = "transparent" })

    pasapalabra.querySelector(".title").setAttribute("hidden", "false")
    pasapalabra.querySelector(".register").setAttribute("hidden", "true")
})

pasapalabra.querySelector(".register > .submit").addEventListener("click", () => {
    divLetters.forEach((letter_) => { letter_.style.backgroundColor = "transparent" })

    var register = pasapalabra.querySelector(".register")

    pasapalabra.querySelector(".title").setAttribute("hidden", "false")
    register.setAttribute("hidden", "true")

    var word = register.querySelector(".word").value
    var hint = register.querySelector(".hint").value

    letterSaved.setAttribute("word", word)
    letterSaved.setAttribute("hint", hint)
    if ((word != null & word != "") & (hint != null & hint != "")) {
        letterSaved.setAttribute("incomplete", "false")

        circleContainer.replaceChild(letterSaved, circleContainer.children[indexSaved])
    } else {
        letterSaved.setAttribute("incomplete", "true")
    }

    checkSubmit()
})

pasapalabra.querySelector(".game-title").addEventListener("input", () => {
    var input = pasapalabra.querySelector(".game-title")

    if (input.value != null & input.value != "") {
        input.setAttribute("incomplete", "false")
    } else {
        input.setAttribute("incomplete", "true")
    }

    checkSubmit()
})

// WORK IN PROGRESS
document.querySelector(".create").addEventListener("click", () => {
    var title = pasapalabra.querySelector(".game-title").value
    var letters = []
    
    divLetters.forEach((letter, index) => {
        var word = letter.getAttribute("word")
        var hint = letter.getAttribute("hint")
        letters.push([word, hint])
    })
    
    fetch("./php/create-game.php", {
        method: 'POST',
        body: {
            'title': title,
            'letters': letters
        }
    }).then(data => console.log(data))
})

function checkSubmit() {
    var valid = true
    var input = pasapalabra.querySelector(".game-title")

    divLetters.forEach((letter, index) => {
        var word = letter.getAttribute("word")
        var hint = letter.getAttribute("hint")

        if ((word == null || word == "") || (hint == null || hint == "")) {
            valid = false
        }
    })

    if (input.value == null || input.value == "") {
        valid = false
    }

    if (valid) {
        document.querySelector(".create").setAttribute("disabled", "false")
    } else {
        document.querySelector(".create").setAttribute("disabled", "true")
    }
}
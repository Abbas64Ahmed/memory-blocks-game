/* 
music after writing the name , timer and after the timeer id stop the game
add liderbord using local storge
add more blocks (to make is harder make it with js)
*/

let statusBar = document.querySelector(".status-bar"),
    theName = document.querySelector(".the-name span"),
    wrongTries = document.querySelector(".wrong-tries span"),
    blockContaner = document.querySelector(".blocks-contaner"),
    blocks = Array.from(document.querySelectorAll(".blocks-contaner .block")),
    liderbord = document.querySelector("#liderboard .players"),
    duration = 1000;


window.onload = makeliderboard()

document.querySelector("#start-btn").onclick = function() {

    let theUserInputName = prompt("what is your name");

    document.querySelector("#game-soundtreak").play()

    if (theUserInputName == "" || theUserInputName == null) {

        theName.innerHTML = 'unknow'

    } else {

        theName.innerHTML = theUserInputName;
    }

    document.querySelector(".starting-screen").remove()

    showallcards()

        timeEnd()
    // setTimeout(() => {
    //     timeEnd()
    // }, 5000);
}


// make the ordered array from 0 to 
let theArray = Array.from(Array(blocks.length).keys())

makeArrayRandom(theArray)

// applay the random array to flax order the mix the blocks
blocks.forEach((block , index) => {
    block.style.order = theArray[index]
})


let arr = []
blocks.forEach(block => {
    block.addEventListener("click", (b)=> {
        b.currentTarget.classList.add("is-fliped")
        arr.push(b.currentTarget)
        stopclicking(arr)
    })
});

function machingblocks(arr) {
    if (arr[0].dataset.tech !== arr[1].dataset.tech) {
        document.querySelector("#fail").play()
        setTimeout(() => {
            arr.forEach(e => {
                e.classList.remove("is-fliped")
            })
            blockContaner.classList.remove("unclickable")
            arr.length = 0
            wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1
        }, duration);
    } else {
        arr.forEach(e => {
            e.classList.add("is-matched")
            e.classList.remove("is-fliped")
        })
        blockContaner.classList.remove("unclickable")
        document.querySelector("#success").play()
        arr.length = 0
        addtolocalstorge()
    }
}

function addtolocalstorge() {
    let isCopmleted = Array.from(document.querySelectorAll(".blocks-contaner .block")).filter((e) => {
        return e.classList.contains('is-matched');
    })

    if (blocks.length === isCopmleted.length) {
        window.localStorage.setItem(`${theName.innerHTML}`, `${wrongTries.innerHTML}`)
        makeliderboard()
    }
}

function stopclicking(array) {
    if (array.length >= 2) {
        blockContaner.classList.add("unclickable")
        machingblocks(arr)
    }
}

function makeArrayRandom(array) {
    let currant = array.length
    let temp 

    for (let i = currant; i > 0 ; i--) {
        temp = array[i]
        array[i] = array[Math.floor(Math.random() * array[i])];
        array[array.indexOf(array[i])] = temp;
    }
}


function showallcards() {
    blocks.forEach((block)=> {
        block.classList.add("is-fliped")
    })

    setTimeout(()=> {
        blocks.forEach((block)=> {
            block.classList.remove("is-fliped")
        })
    }, duration)
}

function timeEnd() {
    setTimeout(() => {
        blockContaner.classList.add("unclickable")
        document.querySelector("#game-soundtreak").pause()

        // make ending screen 
        let endScreen = document.createElement("div")
        endScreen.classList.add("endign-screen")

        let endbtn = document.createElement("span")
        endbtn.classList.add("end-btn")
        endbtn.appendChild(document.createTextNode("retry"))
        endScreen.appendChild(endbtn)

        document.body.appendChild(endScreen)

        endbtn.addEventListener("click", function () {
            blocks.forEach((block) => {
                block.classList.remove("is-matched")
                })
                wrongTries.innerHTML = 0;
                endScreen.remove()
                blockContaner.classList.remove("unclickable")
                document.querySelector("#game-soundtreak").play()
                timeEnd()
            })
        
    }, 180000);
}

function makeliderboard() {
    liderbord.innerHTML = ""

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
        let player = document.createElement("div")
        player.classList.add("player")

        let playerName = document.createElement("span")
        playerName.appendChild(document.createTextNode(key))
        player.appendChild(playerName)

        let playerScore = document.createElement('span')
        playerScore.appendChild(document.createTextNode(value))
        player.appendChild(playerScore)

        liderbord.appendChild(player)
    }
}
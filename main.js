/* 
music after writing the name , timer and after the timeer id stop the game
add liderbord using local storge
add more blocks (to make is harder make it with js)
*/

let statusBar = document.querySelector(".status-bar"),
    theName = document.querySelector(".the-name span"),
    wrongTries = document.querySelector(".wrong-tries span"),
    liderbord = document.querySelector("#liderboard .players"),
    blockContaner = document.querySelector(".blocks-contaner"),
    duration = 1000,
    blocks,
    theDifficultyLevel,
    imgsObj = {
        react: "img/pic (1).png",
        anguler: "img/pic (2).png",
        js: "img/pic (3).png",
        vue: "img/pic (4).png",
        flutter: "img/pic (5).png",
        dart: "img/pic (6).png",
        html: "img/pic (7).png",
        css: "img/pic (8).png", 
        python: "img/pic (9).png", 
        cSharp: "img/pic (10).png",
    };


blocks = Array.from(document.querySelectorAll(".blocks-contaner .block"))
// console.log(blocks) // ما حتشتغل هنا لانو لسه البلوكس دي ما اتعملت و لازم تتعمل تحت بعد عمل البلكات و انا عملتها جوا فنشن 

window.onload = makeliderboard()

document.querySelector("#start-btn").onclick = function() {

    document.querySelector(".starting-screen").remove()

    choseDifficulty()
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
        
    }, 1800000);
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

function addtolocalstorge() {
    let isCopmleted = Array.from(document.querySelectorAll(".blocks-contaner .block")).filter((e) => {
        return e.classList.contains('is-matched');
    })

    if (blocks.length === isCopmleted.length) {
        window.localStorage.setItem(`${theName.innerHTML}`, `${wrongTries.innerHTML}`)
        makeliderboard()
    }
}

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

function stopclicking(array) {
    if (array.length >= 2) {
        blockContaner.classList.add("unclickable")
        machingblocks(array)
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

function starting() {
    let theUserInputName = prompt("what is your name");

    document.querySelector("#game-soundtreak").play()

    if (theUserInputName == "" || theUserInputName == null) {

        theName.innerHTML = 'unknow'

    } else {

        theName.innerHTML = theUserInputName;
    }

    blocks = Array.from(document.querySelectorAll(".blocks-contaner .block"))


    // make the ordered array from 0 to 
    let theArray = Array.from(Array(Object.keys(imgsObj).length * (theDifficultyLevel + 1)).keys())

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

    showallcards()

    timeEnd()

}


function makeImgFromObj(n) {

    Object.keys(imgsObj).forEach((img) => {
        for (let i = 0; i <= n; i++) {
            let div = document.createElement("div")
            div.classList.add("block")
            div.setAttribute("data-tech", `${img}`)

            let fornt = document.createElement("div")
            fornt.classList.add("fornt")
            div.appendChild(fornt)

            let back = document.createElement("div")
            back.classList.add("back")
            div.appendChild(back)

            let cardImg = document.createAttribute("img")
            cardImg.src = `${imgsObj[img]}`
            // back.appendChild(cardImg)
            back.innerHTML = `<img src="${imgsObj[img]}" ></img>`

            document.querySelector(".blocks-contaner").appendChild(div)
        }
    })
    starting()
}

function choseDifficulty() {
    let difficultyScreen = document.querySelector(".difficulty-screen")
    let theLevels = document.querySelectorAll(".difficulty-screen span")

    difficultyScreen.style.display = "flex"

    theLevels.forEach((level) => {
        level.addEventListener("click", (e) => {
            if (e.target.classList.contains("easy")) {
                theDifficultyLevel = 1
                difficultyScreen.remove()
                makeImgFromObj(theDifficultyLevel)
            }
            else if (e.target.classList.contains("normal")) {
                theDifficultyLevel = 3
                difficultyScreen.remove()
                makeImgFromObj(theDifficultyLevel)
            }
            else if (e.target.classList.contains("hard")) {
                theDifficultyLevel = 5
                difficultyScreen.remove()
                makeImgFromObj(theDifficultyLevel)
            }
        })
    })
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
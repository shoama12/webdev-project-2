let w, diff;

// choose random RGB color
function getRandomRGB() {
    var r = Math.round(0xff * Math.random());
    var g = Math.round(0xff * Math.random());
    var b = Math.round(0xff * Math.random());
    return `rgb(${r},${g},${b})`;
}

// generate boxes according to the difficulty level 
function generateBoxes() {
    document.getElementById("result").hidden = true;
    document.getElementById("game").hidden = false;

    var par = document.getElementById("gameBoxes");
    par.innerHTML = "";
    let r = [];

    for (var i = 0; i < diff; i++) {
        var box = document.createElement("span");
        var c = getRandomRGB();
        r.push(c);

        box.id = `box-${i}`;
        box.classList.add("colorbox");
        box.style.background = c;
        box.setAttribute("onclick", `check(${i});`);
        par.appendChild(box);
    }

    w = Math.floor(r.length * Math.random());
    document.getElementById("solution").innerText = r[w];

    countdown();
}

// count the time left to choose the right color
function countdown() {
    clearInterval(timer);
    var t = document.getElementById("timer");
    t.innerText = 60;

    timer = setInterval(() => {
        if (t.innerText <= 0) {
            t.innerText = "0.0";
            clearInterval(timer);
            check(null); //call a lose
        } else {
            t.innerText = (t.innerText - 0.1).toFixed(1);
        }
    }, 100);
}

// check the answear and provide feedback
function check(guess) {
    clearInterval(timer);
    r = document.getElementById("result");
    g = document.getElementById("game");

    /* visualize results on screen. */
    if (guess == null) {
        r.innerText = "You ran out of time :'{";
    } else if (guess == w) {
        r.innerText = "Great job! You win the game!";
    } else {
        r.innerText = "Loser. :D";
    }

    r.hidden = false;
    g.hidden = true;
}

// set defficulty level
function setDifficulty(l) {
    if (diff != l) {
        diff = l;
        e = document.getElementById("diff").children;
        for (i = 0; i < e.length; i++) {
            e[i].disabled = !e[i].disabled;
        }
        generateBoxes();
    }
}

window.addEventListener("load", function() {
    setDifficulty(3);
});
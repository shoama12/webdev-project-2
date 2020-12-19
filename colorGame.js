let w, diff;

function getRandomRGB() {
    var r = Math.round(0xff * Math.random());
    var g = Math.round(0xff * Math.random());
    var b = Math.round(0xff * Math.random());
    return `rgb(${r},${g},${b})`;
}

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

function countdown() {
    clearInterval(timer);
    var t = document.getElementById("timer");
    t.innerText = 30;

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
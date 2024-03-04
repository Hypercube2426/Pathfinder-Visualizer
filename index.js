// ==========================================================
// =================== TUTORIAL 📖📽️ =================
// ==========================================================
let count = 0;
const slides = document.querySelectorAll('.tutorial .slide');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const skipBtn = document.querySelector('#skip');
const tutorial = document.querySelector('#tutorial');
const tutorialToggle = document.querySelector('.tutorial-toggle');

const visited = localStorage.getItem('visited');
if (!visited) {
    tutorial.classList.add('active');
    localStorage.setItem('visited', 'true');
}

tutorial.addEventListener('click', (e) => {
    if (e.target.classList.contains('tutorial')) {
        skipBtn.style.animation = ".2s shake 2 ease-in-out";
        setTimeout(() => {
            skipBtn.style.animation = "none";
        }, 1000);
    }
})
tutorialToggle.addEventListener('click', () => {
    tutorial.classList.add('active');
    count = 0;
    nextBtn.innerText = "next";
    prevBtn.classList.add('unactive');
    moveSlides(count);
})
skipBtn.addEventListener('click', () => {
    tutorial.classList.remove('active');
});

// Arranging one after one
slides.forEach((slide, index) => {
    slide.style.left = `${100 * index}%`;
});


nextBtn.addEventListener('click', () => {
    if (count == slides.length - 1) {
        tutorial.classList.remove('active');
        return;
    }
    count++;
    if (count == slides.length - 1) {
        nextBtn.innerText = "finish";
    }
    moveSlides(count);
    prevBtn.classList.remove('unactive');
});

prevBtn.addEventListener('click', () => {
    if (count == 0) {
        return;
    }
    nextBtn.innerText = "next";
    count--;
    if (count == 0) {
        prevBtn.classList.add('unactive');
    }
    moveSlides(count);
});

const dot = document.querySelector(".dots");
for (let i = 0; i < slides.length; i++) {
    dot.innerHTML += `<div class="dot ${i === 0 ? "active" : ""}"></div>`
}
const dots = document.querySelectorAll(".dot");

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        count = i;
        if (count == 0) {
            prevBtn.classList.add('unactive');
        }
        else if (count == slides.length - 1) {
            nextBtn.innerText = "finish";
        }
        else {
            prevBtn.classList.remove('unactive');
            nextBtn.innerText = "next";
        }
        moveSlides(count);
    })
})

function moveSlides(count) {
    dots.forEach(dot => {
        dot.classList.remove('active');
    })

    dots[count].classList.add('active');

    slides.forEach((slide) => {
        slide.style.transform = `translateX(${-count * 100}%)`;
    });
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37 || e.keyCode == 74) {
        prevBtn.click();
    }
    else if (e.keyCode == 39 || e.keyCode == 76) {
        nextBtn.click();
    }
})



// ==========================================================
// =================== Rendering Grid 📅📏 =================
// ==========================================================
const board = document.querySelector('#board');
let matrix;
let row;
let col;
let width = 22;
var cells = [];

const pixels = document.querySelectorAll('#pixel .drop-menu a');
pixels.forEach((pixel) => {
    pixel.addEventListener('click', () => {
        width = pixel.innerText.replace('px', '');
        const cells = document.querySelectorAll('.col');
        cells.forEach(cell => {
            document.documentElement.style.setProperty('--cell-width', `${width}px`);
        })

        renderMap();
        source = set('source');
        target = set('target');
    });
});

function renderMap() {
    matrix = [];
    col = parseInt(board.clientWidth / width);
    row = parseInt(board.clientHeight / width);
    if(window.innerWidth <= 662){
        row -= 1;
    }

    board.innerHTML = '';
    for (let i = 0; i < row; i++) {
        const rowElement = document.createElement('div');
        rowElement.setAttribute('id', `row-${i}`);
        rowElement.classList.add('row');
        let colList = [];
        for (let j = 0; j < col; j++) {
            const colElement = document.createElement('div');
            colElement.classList.add('col', 'unvisited');
            colElement.setAttribute('id', `${i}-${j}`);
            rowElement.appendChild(colElement);

            colList.push(colElement);
        }
        board.appendChild(rowElement);
        matrix.push(colList);
    }
    cells = document.querySelectorAll('.col');
    boardInteration(cells);
}

renderMap();





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


// ==========================================================
// ================= AUXILLARY METHODS ⚙️🦾 ================
// ==========================================================

//check outBound of matrix ✔️❌
function isValid(x, y) {
    return (x >= 0 && y >= 0 && x < row && y < col);
}



//method for setting target and source 🎯⛳
function set(className, x = -1, y = -1) {
    if (isValid(x, y)) {
        matrix[x][y].classList.add(className);
    }
    else {
        x = Math.floor(Math.random() * row);
        y = Math.floor(Math.random() * col);
        matrix[x][y].classList.add(className);
    }
    return { x, y };
}

let source = set('source');
let target = set('target');



// ==========================================================
// ====================== CLICK EVENTS ======================
// ==========================================================

const clearNavOption = () => {
    navOptions.forEach((option) => {
        option.classList.remove('active');
    })
}
const clearDropMenu = () => {

    document.querySelectorAll('.drop-menu').forEach((menu) => {
        menu.classList.remove('active');
    })
}


//NAVIGATION click 🔵👆
const navOptions = document.querySelectorAll('.nav-menu>li>a');



navOptions.forEach((option) => {
    option.addEventListener('click', () => {
        //clearify
        if (option.classList.contains('drop-toggle') && option.classList.contains('active')) {
            option.classList.remove('active');
            clearDropMenu();
            return;
        }
        clearNavOption();
        clearDropMenu();


        //adding 
        option.classList.add('active');

        if (option.classList.contains('drop-toggle')) {
            const dropMenu = option.nextElementSibling;
            dropMenu.classList.add('active');
        }
    })
})


//OUTSIZE CLICK 🚀👆
document.addEventListener('click', (event) => {
    if (!document.querySelector('.nav-menu').contains(event.target)) {
        clearNavOption();
        clearDropMenu();
    }
})


//'dropMenu' OPTION CLICK 📃👆
const dropMenus = document.querySelectorAll('.drop-menu');
const dropOptions = document.querySelectorAll('.drop-menu a');

const clearDropOption = () => {
    document.querySelectorAll('.drop-menu.active a').forEach(option => {
        option.classList.remove('active');
    })
}

var algorithm = '';
dropOptions.forEach((option) => {
    option.addEventListener('click', () => {
        //clearify
        clearDropOption();
        clearDropMenu();
        clearNavOption();

        //adding
        option.classList.add('active');

        if (document.querySelector('#algo').contains(option)) {
            let text = option.innerText;
            algorithm = text.split(' ')[0];
            visualizeBtn.innerText = `Visualize ${algorithm}`;
        }
    })
})


//========== GUIDE TOGGLE ⏬⏬

const guide = document.querySelector('.guide');
const guideToggle = document.querySelector('.guide-toggle');
guideToggle.addEventListener('click', () => {
    guide.classList.toggle('active');
})

document.addEventListener('click', (e) => {
    if (!guideToggle.contains(e.target))
        guide.classList.remove('active');

})



// ==========================================================
// ================= BOARD INTERATION 🎨🖌️ =================
// ==========================================================

function boardInteration(cells) {
    let draging = false;
    let drawing = false;
    let dragStart = null;
    cells.forEach((cell) => {
        const pointDown = (e) => {
            if (e.target.classList.contains('source')) {
                dragStart = 'source';
                draging = true;
            }
            else if (e.target.classList.contains('target')) {
                dragStart = 'target';
                draging = true;
            }
            else {
                drawing = true;
            }
        }

        const pointUp = () => {
            drawing = false;
            draging = false;
            dragStart = null;
            matrix[source.x][source.y].classList.remove('wall');
            matrix[target.x][target.y].classList.remove('wall');
        }

        const pointMove = (e) => {
            const triggerElement = document.elementFromPoint(e.clientX, e.clientY);
            if (triggerElement == null || !triggerElement.classList.contains('col')) return;
            cordinate = { ...triggerElement.id.split('-') };

            if (draging && dragStart) {

                cells.forEach(cell => {
                    cell.classList.remove(dragStart);
                })
                triggerElement.classList.add(dragStart);

                if (dragStart === 'source') {
                    source.x = Number(cordinate[0]);
                    source.y = Number(cordinate[1]);
                }
                else {
                    target.x = Number(cordinate[0]);
                    target.y = Number(cordinate[1]);
                }
            }


            else if (drawing) {
                if (triggerElement.classList.contains('source') || triggerElement.classList.contains('target'))
                    return;

                const x = Number(cordinate[0]);
                const y = Number(cordinate[1]);

                matrix[x][y].setAttribute('class', 'col wall');
            }


        }

        cell.addEventListener('pointerdown', pointDown);
        cell.addEventListener('pointermove', pointMove);
        cell.addEventListener('pointerup', pointUp);

        cell.addEventListener('click', () => {
            if (cell.classList.contains('source') || cell.classList.contains('target'))
                return;

            cell.classList.remove('visited', 'path');
            cell.classList.toggle('wall');
        })
    })

}


// ==========================================================
// ============== BUTTONS INTERATION 🟡👆 ==================
// ==========================================================
const visualizeBtn = document.getElementById('visualize');
const clearPathBtn = document.querySelector('#clear-path');
const clearBoardBtn = document.querySelector('#clear-board');
const generateMazeBtn = document.querySelector('#generate-maze');
const speedOptions = document.querySelectorAll('#speed .drop-menu a');

var delay = 7;
speedOptions.forEach((option) => {
    option.addEventListener('click', () => {
        let pickedSpeed = option.innerText;
        if (pickedSpeed === 'Fast') delay = 4;
        else if (pickedSpeed === 'normal') delay = 7;
        else delay = 15;
    })
})

if(window.innerWidth <= 662){
    delay += 5;
}
//sortcuts

window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 32: visualizeBtn.click(); break;
        case 77: generateMazeBtn.click(); break;
        case 67: clearBoard(); break;
        case 66: algorithm = "BFS"; break;
        case 68: algorithm = "Dijkstra\'s"; break;
        case 65: algorithm = "A*"; break;
        case 71: algorithm = "Greedy"; break;
        default:
            break;
    }
    visualizeBtn.innerText = `Visualize ${algorithm}`;
})


const clearPath = () => {
    cells.forEach((cell) => {
        cell.classList.remove('visited', 'path');
    })
}
const clearBoard = () => {
    clearPath();
    cells.forEach((cell) => {
        cell.classList.remove('wall');
    })
}


clearPathBtn.addEventListener('click', clearPath);
clearBoardBtn.addEventListener('click', clearBoard);
let wallToAnimate;
generateMazeBtn.addEventListener('click', () => {
    clearBoard();
    wallToAnimate = [];

    recursiveDivisionMaze(0, row - 1, 0, col - 1, 'horizontal', false);
    animate(wallToAnimate, 'wall');
});


let searchToAnimate;
let pathToAnimate;
visualizeBtn.addEventListener('click', () => {
    clearPath();
    searchToAnimate = [];
    pathToAnimate = [];
    switch (algorithm) {
        case '': BFS(); break;
        case 'BFS': BFS(); break;
        case 'Greedy': greedy(); break;
        case 'Dijkstra\'s': Dijkstra(); break;
        case 'A*': Astar(); break;
        default: break;
    }

    animate(searchToAnimate, 'visited');
});

function animate(list, className) {
    for (let i = 0; i < list.length; i++) {
        setTimeout(() => {
            if (className === 'wall')
                list[i].setAttribute('class', `col ${className}`);
            else
                list[i].classList.add(className);

            //after searching is done animate the path
            if(className == 'visited' && i == list.length-1){
                animate(pathToAnimate, 'path');
            }
        }, (className === 'path') ? i * (delay + 20) : i * delay);
    }
}












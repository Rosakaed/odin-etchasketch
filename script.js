const gridBox = document.querySelector(".grid-container");
const changeButton = document.querySelector("#change-button");
const blackButton = document.querySelector("#Black");
const rgbButton = document.querySelector("#Rgb");
const resetButton = document.querySelector('#reset-button');
const eraserButton = document.querySelector('#Eraser-Draw');
const changeInput = document.getElementById('changeInput');
const error = document.getElementById('Error');
const saveButton = document.getElementById('save');
let isMouseDown = false;
let eraser = false;
let color = false;
let size = 16;
document.addEventListener("mousedown", () => {
    isMouseDown = true;

});
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});
rgbButton.addEventListener("click", () => {
    color = true;
    if (eraser) {
        eraserButton.textContent = "Eraser";
        eraser = false;
    }
});
blackButton.addEventListener("click", () => {
    color = false;
    if (eraser) {
        eraserButton.textContent = "Eraser";
        eraser = false;
    }
});
eraserButton.addEventListener("click", () => {
    if (eraser) {
        eraserButton.textContent = "Eraser";
        eraser = false;
    }
    else {
        eraserButton.textContent = "Draw";
        eraser = true;
    }
})

function getColor() {

    if (color === false) {
        return "Black";
    }
    else {
        const l = '0123456789ABCDEF';
        let col = '#';
        for (let i = 0; i < 6; i++) {
            col += l[Math.floor(Math.random() * 16)];
        }
        return col;
    }
}

function fillGrid(dim) {
    let widths = 768 / dim;

    for (let i = 0; i < dim * dim; i++) {
        let box = document.createElement('div');
        box.style.height = `${widths}px`;
        box.style.width = `${widths}px`;
        box.clicked = false;
        box.classList.add("cell");
        box.style.backgroundColor="#efefef"
        box.addEventListener('mouseover', () => {
            if (eraser && isMouseDown) {
                box.clicked = false
                box.style.backgroundColor = "";
                return;
            } else if (eraser) {
                return;
            }

            if (box.clicked) {
                return;
            }
            let color = getColor();
            box.style.backgroundColor = color;

            if (isMouseDown) {
                box.clicked = true;
            }
        })
        box.addEventListener('mousedown', () => {
            if (eraser) {
                box.clicked = false
                box.style.backgroundColor = "#efefef";
                return;
            }

            box.clicked = true;
        })
        box.addEventListener('mouseout', () => {
            if (box.clicked === false) {
                box.style.backgroundColor = "#efefef";
            }
        })

        gridBox.appendChild(box);
    }
}
function emptyGrid() {
    const eleList = document.getElementsByClassName("grid-container");
    const element = eleList[0];
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }

}

changeButton.addEventListener("click", () => {
    val = changeInput.value;
    if (!isNaN(val)) {

        if (Number(val) > 100) {
            error.textContent = "Please Enter a number less than 100";
            return;
        }
        size = Number(val);
        emptyGrid();
        fillGrid(size);
        error.textContent = "";


    }
    else {
        error.textContent = "Please Enter a number less than 100";
    }

}
)
resetButton.addEventListener("click", () => {
    emptyGrid();
    fillGrid(size);
})

saveButton.addEventListener("click", () => {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 768;

    const ctx = canvas.getContext('2d');
    const eleList = document.getElementsByClassName("cell");
    const grid = Array.from(eleList);
    const cellSize = 768 / size;
   
    grid.forEach((cell, index) => {
         console.log(index);
        const x = (index%size) * cellSize;
        const y = Math.floor((index/size))  * cellSize;
        ctx.fillStyle = window.getComputedStyle(cell).backgroundColor;
        ctx.fillRect(x, y, cellSize, cellSize);
    })

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'sketch.png';
    link.click();

})


fillGrid(size);
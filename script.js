const gridBox = document.querySelector(".grid-container");
const changeButton = document.querySelector("#change-button");
const blackButton = document.querySelector("#Black");
const rgbButton = document.querySelector("#Rgb");
const resetButton = document.querySelector('#reset-button');
const eraserButton = document.querySelector('#Eraser-Draw');
const changeInput = document.getElementById('changeInput');
const error = document.getElementById('Error');
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
                box.style.backgroundColor = "";
                return;
            }

            box.clicked = true;
        })
        box.addEventListener('mouseout', () => {
            if (box.clicked === false) {
                box.style.backgroundColor = "";
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


fillGrid(size);

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
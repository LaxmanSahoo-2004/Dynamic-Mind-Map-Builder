let container = document.querySelector(".container");

function addInputBox() {
    let div = document.createElement("div");
    div.className = "newdiv";
    div.hasInputBox = true;
    div.isedited = false;

    function showInput(value = "") {
        div.innerHTML = "";

        let editableDiv = document.createElement("div");
        editableDiv.contentEditable = "true";
        editableDiv.className = "newtab";
        editableDiv.dataset.placeholder = "Enter your idea...";
        editableDiv.innerText = value === "EMPTY" ? "" : value;

        if (editableDiv.innerText.trim() === "") {
            editableDiv.classList.add("empty");
        }

        editableDiv.addEventListener("input", () => {
            if (editableDiv.innerText.trim() === "") {
                editableDiv.classList.add("empty");
            } else {
                editableDiv.classList.remove("empty");
            }
        });

        div.appendChild(editableDiv);
        editableDiv.focus();

        editableDiv.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                let textContent = editableDiv.innerText.trim();
                editableDiv.remove();
                if (textContent !== "") {
                    div.innerText = textContent;
                } else {
                    div.innerText = "EMPTY";
                }
                div.hasInputBox = false;
                div.appendChild(editbtn);
            }
        });
    }

    container.appendChild(div);

    div.addEventListener("click", () => {
        if (!div.hasInputBox && !div.isedited) {
            addInputBox();
            div.hasInputBox = true;
            div.isedited = true;
            let line = document.createElement("div");
            line.className = "linebtw";
            div.after(line);
        }
    });

    let editbtn = document.createElement("button");
    editbtn.className = "editbtn";
    editbtn.innerText = "Edit";

    editbtn.addEventListener("click", (e) => {
        e.stopPropagation();
        let currentText = div.innerText.replace("Edit", "").trim();
        showInput(currentText);
    });

    showInput();
}

addInputBox();

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});
function takeScreenshot() {
    const element = document.getElementById("screenshot-target");

    html2canvas(element).then(canvas => {
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

document.getElementById("intro-overlay").addEventListener("click", function() {
    this.style.display = "none";
});
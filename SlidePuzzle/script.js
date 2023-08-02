let rows = 3;
let columns = 3;

let currTile;
let otherTile; // La tuile vide 9

let turns = 0;

// Odre des images
let imgOrder = ["4", "2", "8", "5", "1", "6", "7", "3", "9"];

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            // <img id="0-0" src="1.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString(); // ID unique pour chaque tuile basé sur sa position
            tile.src = imgOrder.shift() + ".png"; // Attribution d'une image à la tuile

            // DRAG
            tile.addEventListener("dragstart", dragStart); // Lorsqu'on commence à déplacer l'image (drag)
            tile.addEventListener("dragover", dragOver); // Lorsqu'on déplace l'image en restant cliqué (dragover)
            tile.addEventListener("dragenter", dragEnter); // Lorsqu'on déplace l'image sur une autre (dragenter)
            tile.addEventListener("dragleave", dragLeave); // Lorsqu'on déplace l'image et quitte la zone cible (dragleave)
            tile.addEventListener("drop", dragDrop); // Lorsqu'on lâche l'image et la place à la position de l'autre image (drop)
            tile.addEventListener("dragend", dragEnd); // Lorsque le déplacement de l'image est terminé (dragend)

            document.getElementById("board").append(tile); // Ajoute l'image de la tuile au tableau de jeu (board) dans le HTML

        }
    }
}

function dragStart() {
    currTile = this; // Référence à l'image de la tuile en cours de déplacement (this = l'image de la tuile)
}

function dragOver(e) {
    e.preventDefault(); // Empêche le comportement par défaut du navigateur lors d'un dragover
}

function dragEnter(e) {
    e.preventDefault(); // Empêche le comportement par défaut du navigateur lors d'un dragenter
}

function dragLeave(e) {
    e.preventDefault(); // Empêche le comportement par défaut du navigateur lors d'un dragleave
}

function dragDrop() {
    otherTile = this; // Référence à l'image de l'autre tuile qui sera remplacée (this = l'image de la tuile)
}

function dragEnd() {
    if (!otherTile.src.includes("9.png")) { // Vérifie si l'image de l'autre tuile est celle de la tuile vide (blank tile)
        return; // Si ce n'est pas le cas, arrête la fonction
    }

    let currCoords = currTile.id.split("-"); //ex : id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]); // Récupère la position de la ligne de la tuile en cours de déplacement
    let c = parseInt(currCoords[1]); // Récupère la position de la colonne de la tuile en cours de déplacement

    let otherCoords = otherTile.id.split("-"); // Récupère les coordonnées de l'autre tuile
    let r2 = parseInt(otherCoords[0]); // Récupère la position de la ligne de l'autre tuile
    let c2 = parseInt(otherCoords[1]); // Récupère la position de la colonne de l'autre tuile

    let moveLeft = r == r2 && c2 == c - 1; // Vérifie si le déplacement est vers la gauche
    let moveRight = r == r2 && c2 == c + 1; // Vérifie si le déplacement est vers la droite

    let moveUp = c == c2 && r2 == r - 1; // Vérifie si le déplacement est vers le haut
    let moveDown = c == c2 && r2 == r + 1; // Vérifie si le déplacement est vers le bas

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown; // Vérifie si les tuiles sont adjacentes

    if (isAdjacent) {
        let currImg = currTile.src; // Sauvegarde l'image de la tuile en cours de déplacement
        let otherImg = otherTile.src; // Sauvegarde l'image de l'autre tuile

        currTile.src = otherImg; // Échange les images entre les deux tuiles
        otherTile.src = currImg;

        turns += 1; // Incrémente le nombre de tours
        document.getElementById("turns").innerText = turns; // Met à jour le nombre de tours affiché dans le HTML
    }

}

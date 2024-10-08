// FUNZIONE PER CREARE CELLE
/**
 * 1- COME LA CHIAMO?
 * 2-HO BISOGNO DI UN PARAMETRO?
 * 3-HO BISOGNO DI RESTITUIRE QUALCOSA?
 * 4- SE SI, DI CHE TIPO? 
 */
// DICHIARAZIONE DI FUNZIONE
/**
 * WITH THIS FUNCTION WE CREATE AN ELEMENT TYPE DIV WITH A CLASS NAMED CELL AND HOW MANY CELLS

 * @param {number} content 
 * @param {number} howManyCells 
 * @returns 
 */
function createCell(content, howManyCells){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.classList.add('total-cells-' + howManyCells);

    // devo aggiungere il contenuto alla mia cella
    cell.append(content);
    return cell;
}

/**
 * 
 * @param {string} levelChoice 
 * @returns number
 */
function computeTotalCells(levelChoice){
    let rows = 0;
    let cols = 0;
    // considero le mie diverse casistiche
    switch(levelChoice){
        case 'hardlevel':
            rows = 7;
            cols = 7;
            break;
        case 'mediumlevel':
            rows = 9;
            cols = 9;
            break;
        case 'easylevel':
            rows = 10;
            cols = 10;
            break;
        default:
            console.error('Livello non riconosciuto', levelChoice);
            break;
    }

    return rows * cols;
}
// FUNZIONE PER GENERARE BOMBE

 function generateBombs(totalCells,totalBombs){
    // vado a crearmi il mio array che andrà a contenere i numeri estratti
    const bombs = [];
    while(bombs.length < totalBombs){
        // genera un numero casuale 
        const randomNumber = Math.floor(Math.random() * totalCells) + 1;
         // mi assicuro che non ci siano numeri uguali
        if(!bombs.includes(randomNumber))bombs.push(randomNumber);
    }
    return bombs;
 }

//  FUNZIONE PER TERMINARE IL GIOCO
// la funzione deve sapere se la partita è finita perchè abbiamo perso o vinto. Mi servirà il punteggio
function endGame(score, isWinner = false){
    const resultMessage = isWinner ? 'vinto' : 'perso';
    alert(`Hai ${resultMessage}. Punti totali: ${score}.`);
    isGameOver = true;
}
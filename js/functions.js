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
            rows = 10;
            cols = 10;
            break;
        case 'mediumlevel':
            rows = 9;
            cols = 9;
            break;
        case 'easylevel':
            rows = 7;
            cols = 7;
            break;
        default:
            console.error('Livello non riconosciuto', levelChoice);
            break;
    }

    return rows * cols;
}
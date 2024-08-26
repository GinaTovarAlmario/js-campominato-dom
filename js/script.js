// controllo che veda il mio script.js
console.log('Js ok');
// ho fatto un file a parte per le mie funzioni faccio il controllo
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
  });
/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
# MILESTONE 1
Prepariamo l'HTML ed il CSS per ottenere il risultato grafico che vediamo nell'immagine allegata.
#MILESTONE 2
Rimuoviamo le celle che abbiamo inserito nell'HTML in modo da generarle tramite JS. Al click del bottone play, vengono generate 100 celle in 10 righe da 10 celle ciascuna.
#MILESTONE 3
In ogni cella, deve comparire il numero corrispondente, in ordine da 1 a 100;
#MILESTONE 4
Al click sulla cella, stampiamo il numero della cella cliccata in console, poi coloriamo la cella d'azzurro!
# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;*/

// FASE DI PREPARAZIONE

// vado a recuperarmi la griglia del DOM ei bottone
const grid = document.getElementById('grid');
const playButton = document.getElementById('play');

// vado a recuperarmi gli elementi della select del form
const form = document.querySelector('form');
const select = document.querySelector('select');

// devo prendermi l'elemento che mi serve per mostrare il punteggio in pagina
const scoreCounter = document.getElementById('score');

// FASE DI ELABORAZIONE DATI

// al click sul bottone play mi genera le celle e il suo contenuto
playButton.addEventListener('click', function(){
    console.log(select.value);

    // devo svuotare la mia griglia per evitare che ogni volta che clicco play vada ad aggiungere griglie
    grid.innerHTML = '';

    // prima di generare le celle devo sapere il livello di difficoltà scelto dall'utente
    const totalCells = computeTotalCells(select.value);
    // mi preparo la variabile che terrà conto del risultato partita
    let score = 0;

    // mi preparo la variabile che mi indica il numero di bombe presenti nel gioco
    const totalBombs = 16;

    // mi calcolo il valore max del punteggio
    const maxScore = totalCells - totalBombs;
    console.log('maxscore: ',maxScore);

    // genero le bombe
    const bombs = generateBombs(totalCells, totalBombs);
    console.log('Le bombe sono le seguenti : ', bombs);

    // ora devo generare la mia griglia
    for(let i = 0; i < totalCells; i++){

        // mi serve andare a creare una funzione che mi crei le celle

        // invoco la funzione creata
        const cell = createCell(i + 1 , totalCells );
        // devo inserire la cella in pagina

    // FASE DI OUTPUT
        grid.appendChild(cell);

        // aggiugno un eventlistener alla cella

        cell.addEventListener('click', function(){
            // controllo prima di tutto che la mia cella non contenga già la classe così da non poterla ricliccare
            
            if(cell.classList.contains('clicked')) return;

            // devo controllare se c'è una bomba nella cella

            if(bombs.includes(i+1)){
                // stampo messaggio
                console.log(`Ops! Hai preso una bomba! Hai perso. Punti totali: ${score}`);
                // svuoto la cella
                cell.innerText = '';
                // inserisco la classe per il cambio colore cella
                cell.classList.add('bomb');
            } else {
            // Al click sulla cella, stampiamo il numero della cella cliccata in console e coloriamo di azzurro
                cell.classList.add('clicked');
           
            // al click della cella devo aumentare il punteggio del gioco
                scoreCounter.innerText = ++score;
            // devo controlla se ho vinto
                if(score === maxScore){
                    console.log(`Complimenti! Hai vinto! Punti totali: ${score}`);
                }
            // stampa in console il numero cella
                console.log('Numero cella cliccata: ',i + 1);
            }
        });
    }
});

/**
 * DESCRIZIONE DEL GIOCO
Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe.
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe
non potranno esserci due numeri uguali
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo
calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si
colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.
LA partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo
possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che
l'utente ha cliccato su una cella che non era una bomba

# MILESTONE 1
Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella

# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti

# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è
presente nell'array di bombe.
Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti
diventa azzurra e dobbiamo incrementare il punteggio.

# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato
ha raggiunto il punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il punteggio e
scriviamo un messaggio appropriato.

# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente
ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio
raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di
difficoltà (come le istruzioni di ieri se non già fatto)

# SUPERBONUS
Colorare tutte le celle bomba quando la partita finisce
 */
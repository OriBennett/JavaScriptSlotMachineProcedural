// Procedural

// 1. Deposit some money (100)
// 2. Determine number of rows to bet on (3)
// 3. Collect a bet amount per row (5$)
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Provide P&L to user
// 7. Spin again?

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT ={
    A: 20,
    B: 40,
    C: 60,
    D: 80
}

const SYMBOL_VALUES = {
    A: 20,
    B: 15,
    C: 10,
    D: 5
}

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i< count; i++) {
            symbols.push(symbol)
        }
    } //is imutable, should probably be a const and outside this function
    const rows = [];
    for (let i=0; i< COLUMNS; i++) {
        rows.push([]);
        const rowSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            let randomIndex = Math.floor(Math.random() * rowSymbols.length);
            const selectedSymbol = rowSymbols[randomIndex];// Check if pop is a better choice here
            rows[i].push(selectedSymbol);
            rowSymbols.splice(randomIndex,1); //why not do this at line 43?
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const calcPnL = (rows, lines, bet) => {
    let pnl = 0;
    for (let row = 0; row < lines; row++){
        pnl -= bet;
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
            allSame = false;
            break;
            }
        }
        if (allSame){
            pnl += bet*(SYMBOL_VALUES[symbols[0]]+1);
        }
    }
    return pnl;
}

const deposit = () => {
    while (true) {
    let depositAmount = prompt("Please enter your deposit amount[100]: ");
    if (depositAmount.length === 0)
        depositAmount = 100;
    
    const numberDepositAmount = parseFloat(depositAmount);
    
    if(!isNaN(numberDepositAmount)&&numberDepositAmount>0){
        
        console.log("your initial deposit amount is " + numberDepositAmount);
        return numberDepositAmount;
    }

    // if we get here - invalid input ask again
    console.log("Invalid deposit amount, try again.");
}
    //return deposit(); // is there tail call optimization? Only if ECMA 6 javascript
    // while true might be better
}

const getNumberOfLines = () => {
    while (true) {
    let lines = prompt("Enter the number of lines to bet on(1-3)[3]: ");
    if (lines.length === 0)
        lines = 3;
    
    const numberOfLines = parseFloat(lines);
    
    if(!isNaN(numberOfLines) && numberOfLines > 0 && numberOfLines <= 3){
        
        console.log("You're betting on " + numberOfLines+ " lines");
        return numberOfLines;
    }

    // if we get here - invalid input ask again
    console.log("Invalid number of lines, try again.");
}   
}

const getBettingAmount = (balance, lines) => {
    while (true) {
    let bet = prompt("Enter the amount you would like to bet per line[$5]: ");
    if (bet.length === 0)
        bet = 5;
    
    const betAmount = parseFloat(bet);
    
    if(!isNaN(betAmount) && betAmount > 0 && betAmount <= balance / lines){
        
        console.log("You're betting $" + betAmount+ " per line");
        return betAmount;
    }

    // if we get here - invalid input ask again
    console.log("Invalid bet, try again.");
}   
}



const game = () => {
    let balance = deposit()
    while (true) {
    
    const lines = getNumberOfLines();
    const bet = getBettingAmount(balance,lines);
    const rows = spin();
    printRows(rows);
    const pnl = calcPnL(rows,lines, bet);
    balance += pnl;
    console.log(`Your profit/loss this round is $${pnl}`);
    console.log(`Your balance after this round is $${balance}`);

    if (balance<=0){
        console.log("You ran out of money.")
        return;
    }
    let playAgain = prompt("Play Again(y/n) [y]?");
    if (playAgain.length === 0) 
        playAgain = "y"

    if (playAgain != "y") 
        return;
}
}
game()

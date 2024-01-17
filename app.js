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

const Symbol_VALUES = {
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
    }
    const rows = [];
    for (let i=0; i< COLUMNS; i++) {}
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
    const balance = deposit()
    const lines = getNumberOfLines();
    const bet = getBettingAmount(balance,lines);
}
game()

const fs = require('fs');

const reader = fs.createReadStream('./input.txt', { encoding: 'utf8' });
const writer = fs.createWriteStream('./output.txt', { encoding: 'utf8' });

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const chipherCode = getChipherCode();

reader.on('data', (data) => {

    const chipheredData = data.split('').map(symbol =>{
        
        if(alphabet.includes(symbol.toUpperCase())) {
            return cipher(symbol);
        }else{
            return symbol;
        }
    }).join('');

    writer.write(chipheredData);
});

reader.on('end', () => {
    console.log('chiphered');
    writer.end();
});

reader.on('error', (err) => {
    console.log(err);
}); 



function getChipherCode() { 
    // extracting chipher code from CLI & checkig flags

    if (!process.argv.some(item => item === '-c'|| item === '-config')) { // checking having "-c" or "-config" flag
        throw 'wrong command! type -c or -config!'
    }

    return process.argv[3]
}


function cipher(letter) {
    // chiphering a letter

    let newIndex = alphabet.indexOf(letter.toUpperCase()); // geting a start index;

    chipherCode.split('-').forEach(el =>{
        // shifting letter index step-by-step

        switch (el) {

            case 'C0':
              newIndex--;
              break;
            case 'C1':
              newIndex++;
              break;
            case 'R0':
              newIndex -= 8;
              break;
            case 'R1':
              newIndex += 8;
              break; 
            case 'A':
              newIndex = alphabet.length - 1 - newIndex;
        }

        // there is cases in which array index can become more then 'Z'(25) and lower then 'A'(0) 
        if(newIndex < 0){                               
            newIndex = alphabet.length + newIndex;
        }

        if(newIndex > alphabet.length - 1){
            newIndex = newIndex - alphabet.length;
        }
    });


    if(letter.toUpperCase() === letter){
        // checking the original case of the letter

        return alphabet[newIndex];
    } else {
        return alphabet[newIndex].toLowerCase();
    }
}
const alphabet = require('./aphabet-uppercase');
const TransformStream = require('stream').Transform;

module.exports = class AtbashTransformStream extends TransformStream {
        // this class gives exports Atbach encoding/decoding stream. 

    _transform(chunk, encoding, callback) {

        const chipheredData = chunk.toString().split('').map(symbol => {

            if(!alphabet.includes(symbol.toUpperCase())){
                // if there is any symbols not included in alphabet - they won't be chiphered
                return symbol;
            }
            
            const newIndex = alphabet.length - 1 - alphabet.indexOf(symbol.toUpperCase());

            if(symbol.toUpperCase() === symbol){
                // checking the original case of the letter
        
                return symbol = alphabet[newIndex];
            } else {
                return symbol = alphabet[newIndex].toLowerCase();
            }
        }).join('');

        this.push(chipheredData);
        
        callback();
    }
}
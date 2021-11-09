const alphabet = require('./aphabet-uppercase');
const TransformStream = require('stream').Transform;

module.exports = class CeaserTransformStream extends TransformStream {
    constructor(isEnconding){
        // this class gives exports Ceaser stream.
        super();
        this._isEncoding = isEnconding; // if encoding (isEncoding = true) - shift to the right, false to the left
    }

    _transform(chunk, encoding, callback) {

        const chipheredData = chunk.toString().split('').map(symbol => {

            if(!alphabet.includes(symbol.toUpperCase())){
                // if there is any symbols not included in alphabet - they won't be chiphered
                return symbol;
            }
            
            let newIndex;

            if(this._isEncoding){
                newIndex = alphabet.indexOf(symbol.toUpperCase()) + 1;
            } else {
                newIndex = alphabet.indexOf(symbol.toUpperCase()) - 1;
            }


            // there is cases in which array index can become more then 'Z'(25) and lower then 'A'(0) 
            if(newIndex < 0){                               
                newIndex = alphabet.length + newIndex;
            }

            if(newIndex > alphabet.length - 1){
                newIndex = newIndex - alphabet.length;
            }


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
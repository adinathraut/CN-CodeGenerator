// Hamming Code
function generateHammingCode() {
    let input = document.getElementById('inputBinary').value;
    let output = hammingEncoder(input);
    document.getElementById('output').innerText = "Hamming Code: " + output;
}

function hammingEncoder(input) {
    let parityCount = 0;
    while (Math.pow(2, parityCount) < input.length + parityCount + 1) {
        parityCount++;
    }

    let encoded = '';
    let j = 0;

    for (let i = 1; i <= input.length + parityCount; i++) {
        if (Math.log2(i) % 1 === 0) {
            encoded += '0';
        } else {
            encoded += input[j];
            j++;
        }
    }

    for (let i = 0; i < parityCount; i++) {
        let position = Math.pow(2, i);
        let sum = 0;

        for (let j = 1; j <= encoded.length; j++) {
            if (j & position) {
                sum += encoded[j - 1] === '1' ? 1 : 0;
            }
        }

        encoded = setCharAt(encoded, position - 1, sum % 2 === 0 ? '0' : '1');
    }

    return encoded;
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

// CRC Code
function xor1(a, b) {
    let result = "";
    let n = b.length;
    for (let i = 1; i < n; i++) {
        if (a[i] == b[i]) {
            result += "0";
        } else {
            result += "1";
        }
    }
    return result;
}

function mod2div(dividend, divisor) {
    let pick = divisor.length;
    let tmp = dividend.substr(0, pick);
    let n = dividend.length;

    while (pick < n) {
        if (tmp[0] == '1') {
            tmp = xor1(divisor, tmp) + dividend[pick];
        } else {
            tmp = xor1('0'.repeat(pick), tmp) + dividend[pick];
        }
        pick += 1;
    }

    if (tmp[0] == '1') {
        tmp = xor1(divisor, tmp);
    } else {
        tmp = xor1('0'.repeat(pick), tmp);
    }
    return tmp;
}

function encodeData() {
    let data = document.getElementById('dataWord').value;
    let key = document.getElementById('key').value;

    let l_key = key.length;
    let str = '0'.repeat(l_key - 1);
    let appended_data = data + str;

    let remainder = mod2div(appended_data, key);
    let codeword = data + remainder;

    document.getElementById('outputCrc').innerText = "Remainder: " + remainder + "\nEncoded Data (Data + Remainder): " + codeword;
}

// Display the selected interface
function showCodeInterface() {
    let choice = document.getElementById('codeChoice').value;

    document.getElementById('hammingInterface').style.display = choice === 'hamming' ? 'block' : 'none';
    document.getElementById('crcInterface').style.display = choice === 'crc' ? 'block' : 'none';
}
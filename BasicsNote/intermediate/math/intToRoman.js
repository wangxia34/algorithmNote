window.onload = function (ev) {
    
    /*
        罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
        
        字符          数值
        I             1
        V             5
        X             10
        L             50
        C             100
        D             500
        M             1000
        
        例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
        
        通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，
        所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
        
        I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
        X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
        C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
        
        给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。
        
        示例 1:
        输入: 3
        输出: "III"
        
        示例 2:
        输入: 4
        输出: "IV"
        
        示例 3:
        输入: 9
        输出: "IX"
        
        示例 4:
        输入: 58
        输出: "LVIII"
        解释: L = 50, V = 5, III = 3.
        
        示例 5:
        输入: 1994
        输出: "MCMXCIV"
        解释: M = 1000, CM = 900, XC = 90, IV = 4.
     */
    
    
    
    /**
     * @param {number} num
     * @return {string}
     */
    let intToRoman1 = function(num) {
        let romanNum = {
            1: "I",
            5: "V",
            10: "X",
            50: "L",
            100: "C",
            500: "D",
            1000: "M"
        };
        let str = "", i = 1;
        
        while (num > 0) {
            let number = num % 10;
            let number2 = num % 10 * i;
    
            if (number === 5) {
                str = romanNum[number2] + str
            } else if (number > 8) {
                let n = "";
                for (let j = 0; j < 10 - number; j++) {n += romanNum[i]}
                n += romanNum[i * 10];
                str = n + str
            } else if (number > 5) {
                let n = romanNum[5 * i];
                for (let j = 0; j < number - 5; j++) {n += romanNum[i]}
                str = n + str
            } else if (number > 3) {
                let n = "";
                for (let j = 0; j < 5 - number; j++) {n += romanNum[i]}
                n += romanNum[5 * i];
                str = n + str
            } else {
                let n = "";
                for (let j = 0; j < number; j++) {n += romanNum[i]}
                str = n + str
            }
            i = i * 10;
            num = Math.floor(num / 10);
        }
        
        return str
    };
    
    
    let map = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    };
    let intToRoman2 = function(num) {
        let res = '';
        let radix = 10;
        while (num) {
            let digit = num % 10;
            if (digit < 4) {
                res = map[radix/10].repeat(digit) + res;
            } else if (digit === 4) {
                res = map[radix/10] + map[5 * radix/10] + res;
            } else if (digit > 4 && digit < 9) {
                res = map[5 * radix/10] + map[radix/10].repeat(digit - 5) + res;
            } else {
                res = map[radix/10] + map[radix] + res;
            }
            
            radix *= 10;
            num = Math.trunc(num/10)
        }
        return res;
    };
    
    /**
     * @param {number} num
     * @return {string}
     */
    let intToRoman = function(num) {
        const arr = [
            [ '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX' ],
            [ '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC' ],
            [ '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM' ],
            [ '', 'M', 'MM', 'MMM', ],
        ];
        let res = '';
        const numStr = '' + num;
        for ( let i = 0, l = numStr.length; i < l; i++ ) {
            res += arr[ l - i - 1 ][ numStr[ i ] ]
        }
        return res
    };
    
    
    console.log(3, intToRoman(3));
    console.log(4, intToRoman(4));
    console.log(9, intToRoman(9));
    console.log(58, intToRoman(58));
    console.log(1994, intToRoman(1994));

};
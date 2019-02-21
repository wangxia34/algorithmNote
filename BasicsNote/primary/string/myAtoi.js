window.onload = function (ev) {
    
    // 测试用例
    let str1 = "42";
    let str2 = "    -42";
    let str3 = "4193 with words";
    let str4 = "words and 987";
    let str5 = "-91283472332";
    
    
    function myAtoi1(str) {
        let i = 0,
            num = 0,
            negative = false;
            newStr = str.trim();
        while (i < newStr.length) {
            if (/[0-9]/.test(newStr[i])) {
                num = num * 10 + (newStr[i] * 1);
            } else if (i === 0 && newStr[i] === "+") {
                negative = false;
            } else if (i === 0 && newStr[i] === "-") {
                negative = true;
            } else {
                break;
            }
            i++;
        }
        if (negative) {
            num = num * -1;
        }
    
        if (num > 2147483647) {
            num = 2147483647;
        } else if(num < -2147483648) {
            num = -2147483648;
        }
        return num;
    }
    
    function myAtoi2(str) {
        str = str.trim();
        if (!str) return 0;
        if (str.length === 1) return isNaN(+str) ? 0 : +str;
    
        let extractReg = /^([+|-]?)(\d+)/,
            signal = '',
            num = 0;
        let newStr = str.replace(extractReg, (match, $signal, $num) => {
            signal = $signal;
            num = $num;
        });
    
        if (!num) return 0;
    
        if (num >= Math.pow(2, 31)) {
            num = signal === '-' ? Math.pow(2, 31) : Math.pow(2, 31) - 1;
        }
    
        return signal === '-' ? +('-' + num) : +num;
    }
    
    const getResult = num => {
        const MAX = 2147483647;
        const MIN = -2147483648;
        if (num > MAX) {
            return MAX;
        }
        return Math.max(num, MIN);
    };
    const myAtoi3 = str => {
        let result = 0;
        const noEmptyStr = str.replace(/^ +/g, '');
        
        if (noEmptyStr === '') {
            return 0;
        }
        // 首位是 +   exec----返回一个数组，数组第0项为所匹配的字符
        if (noEmptyStr[0] === '+') {
            result = /^\d+/.exec(noEmptyStr.slice(1)) || 0;
            return getResult(result);
        }
        
        if (noEmptyStr[0] === '-') {
            result = /^\d+/.exec(noEmptyStr.slice(1)) || 0;
            return getResult(-result);
        }
        
        result = /^\d+/.exec(noEmptyStr) || 0;
        return getResult(result);
    };
    
    
    function myAtoi4(str) {
        let n = parseInt(str);
        if(n){
            if(n < -2147483648) return -2147483648;
            if(n > 2147483647) return 2147483647;
            return n;
        }else{
            return 0;
        }
    }
    
    function myAtoi(str) {
        str = str.trim();
        num = +/^[+-]?\d+/.exec(str);
        if (!num) return 0;
        let max = 2 ** 31 - 1;
        let min = -(2 ** 31);
        if (num > max) return max;
        if (num < min) return min;
        return num;
    }
    
    console.log(str1, myAtoi(str1));
    console.log(str2, myAtoi(str2));
    console.log(str3, myAtoi(str3));
    console.log(str4, myAtoi(str4));
    console.log(str5, myAtoi(str5));
    
    
};
window.onload = function (ev) {
    
    // 测试用例
    let s1 = 123;
    let s2 = -123;
    let s3 = 120;
    let s4 = 1534236469;
    
    
    function reverse1(x) {
        let arr = x.toString().split(""),
            str;
        for (let i = arr[0] === "-" ? 1 : 0, j = arr.length - 1; i < j; i++, j--) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        str = arr.join("") * 1;
        if (str > 2147483647 || str < -2147483648) {
            return 0;
        }
        return str;
    }
    
    
    function reverse2(x) {
        let digit = 0, res = 0;
        while (x !== 0) {
            digit = x % 10;
            res = res * 10 + digit;
            x = (x - digit) / 10;
        }
        if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) {
            return 0;
        } else {
            return res;
        }
    }
    
    function reverse3(x) {
        let res;
        const str = String(Math.abs(x)).split('').reverse().join('');
        if (x < 0) {
            res = parseInt(`-${str}`);
        } else {
            res = parseInt(str);
        }
        if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) {
            return 0;
        } else {
            return res;
        }
    }
    
    function reverse(x) {
        let temp = [];
        let arr = [...(x.toString())];
        if(arr.includes('-')){
            arr.shift();
            temp.push('-')
        }
        arr.reverse();
        let answer = parseInt([...temp,...arr].join(''));
        if(Math.abs(answer) > (Math.pow(2,31)-1)){
            return 0
        }else{
            return answer
        }
    }
    
    console.log(reverse(s1));
    console.log(reverse(s2));
    console.log(reverse(s3));
    console.log(reverse(s4));
    
};
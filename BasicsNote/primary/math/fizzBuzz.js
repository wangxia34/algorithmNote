window.onload = function (ev) {


    /*
        写一个程序，输出从 1 到 n 数字的字符串表示。
            1. 如果 n 是3的倍数，输出“Fizz”；
            2. 如果 n 是5的倍数，输出“Buzz”；
            3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。
            
            示例：
            n = 15,
            
            返回:
            [
                "1",
                "2",
                "Fizz",
                "4",
                "Buzz",
                "Fizz",
                "7",
                "8",
                "Fizz",
                "Buzz",
                "11",
                "Fizz",
                "13",
                "14",
                "FizzBuzz"
            ]
     */
    
    
    
    function fizzBuzz(n) {
        let arr = [],
            m = 1;
        while (m <= n) {
            if (!(m % 15)) {
                arr.push("FizzBuzz")
            } else if (!(m % 3)) {
                arr.push("Fizz")
            } else if (!(m % 5)) {
                arr.push("Buzz")
            } else {
                arr.push(m + "")
            }
            m++
        }
        return arr;
    }

    console.log(fizzBuzz(15));

};
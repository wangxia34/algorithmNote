window.onload = function (ev) {
    
    // 测试用例
    let arr1 = [1, 2, 3];
    let arr2 = [4, 3, 2, 1];
    let arr3 = [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3];
    let arr4 = [9];
    let arr5 = [7,2,8,5,0,9,1,2,9,5,3,6,6,7,3,2,8,4,3,7,9,5,7,7,4,7,4,9,4,7,0,1,1,1,7,4,0,0,6];
    
    
    
    function plusOne1(digits) {
        let lastNineIndex = digits.length - 1;
        
        do{
            if(digits[lastNineIndex] !== 9){
                digits[lastNineIndex] = digits[lastNineIndex] + 1;
                return digits;
            }else{
                digits[lastNineIndex] = 0;
                lastNineIndex--;
            }
        }while(lastNineIndex >= 0);
        
        if(lastNineIndex === -1){
            digits.unshift(1);
        }
        return digits;
    }
    
    function plusOne2(digits) {
        if(digits[digits.length - 1] !== 9) {
            digits[digits.length - 1] += 1;
        } else {
            if(digits.length === 1) {
                digits.unshift(0);
            }
            digits[digits.length - 1] = 0;
            digits.splice(0, digits.length - 1, ...plusOne(digits.slice(0, digits.length - 1)))
        }
        return digits
    }
    
    function plusOne3(digits) {
        let carry = 0;
        const len = digits.length;
        for (let i = len - 1; i >= 0; i--) {
            if (i === len - 1 || carry) {
                const sum = digits[i] + 1;
                if (sum >= 10) {
                    digits[i] = sum % 10;
                    carry = 1;
                } else {
                    digits[i] = sum;
                    return digits;
                }
            }
        }
        if (carry) {
            digits.unshift(1);
        }
        return digits;
    }
    
    function plusOne(digits) {
        let result = [];
        let carry = true;
        for (let i = digits.length - 1; i >= 0; i--) {
            let value = digits[i];
            if (carry) {
                ++value;
            }
            
            carry = value > 9;
            result.push(value % 10);
        }
        
        if (carry) {
            result.push(1);
        }
        
        result.reverse();
        return result;
    }
    
    
    function plusOne5(digits) {
        let num = digits.join("");
        num = (num * 1 + 1) + "";
        return num.split("").map(num => parseInt(num));
    }
    
    
    console.log(plusOne(arr1), arr1);
    console.log(plusOne(arr2), arr2);
    console.log(plusOne(arr3), arr3);
    console.log(plusOne(arr4), arr4);
    console.log(plusOne(arr5), arr5);
    
};
window.onload = function (ev) {
    
    
    // 测试用例
    let arr11 = [1, 2, 2, 1], arr12 = [2, 2];
    let arr21 = [4, 9, 5], arr22 = [9, 4, 9, 8, 4];
    let arr31 = [4, 9, 4], arr32 = [9, 4, 9, 8];
    
    function intersect1(numArr1, numArr2) {
        let arr = [];
        let num = [];
        for (let i = 0; i < numArr1.length; i++) {
            for (let j = 0; j < numArr2.length; j++) {
                if (numArr1[i] === numArr2[j] && !arr.includes(j)) {
                    num.push(numArr1[i]);
                    arr.push(j);
                    break;
                }
            }
        }
        return num;
    }
    
    function intersect2(numArr1, numArr2) {
        if (numArr1.length === 0 || numArr2.length === 0) return [];
        let map = {};
        let res = [];
        for (let i = 0; i < numArr1.length; i++) {
            if (map[numArr1[i]] === void 0)
                map[numArr1[i]] = 1;
            else
                map[numArr1[i]]++;
        }
        for (let i = 0; i < numArr2.length; i++) {
            if (map[numArr2[i]] !== void 0 && map[numArr2[i]] > 0) {
                res.push(numArr2[i]);
                map[numArr2[i]]--;
            }
        }
        return res;
    }
    
    function intersect3(numArr1, numArr2) {
        const result = [];
        
        for (const num of numArr1) {
            const found = numArr2.indexOf(num);
            
            if(found > -1) {
                result.push(num);
                numArr2.splice(found, 1);
            }
        }
        
        return result
    }
    
    // console.log(intersect(arr11, arr12));
    // console.log(intersect(arr21, arr22));
    // console.log(intersect(arr31, arr32));
    
    // 给定排序   测试用例
    let arr41 = [1, 1, 2, 2, 4], arr42 = [2, 2];
    let arr51 = [4, 5, 9], arr52 = [4, 4, 6, 8, 9, 9];
    let arr61 = [4, 4, 9], arr62 = [4, 8, 9, 9];
    
    
    function intersect(numArr1, numArr2) {
        let arr2Num = 0;
        let num = [];
        for (let i = 0; i < numArr1.length; i++) {
            if (arr2Num === null) break;
            for (let j = arr2Num; j < numArr2.length; j++) {
                if (numArr1[i] === numArr2[j]) {
                    num.push(numArr1[i]);
                    arr2Num = j < numArr2.length - 1 ? j + 1 : null;
                    break;
                } else if (numArr2[j] > numArr1[i]) {
                    break;
                }
            }
        }
        return num;
    }
    
    
    console.log(intersect(arr41, arr42));
    console.log(intersect(arr51, arr52));
    console.log(intersect(arr61, arr62));
   
    
    
};
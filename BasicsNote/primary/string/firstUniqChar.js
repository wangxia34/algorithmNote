window.onload = function (ev) {
    
    let s1 = "leetcode";
    let s2 = "loveleetcode";
    let s3 = "";
    
    
    function firstUniqChar1(s) {
        let obj = {};
        for (let i = 0; i < s.length; i++) {
            obj[s[i]] = obj[s[i]] ? obj[s[i]] + 1 : 1;
        }
        for (let i = 0; i < s.length; i++) {
            if (obj[s[i]] === 1) {
                return i;
            }
        }
        return -1;
    }
    
    function firstUniqChar2(s) {
        const alpha = 'abcdefghijklmnopqrstuvwxyz';
        let first = s.length;
        for(let i = 0; i < alpha.length; ++i){
            let index = s.indexOf(alpha[i]);
            if(index !== -1 && index === s.lastIndexOf(alpha[i])){
                if(index < first){
                    first = index;
                }
            }
        }
        return first == s.length ? -1 : first;
    }
    
    function firstUniqChar(s) {
        let states = Array(26).fill(-1);
        let order = [];
    
        for (let i = 0; i < s.length; i++) {
            let char = s.charCodeAt(i) - 97;
        
            if (states[char] === -1) {
                order.push(char);
                states[char] = i
            } else {
                states[char] = -2
            }
        }
    
        for (let i = 0; i < order.length; i++) {
            let char = order[i];
            let index = states[char];
            if (index > -1) return index
        }
    
        return -1
    }
    
    
    console.log(firstUniqChar(s1));
    console.log(firstUniqChar(s2));
    console.log(firstUniqChar(s3));
    
    
};
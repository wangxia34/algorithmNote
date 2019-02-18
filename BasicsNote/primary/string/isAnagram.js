window.onload = function (ev) {
    
    "use strict";
    // 测试用例
    let s1 = "anagram", t1 = "nagaram";
    let s2 = "rat", t2 = "car";
    
    
    function isAnagram1(s, t) {
        if (s.length !== t.length) return false;
        let obj = {};
        for (let i = 0; i < s.length; i++) {
            obj[s[i]] = obj[s[i]] ? obj[s[i]] + 1 : 1;
        }
        for (let j = 0; j < t.length; j++) {
            if (obj[t[j]]) {
                obj[t[j]]--
            } else {
                return false;
            }
        }
        let arr = Object.values(obj);
        for (let k = 0; k < arr.length; k++) {
            if (arr[k] !== 0) {
                return false;
            }
        }
        return true;
    }
    
    
    function isAnagram2(s, t) {
        while (s !== t && s.length === t.length) {
            if (s === t || s.length !== t.length) {
                break;
            }
            let letter = new RegExp(s[0], 'g');
            s = s.replace(letter, '');
            t = t.replace(letter, '');
        }
        return s === t;
    }
    
    
    function isAnagram3(s, t) {
        var chars = Array(26).fill(0);
    
        for (var i = 0; i < s.length; i++) {
            chars[s.charCodeAt(i) - 97]++;
        }
    
        for (var i = 0; i < t.length; i++) {
            chars[t.charCodeAt(i) - 97]--;
        }
    
        for (var i = 0; i < chars.length; i++) {
            if (chars[i] !== 0) {
                return false;
            }
        }
    
        return true;
    }
    
    
    function isAnagram(s, t) {
        if(s.length !== t.length) return false;
        const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let c of str) {
            const reg = new RegExp(c, 'g');
            const m1 = s.match(reg);
            const m2 = t.match(reg);
            if(JSON.stringify(m1) !== JSON.stringify(m2)) return false;
        }
        return true
    }
    
    
    
    console.log(isAnagram(s1, t1));
    console.log(isAnagram(s2, t2));
    
};
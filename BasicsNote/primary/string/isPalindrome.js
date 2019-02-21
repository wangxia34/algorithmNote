window.onload = function (ev) {
    
    
    // 测试用例
    let s1 = "A man, a plan, a canal: Panama";
    let s2 = "race a car";
    
    
    function isPalindrome1(s) {
        if (s.length === 0) return true;
        let i = 0, j = s.length - 1,
            str = s.toLowerCase();
        while (i < j) {
            if (!/[A-Za-z0-9]/.test(str[i])) {
                i++;
                continue;
            }
            if (!/[A-Za-z0-9]/.test(str[j])) {
                j--;
                continue;
            }
            
            if (str[i] !== str[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
    
    function isPalindrome2(s) {
        let left = 0;
        let right = s.length-1;
        while(left<right){
            if(!judge(s[left])){
                left++;
            } else if(!judge(s[right])){
                right--;
            } else if((s[left].charCodeAt() + 32 - 97) %32 !== (s[right].charCodeAt() + 32 - 97) % 32){
                return false
            } else{
                left++;
                right--;
            }
        }
        return true;
        
    }
    
    function judge(char){
        if(char.charCodeAt()>64 && char.charCodeAt()<91){
            return true
        }
        
        if(char.charCodeAt()>96 && char.charCodeAt()<123){
            return true
        }
        
        if(char.charCodeAt()>47 && char.charCodeAt()<58){
            return true
        }
        
        return false;
    }
    
    function isPalindrome3(s) {
        if (s.trim().length === 0) {
            return true
        }
        s = s.replace(/[^\w^\d]/g, '').toLowerCase();
        for (let i = 0; i < ~~(s.length / 2); i++) {
            if (s[i] !== s[s.length - 1 -i]) {
                return false;
            }
        }
        return true
    }
    
    function isPalindrome(s) {
        if (s.trim().length === 0) return true;
        let str1 = s.replace(/[^\w^\d]/g, '').toLowerCase(),
            str2 = str1.split("").reverse().join("");
        return str1 === str2;
    }
    
    
    
    console.log(isPalindrome(s1));
    console.log(isPalindrome(s2));
    
    
};
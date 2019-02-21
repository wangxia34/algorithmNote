window.onload = function() {
    
    // 测试用例
    let strs1 = ["flower","flow","flight"];
    let strs2 = ["dog","racecar","car"];
    
    
    
    function longestCommonPrefix1(strs) {
        let str = strs[0] ? strs[0] : "";
        
        for (let i = 1; i < strs.length; i++) {
            if (!str.length) {
                break;
            }
            for (let j = 0; j < str.length; j++) {
                if (strs[i][j] !== str[j]) {
                    str = str.slice(0, j);
                    break;
                }
            }
        }
        
        return str;
    }
    
    function longestCommonPrefix2(strs) {
        let str = "";
        if (strs.length === 0) return str;
        let minL = strs[0].length;
        strs.forEach(item => {
            if (item.length < minL) {
                minL = item.length
            }
        });
        for(let i = minL; i > 0; i--){
            let _str = strs[0].substr(0,i);
            let key = true;
            for(let j = 0;j<strs.length;j++){
                let _strs = strs[j].substr(0,i);
                if(_strs !== _str){
                    key = false;
                    break;
                }
            }
            if(key){
                str = _str;
                break
            }
        }
        return str;
    }
    
    

    
    
    console.log(strs1, longestCommonPrefix(strs1));
    console.log(strs2, longestCommonPrefix(strs2));
    
    
};
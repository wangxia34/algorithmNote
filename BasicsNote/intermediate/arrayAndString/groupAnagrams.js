window.onload = function (ev) {
    
    /*
        给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

        示例:
        输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
        输出:
        [
          ["ate","eat","tea"],
          ["nat","tan"],
          ["bat"]
        ]
        
        说明：
        所有输入均为小写字母。
        不考虑答案输出的顺序。
     */
    
    
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    let groupAnagrams1 = function(strs) {
        if (strs.length < 1) {return []}
        let arrEnd = [[strs[0]]];
        for (let i = 1; i < strs.length; i++) {
            let item = strs[i];
            
            let flag = arrEnd.some((value, index) => {
                let initItem = value[0];
                if (initItem.length !== item.length) {return false}
                for (let k = 0; k < item.length; k++){
                    initItem = initItem.replace(item[k], "")
                }
                if (!initItem.length) {
                    arrEnd[index].push(item);
                    return true
                } else {
                    return false
                }
            });
            
            if (!flag) {
                arrEnd.push([item])
            }
        }
        
        return arrEnd
    };
    
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    let groupAnagrams2 = function(strs) {
        const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103]; // 26个质数
        
        const map = new Map();
        
        for (let str of strs) {
            let key = 1;
            for (let char of str) {
                key *= prime[char.charCodeAt() - 97] // 得到整个字符串对应质数的乘积
            }
            if (map.has(key)) { // 判断是否存在该字符串的字母异位词
                map.get(key).push(str)
            } else {
                map.set(key, [str])
            }
        }
        
        return [...map.values()]
    };
    
    
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    let groupAnagrams3 = function (strs) {
        let hash = new Map();
        strs.forEach((str)=>{
            let alpha = Array(26).fill(0); // 得到长度为26的值为0的数组
            for(let i = 0; i < str.length; i++){
                alpha[str.charCodeAt(i) - 97]++ // 将数组中存在的字符计数
            }
            
            let hashKey = alpha.join('#'); // 得到计数的字符串用 # 分隔
            if(hash.has(hashKey)) { // 判断是否存在该字符串的字母异位词
                let temp = hash.get(hashKey);
                temp.push(str);
                hash.set(hashKey, temp)
            } else {
                hash.set(hashKey, [str])
            }
            
        });
        return [...hash.values()]
    };
    
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    let groupAnagrams = function(strs) {
        let hash = new Map();
        for(let i = 0; i < strs.length; i++) {
            let str = strs[i].split('').sort().join(); // 对字符串进行排序
            if(hash.has(str)) { // 判断是否存在该字符串的字母异位词
                let temp = hash.get(str);
                temp.push(strs[i]);
                hash.set(str, temp)
            } else {
                hash.set(str, [strs[i]])
            }
        }
        return [...hash.values()]
    };
    
    
    
    let strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
    let strs2 = ["", "b"];
    
    console.log(strs1, groupAnagrams(strs1));
    console.log(strs2, groupAnagrams(strs2))
    
    
};
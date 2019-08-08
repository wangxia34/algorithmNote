/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
let solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    
    return function(n) {
        const check=(start,end)=>{
            if (end-start===0)
                return start;
            let c=Math.floor((start+end)/2);
            if (isBadVersion(c))
                return check(start,c);
            else
                return check(c+1,end);
        };
        return check(1,n);
    };
    
    /*
    return function (n) {
        let pos = Math.floor(n / 2);
        let goodPos = 0;
        let badPos = n;
        while (badPos - goodPos !== 1) {
            if (isBadVersion(pos)) {
                badPos = pos;
                pos = Math.floor((badPos + goodPos) / 2);
            } else {
                goodPos = pos;
                pos = Math.ceil((badPos + goodPos) / 2);
            }
        }
        return badPos;
    }
    */
    
};
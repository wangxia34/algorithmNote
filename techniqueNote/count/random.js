window.onload = function (ev) {
    
    /*
        数组乱序
     */
    
    /*
        并不能真正的做到随机，因为sort不能每个值都进行过比较
        插入排序将第一个元素视为有序的，会从i=1开始遍历
        
     */
    function shuffle1(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
    
    function shuffle2(arr) {
        let m = arr.length;
        while (m > 1){
            let index = Math.floor(Math.random() * m--);
            [arr[m] , arr[index]] = [arr[index] , arr[m]]
        }
        return arr;
    }
    
    function shuffle(array) {
        let arr = [...array],
            res = [];
        while (arr.length) {
            let index = (Math.random() * arr.length) >> 0;
            res[arr.length - 1] = arr[index];
            arr.splice(index, 1);
        }
        return res;
    }
    
    
    /**
     * 用于验证 shuffle 方法是否完全随机
     */
    function test_shuffle(shuffleFn) {
        // 多次乱序数组的次数
        let n = 100000;
        // 保存每个元素在每个位置上出现的次数
        let countObj = {
            a:Array.from({length:10}).fill(0),
            b:Array.from({length:10}).fill(0),
            c:Array.from({length:10}).fill(0),
            d:Array.from({length:10}).fill(0),
            e:Array.from({length:10}).fill(0),
            f:Array.from({length:10}).fill(0),
            g:Array.from({length:10}).fill(0),
            h:Array.from({length:10}).fill(0),
            i:Array.from({length:10}).fill(0),
            j:Array.from({length:10}).fill(0),
        };
        for (let i = 0; i < n; i ++) {
            let arr1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            let arr = shuffleFn(arr1);
            countObj.a[arr.indexOf('a')]++;
            countObj.b[arr.indexOf('b')]++;
            countObj.c[arr.indexOf('c')]++;
            countObj.d[arr.indexOf('d')]++;
            countObj.e[arr.indexOf('e')]++;
            countObj.f[arr.indexOf('f')]++;
            countObj.g[arr.indexOf('g')]++;
            countObj.h[arr.indexOf('h')]++;
            countObj.i[arr.indexOf('i')]++;
            countObj.j[arr.indexOf('j')]++;
        }
        console.table(countObj);
    }
    
    //验证 shuffle 方法是否随机
    test_shuffle(shuffle)
    
};
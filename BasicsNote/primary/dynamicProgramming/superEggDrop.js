window.onload = function (ev) {
    
    /*
    
        你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
        
        每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
        
        你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
        
        每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
        
        你的目标是确切地知道 F 的值是多少。
        
        无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？
        
        示例 1：
        输入：K = 1, N = 2
        输出：2
        解释：
        鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
        否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
        如果它没碎，那么我们肯定知道 F = 2 。
        因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
        
        
        示例 2：
        输入：K = 2, N = 6
        输出：3
        
        
        示例 3：
        输入：K = 3, N = 14
        输出：4
    
        K个鸡蛋  N层楼
     */
    
    // 暴力破解法 时间复杂度 O(2^n)  空间复杂度 O(1)
    function superEggDrop1(K, N) {
        if (N === 0 || N === 1 || K === 1) {
            return N;
        }
    
        let minimun = N;
        for (let i = 1; i <= N; i++) {
            let tMin = Math.max(superEggDrop(K - 1, i - 1), superEggDrop(K, N - i));
            minimun = Math.min(minimun, 1 + tMin);
        }
        return minimun;
    }
    
    // 存储重复计算值(用空间换时间)  时间复杂度 O(KN^2)  空间复杂度O(KN)
    function superEggDrop2(K, N) {
        let middleResults = [[]];
        for (let i = 0; i < K + 1; i++) {
            middleResults.push([]);
            middleResults[i + 1][0] = 0; // zero floor
        }
        for (let i = 1; i <= N; i++) {
            middleResults[1][i] = i; // only one egg
            middleResults[0][i] = 0; // no egg
        }
    
        for (let k = 2; k <= K; k++) { // start from two egg
            for (let n = 1; n <= N; n++) {
                let tMinDrop = N * N;
                for (let x = 1; x <= n; x++) {
                    tMinDrop = Math.min(tMinDrop, 1 + Math.max(middleResults[k - 1][x - 1], middleResults[k][n - x]));
                }
                middleResults[k][n] = tMinDrop;
            }
        }
    
        return middleResults[K][N];
    }
    
    // 利用二分法 并存储
    let cache = new Map();
    function superEggDrop3(K, N) {
        if (N === 0)
            return 0;
        else if (K === 1)
            return N;
    
        let key = N * 1000 + K; // K <= 100
        if (cache.has(key))
            return cache.get(key);
    
        let low = 1, high = N;
        while (low + 1 < high) {
            let middle = parseInt((low + high) / 2);
            let lowVal = superEggDrop(K - 1, middle - 1);
            let highVal = superEggDrop(K, N - middle);
        
            if (lowVal < highVal)
                low = middle;
            else if (lowVal > highVal)
                high = middle;
            else
                low = high = middle;
        }
        let minimum = 1 + Math.min(
            Math.max(superEggDrop(K - 1, low - 1), superEggDrop(K, N - low)),
            Math.max(superEggDrop(K - 1, high - 1), superEggDrop(K, N - high))
        );
    
        cache.set(key, minimum);
    
        return cache.get(key);
    }
    
    // 二分法进阶版
    function superEggDrop4(K, N) {
        // only one egg situation
        let dp = [];
        for (let i = 0; i <= N; ++i)
            dp[i] = i;
    
        // two and more eggs
        for (let k = 2; k <= K; ++k) {
            let dp2 = [];
            let x = 1; // start from floor 1
            for (let n = 1; n <= N; ++n) {
                // start to calculate from bottom
                // Notice max(dp[x-1], dp2[n-x]) > max(dp[x], dp2[n-x-1])
                // is simply max(T1(x-1), T2(x-1)) > max(T1(x), T2(x)).
                while (x < n && Math.max(dp[x - 1], dp2[n - x]) > Math.max(dp[x], dp2[n - x - 1]))
                    x++;
            
                // The final answer happens at this x.
                dp2[n] = 1 + Math.max(dp[x - 1], dp2[n - x]);
            }
        
            dp = dp2;
        }
    
        return dp[N];
    }
    
    function superEggDrop(K, N) {
        let dp = [];
        for (let i = 0; i < K + 1; i++) {
            dp.push([]);
        }
        
        for (let m = 1; m <= N; m++) {
            dp[0][m] = 0; // zero egg
            for (let k = 1; k <= K; k++) {
                dp[k][m] = (dp[k][m - 1] || 0) + (dp[k - 1][m - 1] || 0) + 1;
                if (dp[k][m] >= N) {
                    return m;
                }
            }
        }
        return N;
    }
    
    
    console.log(superEggDrop(1, 2));
    console.log(superEggDrop(2, 6));
    console.log(superEggDrop(3, 14));
    
};
window.onload = function (ev) {
    
    // 测试用例
    
    let arr11 = [1,2,3,0,0,0], m1 = 3,
        arr12 = [2,5,6],       n1 = 3;
    
    
    function merge1(nums1, m, nums2, n) {
        nums1.splice(m);
        let i = 0, j = 0;
        while (j < n) {
            if (nums1[i] <= nums2[j]) {
                i++;
            } else {
                nums1.splice(i, 0, nums2[j]);
                j++;
                i++;
            }
        }
    }
    
    function merge2(nums1, m, nums2, n) {
        let i = m - 1;
        let j = n - 1;
        while(i >= 0 || j >= 0) {
            if (nums1[i] >= nums2[j] || j < 0) {
                nums1[i + j + 1] = nums1[i];
                i--;
            } else {
                nums1[i + j + 1] = nums2[j];
                j--;
            }
        }
    }
    
    function merge(nums1, m, nums2, n) {
        for (let i = m, j = 0; i < m + n; i++,j++) {
            nums1[i] = nums2[j];
        }
        nums1.sort((a,b) => a-b);
    }
    
    
    
    merge(arr11, m1, arr12, n1);
    console.log(arr11, m1, arr12, n1);
    
    
    
};
window.onload = function (ev) {
    
    
    // 构造简单的链表
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    ListNode.prototype.init = function(arr){
        let header = this;
        if (arr.length === 1) {
            header.val = arr[0];
            header.next = null;
        }
        for(let i = 0; i < arr.length - 1; i++){
            header.val = arr[i];
            header.next = new ListNode(arr[i + 1]);
            header = header.next;
        }
    };
    let l1 = new ListNode(0);
    l1.init([1, 2, 3]);
    let l2 = new ListNode(0);
    l2.init([1, 2, 3, 4, 6]);
    
    
    function mergeTwoLists1(l1, l2) {
        let newL = null,
            f = null,
            reL = null,
            l11 = l1,
            l22 = l2;
        
        while (l11 || l22) {
            if ((l11 && !l22) || (l11 && l11.val <= l22.val)) {
                f = reL;
                reL = l11;
                l11 = l11.next;
                reL.next = f;
            } else {
                f = reL;
                reL = l22;
                l22 = l22.next;
                reL.next = f;
            }
        }
        
        while (reL) {
            f = newL;
            newL = reL;
            reL = reL.next;
            newL.next = f;
        }
        
        return newL;
    }
    
    
    function mergeTwoLists2(l1, l2) {
        if (l1 === null) {
            return l2;
        }
        if (l2 === null) {
            return l1;
        }
        if(l1.val <= l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
    
    function mergeTwoLists(l1, l2) {
        let newListNode = new ListNode(null);
        let temp = newListNode;
        while(l1 && l2){
            if(l1.val < l2.val){
                temp.next = l1;
                l1 = l1.next;
            }else{
                temp.next = l2;
                l2 = l2.next;
            }
            temp = temp.next;
        }
        temp.next = l1 || l2;
        return newListNode.next;
    }
    
    console.log(mergeTwoLists(l1, l2));
    
    
};
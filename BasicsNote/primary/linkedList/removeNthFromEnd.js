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
    l1.init([1, 2, 3, 4, 5]);
    let l2 = new ListNode(0);
    l2.init([1]);
    
    
    let removeNthFromEnd1 = function(head, n) {
        let newHead = new ListNode(0);
        newHead.next = head;
        let slow = newHead,fast = newHead;
        let i = 0,len = 0;
        while(fast !== null && fast.next !== null){
            slow = slow.next;
            fast = fast.next.next;
            i++
        }
        if(fast){
            len = i*2
        }else {
            len = 2*i - 1
        }
        let node = newHead;
        let j = 0;
        while(j < (len - n)){
            node = node.next;
            j++
        }
        node.next = node.next.next;
        return newHead.next
        
    };
    
    
    let removeNthFromEnd = function(head, n) {
        return removeNthFromEndHelper(head, n, 0) === n ? head.next : head;
    };
    
    let removeNthFromEndHelper = function(head, n, count) {
        if (head.next !== null) {
            count = removeNthFromEndHelper(head.next, n, count);
        }
        if (count === n) {
            head.next = head.next.next;
        }
        return ++count;
    };
    
    
    console.log(removeNthFromEnd(l1, 2));
    console.log(l1);
    console.log(removeNthFromEnd(l2, 1));
    console.log(l2);
    
    
    
    
    
    
    
    
    
    
    
    
};
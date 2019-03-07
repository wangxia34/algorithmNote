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
    l2.init([1, 2, 3, 2, 1]);
    
    
    function isPalindrome1(head) {
        let f = head,
            arr = [];
        while (f) {
            arr.push(f);
            f = f.next;
        }
        
        for (let i = 0; i < arr.length / 2; i++) {
            if (arr[i].val !== arr[arr.length - 1 - i].val) {
                return false;
            }
        }
        return true;
    }
    
    
    function isPalindrome2(head) {
        if(!head) return true;
        let s = head;
        let f = head;
    
        while(f && f.next && f.next.next) {
            s = s.next;
            f = f.next.next;
        }
        let right = s.next;
        s.next = null;
    
        let current = right;
        let last = null;
        while(current){
            const next = current.next;
            current.next = last;
            last = current;
            current = next;
        }
    
        let a = head;
        let b = last;
    
        while(a && b) {
            if(a.val !== b.val) {
                return false;
            }
            a = a.next;
            b = b.next;
        }
        return true;
    }
    
    
    function isPalindrome(head) {
        if(!head){
            return true
        }
        if(!head.next){
            return true;
        }
        if(!head.next.next){
            return head.val === head.next.val
        }
    
        let slow = head,
            fast = head,
            count = 1;
    
        while(fast.next){
            if(fast.next.next){
                slow = slow.next;
                fast = fast.next.next;
                count += 2;
            }else{
                count += 1;
                break;
            }
        }
    
        let resver = count % 2 ? slow : slow.next;
        let next = resver.next;
        slow.next = null;
        resver.next = null;
        while (next) {
            let temp = next.next;
            next.next = resver;
            resver = next;
            next = temp;
        }
    
        while (head && resver && head.val === resver.val){
            head = head.next;
            resver = resver.next;
        }
    
        return !head && !resver;
    }
    
    console.log(isPalindrome(l1));
    console.log(isPalindrome(l2));
    
    
    
};
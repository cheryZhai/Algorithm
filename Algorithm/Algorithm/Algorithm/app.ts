class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.init();
    }

    init() {
        let a = [10, 7, 9, 23, 13, 5, 5, 5, 2, 2, 10, 19, 20];

        let l = new LinkList.SingleLinkList(a);
        let enter = '\r\n';
        this.span.innerText += '初始：' + l + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '排序：' + l.sort() + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '倒序：' + l.reverse() + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '找13的前驱节点：' + l.find(13) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '删除23：' + l.delete(23) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '在链尾添加23：' + l.insertAfter(23) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '在链头添加14：' + l.insertBefore(14) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '按顺序插入1：' + l.insertWithSort(1) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '按顺序插入25：' + l.insertWithSort(25) + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
        this.span.innerText += '删除重复节点：' + l.removeDupliteNodes() + ' 头节点：' + l.getStartNode() + ' 尾节点：' + l.getLastNode() + enter;
        this.span.innerText += '长度：' + l.size() + enter;
    }


}

module LinkList {
    export class SingleLinkList {
        private startNode: LinkNode;
        private lastNode: LinkNode;

        constructor(array: number[]) {
            if (!array || array.length == 0) {
                return;
            }
            this.lastNode = new LinkNode(array[array.length - 1], null);

            let last = this.lastNode;
            for (let i = array.length - 2; i > -1; i--) {
                var c = new LinkNode(array[i], last);
                last = c;
            }
            this.startNode = new LinkNode(null, last);
        }

        getStartNode() {
            return this.startNode.next;
        }

        getLastNode() {
            return this.lastNode;
        }

        //排序
        sort(): SingleLinkList {
            let p1 = this.startNode;
            let start = p1.next;
            while (start != null) {
                let p2 = start;
                let next = start.next;
                while (next != null) {
                    if (start.data > next.data) {
                        p1.next = next;
                        p2.next = start;

                        let temp = start.next;
                        start.next = next.next;
                        next.next = temp;

                        let temp2 = next;
                        next = start;
                        start = temp2;
                    }
                    p2 = next;
                    next = next.next;
                }
                p1 = start;
                start = start.next;
            }
            this.lastNode = p1;
            return this;
        }

        //倒序
        reverse(): SingleLinkList {
            let headNode = this.startNode;
            let start = this.startNode.next;
            headNode.next = null;
            this.lastNode = start;

            while (start != null) {
                let next = start.next;
                let reversedNext = headNode.next;
                start.next = reversedNext;
                headNode.next = start;
                start = next;
            }
            this.startNode = headNode;
            return this;
        }

        //长度
        size(): number {
            let num = 0,
                start = this.startNode.next;
            while (start != null) {
                num++;
                start = start.next;
            }
            return num;
        }

        //找到值为value的直接前驱节点
        find(value: number): LinkNode {
            let start = this.startNode;
            while (start != null) {
                if (start.next.data == value) {
                    return start;
                }
                start = start.next;
            }
            return new LinkNode('not Found', null)
        }

        //返回链表值字符串
        toString(): string {
            var s = [];
            var start = this.startNode.next;
            while (start != null) {
                s.push(start.data);
                start = start.next;
            }
            return s.join(',');
        }

        //删除值为value的节点
        delete(value): SingleLinkList {
            let p = this.startNode,
                s = p.next;
            while (s != null) {
                if (s.data == value) {
                    if (s == this.lastNode) {
                        this.lastNode = p;
                    }
                    p.next = s.next;
                } else {
                    p = s;
                }
                s = s.next;
            }

            return this;
        }

        //删除大于min小于max的节点
        deleteBetween(min, max): SingleLinkList {
            let p = this.startNode,
                s = p.next;
            while (s != null) {
                if (s.data > min && s.data < max) {
                    if (s == this.lastNode) {
                        this.lastNode = p;
                    }
                    p.next = s.next;
                } else {
                    p = s;
                }
                s = s.next;
            }

            return this;
        }

        //删除重复的节点
        removeDupliteNodes(): SingleLinkList {
            let s = this.getStartNode();

            while (s != null) {
                let p = s,
                    next = s.next;
                while (next != null) {
                    if (s.data == next.data) {
                        p.next = next.next;
                    } else {
                        p = next;
                    }
                    next = next.next;
                }
                s = s.next;
            }
            return this;
        }

        //在链尾插入节点
        insertAfter(value): SingleLinkList {
            this.lastNode.next = new LinkNode(value, null);
            this.lastNode = this.lastNode.next;
            return this;
        }

        //在链头插入节点
        insertBefore(value): SingleLinkList {
            let sNext = this.startNode.next,
                newNode = new LinkNode(value, sNext);

            this.startNode.next = newNode;

            return this;
        }

        //按顺序插入节点
        insertWithSort(value): SingleLinkList {
            this.sort();
            let isInsert = false,
                p = this.getStartNode(),
                s = p.next;
            if (value <= p.data) {
                return this.insertBefore(value);
            }
            while (s != null) {
                if (value <= s.data) {
                    let newNode = new LinkNode(value, s);
                    p.next = newNode;
                    isInsert = true;
                    break;
                }
                p = s;
                s = p.next;
            }
            if (!isInsert) {
                return this.insertAfter(value);
            }

            return this;
        }

    }

    class LinkNode {
        public next: LinkNode;
        public data: number;

        constructor(data: any, next: LinkNode) {
            this.next = next;
            this.data = data;
        }

        toString() {
            return this.data;
        }
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
};
/**
 * Created by admin on 2017/3/1.
 */
$(function(){
    /*utils*/
    var _run = {
        type:function(obj){
            return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g,"");
        },
        isArray:function(val){
            return _run.type(val) === "Array";
        },
        slice:function(val,i){
            return Array.prototype.slice.call(val,i);
        },
        each:function(array, fn) {
            for (var i = 0, len = array.length; i < len; i++) {
                fn(array[i], i)
            }
        },
        truthy:function(val){
            return !!val;
        },
        isString:function(val){
            return _run.type(val) === "String";
        },
        toArray:function(arr){
            if(!arr){
                return [];
            }
            var list = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                list.push(arr[i]);
            }
            return list;
        },
        setAttr:function(node,key,val){
            switch (key){
                case "style":
                    node.key = val;
                    break;
                case "value":
                    var tagName = node.tagName || "";
                    tagName = tagName.toLowerCase();
                    if(tagName == "text" || tagName == "textarea"){
                        node.value = value;
                    }else{
                        node.setAttribute(key,val);
                    }
                    break;
                default :
                    node.setAttribute(key,val);
                    break;
            }
        }
    }

    /*create dom*/
    function Element(tagName,props,children){
        if(!(this instanceof Element)){
            if(!(_run.isArray(children)) && children != null){
                children = _run.slice(arguments,2).filter(_run.truthy);
            }
            return new Element(tagName,props,children);
        }
        if(_run.isArray(props)){
            children = props;
            props = {};
        }
        this.tagName = tagName;
        this.props = props || {};
        this.children = children || [];
        this.key = props?props.key:void 666;

        var count = 0;

        _run.each(this.children, function (child, i) {
            if(child instanceof Element){
                count += child.count;

            }else{
                children[i] = ''+ child;
            }
            count++
        })
        this.count = count;
    }

    Element.prototype.render = function(){
        var el = document.createElement(this.tagName);
        var props = this.props;
        for(var propName in props){
            var propValue = props[propName];
            _run.setAttr(el,propName,propValue);
        }
        _run.each(this.children,function(child){
            var childEl = (child instanceof Element)?child.render():document.createTextNode(child);
            el.appendChild(childEl);
        });
        return el;
    }

    /**
     * Diff two list in O(N).
     * @param {Array} oldList - Original List
     * @param {Array} newList - List After certain insertions, removes, or moves
     * @return {Object} - {moves: <Array>}
     *                  - moves is a list of actions that telling how to remove and insert
     */
    function listDiff(oldList,newList,key){
        var oldMap = makeKeyIndexAndFree(oldList,key);
        var newMap = makeKeyIndexAndFree(newList,key);
        var newFree = newMap.free;
        var oldKeyIndex = oldMap.keyIndex;
        var newKeyIndex = newMap.keyIndex;
        var moves = [];
        var children = [];
        var i = 0;
        var item,itemKey,freeIndex = 0;

        while(i < oldList.length){
            item = oldList[i];
            itemKey = getItemKey(item,key);
            if(itemKey){
                if(!newKeyIndex.hasOwnProperty(itemKey)){
                    children.push(null);
                }else{
                    var newItemIndex = newKeyIndex[itemKey];
                    children.push(newList[newItemIndex]);
                }
            }else{
                var freeItem = newFree[freeIndex++];
                children.push(freeItem || null);
            }
            i++;
        }

        var simulateList = children.slice(0);
        i = 0;
        while(i<simulateList.length){
            if(simulateList[i] === null){
                remove(i);
                removeSimulate[i]
            }else{
                i++;
            }
        }

        var j = i = 0;
        while(i<newList.length){
            item = newList[i];
            itemKey = getItemKey(item,key);
            var simulateItem = simulateList[j];
            var simulateItemKey = getItemKey(simulateItem,key);
            if(simulateItem){
                if(itemKey === simulateItemKey){
                    j++;
                }
                else{
                    if(!oldKeyIndex.hasOwnProperty(itemKey)){
                        insert(i,item);
                    }else{
                        var nextItemKey = getItemKey(simulateList[j+1],key);
                        if(nextItemKey === itemKey){
                            remove(i);
                            removeSimulate(j);
                            j++;
                        }else{
                            insert(i,item);
                        }
                    }
                }
            }else{
                insert(i,item);
            }
            i++;
        }

        function remove(index){
            var move = {index:index,type:0};
            moves.push(move);
        }

        function removeSimulate(index){
            simulateList.splice(index,1);
        }

        function insert(index,item){
            var move = {index:index,item:item,type:1};
            moves.push(move);
        }

        return {
            moves: moves,
            children: children
        }

    }



    /**
     * Convert list to key-item keyIndex object.
     * @param {Array} list
     * @param {String|Function} key
     */
    function makeKeyIndexAndFree(list,key){
        var keyIndex = {};
        var free = [];
        list.forEach(function(d,i){
            var itemKey = getItemKey(d,key);
            if(itemKey){
                keyIndex[itemKey] = i;
            }else{
                free.push(d);
            }
        });
        return {keyIndex:keyIndex,free:free}
    }

    function getItemKey(item,key){
        if(!item || !key){
            return void 666;
        }
        return typeof key === "string"?item[key]:key(item);
    }

    /********diff********/
    var REPLACE = 0;
    var REORDER = 1;
    var PROPS = 2;
    var TEXT = 3;

    function diff(oldTree,newTree){
        var index = 0;
        var patches = {};
        dfsWalk(oldTree,newTree,index,patches);
        return patches;
    }

    function dfsWalk(oldNode,newNode,index,patches){
        var currentPatch = [];

        if(newNode == null){

        }else if(_run.isString(oldNode) && _run.isString(newNode)){
            currentPatch.push({type:TEXT,content:newNode});
        }else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key){
            var propsPatches = diffProps(oldNode,newNode);
            if(propsPatches){
                currentPatch.push({type:PROPS,props:propsPatches});
            }
            if(!isIgnoreChildren(newNode)){
                diffChildren(
                    oldNode.children,
                    newNode.children,
                    index,
                    patches,
                    currentPatch
                )
            }
        }else{
            currentPatch.push({type:REPLACE,node:newNode})
        }

        if(currentPatch.length){
            patches[index] = currentPatch;
        }
    }

    function diffChildren(oldChildren, newChildren, index, patches, currentPatch){
        var diffs = listDiff(oldChildren, newChildren,"key");
        newChildren = diffs.children;

        if(diffs.moves.length){
            var reorderPatch = {type:REORDER,moves:diffs.moves};
            currentPatch.push(reorderPatch);
        }

        var leftNode = null;
        var currentNodeIndex = index;

        _run.each(oldChildren,function(child,i){
            var newChild = newChildren[i];
            currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex +leftNode.count + 1:
                currentNodeIndex + 1;
            dfsWalk(child,newChild,currentNodeIndex,patches);
            leftNode = child;
        })
    }

    function diffProps(oldNode,newNode){
        var count = 0;
        var oldProps = oldNode.props;
        var newProps = newNode.props;
        var key,value;
        var propsPatches = {};
        for(key in oldProps){
            value = oldProps[key];
            if(newProps[key] !== value){
                count++;
                propsPatches[key] = newProps[key];
            }
        }

        for(key in newProps){
            if(!oldProps.hasOwnProperty(key)){
                count ++;
                propsPatches[key] = newProps[key];
            }
        }

        if(count === 0){
            return null;
        }

        return propsPatches;
    }

    function isIgnoreChildren (node) {
        return (node.props && node.props.hasOwnProperty("ignore"));
    }

    /***********patch*****************/

    function patch(node,patches){
        var walker = {index : 0};
        dfsWalks(node,walker,patches);
    }

    function dfsWalks(node,walker,patches){
        var currentPatches = patches[walker.index];
        var len = node.childNodes ? node.childNodes.length : 0;
        for(var i = 0; i <len; i++){
            var child = node.childNodes[i];
            walker.index ++;
            dfsWalks(child,walker,patches);
        }

        if(currentPatches){
            applyPatches(node,currentPatches);
        }
    }

    function applyPatches(node,currentPatches){
        _run.each(currentPatches,function(currentPatch){
            switch (currentPatch.type){
                case REPLACE:
                    var newNode = (typeof currentPatch.node === "string")?
                        document.createTextNode(currentPatch.node):
                        currentPatch.node.render();
                    node.parentNode.replaceChild(newNode,node);
                    break;
                case REORDER:
                    reorderChildren(node,currentPatch.moves);
                    break;
                case PROPS:
                    setProps(node,currentPatch.props);
                    break;
                case TEXT:
                    if(node.textContent){
                        node.textContent = currentPatch.content;
                    }else{
                        node.nodeValue = currentPatch.content;
                    }
                    break;
                default :
                    throw new Error('Unknown patch type ' + currentPatch.type);
            }
        })
    }

    function setProps(node,props){
        for(var key in props){
            if(props[key] === void 666){
                node.removeAttribute(key);
            }else{
                _run.setAttr(node,key,props[key]);
            }
        }
    }

    function reorderChildren(node,moves){
        var staticNodeList = _run.toArray(node.childNodes);
        var maps = {};

        _run.each(staticNodeList,function(node){
            if(node.nodeType === 1){
                var key = node.getAttribute("key");
                if(key){
                    maps[key] = node;
                }
            }
        });

        _run.each(moves,function(move){
            var index = move.index;
            if(move.type === 0){
                if(staticNodeList[index] === node.childNodes[index]){
                    node.removeChild(node.childNodes[index]);
                }
                staticNodeList.splice(index,1);
            }else if(move.type === 1){
                var insertNode = maps[move.item.key]?maps[move.item.key]:(typeof move.item === "object")?
                    move.item.render():document.createTextNode(move.item);

                staticNodeList.splice(index,0,insertNode);
                node.insertBefore(insertNode,node.childNodes[index] || null);
            }
        })
    }
})
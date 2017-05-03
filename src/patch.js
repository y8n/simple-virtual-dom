import * as _ from './utils';

export const types = {
    TEXT: 'TEXT',
    PROPS: 'PROPS',
    REPLACE: 'REPLACE',
    REMOVE: 'REMOVE',
    INSERT: 'INSERT'
};

export default function(node, patches) {
    var walker = {
        index: 0
    };
    dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
    var currentPatches = patches[walker.index];

    var len = node.childNodes ? node.childNodes.length : 0;
    for (var i = 0; i < len; i++) {
        var child = node.childNodes[i];
        walker.index++;
        dfsWalk(child, walker, patches);
    }

    if (currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function applyPatches(node, currentPatches) {
    var removeCount = 0;
    _.each(currentPatches, function(currentPatch) {
        switch (currentPatch.type) {
            case types.REPLACE:
                var newNode = (typeof currentPatch.node === 'string') ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;
            case types.INSERT:
                var insertNode = (typeof currentPatch.node === 'object') ? currentPatch.node.render() : document.createTextNode(currentPatch.node);
                node.appendChild(insertNode);
                break;
            case types.REMOVE:
                var removeIndex = currentPatch.index - removeCount;
                node.removeChild(node.childNodes[removeIndex]);
                removeCount++;
                break;
            case types.PROPS:
                setProps(node, currentPatch.props);
                break;
            case types.TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    // IE
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    });
}

function setProps(node, props) {
    for (var key in props) {
        if (_.isUndefined(props[key])) {
            node.removeAttribute(key);
        } else {
            var value = props[key];
            _.setAttr(node, key, value);
        }
    }
}
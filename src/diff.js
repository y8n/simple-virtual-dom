import * as _ from './utils';
import {
    types
} from './patch';

export default function(oldTree, newTree) {
    let index = 0;
    let patches = {};
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}

function dfsWalk(oldNode, newNode, index, patches) {
    let currentPatch = [];
    if (_.isUndef(newNode)) {} else if (_.isString(oldNode) && _.isString(newNode)) {
        if (newNode !== oldNode) {
            currentPatch.push({
                type: types.TEXT,
                content: newNode
            });
        }
    } else if (oldNode.tagName === newNode.tagName) {
        var propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({
                type: types.PROPS,
                props: propsPatches
            });
        }
        diffChildren(
            oldNode.children,
            newNode.children,
            index,
            patches,
            currentPatch
        );
    } else {
        currentPatch.push({
            type: types.REPLACE,
            node: newNode
        });
    }
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var leftNode = null;
    var currentNodeIndex = index;
    _.each(oldChildren, function(child, i) {
        var newChild = newChildren[i];
        if (newChild) {
            currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
            dfsWalk(child, newChild, currentNodeIndex, patches);
            leftNode = child;
        } else {
            currentPatch.push({
                type: types.REMOVE,
                index: i
            });
        }
    });
    if (oldChildren.length < newChildren.length) {
        let i = oldChildren.length;
        while (i < newChildren.length) {
            var newChild = newChildren[i];
            currentPatch.push({
                type: types.INSERT,
                node: newChild
            });
            i++;
        }
    }
}

function diffProps(oldNode, newNode) {
    let hasDiff = false;
    let oldProps = oldNode.props;
    let newProps = newNode.props;

    let key, value;
    let propsPatches = {};

    // Find out different properties
    for (key in oldProps) {
        value = oldProps[key];
        if (newProps[key] !== value) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    // Find out new property
    for (key in newProps) {
        value = newProps[key];
        if (!oldProps.hasOwnProperty(key)) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    if (hasDiff) {
        return propsPatches;
    }
    // If properties all are identical
    return null;

}
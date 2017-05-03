import * as _ from './utils';

class Element {
    constructor(tagName, props, children) {
        if (_.isArray(props)) {
            children = props;
            props = {};
        }

        this.tagName = tagName;
        this.props = props || {};
        this.key = props ? props.key : void 0;
        this.children = children || [];
        var count = 0;

        _.each(this.children, function(child, i) {
            if (child instanceof Element) {
                count += child.count;
            } else {
                children[i] = '' + child;
            }
            count++;
        });

        this.count = count;
    }
    render() {
        let el = document.createElement(this.tagName);
        let props = this.props;

        for (const propName in props) {
            _.setAttr(el, propName, props[propName]);
        }

        let children = this.children || [];

        children.forEach(child => {
            let childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
            el.appendChild(childEl);
        });

        return el;
    }
}

export default function(tagName, props, children) {
    return new Element(tagName, props, children);
}
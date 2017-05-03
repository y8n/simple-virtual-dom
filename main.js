import element from './src/element.js';
import diff from './src/diff.js';
import patch from './src/patch.js';

let tree = element('ul', {
    id: 'list'
}, [
    element('li', {
        class: 'item'
    }, ['Item 1']),
    element('li', {
        class: 'item'
    }, ['Item 2']),
    element('li', {
        class: 'item'
    }, ['Item 3'])
]);

let app = document.getElementById('app');

let ulRoot = tree.render();
app.appendChild(ulRoot);


let newTree = element('ul', {
    class: 'goods-list'
}, [
    element('li', {id: 'first'}, ['Item 2']),
    element('li', ['Item 4']),
    element('li', ['Item 5']),
    element('li', ['Item 6']),
    element('li')
]);

let patches = diff(tree, newTree);

patch(ulRoot, patches);





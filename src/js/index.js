import add from './util';
import $ from 'jquery';
import '../css/index.css';

async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncAppendNode(ms) {
    await timeout(ms);

    $('#root').append("<p>this is a another 'p'</p>");
}

$(document).ready(function(){
    $('#root').append("<p>this is a another 'p'</p>");
    document.getElementById("first").onclick = function () {
        alert(add(4, 5));
    };
    
    
    $('root').click(function () {
        alert('click on root1');
    });

    asyncAppendNode(500);
});
import add from './util';
import $ from 'jquery';
import '../css/index.css';


$(document).ready(function(){
    document.getElementById("first").onclick = function () {
        alert(add(4, 5));
    };
    
    alert('ready');
    $('root').click(function () {
        alert('click on root');
    });
});
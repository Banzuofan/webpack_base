import add from './util';
import $ from 'jquery';
import '../css/home.css';


$(document).ready(function(){
    alert('welcome');
    document.getElementById("home_btn").onclick = function () {
        alert("home_btn");
    };
});


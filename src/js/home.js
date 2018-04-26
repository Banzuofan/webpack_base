import add from './util';
import $ from 'jquery';
import '../css/home.css';


$(document).ready(function(){
    
    document.getElementById("home_btn").onclick = function () {
        alert("home_btn1");
    };

    $('#keytap').keydown(function(){
        let curr = $('#keytap_state');
        curr.css({"color":'red', 'font-weight':'bold'});
        curr.text('keydown');
    });

    $('#keytap').keypress(function (text) {
        let curr = $('#keytap_state');
        curr.css({ "color": 'black', 'font-weight': 'bold' });
        curr.css({ 'font-size': '21px' });
        curr.text('keypress');
    });

    $('#keytap').keyup(function () {
        let curr = $('#keytap_state');
        curr.css({ "color": 'green'});
        curr.text('keyup');
    });

    $('#keytap').focusout(function(){
        $('#keytap_state').text('');
    })
    
    let pnode = document.createElement('p');
    pnode.setAttribute('id', 'pnode');
    let tnode = document.createTextNode('<b>this is b node</b>');
    pnode.appendChild(tnode);
    let pnodeattr = document.createAttribute('classname');
    pnode.setAttributeNode(pnodeattr);
    $('#texts').append(pnode);
    pnode.style.color = 'green';
    pnode.style.backgroundColor = 'yellow';
    pnode.style.textAlign = 'right';


    let ppnode = document.createElement('p');
    ppnode.innerHTML = '<b style="background-color:red; font-size: 18px">this is b node</b>';
    $('#texts').after(ppnode);
});


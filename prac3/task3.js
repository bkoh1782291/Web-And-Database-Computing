
var x = 0;

function mCount(){
    x = x+1;
    document.getElementById("mcount").innerText = x;
}


function getinput(){

    n = document.getElementById("post-amount").value;

    for (var i=0;i<n;i++){
        //Create post div
        var post = document.createElement("DIV");
        post.id = post_id;

        //Create post elements
        var date = document.createElement("P");
        date.className = "post-time";
        var text = document.createElement("P");
        text.className = "post-content";

        if (contentcolor == 1){
            text.style.color = "blue";
        }
        else if (contentcolor == 2) {
            text.style.color = "red";
        }
        else {
            text.style.color = "black";
        }

        date.innerHTML= new Date();
        text.innerHTML= document.getElementById("mytextarea").value;

        //create post delete button
        var button = document.createElement("button");
        button.className="right";
        button.innerHTML="x";
        button.setAttribute("onclick", "hide_post()");

        //append to document
        document.getElementById("posts").appendChild(post);

        //append to div
        document.getElementById(post_id).appendChild(date);
        document.getElementById(post_id).appendChild(text);
        document.getElementById(post_id).appendChild(button);

        post_id++;
        }
    }
    /*
    var quantity = document.getElementsByName("quantity");

    for(let i=0; i<quantity[0].value; i++){
        var para = document.createElement("p");
        var node = document.createTextNode(content);
        para.appendChild(node);
        var innercontent = document.getElementById("post-content");
        var innertime = document.getElementById("post-time");


        var date = new Date();
        document.getElementById("post-time").innerText = date;
        var content = document.getElementById("mytextarea").value;
        document.getElementById("post-content").innerHTML = content;

        if (contentcolor == 1){
            document.getElementById("post-content").style.color = "blue";
        }
        else if (contentcolor == 2) {
            document.getElementById("post-content").style.color = "red";
        }
        else {
            document.getElementById("post-content").style.color = "black";
        }

        innercontent.appendChild(para);
        innertime.appendChild(para);
    }
    */


function changemenu(){
    var div1 = document.getElementById("main");
    var div2 = document.getElementById("menu");

        if (div1.style.display === "none") {
            div1.style.display = "block";
        }
        else {
            div1.style.display = "none";
        }
        if (div2.style.display === "none") {
            div2.style.display = "block";
        }
        else {
            div2.style.display = "none";
        }
}


function changetoBLUE(){
    contentcolor = 1;
}

function changetoRED(){
    contentcolor = 2;
}

function color() {
    document.body.style.background = document.getElementById('color').value;
}
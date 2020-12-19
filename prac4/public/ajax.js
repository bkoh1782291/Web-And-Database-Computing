(function () {

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/last.txt", true);

    xhttp.send();

    //Define function
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var paragraph = document.getElementById("timeID");
            paragraph.innerHTML = "This page was last viewed "+this.responseText;
        }
    };

}) ();


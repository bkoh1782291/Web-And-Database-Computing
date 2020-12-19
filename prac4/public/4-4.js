 //Task4.4
function contact(){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                document.getElementById("content").innerHTML = this.responseText;
            }
    };
    xhttp.open("GET", "/contact.ajax", true);
    xhttp.send();
}

function search() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/search.ajax", true);
    xhttp.send();
}

function about(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if(this.readyState==4&&this.status==200) {
            //console.log(this.responseText);
            document.getElementById("content").innerHTML= this.responseText;
        }
    };
    xhttp.open("GET","/about.ajax",true);
    xhttp.send();
}
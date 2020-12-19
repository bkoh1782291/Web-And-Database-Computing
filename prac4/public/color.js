function color(){

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/color.txt", true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
     if (this.readyState == 4 && this.status == 200){

          var header = document.getElementsByTagName("H1")[0];
          header.innerHTML = this.responseText;
          header.style.color = this.responseText ;

     }
 };


}
//Task 4.5
(function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState ==4 && this.status == 403){
            var heading = document.getElementById("head");
            var para = document.createElement("P");
            para.innerHTML = "Accept the T&Cs to Continue";

            var button = document.createElement("BUTTON"); // button created here
            button.classList.add("theButton");
            button.innerHTML = "Accept";

                button.addEventListener("click", function() {

                var xhttp1 = new XMLHttpRequest();
                     xhttp1.onreadystatechange = function(){
                        if(this.readyState ==4 && this.status == 200){
                            para.style.display = "none";
                            button.style.display = "none";
                        }
                    };
                    xhttp1.open("GET","/accept",true);
                    xhttp1.send();
                });

            heading.appendChild(para);
            heading.appendChild(button);
        }
    };
    xhttp.open("GET","/content.ajax",true);
    //doesnt work because content.ajax is still at 403
    xhttp.send(); //<------ check f12

    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var head = document.getElementById("head");
      head.innerHTML = this.responseText;
        }
    };
      xhttp2.open("GET","/content.ajax",true);
      xhttp2.send();
})();


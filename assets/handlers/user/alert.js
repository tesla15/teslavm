function textalert(content) {
    document.getElementById("dangeralert").style = "display: block;"
    document.getElementById("alertext").innerHTML = `${content}`;

    window.setTimeout(function() {
        $("#dangeralert").fadeTo(500, 0).slideUp(500, function(){
            
        });
    }, 1500);
}
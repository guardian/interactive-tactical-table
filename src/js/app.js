
var mapdivs = document.querySelectorAll('.ge-tv-region-map');

var xhr = new XMLHttpRequest;

xhr.open('GET','<%= path %>/assets/justregionshapes.svg',false);
xhr.send();

var maphtml = xhr.responseText;

Array.from(mapdivs).forEach(function(d){
    d.innerHTML = maphtml;
})

var regions = document.querySelectorAll('.ge-tv-region-map path');

Array.from(regions).forEach(function(r){
    var parentregion = r.parentElement.parentElement.parentElement;
    console.log(r.id,parentregion.id);
    if (parentregion.id == r.id) {
        console.log('match')
        r.classList.add('gv-tv-selected');
    }
})
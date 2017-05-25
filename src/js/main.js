var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);

var parent = window.parent;

var tvstyle = parent.document.createElement('style');
//tvstyle.type = 'text/css';
var blob = "h2 em {background-color: blue}; p {background-color: red}";

if (tvstyle.styleSheet){
  tvstyle.styleSheet.cssText = blob;
} else {
  tvstyle.appendChild(document.createTextNode(blob));
}

parent.document.head.appendChild(tvstyle);
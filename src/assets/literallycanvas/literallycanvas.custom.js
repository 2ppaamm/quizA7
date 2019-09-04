window.lc = LC.init(document.getElementById("lc"), {
    imageURLPrefix: 'vendor/literallycanvas/img',
    toolbarPosition: 'bottom',
    defaultStrokeWidth: 2,
    strokeWidths: [1, 2, 3, 5, 30],
    onInit: function (a, b, c) {
        window.addEventListener('resize', function () {
            resize();
        });
    }
});

window.toggle = function (id) {
    var attrName = 'hidden';
    var attr = document.getElementById(id).getAttribute(attrName);
    if (attr) {
        document.getElementById(id).removeAttribute(attrName);
    } else {
        document.getElementById(id).setAttribute(attrName, true);
    }
    if (id == 'board') {
        window.resize();
    }
}

window.resize = function () {
    var nodes = document.getElementById('lc').childNodes;
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].classList.contains('literally')) {
            nodes[i].style.height = (document.documentElement.clientHeight - 2) + 'px';
        }
    }
    lc.respondToSizeChange();
}
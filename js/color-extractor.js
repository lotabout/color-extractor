var opts = {
    colors: 10,
};
var config = {};
config.results = document.getElementById('results');

// read image and extract
function extract(file) {
    read_image_file(file, analyse);
}

function analyse(img) {
    // quantify
    var quant = new RgbQuant(opts);
    quant.sample(img);
    var pal = quant.palette(true);
    var hist = {};
    for (var i = 0, len = pal.length; i < len; i++) {
        hist[i] = 0;
    }

    //show the result
    var result = quant.reduce(img, 2);
    for (var i = 0, len = result.length; i < len; i++) {
        hist[result[i]] += 1;
    }

    var total = 0;
    for (var i = 0, len = pal.length; i < len; i++) {
        total += hist[i];
    }

    for (var i = 0, len = pal.length; i < len; i++) {
        hist[i] = hist[i]*100/ total;
    }

    var div = document.createElement('div');
    div.classList.add("statistics");

    for (var i = 0, len = pal.length; i < len; i++) {
        text = '<div class="wrapper">';
        text += '<div class="color" style="background:' + tuple_to_RGB(pal[i]) + '"></div>';
        text += '<span class="color-hash">' + tuple_to_hash(pal[i]) + '</span>';
        text += '<span class="color-text">' + tuple_to_RGB(pal[i]) + '</span>';
        text += '<span class="percentage">' + hist[i].toFixed(2) + '%</span>';
        text += '</div>';
        div.innerHTML += text;
    }

    config.results.appendChild(div);
}

function dec2hex(i) {
   return (i+0x100).toString(16).substr(-2).toUpperCase();
}

function tuple_to_hash(tuple) {
    var text = '#';
    for (var i = 0, len = tuple.length; i < len; i++) {
        text += dec2hex(tuple[i]);
    }
    return text;
}

function tuple_to_RGB(tuple) {
    return 'rgb(' + tuple.join(',') + ')';
}

function read_image_file(file, callback) {
    var imageType = /^image\//;

    if (!imageType.test(file.type)) {
        return;
    }

    var img = document.createElement("img");
    img.classList.add("target");
    img.file = file;
    img.onload = function() {
        config.results.appendChild(img);
        callback(this);
    };

    var reader = new FileReader();
    reader.onload = (function(image) {
        return function(e) {
            image.src = e.target.result;
        };
    })(img);
    reader.readAsDataURL(file);

    return img;
}

function handleFiles() {
    var files = this.files;

    // clean the results area
    for (var i = 0, len = files.length; i < len; i++) {
        extract(files[i]);
    }
}

// bind

var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);

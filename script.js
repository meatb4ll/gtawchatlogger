function putTextOnImage() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.src = document.getElementById("myImageURL").value;
    var text = document.getElementById("myText").value;
    var font = document.getElementById("myFont").value;
    var fontSize = parseInt(document.getElementById("myFontSize").value);
    var lineHeight = parseInt(document.getElementById("myLineHeight").value);
    var marginLeft = parseInt(document.getElementById("marginLeft").value);
    var marginTop = parseInt(document.getElementById("marginTop").value);
    var lines = text.split('\n');
    var asteriskRows = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].indexOf("*") !== -1) {
        asteriskRows.push(i);
      }
      lines[i] = lines[i].replace(/\[\d{2}:\d{2}:\d{2}\]/g, '').trim();
    }
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      context.font = fontSize + "px " + font;
      for (var i = 0; i < lines.length; i++) {
        if (asteriskRows.includes(i)) {
          context.fillStyle = "#c2a3da";
        } else {
          context.fillStyle = "white";
        }
        context.lineWidth = 3;
        context.strokeText(lines[i], marginLeft, (i + 1) * (fontSize + lineHeight) + marginTop);
        if (lines[i].indexOf("whispers:") !== -1) {
          context.fillStyle = "yellow";
        }
        context.fillText(lines[i], marginLeft, (i + 1) * (fontSize + lineHeight) + marginTop);
        context.fillStyle = "white"; // reset color to white
      }
      var dataURL = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.download = "image.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.style.display = "none";
  
    };
  }
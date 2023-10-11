objects = [];
Status = "";


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video = createCapture(VIDEO)
  video.hide();

}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  Objectname = document.getElementById("OBJ").value

}
function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 480, 380);
  if (Status != "") {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Objects Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

      fill("#FF0000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label == Objectname) {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("number_of_objects").innerHTML = Objectname + " Found ";
        S = window.SpeechSynthesis;
        U = new SpeechSynthesisUtterance(Objectname + " Found ");
        S.speak(U);
      }
      else
      {
        document.getElementById("number_of_objects").innerHTML = Objectname + "Not Found ";
      }
    }
  }
}

let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Wi28d6PC4/';
let video;
let label = "";
let classifyBtn;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.elt.style.transform = 'scaleX(-1)';
  video.hide();

  // Create button below canvas
  classifyBtn = createButton('Classify');
  classifyBtn.position(135, 270);
  classifyBtn.mousePressed(classifyVideo);
}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyVideo() {
  if (video.elt.readyState >= 2) {
    classifyBtn.attribute('disabled', ''); // disable while classifying
    classifier.classify(video, gotResult);
  }
}

function gotResult(results, error) {
  classifyBtn.removeAttribute('disabled'); // re-enable when done
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
}
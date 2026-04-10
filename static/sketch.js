let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Wi28d6PC4/';
let video;
let classifyBtn;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  let canvas = createCanvas(320, 260);
  canvas.parent('canvas-container');

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.elt.style.transform = 'scaleX(-1)';
  video.hide();

  classifyBtn = createButton('🔍 Classify');
  classifyBtn.parent('btn-container');
  classifyBtn.mousePressed(classifyVideo);
}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();
}

function classifyVideo() {
  if (video.elt.readyState >= 2) {
    classifyBtn.attribute('disabled', '');
    classifier.classify(video, gotResult);
  }
}

function gotResult(results, error) {
  classifyBtn.removeAttribute('disabled');
  if (error) {
    console.error(error);
    return;
  }

  let label = results[0].label;
  let confidence = Math.round(results[0].confidence * 100);

  let resultEl = document.getElementById('result-label');
  let confidenceEl = document.getElementById('result-confidence');
  let resultCard = document.getElementById('result-card');
  let resetBtn = document.getElementById('reset-btn');

  if (resultEl) resultEl.textContent = label;
  if (confidenceEl) confidenceEl.textContent = confidence + '% confidence';
  if (resultCard) resultCard.style.display = 'flex';
  if (resetBtn) resetBtn.style.display = 'inline-block';

  // Hide classify button, show reset
  classifyBtn.elt.style.display = 'none';
}
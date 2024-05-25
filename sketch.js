let song;//the audio.
let classAudio;//set this global, so I can call the function in the class in anywhere

//create a class for all the variables and function about the audio.
class Audio
{
  constructor()
  {
    this.fft = new p5.FFT();
    this.button = this.createButton();
    this.slider = this.createSlider();
  }

  //create button for play and pause.
  createButton()
  {
    let button = createButton('Play/Pause');
    
    button.mousePressed(this.playPause);
    return button;
  }
  //create a function for play/pause audio and loop it.
  playPause()
  {
    if(song.isPlaying())
    {
      song.stop();
    }
    else
    {
      song.loop();
    }
  }
  createSlider()
  {
    //createSlider() from p5.js.org, create a slider in here for controling the audio volume.
    let slider = createSlider(0, 1, 0.5, 0.1);
    
    return slider;
  }

  audioVolume()
  {
    let volume = this.slider.value();//create variable and attach it to the slider
    song.setVolume(volume);//set the variable to song volume.
  }
}

function preload()
{
  song = loadSound('music.mp3');//Load the song.
}

function setup() {
  createCanvas(windowWidth, windowHeight);//Create a canvas
  background(246, 240, 221);//background color
  classAudio = new Audio();
  
  /*
    call their position in here again.
    otherwise their position is wrong
    when the window is first opened.
  */
  buttonPos(classAudio.button);
  sliderPos(classAudio.slider);
}

function draw()
{
  background(246, 240, 221);
  createLines();//move createLines() to here for animation.
  classAudio.audioVolume();
}

function windowResized()
{
  //React to window size
  resizeCanvas(windowWidth, windowHeight);
  background(246, 240, 221);
  buttonPos(classAudio.button);
  sliderPos(classAudio.slider);
  createLines();
}

/*
  create functions for the button and slider.
  and call it in the windowResized.
  so they won't change the position when screen size is changed.
*/
function buttonPos(button)
{
  button.position((windowWidth - button.width) / 2, windowHeight - 30);
}

function sliderPos(slider)
{
  slider.position((windowWidth - slider.width) / 50, windowHeight - 30);
}

function createLines()
{
  strokeCap(SQUARE);
  //scale the canvas.
  let scaleFactor = min(windowWidth/1920, windowHeight/1080);
  scale(scaleFactor);

  let spectrum = classAudio.fft.analyze();//get the audio frequency
  let sum = 0;
  for(let i = 0; i < spectrum.length; i++)
  {
    sum += spectrum[i];
  }
  let frequency = sum / spectrum.length;//get the average of the frequency.
  let audioLength = map(frequency, 0, 150, 1, 1.7);//map it to 1.0, 1.5 to control the line.
  //set 1 so it won't change the original line shape. 
  //1.7 = larger this value, the greater the change in line length.

  let audioLength2 = map(frequency, 0, 150, 1, 0.001);//decrease the property of the line when playing the audio.
  
  //radians angle mode value
  //attach the audioLength to the property of lines.
  let lineSettings = [//array for each set of lines
    { x: 0.27, y: 0.44, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.28 * audioLength, lengthRight: 0.20 * audioLength, distanceStart: -0.05, distanceEnd: 0.03, num: 20 },
    { x: 0.59, y: 0.39, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.76 * audioLength2, lengthRight: 0.76 * audioLength2, distanceStart: -0.06, distanceEnd: 0.02, num: 20 },
    { x: 0.30, y: 0.50, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.03 * audioLength, lengthRight: 0.03 * audioLength, distanceStart: -0.07, distanceEnd: 0.05, num: 40 },
    { x: 0.34, y: 0.56, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.26 * audioLength, lengthRight: 0.22 * audioLength, distanceStart: -0.13, distanceEnd: -0.10, num: 14 },
    { x: 0.48, y: 0.45, angle: -0.58, color: 0, weight: 10 * audioLength2, lengthLeft: 0.30, lengthRight: 0.28, distanceStart: -0.13, distanceEnd: -0.12, num: 1 },
    { x: 0.78, y: 0.24, angle: -0.58, color: 0, weight: 10 * audioLength2, lengthLeft: 0.14, lengthRight: 0.15, distanceStart: -0.14, distanceEnd: -0.12, num: 1 },
    { x: 0.68, y: 0.32, angle: -0.58, color: 0, weight: 10 * audioLength2, lengthLeft: 0.05, lengthRight: 0.08, distanceStart: -0.15, distanceEnd: -0.11, num: 2 },
    { x: 0.69, y: 0.31, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.04 * audioLength, lengthRight: 0.29 * audioLength, distanceStart: -0.18, distanceEnd: 0.01, num: 40},
    { x: 0.68, y: 0.44, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.76 * audioLength, lengthRight: 0.76 * audioLength, distanceStart: -0.06, distanceEnd: 0.02, num: 20},
    { x: 0.78, y: 0.375, angle: -0.58, color: 0, weight: 2 * audioLength2, lengthLeft: 0.3 * audioLength, lengthRight: 0.39 * audioLength, distanceStart: -0.06, distanceEnd: 0.02, num: 20},
    { x: 0.70, y: 0.58, angle: -0.58, color: 0, weight: 6 * audioLength2, lengthLeft: 0.60, lengthRight: 0.60, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
    { x: 0.48, y: 0.53, angle: -0.58, color: 0, weight: 2 * audioLength2, lengthLeft: 0.33 * audioLength, lengthRight: 0.33 * audioLength, distanceStart: -0.025, distanceEnd: 0.01, num: 10},
    { x: 0.78, y: 0.44, angle: -0.58, color: 0, weight: 6 * audioLength2, lengthLeft: 0.20, lengthRight: 0.20, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
    { x: 0.48, y: 0.45, angle: -0.58, color: 0, weight: 1, lengthLeft: 0.53 * audioLength, lengthRight: 0.53 * audioLength, distanceStart: -0.13, distanceEnd: -0.11, num: 1 },
    { x: 0.45, y: 0.64, angle: -0.58, color: 0, weight: 6 * audioLength2, lengthLeft: 0.20, lengthRight: 0.20, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
    { x: 0.30, y: 0.56, angle: -0.58, color: 0, weight: 4 * audioLength2, lengthLeft: 0.20, lengthRight: 0.20, distanceStart: -0.15, distanceEnd: -0.08, num: 1},
  ];
  for (let settings of lineSettings) {//Iteration
    drawLines(settings);//Call drawLines() to draw the lines
  }

}

function drawLines({ x, y, angle, color, weight, lengthLeft, lengthRight, distanceStart, distanceEnd, num}) {
  
  push();
  translate(width * x, width * y);//Move the origin to (x, y).
  rotate(angle);//Rotate angle
  stroke(color);//line color
  for (let i = 0; i <= num; i++) {//Draw number of the lines
    let xOff = map(i, 0, num, -width * 0.03, width * 0.01);//line position on the x
    strokeWeight(weight);//line weight
    let length = map(i, 0, num, width * lengthLeft, width * lengthRight);//line length
    let yOff = map(i, 0, num, width * distanceStart, width * distanceEnd);//line position on the y
    line(-length / 2 + xOff, yOff, length / 2 + xOff, yOff);//Draw the line
  }
  pop();
}

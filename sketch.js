let song;//the audio.
let classAudio;//set this global, so I can call the function in the class in anywhere
let currentShape;//a variable to determine current shape.

//create a class for all the variables and function about the audio.
class Audio
{
  constructor()
  {
    this.fft = new p5.FFT();//create fft to analyze the frequency
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
  
  //create a function for play/pause audio.
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

  //createSlider() from p5.js.org, create a slider in here for controling the audio volume.
  createSlider()
  {
    
    let slider = createSlider(0, 1, 0.5, 0.1);
    
    return slider;
  }

  //control volume.
  audioVolume()
  {
    let volume = this.slider.value();//create variable and attach it to the slider
    song.setVolume(volume);//set the variable to song volume.
  }
}

//create a class for the random shape. instore all variables i need in here
class RandomShape
{
  constructor(type)
  {
    this.type = type;//get the shape type
    this.x = random(width);//random width
    this.y = random(height);//random height
    this.shapeSize = random(10, 30);//random range of the shape size.
    this.size = this.shapeSize;
    this.opacity = 255;//opacity at the start.
    this.color = color(random(255), random(255), random(255));//random color.
  }

  //function for displaying
  display()
  {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacity);//fill in the random color
    noStroke();

    //create the shapes
    if(this.type === 'circle')
    {
      ellipse(this.x, this.y, this.size);
    }
    else if(this.type === 'square')
    {
      rect(this.x, this.y, this.size, this.size);
    }
    else if(this.type === 'arc')
    {
      arc(this.x, this.y, this.size, this.size, 0, PI + QUARTER_PI, CHORD);//PI + QUARTER_PI, CHORD properties are from p5.js.org.
    }
    else if(this.type === 'triangle')
    {
      triangle(this.x, this.y, this.x + this.size, this.y, this.x + this.size / 2, this.y - this.size);
    }
  }

  update()
  {
    this.opacity -= 7;//The larger this value, the faster the shape disappears.
  }

  updateSize(frequency)
  {
    this.size = this.shapeSize + frequency * 1.5;//The larger this value, the greater the magnitude.
  }
  
  shapeExist()
  {
    return this.opacity <= 0;//determine the opacity
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
  background(0);//black background color
  createLines();//move createLines() to here for animation.
  createRandomShapes();
  classAudio.audioVolume();

  if(currentShape)//if shape exists.
  {
    let spectrum = classAudio.fft.analyze();//get audio frequency
    let sum = 0;
    for (let i = 0; i < spectrum.length; i++) {
      sum += spectrum[i];
    }
    let frequency = sum / spectrum.length;//get the average frequency
    currentShape.updateSize(frequency);//animate the size based on the frequency.
    currentShape.update();//get the opacity.
    currentShape.display();//display

    //if the opacity <= 0, the shape disappears.
    if (currentShape.shapeExist()) {
      currentShape = null;
    }
  }
}

//create a function for the random shape.
function createRandomShapes()
{
  let spectrum = classAudio.fft.analyze();//get the frequency
  let maxAmplitude = max(spectrum);//get the max amplitude.
  

  if(maxAmplitude && !currentShape)//if there is no shape, then generate random shape.
  {
    let shapeType = random(['circle', 'square', 'arc', 'triangle']);
    currentShape = new RandomShape(shapeType);//attach it to shapeType.
  }
}

function windowResized()
{
  //React to window size
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  buttonPos(classAudio.button);
  sliderPos(classAudio.slider);
  createLines();
}

/*
  create functions for the position of button and slider.
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
  //attach the audioLength to the properties of lines.
  //array for each set of lines
  let lineSettings = [
    { x: 0.27, y: 0.44, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.28 * audioLength, lengthRight: 0.20, distanceStart: -0.05, distanceEnd: 0.03, num: 20 },
    { x: 0.59, y: 0.39, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.76 * audioLength2, lengthRight: 0.76 * audioLength2, distanceStart: -0.06  * audioLength2, distanceEnd: 0.02, num: 20 },
    { x: 0.30, y: 0.50, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.03 * audioLength, lengthRight: 0.03 * audioLength, distanceStart: -0.07, distanceEnd: 0.05, num: 40 },
    { x: 0.34, y: 0.56, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.26 * audioLength, lengthRight: 0.22, distanceStart: -0.13, distanceEnd: -0.10, num: 14 },
    { x: 0.48, y: 0.45, angle: -0.58, color: 255, weight: 10 * audioLength2, lengthLeft: 0.30, lengthRight: 0.28, distanceStart: -0.13, distanceEnd: -0.12, num: 1 },
    { x: 0.78, y: 0.24, angle: -0.58, color: 255, weight: 10 * audioLength2, lengthLeft: 0.14, lengthRight: 0.15, distanceStart: -0.14, distanceEnd: -0.12, num: 1 },
    { x: 0.68, y: 0.32, angle: -0.58, color: 255, weight: 10 * audioLength2, lengthLeft: 0.05, lengthRight: 0.08, distanceStart: -0.15, distanceEnd: -0.11, num: 2 },
    { x: 0.69, y: 0.31, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.04, lengthRight: 0.29 * audioLength2, distanceStart: -0.18, distanceEnd: 0.01, num: 40},
    { x: 0.68, y: 0.44, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.76 * audioLength2, lengthRight: 0.76 * audioLength2, distanceStart: -0.06 * audioLength2, distanceEnd: 0.02, num: 20},
    { x: 0.78, y: 0.375, angle: -0.58, color: 255, weight: 2, lengthLeft: 0.3 * audioLength2, lengthRight: 0.39 * audioLength2, distanceStart: -0.06 * audioLength2, distanceEnd: 0.02, num: 20},
    { x: 0.70, y: 0.58, angle: -0.58, color: 255, weight: 6 * audioLength2, lengthLeft: 0.60 * audioLength2, lengthRight: 0.60 * audioLength2, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
    { x: 0.48, y: 0.53, angle: -0.58, color: 255, weight: 2, lengthLeft: 0.33, lengthRight: 0.33 * audioLength, distanceStart: -0.025, distanceEnd: 0.01, num: 10},
    { x: 0.78, y: 0.44, angle: -0.58, color: 255, weight: 6, lengthLeft: 0.20 * audioLength2, lengthRight: 0.20 * audioLength2, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
    { x: 0.48, y: 0.45, angle: -0.58, color: 255, weight: 1, lengthLeft: 0.53 * audioLength, lengthRight: 0.53 * audioLength, distanceStart: -0.13, distanceEnd: -0.11, num: 1 },
    { x: 0.45, y: 0.64, angle: -0.58, color: 255, weight: 6 * audioLength2, lengthLeft: 0.20, lengthRight: 0.20, distanceStart: -0.15, distanceEnd: -0.15, num: 1},
    { x: 0.30, y: 0.56, angle: -0.58, color: 255, weight: 4 * audioLength2, lengthLeft: 0.20, lengthRight: 0.20, distanceStart: -0.15, distanceEnd: -0.08, num: 1},
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

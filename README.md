# Tut-07_Group-D_jzha0529

## 1. Interation

Click the play button and wait for the music to start, and control the volume by scrolling the slider.

## 2. individual approach

Use __audio frequency__ to animate the __length and weight__ of lines in the group image.

## 3. Inspiration
![Inspiration](image.png)
Although this image has less to do with the image of our group, I noticed the slider. it comes to my mind that in my individual part I could control the volume with the slider, which would be more precise than controlling it with mouse movements.
[view the image](https://bratp.fun/mandelbrot/)

## 4. Technical explanation

> Create a class called Audio and in it create functions on button, play/pause, slider and volume.

> Use the value() function to correspond the volume to the slider.

> Initialise fft, button and slider.

> Get the average frequency of the music in createLines() in the group code.

> Create audioLength and audioLength2 variables and use the map() function to control how much the line changes.

> Attach the variables to the corresponding length and weight properties in the line.

## 5. References

1. createSlider() - [slider() page](https://p5js.org/reference/#/p5/createSlider)
__Create a slider element.__ 
I use it because the insprition influences me and I want to control the volume with the slider.

1. value() - [value() page](https://p5js.org/reference/#/p5.Element/value)
__Returns or sets the element's value.__ 
I use it to return the value of the volume to the slider.


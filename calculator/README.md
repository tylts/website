# The Ugly AF Retro Calculator

https://tylts.github.io/calculator/

I built this over the course of a few days as a challenge to start and finish something completely from a blank slate. All in all it took me around 7 hours to get to its current point. I'll probably look back on this fondly as the project that taught me most about JavaScript scoping and how some of the logic works. The code is a mess but I'll eventually come back and clean it up. The main goal here was to make something that works.

## The Design

I based the functionality on my iPhone's calculator because that's what I had on hand to test it all out. Keep hitting equal after an equation and the calculator will continue evaluating based on the previous calculation. The percent button took me the longest to hack out. The iPhone calculator treats the percent button differently whether it's the first number in the equation or the second; also addition/subtraction vs multiplication/division. I wanted my calculator to reflect that, so for example you'll see that if you type `3` and then `%` the display will show `0.03` which is 3/100. However if you want to increase 3 by 6%, you can type `3 + 6%` and the display will immediately show 6% of 3 before adding it all together by hitting the `=` key. Just TRY IT!

Visually I wanted something that reminded me of an ugly calculator I had growing up. I don't have a picture but I got pretty close I think. Just trust me. I used a simple gradient for the number buttons for a subtle 3D effect. The display and the equals button use the same color `#4d5340` for better cohesion. I addeda a simple CSS media query for mobile displays, but the most fun is to be had by using a desktop. Maybe some day I'll add some fun sounds.

The display font is found here https://www.1001fonts.com/digital-7-font.html

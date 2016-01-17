Want to grab a palette out of an image? Want to know the dominant color of an
image? Well, this is the tool that you need.

This tool is just an HTML and corresponding JS files. No servers are needed.

Or just open [Color Extractor](http://lotabout.me/color-extractor/) for a
demo. Not fancy, but work.

# About
Color-extractor is first inspired by the palette of dirbbble. However dribbble
do not show the percentage of a color that is used in the image. Which I think
is quite important for us to analyse and learn the color theory.

Thus this tool is made.

# Theory

The first thought is actually simple: check every pixel and count the usage of
colors. But then it will fail if the image contains gradients.

So the tool use an alogirthm that is called [Color Quantization](https://en.wikipedia.org/wiki/Color_quantization).

I won't dig into the algorithms(which I don't actually know about), I uses a
library called [RgbQuant.js](https://github.com/leeoniya/RgbQuant.js)

So This tool just a stack up of blocks. Enjoy.

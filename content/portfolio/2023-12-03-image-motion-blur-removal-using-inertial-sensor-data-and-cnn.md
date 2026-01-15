# Image Motion Blur Removal using Inertial Sensor Data and CNN

_This project was done for a final project I did on _CIS 5810: Computer Vision & Computational Photography_, a course I took as an exchange student at the University of Pennsylvania, PA, USA._

Over the course of decades, the quality of phone cameras has improved dramatically. However, because they are limited by their smaller sensor size&mdash;relative to DSLR cameras&mdash;the image quality produced by them often degrades if the shooting condition is less-than-ideal, such as in low-light environments. In order to compensate for the lack of sufficient lighting, the shutter speed will have to be lowered down, which is likely to introduce motion blur caused by either the hand movement of the photographer, the movement of the subject, or both.

This project, aimed to use inertial sensor data obtained while taking the picture and using them as an extra data in training a Convolutional Neural Network (CNN) to deblur images affected by motion blur. The objective for this project is to create such a network that&mdash;when given a blurry image as an input&mdash;will output the ideal image, latent of motion blur.

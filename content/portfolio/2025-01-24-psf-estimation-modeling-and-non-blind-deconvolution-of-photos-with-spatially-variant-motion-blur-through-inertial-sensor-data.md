# PSF Estimation Modeling and Non-Blind Deconvolution of Photos with Spatially-Variant Motion Blur Through Inertial Sensor Data

_This research was done for my bachelor's degree thesis in computer science. It is a continuation of my CIS 5810 [final project](https://jazali.org/portfolio/2023-12-03-image-motion-blur-removal-using-inertial-sensor-data-and-cnn) at the Unviersity of Pennsylvania, which I did as a foreign exchange student._

_The full thesis document can be viewed [here](https://static.jazali.net/documents/bachelors_thesis.pdf). It is also in the process of being submitted into a journal._

Despite the growth in image sensor technology, key limitations remain. Modern image sensors in smartphones, due to their smaller size&mdash;relative to their DSLR counterparts&mdash;often have to balance between ISO value and shutter speed. When the value of the former is raised, the sensor will allow more light in but the resulting photos will gain noise due to the increased sensitivity. When the latter is lowered, more light can be gained without trading it off with noise; although, motion blur will be easier to unintentionally introduce to the image.

This research offers a way to take photographs without having to painstakingly optimize for the least amount of noise and motion blur. By initially allowing motion blur to be present, the camera sensor can then be set towards lowering its ISO value to suppress noise. The motion blur in the resulting image can then be removed through non-blind deconvolution based on a known (estimated) kernel. The kernel (or PSF) that is used for the deconvolution process is obtained through a modeling technique that utilizes data from inertial sensors. To conduct the modeling, this research presents a new algorithm to generate spatially-variant PSFs given the appropriate inertial sensors data. The algorithm fits into an end-to-end image deblurring pipeline. Additionally, unlike most computer vision literature dealing with motion blur removal, this research provides a comprehensive but concise guide on the implementation of the said PSF modeling technique.

The goal of this research is summarized by the following:

1. To create an end-to-end image motion deblurring pipeline, as described in the problem formulation;
2. to describe a novel algorithm that converts inertial sensor data to PSFs;
3. to provide a comprehensive reference for obtaining realistic PSF models through the use of inertial sensor data to the computer vision literature;
4. to provide quantitative measurements and qualitative comments of the quality of images deblurred through non-blind deconvolution and the quality’s relationships to other parameters, such as the attributes of the PSF.

An extensive number of research have been written on image deblurring&mdash;ranging from the direct use of non-blind deconvolution algorithms to approaches such as ConvNets. However, to date, there has not been a comprehensive and concise reference, gathered under a single paper, on the use of inertial sensor data to model PSFs along with the implementation of the modeling. This research contributes to the deconvolution literature by providing a framework to convert inertial sensor data into realistic discrete PSFs.

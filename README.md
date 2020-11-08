--------------------------
Anime
Screen
Conversion
Image
Ixtension
--------------------------

This project was developed as part of the CSSS Fall Hack 2020!
Contributors to this project are:
- Parsa A. [@alhparsa](http://github.com/alhparsa)
- Ari B. [@ablondal](https://github.com/ablondal)
- Cameron H. [@hagabooga](https://github.com/hagabooga)
- Jasper X. [@ZhemingX](https://github.com/ZhemingX)
- Hansoo Y. [@hyoon98](https://github.com/hyoon98)

How to use this extension:
-----------------------------

As of right now, this requires the use of a UNIX device to run the Gunicorn WSGI server.

1. Clone/download the repo
2. Go into Google Chrome Extensions (chrome://extensions/), and select "Load Unpacked".
    Navigate to the Extension file in the cloned repo, and load it.
3. Install Python3 and pip.
4. Navigate to the repo directory and run
    ```pip install requirements.txt```
5. Run ```gunicorn server:app --workers=2```
6. Go to Google Chrome, and use the extension by either rightclicking on any page, or using the extension icon at the top.
7. **VERY IMPORTANT: CLICK ANIME ME TWICE**
    Otherwise, the image will not load.
8. If you know why 7 happens and how to fix it, pls tell us

Here it is in action
----
[![image 1](images/sample1.gif)](http://www.sfu.ca/sfunews/stories/2020/09/the-hive-program-helps-new-students-find-friends--connections-an.html
)
[![image 2](images/sample2.gif)](http://www.sfu.ca/sfunews/stories/2020/10/sfu-remains--1-comprehensive-university-in-canada--according-to-.html?utm_source=slidernews&amp;utm_medium=macleans-oct14&amp;utm_campaign=homepage)


Acknowledgement
-------
Many thanks to @Yijunmaverick for his [CartoonGan](https://github.com/Yijunmaverick/CartoonGAN-Test-Pytorch-Torch) and the pretrained weights. 
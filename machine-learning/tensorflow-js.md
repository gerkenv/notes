# tensorflow.js

## #madewithtfjs
https://www.youtube.com/hashtag/madewithtfjs

## Google I/O 2022 Talks: Web ML: Transfer learning in JavaScript with TensorFlow.js
https://io.google/2022/program/bb516805-1a32-4396-9b13-fedf635cbeb7/

Teacheable Model
Simple tool to train a computer to recognize your own images, sounds, & poses.
- https://teachablemachine.withgoogle.com/

Deep dive: Make your own "Teachable Machine" using transfer learning with TensorFlow.js
Follow the video course here
- https://codelabs.developers.google.com/tensorflowjs-transfer-learning-teachable-machine#0

## Course: zero to hero (Google AI for JavaScript developers with TensorFlow.js)
- https://goo.gle/3Kml5PN
- https://www.edx.org/course/google-ai-for-javascript-developers-with-tensorflowjs?linkId=8039440


## Overview Of Projects Made with TensorFlow.js
- https://goo.gle/made-with-tfjs
- or https://www.youtube.com/playlist?list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw
- even more here https://www.youtube.com/hashtag/madewithtfjs

## Touchless Interface For Gaming And Kiosks
- https://www.youtube.com/watch?v=9YljxiWpD3k&list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw&index=17
  - maybe there is already a human interface device (HID) which uses image recognition for people with disabilities, but we could look into the topic

## Touch - Less by Anders Jessen
- https://www.youtube.com/watch?v=814cRm-B9i4
- https://touch-less.dev/

## Hal9 For Simple Entry In Data Science For JS Devs
- https://www.youtube.com/watch?v=h9i7d4R36Lw&list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw&index=6
They have updated the interface a bit. It is less intuitive now, but nearly the same.

## ml5.js: Creative coding with ML for all
- https://www.youtube.com/watch?v=ThwTM9L-3aY&list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw&index=14
- https://ml5js.org/
Low level entry into machine learning.

## adversarial.js: Break any neural network live in your browser
- https://www.youtube.com/watch?v=lomgV0dv6-Y&list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw&index=13
- https://kennysong.github.io/adversarial.js/
There are different types of attacks that can be performed on the input to force a model to make a false-positive prediction. Those can be used as benchmarks / validation to create robust models.

## Node-Red: Visual coding for ML on Raspberry Pi and beyond
- https://www.youtube.com/watch?v=cZj1d25eeWY&list=PLQY2H8rRoyvzSZZuF0qJpoJxZR1NgzcZw&index=12
Use drag’n’drop interface to create code for embedded software. It is possible to add tensorflow.js models as well.

## Enjoying the show - Gant Laborde
- https://www.youtube.com/watch?v=GskMuu821NI
- https://enjoyingthe.show/
Detect audience sentiment during the presentation.
Adding machine learning to your developer toolbox
https://io.google/2022/program/b96f4352-63ae-4a12-b7fc-03d31ed68e10/

## Web Development
- TensorFlow JS https://www.tensorflow.org/js

## List Of Available Models
Multiple useful ready to use models can be found here
- https://www.tensorflow.org/js/models
- https://github.com/tensorflow/tfjs-models

If you won't find models there, search on TensorFlow Hub instead.
- https://tfhub.dev/ - thousands of models available (image, text, audio, video)
- models from Hub can be converted to JS models using CLI converter.

- TensorFlow.js can also run TensorFlow Lite models (suited for mobile development)
  - https://github.com/tensorflow/tfjs/tree/master/tfjs-tflite


## Google I/O 2022 Talks. ML Kit. Simple kit to leverage existing models
- https://developers.google.com/ml-kit
  - simple API, available offline, multiple models included, consumes restricted resources
  - image analysis and natural language processing

- TensorFlow Lite
  - https://www.tensorflow.org/lite
    - runs tensorflow models on device

### Where To Find Models
What should you do when you need more than Turnkey APIs.
### TensorFlow Hub
- https://tfhub.dev/ - thousands of models available (image, text, audio, video)

### Using Custom Modules
- TensorFlow Lite Task Library
  - https://www.tensorflow.org/lite/inference_with_metadata/task_library/overview
  - solves common tasks and abstracts low-level API

### Backend Developers
- Google Cloud AI & ML
  - https://cloud.google.com/products#ai-and-machine-learning

- To run model on a private server you can use TensoFlow Serving
  - https://www.tensorflow.org/tfx/guide/serving

### Customizing A Model
- What to do when there is no model to solve my problem?

How to transfer knowledge from one model to another to fit to a new use case?
- Train custom ML models with minimal effort and expertise. Use AutoML https://cloud.google.com/automl
  - typically you will need a labeled dataset and it will be enough
  - generated models can be exported to tensor flow lite / tensor flow js formats

- Tensor Flow Lite Model Maker
  - https://www.tensorflow.org/lite/models/modify/model_maker
  - Uses transfer learning
  - Smplifies model creation

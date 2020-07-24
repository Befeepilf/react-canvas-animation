# React Canvas Animation

[![Maintainability](https://api.codeclimate.com/v1/badges/e95739067748d8f0ab75/maintainability)](https://codeclimate.com/github/Befeepilf/react-canvas-animation/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/e95739067748d8f0ab75/test_coverage)](https://codeclimate.com/github/Befeepilf/react-canvas-animation/test_coverage)

## Package structure

- **@react-canvas-animation/core**
  - contains the `Canvas` component
- **@react-canvas-animation/draw**
  - contains helper functions to simplify creation of sketches
  - depends on *@react-canvas-animation/core*
- **@react-canvas-animation/math**
  - contains a bunch of math functions
  - totally independent of the other packages
- **@react-canvas-animation/vector**
  - implements vectors and vector related functions
  - totally independent of the other packages

## Installation

```
// with npm
npm i --save @react-canvas-animation/core @react-canvas-animation/draw

// with yarn
yarn add @react-canvas-animation/core @react-canvas-animation/draw
```

## Usage

Here is a quick example to get you started:
```js
import Canvas from '@react-canvas-animation/core';;
import '@react-canvas-animation/draw';

const mySketch = ({width, height, fill, circle}) => {
  fill('red');
  circle(width / 2, height / 2, 50);
};

function App() {
  return <Canvas sketch={mySketch}/>;
}
```

### Canvas component

#### Props

| Name    | Type      | Default            | Description   |
| ------- | --------- | ------------------ | ------------- |
| sketch  | function  |                    | This function is called for every frame of the animation. It should contain the drawing logic.<br>**Signature**:<br/> `function(draw: object) => void`<br/>*draw*: A reference to the context of the Canvas component (*not* the context of the canvas element) |
| width   | number    | window.innerWidth  | Width of the canvas in pixel |
| height  | number    | window.innerHeight | Height of the canvas in pixel  |

#### The sketch function
This function takes one argument which is a reference to the context of the corresponding Canvas component (not to be confused with the context of the canvas *element*). The context contains properties of the canvas such as its width and height as well as drawing methods if `@react-canvas-animation/draw` was imported. Since the sketch function shares the same context with the Canvas component (given that it is *not* an arrow function), all these methods and properties are also accessible via `this`.

##### Available canvas properties:

| Name    | Type    | Description       |
| ------- | ------- | ----------------- |
| width   | number  | Width of the canvas  |
| height  | number  | Height of the canvas |
| ctx     | object  | Context of the canvas *element*  |
| frameCount   | number | The number of times the sketch function has been called  |

#### Responsiveness
If no width and height are given then the component handles window resizes on its own and updates the width and height. So if you want to create a responsive sketch don't provide the width and height prop and construct your sketch function in such a way that positions and sizes are not hardcoded but depend on the `width` and `height` properties of the Canvas component.

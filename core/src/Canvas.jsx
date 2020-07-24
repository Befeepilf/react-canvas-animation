import React from 'react';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.sketch = props.sketch.bind(this);

    // lift custom prototype functions (added through @react-canvas-animation/draw) to this and bind this
    // such that each of these functions has access to properties that are specific to this instance of Canvas (e.g. ctx)
    for (const p in Canvas.prototype) {
      if (
        typeof Canvas.prototype[p] === 'function' &&
        Canvas.prototype.customFunctions &&
        Canvas.prototype.customFunctions.indexOf(p) > -1
      ) {
        this[p] = Canvas.prototype[p].bind(this);
      }
    }

    this.state = {
      width: props.width || 0,
      height: props.height || 0,
      customSize: props.width && props.height,
      ctx: null
    };

    // make access to width & height more convenient
    this.width = this.state.width;
    this.height = this.state.height;

    this.onRefChange = this.onRefChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.draw = this.draw.bind(this);
  }

  // updates ctx if the reference to the canvas element changes
  onRefChange(node) {
    if(node) {
      this.ctx = node.getContext('2d');
      this.setState({ctx: this.ctx});
    }
  }

  onResize() {
    if(!this.state.customSize) {
      this.setState({width: window.innerWidth, height: window.innerHeight});
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }

  // this function draws one frame by clearing the canvas and calling the sketch function provided by the user
  // if a frame is drawn this function calls itself through window.requestAnimationFrame
  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.sketch(this);
    this.ctx.restore();

    if(this.ctx && !this.props.isPaused) {
      this.frameCount++;
      window.requestAnimationFrame(this.draw);
    }
  }

  // this function initiates the drawing loop
  startDraw() {
    this.frameCount = 0;
    window.requestAnimationFrame(this.draw);
  }


  componentDidUpdate(prevProps, prevState) {
    if(
      (prevProps.isPaused && !this.props.isPaused && this.ctx) ||
      (!prevState.ctx && this.state.ctx)
    ) {
      this.startDraw();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    if(this.ctx && !this.props.isPaused) {
      this.startDraw();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return <canvas ref={this.onRefChange} width={this.state.width} height={this.state.height} style={{border: '1px solid #000'}}></canvas>;
  }
}

import React from 'react';
import {init} from '@react-canvas-animation/draw';

export default function Canvas({isPaused, sketch}) {
  const [{width, height}, setCanvasSize] = React.useState({width: 0, height: 0});
  const [ctx, setCtx] = React.useState();
  const canvas = React.createRef();

  React.useEffect(() => {
    function onResize() {
      setCanvasSize({width: window.innerWidth, height: window.innerHeight});
    }

    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    let frameCount = 0;
    function internalDraw() {
      //console.log('draw', width)
      init(ctx, width, height);
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      sketch(width, height, frameCount);
      ctx.restore();

      if(ctx && !isPaused) {
        frameCount++;
        window.requestAnimationFrame(internalDraw);
      }
    }

    if(ctx && !isPaused) {
      window.requestAnimationFrame(internalDraw);
    }
  }, [ctx, isPaused]);

  React.useEffect(() => {
    setCtx(canvas.current.getContext('2d'));
  }, [canvas.current]);


  return <canvas ref={canvas} width={width} height={height} style={{border: '1px solid #000'}}></canvas>;
}

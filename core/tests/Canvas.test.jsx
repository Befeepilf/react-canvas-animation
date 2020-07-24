import React from 'react';
import {render, waitFor} from '@testing-library/react';
import Canvas from '../src';

describe("Canvas", () => {
    it("Renders a canvas element", () => {
        const {container} = render(<Canvas sketch={() => {}}/>);
        expect(container.querySelector('canvas')).toBeTruthy();
    });

    it("Calls the sketch function multiple times", async () => {
        let sketchCallCount = 0;
        render(<Canvas sketch={() => sketchCallCount++}/>);

        await waitFor(() => {
            expect(sketchCallCount).toBeGreaterThan(60);
        });
    });

    it("Allows to set custom size", () => {
        const testWidth = 102;
        const testHeight = 407;
        const {container} = render(<Canvas width={testWidth} height={testHeight} sketch={() => {}}/>);
        const canvas = container.querySelector('canvas');

        expect(canvas.width).toEqual(testWidth);
        expect(canvas.height).toEqual(testHeight);
    });

    it("Exposes width, height, frameCount & ctx to sketch function", async () => {
        const testWidth = 50;
        const testHeight = 70;

        let sketchWidth;
        let sketchHeight;

        let expectedFrameCount = -1;
        let sketchFrameCount;

        let sketchCtx;

        const {container} = render(<Canvas width={testWidth} height={testHeight} sketch={({width, height, frameCount, ctx}) => {
            sketchWidth = width;
            sketchHeight = height;
            
            sketchFrameCount = frameCount;
            expectedFrameCount++;

            sketchCtx = ctx;
        }}/>);

        await waitFor(() => {
            expect(sketchWidth).toEqual(testWidth);
            expect(sketchHeight).toEqual(testHeight);
            expect(sketchFrameCount).toEqual(expectedFrameCount);
            expect(sketchCtx).toEqual(container.querySelector('canvas').getContext('2d'));
        });
    });
});
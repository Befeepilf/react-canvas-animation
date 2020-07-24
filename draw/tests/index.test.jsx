import React from 'react';
import {render, waitFor} from '@testing-library/react';
import Canvas from '@react-canvas-animation/core';
import '../src';

describe("Set of drawing functions", () => {
    const drawingMethodNames = ['fill', 'bg', 'stroke', 'strokeWeight', 'translate', 'rotate', 'scale', 'line', 'rect', 'triangle', 'circle', 'drawVector'];

    it("is added to the canvas prototype", () => {
        const canvasMethodNames = Object.getOwnPropertyNames(Canvas.prototype);
        drawingMethodNames.forEach(methodName => {
            expect(canvasMethodNames.includes(methodName)).toBeTruthy();
        });
    });

    it("is exposed to the sketch function", async () => {
        let checked = false;
        render(<Canvas sketch={function(context) {
            drawingMethodNames.forEach(methodName => {
                expect(typeof context[methodName]).toEqual('function');
                expect(typeof this[methodName]).toEqual('function');
            });
            checked = true;
        }}/>);

        await waitFor(() => {
            expect(checked).toBeTruthy();
        });
    });


    describe("Individual drawing functions", () => {
        const {container, rerender} = render(<Canvas sketch={() => {}}/>);

        const getPixels = () => {
            const canvas = container.querySelector('canvas');
            const imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
            const pixels = [];

            for(let i = 0; i < imgData.length; i += 4) {
                const pixel = {};

                pixel.r = imgData[i];
                pixel.g = imgData[i + 1];
                pixel.b = imgData[i + 2];
                pixel.a = imgData[i + 3];

                pixels.push(pixel);
            }

            return pixels;
        }

        it("fill", async () => {
            let fillStyle;
            let testStage = 0;

            await rerender(<Canvas sketch={({ctx, fill}) => {
                if(testStage === 0)
                    fill('red');
                else if(testStage === 1)
                    fill(56);
                else if(testStage === 2)
                    fill(27, 87, 102);

                fillStyle = ctx.fillStyle;
            }}/>);

            await waitFor(() => {
                expect(fillStyle).toEqual('#ff0000');
                testStage++;
            });

            await waitFor(() => {
                expect(fillStyle).toEqual('#383838');
                testStage++;
            });

            await waitFor(() => {
                expect(fillStyle).toEqual('#1b5766');
            });
        });

        it("bg", async () => {
            const width = 8;
            const height = 8;
            let hasDrawn = false;

            await rerender(<Canvas width={width} height={height} sketch={({bg}) => {
                bg('blue');
                hasDrawn = true;
            }}/>);

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            getPixels().forEach(({r, g, b, a}) => {
                expect(r).toEqual(0);
                expect(g).toEqual(0);
                expect(b).toEqual(255);
                expect(a).toEqual(255);
            });
        });
    });
});
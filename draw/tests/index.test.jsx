import React from 'react';
import {render, waitFor} from '@testing-library/react';
import Canvas from '@react-canvas-animation/core';
import Vector from '../../vector/src';
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

        it("stroke", async () => {
            let strokeStyle;
            let testStage = 0;

            await rerender(<Canvas sketch={({ctx, stroke}) => {
                if(testStage === 0)
                    stroke('red');
                else if(testStage === 1)
                    stroke(56);
                else if(testStage === 2)
                    stroke(27, 87, 102);

                strokeStyle = ctx.strokeStyle;
            }}/>);

            await waitFor(() => {
                expect(strokeStyle).toEqual('#ff0000');
                testStage++;
            });

            await waitFor(() => {
                expect(strokeStyle).toEqual('#383838');
                testStage++;
            });

            await waitFor(() => {
                expect(strokeStyle).toEqual('#1b5766');
            });
        });

        it("strokeWeight", async () => {
            const testStrokeWeight = 8;
            let lineWidth;

            await rerender(<Canvas sketch={({ctx, strokeWeight}) => {
                strokeWeight(testStrokeWeight);
                lineWidth = ctx.lineWidth;
            }}/>);

            await waitFor(() => {
                expect(lineWidth).toEqual(testStrokeWeight);
            });
        });

        it("line", async () => {
            let hasDrawn = false;
            await rerender(<Canvas width={10} height={2} sketch={({stroke, line}) => {
                stroke(0, 255, 0);
                line(0, 0, 10, 0);
                hasDrawn = true;
            }}/>);

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            const pixels = getPixels();

            // first row
            for (let i = 0; i < 10; i++) {
                const {r, g, b} = pixels[i];

                expect(r).toEqual(0);
                expect(g).toEqual(255);
                expect(b).toEqual(0);
            }

            // second row
            for(let i = 10; i < 20; i++) {
                const {r, g, b} = pixels[i];

                expect(r).toEqual(0);
                expect(g).toEqual(0);
                expect(b).toEqual(0);
            }
        });

        it("rect", async () => {
            const rectWidth = 5;
            const rectHeight = 7;

            let hasDrawn = false;
            await rerender(<Canvas width={10} height={10} sketch={({fill, rect}) => {
                fill(0, 255, 0);
                rect(0, 0, rectWidth, rectHeight);
                hasDrawn = true;
            }}/>);

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            const pixels = getPixels();

            for (let i = 0; i < 100; i++) {
                const {r, g, b} = pixels[i];

                const x = i % 10;
                const y = Math.floor(i / 10);

                if (x < rectWidth && y < rectHeight) {
                    expect(r).toEqual(0);
                    expect(g).toEqual(255);
                    expect(b).toEqual(0);
                }
                else {
                    expect(r).toEqual(0);
                    expect(g).toEqual(0);
                    expect(b).toEqual(0);
                }
            }
        });

        it("triangle", async () => {
            let hasDrawn = false;
            let testStage = 0;
            const stage2TriangleSideLength = 11;

            await rerender(<Canvas width={11} height={11} sketch={({fill, triangle, bg}) => {
                if(testStage === 0) {
                    fill(0, 255, 0);
                    triangle(0,0, 11,0, 0,11);
                    hasDrawn = true;
                }
                else if(testStage === 1) {
                    bg(0);
                    hasDrawn = true;
                }
                else if(testStage === 2) {
                    fill(0, 255, 0);
                    triangle(5.5,11, stage2TriangleSideLength);
                    hasDrawn = true;
                }
            }}/>);

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            let pixels = getPixels();
            for (let i = 0; i < 121; i++) {
                const {r, g, b} = pixels[i];

                const x = i % 11;
                const y = Math.floor(i / 11);

                if (x < 11 - y) {
                    expect(r).toEqual(0);
                    expect(g).toEqual(255);
                    expect(b).toEqual(0);
                }
                else {
                    expect(r).toEqual(0);
                    expect(g).toEqual(0);
                    expect(b).toEqual(0);
                }
            }

            testStage++;
            hasDrawn = false;

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            testStage++;
            hasDrawn = false;

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            expect(getPixels()).toMatchSnapshot();
        });

        it("circle", async () => {
            let hasDrawn = false;
            await rerender(<Canvas width={10} height={10} sketch={({fill, circle}) => {
                fill(255, 0, 0);
                circle(5, 5, 4);
                hasDrawn = true;
            }}/>);

            await(() => {
                expect(hasDrawn).toBeTruthy();
            });

            expect(getPixels()).toMatchSnapshot();
        });

        it("drawVector", async () => {
            let hasDrawn = false;
            const v = new Vector(34, 76);
            await rerender(<Canvas width={100} height={100} sketch={({drawVector}) => {
                drawVector(v);
                hasDrawn = true;
            }}/>);

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            expect(getPixels()).toMatchSnapshot();
        });

        it("scale", async () => {
            const width = 10;
            const height = 10;

            let hasDrawn = false;
            await rerender(<Canvas width={width} height={height} sketch={({scale, fill, rect}) => {
                scale(0.5, 0.5);
                fill('red');
                rect(0, 0, width, height);
                hasDrawn = true;
            }}/>);

            await waitFor(() => {
                expect(hasDrawn).toBeTruthy();
            });

            const pixels = getPixels();
            for(let i = 0; i < pixels.length; i++) {
                const {r, g, b} = pixels[i];
                const x = i % width;
                const y = Math.floor(i / width);

                if(x < width / 2 && y < height / 2) {
                    expect(r).toEqual(255);
                    expect(g).toEqual(0);
                    expect(b).toEqual(0);
                }
                else {
                    expect(r).toEqual(0);
                    expect(g).toEqual(0);
                    expect(b).toEqual(0);
                }
            }
        });
    });
});
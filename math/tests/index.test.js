import {sin, cos, tan, asin, acos, atan, sqrt, quad, pow} from '../src';

describe("Math functions", () => {
    const testValues = [-10, -0.5, 0, 0.5, 10];

    it("sin", () => {
        testValues.forEach(v => {
            expect(sin(v)).toEqual(Math.sin(v));
        });
    });

    it("cos", () => {
        testValues.forEach(v => {
            expect(cos(v)).toEqual(Math.cos(v));
        });
    });

    it("tan", () => {
        testValues.forEach(v => {
            expect(tan(v)).toEqual(Math.tan(v));
        });
    });

    it("asin", () => {
        testValues.forEach(v => {
            expect(asin(v)).toEqual(Math.asin(v));
        });
    });

    it("acos", () => {
        testValues.forEach(v => {
            expect(acos(v)).toEqual(Math.acos(v));
        });
    });

    it("atan", () => {
        testValues.forEach(v => {
            expect(atan(v)).toEqual(Math.atan(v));
        });
    });

    it("sqrt", () => {
        testValues.forEach(v => {
            expect(sqrt(v)).toEqual(Math.sqrt(v));
        });
    });

    it("quad", () => {
        testValues.forEach(v => {
            expect(quad(v)).toEqual(Math.pow(v, 2));
        });
    });

    it("pow", () => {
        testValues.forEach(v => {
            expect(pow(v, v)).toEqual(Math.pow(v, v));
        });
    });
});
import Vector from '../src';


const precision = 6; // measured in number of decimal places

function testVectorOperation(methodName, operation) {
    const x1 = parseInt(10 * Math.random());
    const y1 = parseInt(10 * Math.random());
    const v1 = new Vector(x1, y1);

    const x2 = parseInt(10 * Math.random());
    const y2 = parseInt(10 * Math.random());
    const v2 = new Vector(x2, y2);

    const v3 = v1[methodName](v2);

    expect(v1.x).toEqual(operation(x1, x2));
    expect(v1.y).toEqual(operation(y1, y2));
    expect(v2.x).toEqual(x2);
    expect(v2.y).toEqual(y2);
    expect(v3.x).toEqual(operation(x1, x2));
    expect(v3.y).toEqual(operation(y1, y2));
}

describe("Vector", () => {
    it("Constructs Vector with given coordinates", () => {
        const x = parseInt(10 * Math.random());
        const y = parseInt(10 * Math.random());
        const v = new Vector(x, y);

        expect(v.x).toEqual(x);
        expect(v.y).toEqual(y);
    });

    it("Adds two vectors", () => {
        testVectorOperation('add', (a, b) => a + b);
    });

    it("Substracts two vectors", () => {
        testVectorOperation('sub', (a, b) => a - b);
    });

    it("Multiplies a vector", () => {
        const x = parseInt(10 * Math.random());
        const y = parseInt(10 * Math.random());
        const v1 = new Vector(x, y);

        const s = parseInt(10 * Math.random());

        const v2 = v1.mult(s);

        expect(v1.x).toEqual(s * x);
        expect(v1.y).toEqual(s * y);
        expect(v2.x).toEqual(s * x);
        expect(v2.y).toEqual(s * y);
    });

    it("Divides a vector", () => {
        const x = parseInt(10 * Math.random());
        const y = parseInt(10 * Math.random());
        const v1 = new Vector(x, y);

        const s = parseInt(10 * Math.random());

        const v2 = v1.div(s);

        expect(v1.x).toEqual(x / s);
        expect(v1.y).toEqual(y / s);
        expect(v2.x).toEqual(x / s);
        expect(v2.y).toEqual(y / s);
    });

    it("Computes its magnitude", () => {
        const x = parseInt(10 * Math.random());
        const y = parseInt(10 * Math.random());
        const v = new Vector(x, y);

        expect(v.mag()).toEqual(Math.sqrt(x * x + y * y));
    });

    it("Computes its angle", () => {
        [
            [10, 10],
            [-5, -7],
            [3, -9],
            [-6, 21],
            [0, 5],
            [0, -17],
            [3, 0],
            [-12, 0]
        ].forEach(([x, y]) => {
            const v = new Vector(x, y);
    
            let expectedAngle = Math.acos(x / Math.sqrt(x * x + y * y));
            if(y > 0) {
                expectedAngle = 2 * Math.PI - expectedAngle;
            }
    
            expect(v.angle()).toEqual(expectedAngle);
        });
    });

    it("Magnitude can be set", () => {
        const x = parseInt(10 * Math.random());
        const y = parseInt(10 * Math.random());
        const v = new Vector(x, y);

        const mag = Math.sqrt(x * x + y * y);

        const newMag = 9;
        v.setMag(newMag);

        expect(v.mag().toFixed(precision)).toEqual(newMag.toFixed(precision));
        expect(v.x.toFixed(precision)).toEqual((x / mag * newMag).toFixed(precision));
        expect(v.y.toFixed(precision)).toEqual((y / mag * newMag).toFixed(precision));
    });

    it("Can be rotated", () => {
        [
            {x: 10, y: 0, angleChange: 1},
            {x: 0, y: 10, angleChange: -1},
            {x: 0, y: -10, angleChange: 4},
            {x: 1, y: 1, angleChange: 2 * Math.PI}
        ].forEach(({x, y, angleChange}) => {
            const v = new Vector(x, y);

            let angle = Math.acos(x / Math.sqrt(x * x + y * y));
            if(y > 0) {
                angle = 2 * Math.PI - angle;
            }

            v.rotate(angleChange);

            let expectedAngle = angle - angleChange;
            if(expectedAngle > 2 * Math.PI) {
                expectedAngle = Math.abs(angleChange) - (2 * Math.PI - angle);
            }
            else if(expectedAngle < 0) {
                expectedAngle += 2 * Math.PI;
            }

            expect(v.angle().toFixed(precision)).toEqual(expectedAngle.toFixed(precision));
        });
    });

    it("Can be copied", () => {
        const v1 = new Vector(4, 5);
        const v2 = v1.copy();

        expect(v2.x).toEqual(v1.x);
        expect(v2.y).toEqual(v2.y);
    });
});
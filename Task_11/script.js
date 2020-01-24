'use srtrict';

function Student(name, marks) {
    this.name = name;
    this.marks = marks;
    this.averageMark = function () {
        return average(marks);
    };
    this.minMark = function () {
        return Math.min.apply(null, marks);
    };
    this.maxMark = function () {
        return Math.max.apply(null, marks);
    };
}

function averageMark(students) {
    const studentMarks = reduce(students, function (result, curr) {
        return result.concat(curr.marks);
    }, []);
    return average(studentMarks);
}

function reduce(arr, callback, startValue) {
    let result = startValue;
    for (let i = 0; i < arr.length; i++) {
        result = callback.call(null, result, arr[i], i, arr);
    }
    return result;
};

function average(arr) {
    return arr.reduce((sum, curr) => (sum + curr)) / arr.length;
};

const students = [
    new Student('Student 1', [10, 9, 8, 0, 10]),
    new Student('Student 12', [10, 0, 8, 0, 3, 4])
];
const student1 = students[0];
console.log(student1.averageMark());
console.log(student1.minMark());
console.log(student1.maxMark());

console.log(averageMark(students));

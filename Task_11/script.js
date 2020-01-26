'use srtrict';

function Student(name, marks) {
    this.name = name;
    this.marks = marks;
}

Student.prototype.averageMark = function () {
    return average(this.marks);
}

Student.prototype.maxMark = function () {
    return Math.max.apply(null, this.marks);
}

Student.prototype.minMark = function () {
    return Math.min.apply(null, this.marks)
}

function averageMark(students) {
    let studentMarks = [];
    for (let i = 0; i < students.length; i++) {
        studentMarks = studentMarks.concat(students[i].marks);
    }
    return average(studentMarks);
}

function average(arr) {
    return arr.reduce((sum, curr) => (sum + curr)) / arr.length;
}

const students = [
    new Student('Student 1', [10, 9, 8, 0, 10]),
    new Student('Student 12', [10, 0, 8, 0, 3, 4])
];
const student1 = students[0];
console.log(student1.averageMark());
console.log(student1.minMark());
console.log(student1.maxMark());

console.log(averageMark(students));

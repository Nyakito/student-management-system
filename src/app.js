import {
  students,
  PASS_MARK,
  totalMarks,
  averageMarks,
  studentGrades,
  passList,
  repeater,
  overZero,
} from "./student.js";

export const report = students.map((student) => ({
  ...student,
  grade: studentGrades(student.marks),
  status: passList(student.marks),
  aboveAverage: student.marks >= averageMarks,
}));

export const findStudent = (id) => students.find((student) => student.id === id);

export const findStudentIndex = (id) => students.findIndex((student) => student.id === id);

export const totalNumber = students.length;

export const stats = students.reduce(
  (acc, student) => {
    if (student.marks >= PASS_MARK) acc.passed++;
    else acc.failed++;

    if (student.feesPaid) acc.feesPaidCount++;
    else acc.feesNotPaid++;

    return acc;
  },
  { passed: 0, failed: 0, feesPaidCount: 0, feesNotPaid: 0 }
);

export const highAchievers = students
  .filter((student) => student.marks >= 70)
  .map((student) => ({ Name: student.name, Marks: student.marks }));

export const feesPending = students
  .filter((student) => !student.feesPaid)
  .map((student) => ({ Name: student.name, Course: student.course }));

export const hasRepeater = repeater(students);
export const allAboveZero = overZero(students);

export { totalMarks, averageMarks, PASS_MARK };

// It was nice trying out all these codes, writing them out myself, knowing very well AI can write them for me, but I choose to learn now and vibe later

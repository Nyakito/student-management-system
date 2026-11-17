export const students = [
  { id: 1, name: "Carolyne Johnson", age: 20, course: "Web Development", marks: 47, feesPaid: true },
  { id: 2, name: "Noah Nyakito", age: 22, course: "Data Science", marks: 75, feesPaid: false },
  { id: 3, name: "Jackie Chan", age: 19, course: "Cybersecurity", marks: 92, feesPaid: true },
  { id: 4, name: "Shaniz Yueren", age: 21, course: "Software Engineering", marks: 95, feesPaid: true },
  { id: 5, name: "Daisy Hunt", age: 23, course: "UI/UX Design", marks: 50, feesPaid: false },
  { id: 6, name: "Faith Gallagher", age: 20, course: "Cloud Computing", marks: 84, feesPaid: false },
  { id: 7, name: "Christopher Clark", age: 22, course: "Database Systems", marks: 49, feesPaid: false },
  { id: 8, name: "Hannah Abbott", age: 19, course: "Artificial Intelligence", marks: 23, feesPaid: true },
  { id: 9, name: "Tracey Malcolm", age: 24, course: "Mobile App Development", marks: 91, feesPaid: true },
  { id: 10, name: "Elvis Roberts", age: 21, course: "Computer Networks", marks: 86, feesPaid: true },
];

//The data above is provided by a great team I met somewhere, oooh! you will see alot of the names all over my sites
//Painfull how I talk here assuming someone will try read my JS code, human beings are funny.

export const PASS_MARK = 50;

export function studentGrades(marks) {
  return marks >= 80 ? "A"
    : marks >= 60 ? "B"
    : marks >= 50 ? "C"
    : marks >= 40 ? "D"
    : "E";
}

export const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);

export const averageMarks = totalMarks / students.length;

export function passList(marks) {
  return marks >= PASS_MARK ? "Passed!" : "Failed!";
}

export function repeater(list) {
  return list.some((student) => student.marks < 40);
}

export function overZero(list) {
  return list.every((student) => student.marks > 0);
}

export function updatedCourse(student, newCourseName) {
  return {
    ...student,
    course: newCourseName,
  };
}

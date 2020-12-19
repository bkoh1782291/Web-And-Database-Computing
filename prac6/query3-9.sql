SELECT Students.given_name, Student.family_name, Students.program, Subjects.subject, Subjects.faculty
FROM ((Students
INNER JOIN Enrolments ON Enrolments.student_id=Students.student_id)
INNER JOIN Subjects ON Subjects.subject_code=Enrolments.subject_code)
WHERE Subjects.faculty IN ('ECMS');
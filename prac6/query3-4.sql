SELECT Students.given_name, Students.family_name
FROM ((Students
INNER JOIN Enrolments ON Enrolments.student_id=Students.student_id)
INNER JOIN Subjects ON Subjects.subject_code=Enrolments.subject_code)
WHERE subject='Web and Database Computing';
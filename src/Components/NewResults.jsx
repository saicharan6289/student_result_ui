import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import FormSelect from "./FormSelect";

const validationSchema = Yup.object().shape({
  studentName: Yup.string()
  .required('Required'),
  course: Yup.string()
  .required('Required'),
  score: Yup.string().required('Required'),
});

const NewResults = () => {
  const scoreOptions = [
    {value: "A", label: "A"},
    {value: "B", label: "B"},
    {value: "C", label: "C"},
    {value: "D", label: "D"},
    {value: "E", label: "E"},
    {value: "F", label: "F"}
  ];
  const [courseOptions, setCourseOptions] = useState([{value: '', label: ''}]);
  const [studentNameOptions, setStudentNameOptions] = useState(
      [{value: '', label: ""}]);

  useEffect(() => {
    let studentNames = [];
    let courses = [];
    axios.get("http://localhost:8080/getStudent").then(
        response => {
          response.data.map(value =>
              studentNames.push({
                value: value.studentName,
                label: value.studentName
              })
          )
          setStudentNameOptions(studentNames);
        }
    )
    axios.get("http://localhost:8080/getCourse").then(
        response => {
          response.data.map(value =>
              courses.push({
                value: value.course,
                label: value.course
              })
          )
          setCourseOptions(courses);
        }
    )

  },[])

  return (<Formik
          initialValues={{
            course: '',
            studentName: '',
            score: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            // same shape as initial values
            axios.post("http://localhost:8080/saveResult", values).then(
                (response) => {
                  alert("Result is saved successfully");
                  resetForm();
                }).catch(error => {
              alert(error.response.data.message);
              resetForm();
            })
          }}
      >
        {({errors, touched}) => (
            <Form>
              <div>
                <label>Course</label>
                <FormSelect
                    name="course"
                    options={courseOptions}
                />
                {errors.course && touched.course ? (
                    <div style={{color: "red"}}>{errors.course}</div>
                ) : null}
              </div>
              <div>
                <label>Student Name</label>
                <FormSelect
                    name="studentName"
                    options={studentNameOptions}
                />
                {errors.studentName && touched.studentName ? (
                    <div style={{color: "red"}}>{errors.studentName}</div>
                ) : null}
              </div>
              <div>
                <label>Score</label>
                <FormSelect
                    name="score"
                    options={scoreOptions}
                />
                {errors.score && touched.score ? <div
                        style={{color: "red"}}>{errors.score}</div>
                    : null}
              </div>

              <button type="submit">Submit</button>
            </Form>
        )}
      </Formik>
  );
}

export default NewResults;

import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
const validationSchema = Yup.object().shape({
  course: Yup.string()
  .required('Required')
});

const NewCourses = () =>{
  return(<Formik
          initialValues={{
            course: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            // same shape as initial values
            axios.post("http://localhost:8080/saveCourse", values).then(
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
                <Field name="course"/>
                {errors.course && touched.course ? (
                    <div style={{color: "red"}}>{errors.course}</div>
                ) : null}
              </div>

              <button type="submit">Submit</button>
            </Form>
        )}
      </Formik>
  );
}

export default NewCourses;

import React from "react";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
  .required('Required'),
  dateOfBirth: Yup.string()
  .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});
const NewStudents = () => {

  return (<Formik
          initialValues={{
            firstName: '',
            familyName: '',
            email: '',
            dateOfBirth: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            // same shape as initial values
            axios.post("http://localhost:8080/saveStudent", values).then(
                (response) => {
                  alert("Student Details saved successfully");
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
                <label>First Name</label>
                <Field name="firstName"/>
                {errors.firstName && touched.firstName ? (
                    <div style={{color: "red"}}>{errors.firstName}</div>
                ) : null}
              </div>
              <div>
                <label>Family Name</label>
                <Field name="familyName"/>
                {errors.familyName && touched.familyName ? (
                    <div>{errors.familyName}</div>
                ) : null}
              </div>
              <div>
                <label>Email</label>
                <Field name="email" type="email"/>
                {errors.email && touched.email ? <div
                        style={{color: "red"}}>{errors.email}</div>
                    : null}
              </div>
              <div>
                <label>Date Of Birth</label>
                <Field name="dateOfBirth" type="date"/>
                {errors.email && touched.email ? <div
                        style={{color: "red"}}>{errors.email}</div>
                    : null}
              </div>

              <button type="submit">Submit</button>
            </Form>
        )}
      </Formik>
  );
}

export default NewStudents;

/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployees,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, email };
    if (validateForm()) {
      if (id) {
        updateEmployees(id, employee)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((err) => console.error(err));
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigate("/employees");
        });
      }
    }
  };



  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "first name is required!!";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "last name is required!!";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required!!";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h1 className="text-center m-3">Update Employee</h1>;
    } else {
      return <h1 className="text-center m-3">Add Employee</h1>;
    }
  }

  return (
    <div className="container col-md-6 offset-md-3 offset-md-3">
      {pageTitle()}
      <form className="container">
        <div className="form-group m-4 max-width-12px">
          <label className="form-label">First Name: </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="Enter employee First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <div className="invalid-feedback"> {errors.firstName} </div>
          )}
        </div>
        <div className="form-group m-4">
          <label>Last Name: </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""} `}
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="Enter employee Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <div className="invalid-feedback"> {errors.lastName}</div>
          )}
        </div>
        <div className="form-group m-4">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : " "}`}
            id="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback"> {errors.email} </div>
          )}
        </div>

        <button
          onClick={saveOrUpdateEmployee}
          type="submit"
          className="btn btn-primary m-4"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

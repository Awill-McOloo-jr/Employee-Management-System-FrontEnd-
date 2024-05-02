
import { useEffect } from "react";
import { useState } from "react"
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";


const ListEmployeeComponent = () => {

   const [employees, setEmployees] = useState([]);

   useEffect(() => {
      getAllEmployees()

   }, []);

   const navigate = useNavigate();

   function getAllEmployees() {
    listEmployees().then((response) => {
        setEmployees(response.data)
    }).catch((error)=> {
        console.log("Error: ", error);
    });
   }

 function addEmployee() {
        navigate("/add-employee");
 }


 function updateEmployee(id) {
    navigate(`/update-employee/${id}`);
 }

 function removeEmployee(id) {
    deleteEmployee(id).then(()=>{
        getAllEmployees()
    }).catch((err)=>{
       console.log(err);
    })
    
 }

 




  return (


    <div className="container">
            <h2 className="text-center">List Of Employees</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        
                        employees.map(employee =>
                    
                            <tr key={employee.id} >
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className="btn btn-info m-1" onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className="btn btn-danger m-1" onClick={() => removeEmployee(employee.id)}>Delete Employee</button>
                                </td>


                            </tr>
                        
                            )
                    }

                    <tr>

                    </tr>
                </tbody>
            </table>
            <button className="btn btn-primary mb-4 absolute" onClick={addEmployee}>Add Employee</button>
    </div>
  )
}

export default ListEmployeeComponent
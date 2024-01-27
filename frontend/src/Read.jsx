import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Read() {

  const {id} = useParams();
  const [student, setStudent] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/read/'+id)
    .then(res => {
       console.log(res);
       setStudent(res.data[0]);
    })
    .catch(err => console.log(err));
  }, [])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className='p-2'>
        <h2>Student Detail</h2>
        <h3>Student ID: {student.ID}</h3>
        <h3>Student Name: {student.StudentName}</h3>
        <h3>Student Email: {student.Email}</h3>
        </div>
        <Link to='/' className= 'btn btn-primary me-2'>Back</Link>
        <Link to= {`/edit/${student.ID}`} className= 'btn btn-info'>Edit</Link>
      </div>
    </div>
  )
}

export default Read

import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {

    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            console.log(res);
            setValues({...values, name: res.data[0].StudentName, email: res.data[0].Email})
        })
        .catch(err => console.log(err));
      }, [])

    const [values, setValues] = useState({
        name: '',
        email: ''
    })

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/edit/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <h2>Edit Student</h2>
            <div className='mb-2'>
                <label htmlFor="">Name</label>
                <input type='text' placeholder='Enter Name'  className='form-control' value={values.name}
                onChange={e => setValues({...values, name: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type='email' placeholder='Enter Email'  className='form-control' value={values.email}
                onChange={e => setValues({...values, email: e.target.value})} />
            </div>
            
            <button className='btn btn-success'>Update</button>
        </form>
    </div>
</div>
  )
}

export default Edit

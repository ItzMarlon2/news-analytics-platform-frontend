import axios from 'axios'
import React, { useState } from 'react'

const NewcastUploader = ({created}) => {
    const [name, setName] = useState({
        name: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
    } 

    const handleChange = (event) => {
        setName({
            ...name,
            [event.target.name]: event.target.value
        })
    }

    const handleUpload = async () => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:8000/newcast', name)
            console.log(response);
            setLoading(false)
            created(true)
        } catch (error) {
            console.log(error);
            
        }
    }
    

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-4">Crear noticiero</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre del noticiero</label>
        <input type="text" name='name' id='name' onChange={handleChange} className="mb-2 w-full border p-2 rounded outline-none"/>
      </form>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Subiendo...' : 'Crear noticiero'}
      </button>
      
    </div>
  )
}

export default NewcastUploader
import React, { useState } from 'react'
import NewcastUploader from '../components/NewcastUploader'
import NewcastMap from '../components/NewcastMap'

const NewcastPage = () => {
  const [created, setCreated] = useState(false)
  return (
    <div className="container mx-auto mt-10 flex flex-col  gap-10">
        <NewcastUploader created={setCreated}/>
        <NewcastMap created={created} setCreated={setCreated}/>
    </div>
  )
}

export default NewcastPage
import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy-Sakhi"}>
        <div className='row privacy'>
          <div className='col-md-6'>
            <img src='/images/privacy.jpg' alt='privacy' style={{width:"85%"}}/> 
          </div>
          <div className='col-md-4'>
            <h1 className='bg-dark p-2 text-white text-center'>
              Privacy Policy
            </h1>
            <p className='mt-3'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div> 
        </div>
      </Layout>
  )
}

export default Policy
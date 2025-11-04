import React from 'react'
import Layout from '../components/Layout/Layout'

const AboutPage = () => {
    return (
      <Layout title={"About Us-Sakhi"}>
        <div className='row aboutus'>
          <div className='col-md-6'>
            <img src='/images/aboutus.jpg' alt='aboutus' style={{width:"80%"}}/> 
          </div>
          <div className='col-md-4'>
            <h1 className='bg-dark p-2 text-white text-center'>
              ABOUT US
            </h1>
            <p className='text-justify mt-2'>
              Any query and info about   products feel free to call anytime we 24X7 available !
            </p>
            <p className='mt-3'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div> 
          
        </div>
      </Layout>
    )
}

export default AboutPage
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth,setAuth]=useAuth()
  return (
    <div>
        <Layout title={"Homepage-Sakhi"}>
            <h1>HomePage</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    </div>
  )
}

export default HomePage
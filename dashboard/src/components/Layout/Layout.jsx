import React from 'react'
import Header from './Header';
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';
import Corousel from './Corousel';

const Layout = ({children,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
        <Header/>
        <Corousel/>
        <main style={{minHeight:"72vh"}}>
            {children}
            <Toaster />
        </main>
        <Footer/>
    </div>
  );
};

Layout.defaultProps = {
  description:"a empowering platform",
  keywords:"handiwork,mern,node,mongodb",
  author:"Darshan Singh",
}

export default Layout
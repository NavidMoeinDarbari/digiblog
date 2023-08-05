import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Layout from './components/layout/Layout';
import SingleBlogPage from './components/blog/SingleBlogPage';
import AuthorsPage from './components/author/AuthorsPage';
import SingleAuthorPage from './components/author/SingleAuthorPage';
//GRAPHQL
import { useQuery } from '@apollo/client';
import { GET_BLOGS_INFO } from './graphQL/queries';
//REDUX
import { Provider } from 'react-redux';
import store from './app/store';


export const allPostsContext = React.createContext()
export const screenWidthContext = React.createContext()

function App() {

   const [screenWidth, setScreenWidth] = useState(window.innerWidth)
   const {data} = useQuery(GET_BLOGS_INFO)
   const location = useLocation()

   const handleScreenWidth = () => {
      setScreenWidth(window.innerWidth)
   }

   useEffect(() => {
      window.addEventListener('resize', handleScreenWidth)
      return () => {
         window.removeEventListener('resize', handleScreenWidth);
      }
   },[])

   useEffect(() => {
      window.scrollTo(0,0)
   }, [location])

   return (
      <div className="min-h-screen items-center justify-between flex flex-col">
         <Provider store={store}>
            <allPostsContext.Provider value={data}>
               <screenWidthContext.Provider value={screenWidth}>
                  <Layout>
                     <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/:slug' element={<SingleBlogPage/>}/>
                        <Route path='/authors' element={<AuthorsPage />}/>
                        <Route path='/authors/:slug' element={<SingleAuthorPage/>}/>
                     </Routes>
                  </Layout>
               </screenWidthContext.Provider>
            </allPostsContext.Provider>
         </Provider>
      </div>
   );
}

export default App;
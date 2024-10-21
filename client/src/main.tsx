import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
   <App />
   

   
   {/*<section className="">
    <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">Under Maintenance</h1>
        <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">Bee back soon! </p>
    </div>
</section>*/}
    </AuthContextProvider>
  </React.StrictMode>,
)

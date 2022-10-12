import React from 'react'
import Menu from "./menu"

function Base({
    title="My Title",
    descrption="My description",
    className="text-white p-4",
    children
}) {
  return (
    <div className='main-page'>
    <Menu />

        <div className='container-fluid main-page content-wrap'>
            <div className='mt-4 p-5 main text-center'>
                <h2 className='display-3 fw-normal'>{title}</h2>
                <h2 className='lead'>{descrption}</h2>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
        <footer className='footer mt-auto bg-dark'>
            <div className='container text-center'>
                <span className='text-muted'>
                    An amazing <span className="text-white">SHOPPING</span> Zone
                </span>
            </div>
        </footer>
    </div>
  )
}

export default Base;
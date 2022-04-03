import React from "react";
import Navigation from 'component/Navigation/Navigation';
import Footer from 'component/Footer/Footer';
import "./layout.scss";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <section className="layout__section">
                <Navigation/>
                {children}
                <Footer/>
            </section>
        </div>
    )
}

export default Layout
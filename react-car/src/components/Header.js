import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                        SUT - ReactJS - Firebase - ESP32
                        </h1>
                        <h2 className="subtitle">
                        Car counting with Photoelectric Sensor.
                        </h2>
                    </div>
                </div>
            </section>
        )           
    }
}

export default Header
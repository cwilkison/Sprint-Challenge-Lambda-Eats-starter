import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Do you love Pizza?</h1>
            <Link className="pizza" to={"/pizza"}>
                <div className="order-here">Order Your Pizza HERE!</div>
            </Link>
        </div>
    )
}

export default Home;
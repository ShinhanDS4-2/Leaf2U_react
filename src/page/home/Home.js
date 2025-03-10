import React, { useRef } from 'react';
import './Home.css';
import HomeHeader from '../../components/header/HomeHeader';
import Footer from '../../components/footer/Footer';
import Tree_1 from '../../image/tree_1.png';
import Tree_2 from '../../image/tree_2.png';
import Tree_3 from '../../image/tree_3.png';
import Tree_4 from '../../image/tree_4.png';

function Home() {
    return (
        <div className="backgrung-img">
            <div className="cloud1"></div>
            <div className="cloud2"></div>
            <HomeHeader />
            <div className="tree-div">
                <img src={Tree_4} className="tree-img" />
            </div>
            <Footer />
        </div>
    );
}

export default Home;

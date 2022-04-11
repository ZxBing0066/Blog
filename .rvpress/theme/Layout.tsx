import React from 'react';
import { useData, Content, Debug } from 'rvpress';

import Header from './components/Header';
// import SideBar from './components/SideBar';
import Blog from './components/Blog';
import List from './components/List';
import Home from './components/Home';
import Footer from './components/Footer';
import './Layout.scss';

// const Home = React.lazy(() => import('./components/Home'));

// const HomeView = () => {
//     return (
//         <slot name="home">
//             {/* TODO: home hero, feature, etc */}
//             <Home />
//         </slot>
//     );
// };

const MainContent = () => {
    const { page } = useData();

    if (page.frontmatter.customLayout) {
        return <Content />;
    }
    if (page.frontmatter.home) {
        return <Home />;
    }
    if (page.frontmatter.list) {
        return <List />;
    }
    return <Blog />;
};

const Layout = () => {
    const { frontmatter } = useData();

    const showNavbar = (() => {
        if (frontmatter.navbar === false) return false;
        return true;
    })();
    return (
        <div className='theme'>
            {showNavbar && <Header />}
            <div className='main'>
                <MainContent />
            </div>
            <Footer />
            <Debug />
        </div>
    );
};

export default Layout;

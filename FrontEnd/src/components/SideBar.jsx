import React, { useState } from 'react';
import { House, Search, Lightning, QuestionCircle, ChevronRight, ChevronLeft } from 'react-bootstrap-icons';



function SideBar() {
    const [showText, setShowText] = useState(false);

    const menuItems = [
        { name: 'Home', icon: <House /> , link:'/'},
        { name: 'Search', icon: <Search />, link:'/searchFilter'},
        { name: 'Quick Search', icon: <Lightning />, link:'/quickSerach'},
        { name: 'FAQ', icon: <QuestionCircle /> , link:'/FQA'},
    ];

    return (
        <div style={{ ...styles.sidebar, width: showText ? '250px' : '80px' }}>
            <button onClick={() => setShowText(!showText)} style={styles.toggleButton}>
                {showText ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <ul style={styles.menu}>
                {menuItems.map((item, index) => (
                    <li key={index} style={styles.menuItem}>
                        <a style={styles.link} href={`${item.link}`}>
                            {item.icon}
                            {showText && <span style={styles.text}>{item.name}</span>}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    sidebar: {
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: '#112',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'width 0.3s',
        overflow: 'hidden',
        color: '#ff9e3d',
        zIndex: '999'
    },
    toggleButton: {
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#575757',
        // color: '#fff',
        color: '#ff9e3d',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    menu: {
        listStyleType: 'none',
        padding: '0',
        width: '100%',
    },
    menuItem: {
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        // color: '#fff',
        color: '#ff9e3d',
        textDecoration: 'none',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
        width: '100%',
    },
    text: {
        marginLeft: '10px',
        whiteSpace: 'nowrap',
    },
};

export default SideBar;

import classes from './Layout.module.css';
import React from 'react';

interface Props {
    className?:string
}

const Layout:React.FC<Props>=(props)=>{
    //console.log(props.className);
    console.log('Layout render');
    let passedClasses=props.className?props.className:'';
    let totalClasses=`${classes.layout} ${passedClasses}`;
    return (
        <div className={totalClasses}>{props.children}</div>
    )
}

export default Layout;
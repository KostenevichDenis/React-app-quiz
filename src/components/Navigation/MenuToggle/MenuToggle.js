import React from "react";
import classes from "./MenuToggle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle
    ]
    const menu = () => {
        if (props.isOpen) {
            cls.push(classes.open)
            return (
                <FontAwesomeIcon className={cls.join(' ')} icon={faTimes} style={{paddingLeft:5}} onClick={props.onToggle}/>
                )
        } else {
            return (
               <FontAwesomeIcon className={cls.join(' ')} icon={faBars} style={{paddingLeft:5}} onClick={props.onToggle}/>
        )
        }
    }            

    return (
        menu()
        
    )
}

export default MenuToggle
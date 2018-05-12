
import React from 'react'
import './home.css'
import me from '../../resources/images/me.jpeg'

class Home extends React.Component{

    render(){
        return(
            <div id='wrapper' >
                <div className="name-block">
                    <a href='https://www.linkedin.com/in/gulshansharma22/' target="_blank">
                        Gulshan Sharma
                    </a>
                </div>
                <div className="skills">
                    In love with React, NodeJS, Golang and a five feet girl.
                </div>
    
                <div className="photo-block">
                    <img src={me} id="photo-me" />
                </div>
            </div>
        )
    }
}


export default Home
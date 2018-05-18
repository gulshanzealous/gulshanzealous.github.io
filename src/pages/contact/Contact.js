
import React from 'react'
import './contact.css'
import {Link} from 'react-router-dom'

class Home extends React.Component{

    render(){
        return(
            <div id='contact-container'>
            <div id='contact-wrapper' >
                <Link to='/' id='contact-home-back' >
                    <span>
                        {'Home'}
                    </span>
                </Link>

                <Link to='/blog' id='contact-blog-back' >
                    <span>
                        {'Blog'}
                    </span>
                </Link>
                

                <div id='contact-email'>
                    gulshan@iohertz.com
                </div>
            </div>
            </div>
        )
    }
}


export default Home
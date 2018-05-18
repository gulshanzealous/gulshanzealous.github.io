
import React from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import me from '../../resources/images/me.jpeg'

class Home extends React.Component{

    state={
        isMenuOpen:false,
        isMobile: document.documentElement.clientWidth < 900 ? true:false,
    }

    onMenuToggle = () => this.setState({isMenuOpen:!this.state.isMenuOpen})

    render(){
        const {isMenuOpen, isMobile} = this.state
        return(
            <div id='wrapper' >
                <div className="name-block">
                    <a href='https://www.linkedin.com/in/gulshansharma22/' target="_blank">
                        Gulshan Sharma
                    </a>
                </div>
                <div className="skills">
                    In love with React, NodeJS, Golang 
                    {/* and a five feet girl. */}
                </div>
    
                <Link to='/' id="photo-me">
                    <img src={me} alt='me'  />
                </Link>

                {
                    !isMobile?
                        <div className='home-menu-container'>
                            <Link to='/blog'>
                                <div className={`home-menu-item`} > Blog </div>
                            </Link>
                            <Link to='/contact'>
                                <div className={`home-menu-item`}  > Contact </div>
                            </Link>
                        </div>
                    :null
                }

                {
                    isMobile?
                    <div className='home-menu' onClick={this.onMenuToggle} >
                        {isMenuOpen?'>>>>':'<<<<'}
                    </div>
                    :
                    null
                }

                {   
                    isMenuOpen?
                    <div className='home-menu-container'>
                        <Link to='/blog' className={`home-menu-item`}>
                                <div  > Blog </div>
                        </Link>
                        <Link to='/contact'>
                                <div className={`home-menu-item`}  > Contact </div>
                        </Link>
                    </div>
                    :
                    null
                }


                <div className='home-email'>
                    gulshan@iohertz.com
                </div>
            </div>
        )
    }
}


export default Home
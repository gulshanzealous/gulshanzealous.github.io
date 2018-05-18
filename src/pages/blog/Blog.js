
import React from 'react'
import './blog.css'
import {Switch, Route, Link} from 'react-router-dom'
import wallPaper from '../../resources/images/wall.jpeg'

import {BlogCategory} from './blog-category'
import {BlogPost} from './blog-post'

import postsArray from './posts'
import firebase from 'firebase'


class Blog extends React.Component {

    state = {
        isMobile: document.documentElement.clientWidth < 900 ? true:false,        
        areTitlesExpanded:false,
        areCategoriesExpanded:false,
        sidebarItems:[],
        categoryItems:[
            'Technology',
            'Philosophy',
            'Poems',
            'Stories',
            'Random'
        ]
    }

    componentDidMount = () => {
        this.loadDataFromFirebase()
    }

    componentWillUnmount = () => {
        this.allPostsRef.off()
        this.allUsersRef.off()
    }

    loadDataFromFirebase = () => {
        this.allPostsRef = firebase.database().ref('/posts')
        this.allUsersRef = firebase.database().ref('/users')
        const self = this

        this.allPostsRef.once('value').then(function(snapshot) {
            var postsObject = snapshot.val()
            // console.log(postsObject)
            // if(postsObject && postsObject.length){
                self.setState({
                    sidebarItems: Object.values(postsObject)
                })
            // }
        });
        
    }



    onToggleTitles = () =>  this.setState({ areTitlesExpanded:!this.state.areTitlesExpanded, areCategoriesExpanded:false })

    onToggleCategories = () => this.setState({ areCategoriesExpanded: !this.state.areCategoriesExpanded, areTitlesExpanded:false })

    render(){
        const {isMobile, areTitlesExpanded, sidebarItems, categoryItems,areCategoriesExpanded} = this.state
        console.log(sidebarItems)
        return(
            <div id='blog-wrapper' >

                <div className={`blog-topbar`} >
                    <div className={`blog-menu`} onClick={this.onToggleTitles} >
                        <span style={{paddingRight:'10px',fontSize:'1.2em'}} > { areTitlesExpanded?'<-':null } </span> RECENT
                    </div>
                    {
                        !isMobile && categoryItems.map((x,i)=>{
                            return(
                                <Link to={`/blog/cat/${x}`} className={`blog-menu-categories`}  key={i} >
                                    <div >
                                        {`#  ${x}`}
                                    </div>
                                </Link>

                            )
                        })
                    }

                    {   isMobile &&
                        <div className={`blog-menu`} onClick={this.onToggleCategories} >
                            <span style={{paddingRight:'10px',fontSize:'1.2em'}} > { areCategoriesExpanded?'<-':null } </span> CATEGORIES
                        </div>
                    }

                    <Link to='/' className='blog-home-back' >
                        <span>
                            {'Home'}
                        </span>
                    </Link>
                </div>

                {
                    areTitlesExpanded ?
                    <div className='blog-sidebar'>
                        {
                            sidebarItems.map((x,i)=>{
                                return(
                                    <Link to={`/blog/post/${x.heading}`} className='blog-sidebar-item' key={i} onClick={this.onToggleTitles} >
                                        <div  >
                                                {x.heading}
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </div>
                    :
                    null
                }

                {
                    areCategoriesExpanded ?
                    <div className='blog-sidebar'>
                        {
                            categoryItems.map((x,i)=>{
                                return(
                                    <Link to={`/blog/cat/${x}`}  className='blog-sidebar-item' key={i} onClick={this.onToggleCategories} >
                                        <div >
                                                {`#  ${x}`}
                                        </div>
                                    </Link>

                                )
                            })
                        }

                    </div>
                    :
                    null
                }

                <div className='blog-section' >
                    <Switch>
                        <Route exact path='/blog' 
                            render={(props)=> <div className={`blog-main-container`} > <BlogPost {...props} post={sidebarItems[0]} posts={sidebarItems} /> </div> } />
                        <Route path='/blog/post/:blogTitle' 
                            render={(props)=> <div className={`blog-main-container`} > <BlogPost {...props} posts={sidebarItems} /> </div> } />
                        <Route path='/blog/cat/:blogCategory' 
                            render={(props)=> <div className={`blog-main-container`} > <BlogCategory {...props} posts={sidebarItems} /> </div> } />
                        
                    </Switch>
                </div>

            </div>
            
        )
    }
}

export default Blog

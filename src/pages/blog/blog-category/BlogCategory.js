
import React from 'react'
import './blog-cat.css'
import {Link} from 'react-router-dom'

class BlogCategory extends React.Component{
    render(){
        const { blogCategory } = this.props.match.params
        // console.log(this.props.match.params)

        const {posts} = this.props

        const matchedPosts = posts.filter(x => {
            const isPresent = x.tags.find(y => y.toLowerCase() === blogCategory.toLowerCase())
            if(isPresent){
                return true
            }
            return false
        })
        
        return(
            <div className={`category-grid`} >
                    <span/>

                    <h1 className={`blogcat-header`} > 
                        {blogCategory ? `# ${blogCategory}`: 'Oops! No Category Selected'}
                    </h1>

                    <div className={`blogcat-post-container`} >
                    {
                        !matchedPosts.length?
                        <div className={`blogcat-post-block`} >
                            No post for this category yet.
                        </div>
                        :
                        matchedPosts.map((x,i)=>{
                            return(
                                <Link to={`/blog/post/${x.heading}`} key={i} >
                                    <div className={`blogcat-post-block`} >
                                        <img src={x.imageUrl} className={`blogcat-block-overlay-image`} />
                                        <span className={`blogcat-block-overlay-text`} > {x.heading.slice(0,15)}... </span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    </div>

            </div>
        )
    }
}

export default BlogCategory
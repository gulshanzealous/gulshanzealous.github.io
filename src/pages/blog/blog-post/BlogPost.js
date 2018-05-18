
import React from 'react'
import './blogpost.css'
import {Link} from 'react-router-dom'
import {Button,Icon} from 'semantic-ui-react'
import firebase from 'firebase'


class BlogPost extends React.Component{

    state={
        displayPost:{
            heading:'',
            image:'',
            text:'',
            tags:[],
            
        },
        user:null
    }

    componentDidMount(){
        this.checkLoggedIn()
        this.startFirebaseListeners()
        const { blogTitle } = this.props.match.params
        
        const {posts, post} = this.props
        
        const matchedPost = posts.filter(x => x.heading === blogTitle)[0]

        const displayPost = blogTitle? matchedPost : post
        this.setState({ displayPost: { ...this.state.displayPost, ...displayPost} })
    }

    componentWillReceiveProps = (nextProps) => {
        if((this.props.match.params.blogTitle !== nextProps.match.params.blogTitle) || 
            (this.props.post !== nextProps.post) ||
            (this.props.posts !== nextProps.posts)
        ){

            const { blogTitle } = nextProps.match.params
            const {posts, post} = nextProps
           
            const matchedPost = posts.filter(x => x.heading === blogTitle)[0]
            const displayPost = blogTitle? matchedPost : post
            
            this.setState({ displayPost: { ...this.state.displayPost, ...displayPost} })
        }
    }

    componentWillUnmount(){
        this.allPostsRef.off()
        // this.allUsersRef.off()
    }

    startFirebaseListeners = () => {
        this.allPostsRef = firebase.database().ref('/posts')
    }

    // onLike = () => {
    //     const {displayPost, username} = this.state
    //     displayPost.increaseLike(username)        
    // }

    // onUnlike = () => {
    //     const {displayPost, username} = this.state
    //     displayPost.decreaseLike(username)        
    // }

    promptLogin = () => {
        
    }

    checkLoggedIn = () => {
        let self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                self.setState({ user })
            }
        });
    }

    toggleLogin = () => {
        let self = this
        if(this.state.user){
            firebase.auth().signOut().then(function() {
                console.log('Signed Out');
              }, function(error) {
                console.error('Sign Out Error', error);
              });
              
            return
        }
        // this.userRef = firebase.database().ref('/users/')
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            console.log(token)
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            self.setState({ user })

            // return this.allUsersRef.once('value')
        })
        // .then(function(snapshot) {
        //     var usersObject = snapshot.val()
        //     console.log(usersObject)
        // })
        
    }

    formatText = (text) => {
        const allText =  text.split('<br />')
        console.log(allText)
        return allText.map(x => {
            return (
                <div style={{textAlign:'center'}} >
                    { x.replace(/<br\s*[\/]?>/gi, "") }
                <br/>
                </div>
            )
        })
    }
    
    render(){
        let {displayPost, user} = this.state
        console.log(displayPost)
        const formattedText = this.formatText(displayPost.text)

        return(
            <div className={`blogpost-grid`} >
                    
                    <h1>
                        <div className={`blogpost-heading`} > {displayPost.heading} </div>
                        {/* <div className={`blogpost-login-button`} >
                            <Button primary onClick={this.toggleLogin} > 
                                <Icon name='google'/> 
                                <span> { user? 'Sign out' : 'Sign in with Google'} </span>
                            </Button>
                        </div> */}
                    </h1>


                    <div>
                        <img alt={displayPost.imageCredits} src={displayPost.imageUrl} />
                        <span> {displayPost.imageCredits} </span>
                        
                    </div>


                    <article>
                        { 
                            formattedText
                        }
                    </article>

                    <span>
                        {
                            displayPost.tags.map((x,i)=>{
                                return(
                                    <Link to={`/blog/cat/${x}`} className='blogpost-tag-item' key={i} >
                                    <div >
                                        {`#  ${x}`}
                                    </div>
                                    </Link>

                                )
                            })
                        }
                    </span>

                    <span > 
                        {/* <Button onClick={this.promptLogin} color='blue' value='Google Login' /> */}
                    </span>

                    {/* <span className='blogpost-action-item' >
                        {
                            displayPost.likedByCurrentUser?
                            <span>
                                <span> {displayPost.likesCount} </span>
                                <i className="fas fa-heart fa-5x" style={{color:'Tomato',cursor:'pointer'}} onClick={this.onUnlike} ></i>
                            </span>
                            :
                            <span>
                                <span> {displayPost.likesCount} </span>
                                <i className="far fa-heart fa-5x" style={{color:'Tomato',cursor:'pointer'}} onClick={this.onLike} ></i>
                            </span>
                        }
                        <i className="fas fa-comment fa-5x" style={{color:'Tomato'}}></i>
                    </span> */}


                    <span>
                    </span>

                </div>
            )
        }
    }

        
export default BlogPost
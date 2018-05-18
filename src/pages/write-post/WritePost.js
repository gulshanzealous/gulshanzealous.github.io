
import React from 'react'
import './write-post.css'
import {Input, Grid,TextArea,Dropdown,  Button} from 'semantic-ui-react'
import firebase from 'firebase'
import 'semantic-ui-css/semantic.min.css';
import FileUploader from 'react-firebase-file-uploader';

const uuid = require('uuid/v1');

class WritePost extends React.Component {

    state = {
        postId:'',
        heading:'',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL:'',
        imageCredits:'',        
        created_at:'',
        text:``,
        tags:[],
        possibleTagValues:[
            {key:'philosophy',value:'philosophy', text:'philosophy'},
            {key:'poems',value:'poems', text:'poems'},
            {key:'stories',value:'stories', text:'stories'},
            {key:'random',value:'random', text:'random'},
            {key:'technology',value:'technology', text:'technology'},            
        ],
        likeCount:0,
        commentCount:0,
        comments:{
            526213856148:{
                commentText:'this is a comment',
                username:'gulshan',
                userPic:'pic',
                created_at:'1526213260765',
                replies:{
                    1526213871933:{
                        replyText:'this is a reply',
                        username:'gaurav',
                        userPic:'pic',                        
                        created_at:'1526213260765'
                    }
                }
            }
        }
    }

    componentDidMount = () => {
        // this.writeDataToFirebase()
        this.readerRef = firebase.database().ref('/posts/')
        
    }

    componentWillUnmount = () => {
        this.readerRef.off()
        this.writerRef.off()
        this.uploadRef.off()
    }

    writeDataToFirebase = () => {

        this.readerRef.once('value').then(function(snapshot) {
            var username = snapshot.val()
            console.log(username)
            // ...
        });
    }

    onSubmitPost = () => {
        
        const postId = uuid()
        const created_at = Date.now()
        const tags = this.state.tags.reduce((final,x,i) => {
            return {...final, [i] : x }
        },{})
        const { heading, avatarURL,imageCredits, text, likeCount, commentCount, comments } = this.state

        console.log(avatarURL)
        this.writerRef = firebase.database().ref('posts/' + postId)
        
        const indetedText = text.replace(/\r\n|\r|\n/g,"<br />")
        // console.log(indetedText)

        this.writerRef.set({
            postId,
            heading,
            imageUrl:avatarURL,
            imageCredits,
            text: indetedText,
            created_at,
            tags,
            likeCount,
            commentCount,
            comments
        })

        this.setState({
            postId:'',
            heading:'',
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL:'',
            imageCredits:'',        
            created_at:'',
            text:'',
            tags:[],
            possibleTagValues:[
                {key:'philosophy',value:'philosophy', text:'philosophy'},
                {key:'poems',value:'poems', text:'poems'},
                {key:'stories',value:'stories', text:'stories'},
                {key:'random',value:'random', text:'random'},
                {key:'technology',value:'technology', text:'technology'},            
            ],
            likeCount:0,
            commentCount:0,
            comments:{
                526213856148:{
                    commentText:'this is a comment',
                    username:'gulshan',
                    userPic:'pic',
                    created_at:'1526213260765',
                    replies:{
                        1526213871933:{
                            replyText:'this is a reply',
                            username:'gaurav',
                            userPic:'pic',                        
                            created_at:'1526213260765'
                        }
                    }
                }
            }
        })
    }

    onChangeInput = (e) => {
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }

    onChangeTags = (e,data) => {
        console.log(data.value)
        this.setState({ tags:data.value })
    }


    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
    }
    handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
    };

    render(){
        const { heading, avatarURL, text, tags, possibleTagValues, imageCredits } = this.state

        return(
            <Grid className={`write-post-wrapper`} >
                <Grid.Row>
                    
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h1>Add New Posts</h1>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Input name='heading' style={{width:'100%'}} value={heading} label='heading' onChange={this.onChangeInput} />

                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Input name='imageCredits' style={{width:'100%'}} value={imageCredits} label='imageCredits' onChange={this.onChangeInput} />

                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Image sources
                        <div><a style={{color:'black'}} href="https://www.pexels.com/" target='_blank' > Pexels </a></div>
                        <a style={{color:'black'}} href="https://unsplash.com/" target='_blank' > Unsplash </a>

                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        
                        <label>Avatar:</label>
                            {this.state.isUploading &&
                            <p>Progress: {this.state.progress}</p>
                            }
                            {this.state.avatarURL &&
                            <img src={this.state.avatarURL} />
                            }
                            <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />

                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        
                        <Dropdown placeholder='tags' fluid multiple selection options={possibleTagValues} 
                           onChange={this.onChangeTags} value={tags} />

                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <TextArea rows={40} style={{width:'100%',padding:'20px'}} name='text' value={text} label='text' onChange={this.onChangeInput} />
                        
                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        
                        <Button onClick={this.onSubmitPost}> Publish </Button>
                    
                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                    
                </Grid.Row>

                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            </Grid>
        )
    }
}




export default WritePost

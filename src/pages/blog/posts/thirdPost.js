
import wallPaper from '../../../resources/images/wall.jpeg'

export default {
    'heading':'Third Am I',
    image:wallPaper,
    tags:['poems','technology'],
    likesCount:2,
    likeUsers:['gaurav','gulshan'],
    likedByCurrentUser:false,
    increaseLike:function(username){
        this.likesCount += 1
        this.likeUsers = [ username, ...this.likeUsers]
    },
    decreaseLike:function(username){
        this.likesCount -= 1
        this.likeUsers = this.likeUsers.filter(x => x !== username)
    },
    
    commentsCount:1,
    comments:[
        {
            comment:'this is a good post',
            username:'gaurav',
            uid:'f64f2940-fae4-11e7-8c5f-ef356f279131',
            replies:[
                {
                    reply:'i replied to first comment',
                    username:'gulshan',
                    uid:'9125a8dc-52ee-365b-a5aa-81b0b3681cf6'
                }
            ]
        }
    ],
    addComment:function({comment,username,uid}){
        this.comments = [
            { comment,username,uid, replies: [] },
            ...this.comments
        ]
    },
    addReplies:function({commentId,reply,username,uid}){
        this.comments = this.comments.map(x => {
            if(x.uid === commentId){
                x.replies = [
                    { reply, username, uid },
                    ...x.replies
                ]
                return
            }
            return x
        })
    },
    text:`This is the first post. Contrary to popular belief, Lorem Ipsum is not simply random text. 
    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of 
    the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites 
    of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
     1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
      written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. 
      The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 
    1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
     accompanied by English versions from the 1914 translation by H. Rackham.`
}
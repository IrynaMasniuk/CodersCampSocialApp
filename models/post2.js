const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {            // treść posta - raczej sam tekst (ewentualnie + emoji, but how to do it...?)
        type: String,
        required: true,
        maxlength: 250
    },
    userId: {             // identyfikator autora postu
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    isPublished: {        // czy post został opublikowany
        type: Boolean,
        default: false
    },  
    createDate: {         // data utworzenia i publikacji posta  
        type: Date,
        required: true,
        default: Date.now
    },
    lastEditDate: {       // data ostatniej edycji
        type: Date,
        required: true,
        default: Date.now          
    }, 
    bgColor: {            // kolor tła postu przechowywana jako np. wartość hex
       type: String,
       default: '#fff'
    }, 
    bgImage: {            // URL do obrazka, który mógłby być tłem posta lub umieszczonym poniżej tekstu posta
        type: String,
        maxlength: 50     // max długość adresu URL
    },
    likes: {              // liczba polubień
        type: Number,
        default: 0
    },
    dislikes: {           // liczba niepolubień
        type: Number,
        default: 0
    },
    tags: {               // tablica tagów
        type: [String]
    },
    comments: [           // tablica Id komentarzy dot. danego posta
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
        }]
});

const Post = mongoose.model('Post', postSchema);

async function createPost(postData) {
    let post = new Post({
        content: postData.content,
        userId: postData.userId,
        isPublished: true,
        bgColor: postData.bgColor,
        bgImage: postData.bgImage
    });
    try {
        const result = await post.save();
        console.log(result);
        return result;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }

}

exports.Post = Post;
exports.createPost = createPost;

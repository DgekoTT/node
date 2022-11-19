const  mongoose = require('mongoose');
const Shema = mongoose.Schema;

const postShema = new Shema({
    text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Post = mongoose.model('Post', postShema);

module.exports = Post;
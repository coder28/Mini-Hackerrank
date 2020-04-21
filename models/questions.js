const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')

const QuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    testcase: [{
        input:{
            type: String,
            required: true,
            trim: true
        },
        output: {
            type: String,
            required: true,
            trim: true
        }
    }],
    difficulty:{

        type: String,
        required:true,
        trim: true
    },
    score: {
        type:Number,
        required: true,
        default: 0
    }

}, {
    timestamps: true
})


const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question



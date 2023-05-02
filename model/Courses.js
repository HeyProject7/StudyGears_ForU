const mongoose = require('mongoose');
const Schema2 = mongoose.Schema;
const CoursesSchema = new Schema2({
    course_banner: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_description: {
        type: String,
        required: true
    },
    course_link: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Courses", CoursesSchema)
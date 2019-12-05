const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/application')
    .then (() => console.log('Connected to MonoDB...'))                 //Change
    .catch(err => console.log('Could not connect to MongoDB...', err)) //to debugger module

    const userSchema = new mongoose.Schema({
        username: { 
            type: String, 
            required: true,
            minlength: 3,
            maxlength: 50,
            // match: //pattern
            },             
        dateOfBirth: { 
            type: String,              // change to Date
            required: true 
            },
        phoneNumber: { 
            type: String,
            required: true 
            },
        work: String,
        education: String,
        cityOfLiving: String,
        cityOfOrigin: String,
        relationStatus: {
            type: String,
            required: true,
            enum: ['single', 'dating', 'married', 'divorced', 'complicated']
        },
        email: { 
            type: String,
            required: true 
            },
        hobbies: {
            type: String,
            validate: {
                validator : function(v) {
                    return v && v.length > 0;
                },
                message: 'A user should have at least one hobby :)'
            }
        },
        //isOnline: Boolean,
    });

    const User = mongoose.model('User', userSchema);   

    async function createCourse() {
        let user = new User({
            username: 'Ann Shirley',           
            dateOfBirth: '01.01.2001',
            phoneNumber: +48123456789,
            work: 'Wroclaw City Council',
            education: 'Quebec Technical University',
            cityOfLiving: 'Wroclaw',
            cityOfOrigin: 'Quebec',
            relationStatus: 'complicated',
            email: 'd3734249@urhen.com',
            hobbies: 'reading'
        });
   
        try {
            const result = await user.save();
            console.log(result);
        }
        catch (ex) {
            console.log(ex.message);
        }
    }     
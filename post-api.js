const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep Post document  (post {id, text})
let postdatas = [{
        "id": "0001", 
       "text": "test post content1" 
},
{
        "id": "0002", 
        "text": "test post content2" 
}];

// Where we will keep Post rate  (id, rate)
let postrates = [{
    "id": "0001", "rate": "1" 
},
{
    "id": "0002", "rate": "5" 
}];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Expose REST API to add new posts - input : id, content 
app.post('/postdata', (req, res) => {
    // data validation 
    const id = req.params.id
    
    for (let i = 0; i < postdatas.length; i++) {
        let postdata = postdatas[i]
        if (postdata.id === id) {
            res.send ("Id is duplicated , please insert new id ")
            return;  // 
        }
    }
    
    const postdata = req.body;
    postdatas.push(postdata);
    res.send('Post is added to the database');

});


// Expose REST API endpoints where users can rate a post by its ID - including data validation
// Postrate  : postId, rate 
app.post('/postrate', (req, res) => {
   
    const postrate = req.body;
    postrates.push(postrate);
    res.send('Post rate is added to the database');
  
});


//Expose REST API where we can retrieve the average post rating
app.get('/postrate/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    sum_rate = 0;  // Sum rates
    i = 0;
    overageRate = 0 ;   // Overage rate

    // Searching books for the isbn
    for (let postrate of postrates) {
        if (postrate.id === id) {
            sum_rate = sum_rate + postrate.rate;// Sum rate
            i = i+ 1;
           
        }
        
    }
    // average rate
    if (i === 0){
        res.status(404).send('Post id does not exist');
        return;
    }
    averageRate = sum_rate/i;
    res.json(averageRate);
    
});

// Edit Post endpoint
app.post('/postdata/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;
    const newPost = req.body;

    // Replace item from the Posts array
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i]
        if (post.id === id) {
            posts[i] = newPost;
        }
    }

    res.send('Post is edited');
});

// Expose REST API to delete post (no authentication needed - plain delete)
app.delete('/postdata/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;

    // Remove item from the books array
    postdatas = postdatas.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });

    res.send('Post is deleted');
});

app.listen(port, () => console.log(`This app listening on port ${port}!`));

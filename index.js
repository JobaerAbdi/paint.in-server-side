const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



// mongodb setup...........
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ihuwgkj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db('paint-in').collection('users');
    const instractorsCollection = client.db("paint-in").collection("Instractors");
    const classesCollection = client.db("paint-in").collection("Classes");
    const bookingCollection = client.db("paint-in").collection("Bookings");



    // GET Instractors.....
    app.get('/Instractors', async(req, res) => {
      const result = await instractorsCollection.find().toArray();
      res.send(result);
      
    });

    // Get classes........
    app.get('/classes', async(req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
      
    });



    //create User-----
    app.post('/users', async (req, res) => {
      const { name, email, photoUrl, userRole } = req.body;
      try {
        // Connect to MongoDB
        // const client = await MongoClient.connect(url);//
        // const db = client.db(dbName);//
        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          // client.close();//
          return res.status(409).json({ error: 'User already exists' });
        }
        // Create a new user
        const newUser = { name, email, photoUrl, userRole };
        await usersCollection.insertOne(newUser);
        // client.close();//
        res.status(201).json(newUser);
      } catch (err) {
        console.error('Failed to create user:', err);
        res.status(500).json({ error: 'Failed to create user' });
      }
    });


    //get user----
    app.get('/users/:id', async (req, res) => {
      const email = req.params.id;
      const query = { email: email };
      const cursor = await usersCollection.find(query);
      const user = await cursor.toArray();

      res.send(user);
   })








   //check is Booked-----

app.get('/isBooked', async (req, res) => {
  try {
    const email = req.query.email;
    const classId = req.query.classId;

    const query = { email: email, classId: classId };

    const booking = await bookingCollection.findOne(query);

    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

   




 app.post('/booking', async (req, res) => {
      // const email = req.params.id;
      // const query = { email: email };
      
      const bookingInfo = req.body;

      const result = await bookingCollection.insertOne(bookingInfo);

      res.send(result);
    })
    














    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// Simple GET API
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






[
    {
      "title": "Pastel Painting",
      "image": "https://i.ibb.co/f1y1608/spring-painting-wallpaper-1280x800.jpg",
      "price": 45,
      "instructorName": "Paplo picaso",
      "instructorPhoto": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "ratings": "4.5",
      "availableSeats":22,
      "enrolledStudentt":78,
    },
    {
      "title": "Pastel Painting",
      "image": "https://i.ibb.co/f1y1608/spring-painting-wallpaper-1280x800.jpg",
      "price": 45,
      "instructorName": "Paplo picaso",
      "instructorPhoto": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "ratings": "4.5",
      "availableSeats":22,
      "enrolledStudentt":78,
    },
    {
      "title": "Pastel Painting",
      "image": "https://i.ibb.co/f1y1608/spring-painting-wallpaper-1280x800.jpg",
      "price": 45,
      "instructorName": "Paplo picaso",
      "instructorPhoto": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "ratings": "4.5",
      "availableSeats":22,
      "enrolledStudentt":78,
    },
    {
      "title": "Pastel Painting",
      "image": "https://i.ibb.co/f1y1608/spring-painting-wallpaper-1280x800.jpg",
      "price": 45,
      "instructorName": "Paplo picaso",
      "instructorPhoto": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "ratings": "4.5",
      "availableSeats":22,
      "enrolledStudentt":78,
    },
    {
      "title": "Pastel Painting",
      "image": "https://i.ibb.co/f1y1608/spring-painting-wallpaper-1280x800.jpg",
      "price": 45,
      "instructorName": "Paplo picaso",
      "instructorPhoto": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "ratings": "4.5",
      "availableSeats":22,
      "enrolledStudentt":78,
    },
    {
      "title": "Pastel Painting",
      "image": "https://i.ibb.co/f1y1608/spring-painting-wallpaper-1280x800.jpg",
      "price": 45,
      "instructorName": "Paplo picaso",
      "instructorPhoto": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      "ratings": "4.5",
      "availableSeats":22,
      "enrolledStudentt":78,
    }
    
  ]







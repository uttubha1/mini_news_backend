// app.js
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors({origin: true, credentials: true}))
app.use(express.json());

const fetchUnsplashImage = async () => {
    const response = await fetch('https://source.unsplash.com/random/800x600');
    return response.url;
  };

const dummyData = [
    { 
      id: 1, 
      tag: 'business', 
      title: 'Business News 1', 
      description: 'Description for Business News 1', 
    },
    { 
      id: 2, 
      tag: 'sports', 
      title: 'Sports News 1', 
      description: 'Description for Sports News 1', 
    },
    { 
      id: 3, 
      tag: 'business', 
      title: 'Business News 2', 
      description: 'Description for Business News 2', 
    },
    { 
      id: 4, 
      tag: 'sports', 
      title: 'Sports News 2', 
      description: 'Description for Sports News 2', 
    },
    { 
      id: 5, 
      tag: 'technology', 
      title: 'Technology News 1', 
      description: 'Description for Technology News 1', 
    },
    { 
      id: 6, 
      tag: 'technology', 
      title: 'Technology News 2', 
      description: 'Description for Technology News 2', 
    },
    { 
      id: 7, 
      tag: 'business', 
      title: 'Business News 3', 
      description: 'Description for Business News 3', 
    },
    // Add more data as needed
  ];

  const updateDummyData = async () => {
    for (let i = 0; i < dummyData.length; i++) {
      dummyData[i].cover = await fetchUnsplashImage();
    }
  };

  updateDummyData().then(() => {
    app.get('/', (req, res) => {
      return res.json(dummyData);
    });

    app.post('/getNewsById', (req, res) => {
        const { id } = req.body;
        const newsItem = dummyData.find((item) => item.id === id);
        if (newsItem) {
            return res.json(newsItem);
        } else {
            return res.status(404).json({ message: 'News item not found' });
        }
    });

    app.get('/getSportsNews', (req, res) => {
        const sportsNews = dummyData.filter((item) => item.tag === 'sports');
        return res.json(sportsNews);
    });
    
    app.get('/getBusinessNews', (req, res) => {
        const businessNews = dummyData.filter((item) => item.tag === 'business');
        return res.json(businessNews);
    });
    
    app.get('/getTechnologyNews', (req, res) => {
        const technologyNews = dummyData.filter((item) => item.tag === 'technology');
        return res.json(technologyNews);
    });    
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trend = require('./models/Trend');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@horrorapp.com',
    password: 'admin123',
    role: 'admin',
    channelName: 'Horror Admin',
  },
  {
    name: 'John Creator',
    email: 'john@example.com',
    password: 'password123',
    role: 'creator',
    channelName: 'Horror Stories ID',
  },
];

const trends = [
  {
    topic: 'Pocong Challenge',
    category: 'horror',
    keywords: ['pocong', 'challenge', 'viral', 'indonesia'],
    popularity: 8500,
    trendingScore: 95,
    source: 'YouTube Trending',
  },
  {
    topic: 'Kisah Nyata Rumah Berhantu',
    category: 'paranormal',
    keywords: ['rumah berhantu', 'kisah nyata', 'paranormal'],
    popularity: 7200,
    trendingScore: 88,
    source: 'Social Media',
  },
  {
    topic: 'Urban Legend Jakarta',
    category: 'urban-legend',
    keywords: ['urban legend', 'jakarta', 'misteri'],
    popularity: 6800,
    trendingScore: 82,
    source: 'YouTube Trending',
  },
  {
    topic: 'Creepypasta Indonesia',
    category: 'creepypasta',
    keywords: ['creepypasta', 'indonesia', 'horor'],
    popularity: 5500,
    trendingScore: 75,
    source: 'Reddit',
  },
  {
    topic: 'Misteri Pembunuhan Tak Terpecahkan',
    category: 'true-crime',
    keywords: ['true crime', 'pembunuhan', 'misteri'],
    popularity: 9200,
    trendingScore: 92,
    source: 'News',
  },
  {
    topic: 'Hantu Jepang Paling Menyeramkan',
    category: 'horror',
    keywords: ['hantu jepang', 'yurei', 'onryo'],
    popularity: 7800,
    trendingScore: 85,
    source: 'YouTube',
  },
  {
    topic: 'Pengalaman Paranormal di Hotel',
    category: 'paranormal',
    keywords: ['hotel berhantu', 'pengalaman', 'paranormal'],
    popularity: 6500,
    trendingScore: 78,
    source: 'Social Media',
  },
  {
    topic: 'Legenda Nyi Roro Kidul',
    category: 'urban-legend',
    keywords: ['nyi roro kidul', 'legenda', 'pantai selatan'],
    popularity: 8900,
    trendingScore: 90,
    source: 'Cultural',
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Trend.deleteMany();

    await User.insertMany(users);
    await Trend.insertMany(trends);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Trend.deleteMany();

    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

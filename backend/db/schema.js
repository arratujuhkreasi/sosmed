const { sqliteTable, text, integer, real } = require('drizzle-orm/sqlite-core');
const { sql } = require('drizzle-orm');

// Users table
const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'creator', 'visitor'] }).default('creator').notNull(),
  channelName: text('channel_name'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Contents table
const contents = sqliteTable('contents', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  judul: text('judul').notNull(),
  deskripsi: text('deskripsi').notNull(),
  tag: text('tag').notNull(), // JSON string array
  niche: text('niche'),
  hook: text('hook'),
  duration: integer('duration'),
  status: text('status', { enum: ['draft', 'published', 'archived'] }).default('draft').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Trends table
const trends = sqliteTable('trends', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  topic: text('topic').notNull(),
  category: text('category', { 
    enum: ['horror', 'creepypasta', 'urban-legend', 'paranormal', 'true-crime'] 
  }).default('horror').notNull(),
  keywords: text('keywords').notNull(), // JSON string array
  popularity: integer('popularity').default(0).notNull(),
  trendingScore: real('trending_score').default(0).notNull(),
  source: text('source'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Performa table
const performas = sqliteTable('performas', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  contentId: text('content_id').notNull().references(() => contents.id, { onDelete: 'cascade' }),
  views: integer('views').default(0).notNull(),
  likes: integer('likes').default(0).notNull(),
  comments: integer('comments').default(0).notNull(),
  shares: integer('shares').default(0).notNull(),
  watchTime: integer('watch_time').default(0).notNull(),
  engagementRate: real('engagement_rate').default(0).notNull(),
  recordedAt: integer('recorded_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

module.exports = {
  users,
  contents,
  trends,
  performas,
};

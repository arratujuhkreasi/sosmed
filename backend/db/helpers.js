const bcrypt = require('bcryptjs');
const { db } = require('../db');
const { users, contents, trends, performas } = require('../db/schema');
const { eq, and, desc } = require('drizzle-orm');

// User helpers
const userHelpers = {
  async create(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const [user] = await db.insert(users).values({
      ...userData,
      password: hashedPassword,
    }).returning();
    
    return user;
  },

  async findByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },

  async findById(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async update(id, data) {
    const [updated] = await db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updated;
  },

  async comparePassword(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  },
};

// Content helpers
const contentHelpers = {
  async create(contentData) {
    const [content] = await db.insert(contents).values({
      ...contentData,
      tag: JSON.stringify(contentData.tag),
    }).returning();
    
    return {
      ...content,
      tag: JSON.parse(content.tag),
    };
  },

  async findById(id) {
    const [content] = await db.select().from(contents).where(eq(contents.id, id));
    if (content) {
      content.tag = JSON.parse(content.tag);
    }
    return content;
  },

  async findByUserId(userId) {
    const result = await db.select().from(contents)
      .where(eq(contents.userId, userId))
      .orderBy(desc(contents.createdAt));
    
    return result.map(c => ({
      ...c,
      tag: JSON.parse(c.tag),
    }));
  },

  async findAll() {
    const result = await db.select().from(contents).orderBy(desc(contents.createdAt));
    return result.map(c => ({
      ...c,
      tag: JSON.parse(c.tag),
    }));
  },

  async update(id, data) {
    const updateData = { ...data, updatedAt: new Date() };
    if (data.tag) {
      updateData.tag = JSON.stringify(data.tag);
    }
    
    const [updated] = await db.update(contents)
      .set(updateData)
      .where(eq(contents.id, id))
      .returning();
    
    if (updated) {
      updated.tag = JSON.parse(updated.tag);
    }
    return updated;
  },

  async delete(id) {
    await db.delete(contents).where(eq(contents.id, id));
  },
};

// Trend helpers
const trendHelpers = {
  async create(trendData) {
    const [trend] = await db.insert(trends).values({
      ...trendData,
      keywords: JSON.stringify(trendData.keywords),
    }).returning();
    
    return {
      ...trend,
      keywords: JSON.parse(trend.keywords),
    };
  },

  async findAll() {
    const result = await db.select().from(trends)
      .where(eq(trends.isActive, true))
      .orderBy(desc(trends.trendingScore));
    
    return result.map(t => ({
      ...t,
      keywords: JSON.parse(t.keywords),
    }));
  },

  async findById(id) {
    const [trend] = await db.select().from(trends).where(eq(trends.id, id));
    if (trend) {
      trend.keywords = JSON.parse(trend.keywords);
    }
    return trend;
  },

  async update(id, data) {
    const updateData = { ...data, updatedAt: new Date() };
    if (data.keywords) {
      updateData.keywords = JSON.stringify(data.keywords);
    }
    
    const [updated] = await db.update(trends)
      .set(updateData)
      .where(eq(trends.id, id))
      .returning();
    
    if (updated) {
      updated.keywords = JSON.parse(updated.keywords);
    }
    return updated;
  },
};

// Performa helpers
const performaHelpers = {
  async create(performaData) {
    const engagementRate = performaData.views > 0 
      ? ((performaData.likes + performaData.comments + performaData.shares) / performaData.views) * 100
      : 0;
    
    const [performa] = await db.insert(performas).values({
      ...performaData,
      engagementRate,
    }).returning();
    
    return performa;
  },

  async findByContentId(contentId) {
    const result = await db.select().from(performas)
      .where(eq(performas.contentId, contentId))
      .orderBy(desc(performas.recordedAt));
    
    return result;
  },

  async findById(id) {
    const [performa] = await db.select().from(performas).where(eq(performas.id, id));
    return performa;
  },

  async update(id, data) {
    const updateData = { ...data, updatedAt: new Date() };
    
    if (data.views !== undefined) {
      updateData.engagementRate = data.views > 0
        ? ((data.likes + data.comments + data.shares) / data.views) * 100
        : 0;
    }
    
    const [updated] = await db.update(performas)
      .set(updateData)
      .where(eq(performas.id, id))
      .returning();
    
    return updated;
  },
};

module.exports = {
  userHelpers,
  contentHelpers,
  trendHelpers,
  performaHelpers,
};

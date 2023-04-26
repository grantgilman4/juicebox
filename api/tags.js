const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../db')
tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
      next();
  });
  
  const { getAllTags } = require('../db');
  
tagsRouter.get('/', async (req,res) => {
      const tags = await getAllTags();
      
      res.send({
          tags
      });
  });

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params;
    try {
        // use our method to get posts by tag name from the db
        const tagPosts = await getPostsByTagName(tagName);
        const posts = tagPosts.filter(post => {
            return post.active || (req.user && post.author.id === req.user.id);
        })
        // send out an object to the client { posts: // the posts }
        res.send({
            posts
        });
      } catch ({ name, message }) {
        next({name, message})
      }
})

module.exports = tagsRouter;

const express = require('express')

const router = express.Router()

const User = require('../models/User')

router.get('/get', async (req, res) => {
  try {
    if (process.env.offline !== 'false') {
      res.json(
        [{
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'Mucci',
          points: 1200
        }]
      )
    }
    const users = await User.find({ active:true })
    res.json(users);
  } catch (err) {
    console.log(err)
    res.json({ error: err.message || err.toString() });
  }
})

router.get('/get/:slug', async (req, res) => {
  const slug = req.params.slug
  try {
    if (process.env.offline) {
      res.json(
        {
          _id: 'sadksahdas',
          slug: 'mucci',
          name: 'Mucci',
          avatarUrl: 'https://myavatar/something',
          points: 1200
        }
      )
    }
    const users = await User.findOne({ slug })
    res.json(users);
  } catch (err) {
    console.log(err)
    res.json({ error: err.message || err.toString() });
  }
})

router.post('/add', (req, res) => {
  const { name, avatarUrl } = req.body
  const slug = User.generateSlug()
  const userData = {
    name,
    slug,
    points: 1200,
    avatarUrl,
    active: true
  }
  const newUser = new User(userData)
  newUser.save(function (err) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(newUser)
  })
})

router.post('/update', (req, res) => {
  const { id, name, avatarUrl } = req.body
  const query = { _id: id }
  User.findOneAndUpdate(query, { name, avatarUrl }, {}, function (err, rs) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(rs)
  })
})

router.delete('/delete/:userId', (req, res) => {
  const id = req.params.userId
  const query = { _id: id }
  User.findOneAndUpdate(query, { active: false }, {}, function (err, rs) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(rs)
  })
})
  // try {
  //   const users = [
  //     {
  //       id: 1,
  //       name: 'Mucci',
  //       points: 1200
  //     },
  //     {
  //       id: 2,
  //       name: 'Moioli',
  //       points: 1700
  //     },
  //     {
  //       id: 3,
  //       name: 'Slow',
  //       points: 950
  //     },
  //     {
  //       id: 4,
  //       name: 'Boss',
  //       points: 2500
  //     },
  //     {
  //       id: 5,
  //       name: 'Gabo',
  //       points: 1200
  //     }
  //   ]
  //   res.json(users);
  // } catch (err) {
  //   res.json({ error: err.message || err.toString() });
  // }


module.exports = router

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', { author: 1, title: 1,  url: 1})
    response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (body.password.length <= 3) {
            return response.status(400).send({ error: 'liian lyhyt salasana' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (error) 
    {
        next(error)
    }
})

module.exports = usersRouter
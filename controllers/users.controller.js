
import { cwd } from 'node:process'
import { join } from 'node:path'
import { readFile, readFileSync, write, writeFile } from 'node:fs'
import chalk from 'chalk'

const USERS_PATH = join(cwd(), 'data', 'users.json')


// Get methods are here below
export function getAllUsers(req, res) {
    console.log(1)
    readFile(USERS_PATH, 'utf8', (err, data) => {
        if(err) throw Error(err)
            
        data = JSON.parse(data)
        res.json(data)
        console.log('data came')
    })
    // let data = readFileSync(join(cwd(), 'data', 'users.json'), 'utf-8')
    // console.log('length', data.length)
    console.log(2)
}

export function getUserById(req, res) {
    let userId = Number(req.params.id) || null
    
    readFile(USERS_PATH, 'utf-8', (err, data) => {
        if(err) throw Error(err)
            
        data = JSON.parse(data)

        let foundUser = data.find(user => user.id === userId)
        if(!foundUser) res.status(404).json({ message: `User not found with ${userId} id` })

        res.status(200).json(foundUser)
    })
}


// Post Methods Goes
export function createUser(req, res) {
    let {name, email} = req.body
    if(!name || !email) {
        console.log('body', req.body);
        
        return res.status(400).json({message: `name or email are not provided!`})
    }
    readFile(USERS_PATH, 'utf-8', (err,data) => {
        if(err) throw err;
        data = JSON.parse(data)
        
        let newUser = {
            id: (+data.at(-1).id + 1),
            name,
            username: name,
            email
        };

        data.push(newUser)
        writeFile(USERS_PATH, JSON.stringify(data, null, 2), (err) => {
            if(err) throw err;
        })

        res.status(200).json({message: 'Created new User successfully', data: newUser})
        console.log(chalk.bgRedBright.white('Created new User successfully'))
    })
}

// Update method starts here
export function updateUserById(req, res) {
    let userId = Number(req.params.id) || null
    if(!userId) return res.status(404).json({message: 'id is not defined!'})

    let { name, email } = req.body
    if(!name || !email) return res.status(400).json({message: 'name and email properties are required!'})

    readFile(USERS_PATH, 'utf-8', (err, data) => {
        if(err) throw err;
        let usersData = JSON.parse(data)

        let foundUser = usersData.find(user => user.id === userId)
        if(!foundUser) return res.status(404).json({ message: 'User is not defined' })

        foundUser.name = name
        foundUser.username = name
        foundUser.email = email

        writeFile(USERS_PATH, JSON.stringify(usersData, null, 2), (err) => {
            if(err) throw new Error(err)

            console.log(chalk.underlineGreenBright('user has been updated flawlessly'))
            return res.status(200).json({message: 'user has been updated flawlessly', data: foundUser})
        })
        
    })

    console.log(chalk.bgRed('work'))
}


// FIXME:Delete user
export function deleteUserById(req, res) {
    let userId = parseInt(req.params.id);
    if(!userId) return res.status(404).json({message: 'id is not defined!'})

    readFile(USERS_PATH, 'utf-8', (err, data) => {
        if(err) throw err;
        let usersData = JSON.parse(data)

        let userIndex = usersData.findIndex(user => user.id === userId)
        if(userIndex == -1 || !userIndex) return res.status(404).json({ message: `User is not defined with ${userId} id` })

        usersData.splice(userIndex, 1)
        
        writeFile(USERS_PATH, JSON.stringify(usersData, null, 2), (err) => {
            if(err) throw new Error(err)

            console.log(chalk.bgRed('User has successfully been removed'))
            return res.status(200).json({message: 'User has successfully been removed', data: usersData})
        })
    })
}
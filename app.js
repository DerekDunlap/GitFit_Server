const express=require('express')
const axios=require('axios').default
const cors=require('cors')
global.bcrypt=require('bcryptjs')
global.models=require('./models')
const app=express()

app.use(cors())
app.use(express.json())

// app.get('/',(req,res)=>{
//     axios(`https://api.quotable.io/quotes?tags=inspirational`)
//     .then(response=>{
//         let quoteItem=''
//         const quoteArr=response.data.results
//         for(let i=0;i<1;i++){
//             let index=quoteArr[Math.floor(Math.random()*quoteArr.length)]
//             quoteItem={
//                 quote:index.content,
//                 author:index.author,
//                 quoteID:index._id,
//                 tags:index.tags[0]
//             }
//             console.log(quoteItem)
//         }
//         res.render('quotes',{quoteItem:quoteItem})
//     })
// })

function validateUsername(username){
    if (/^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/.test(username)){
        return (username)
    }
        return "false"
}

function validatePassword(password){
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/.test(password)){
        return (password)
    }
        return "false"
}

app.get('/guest-login',(req,res)=>{
    const guestName='admin'
    const guestPassword='password'

    models.User.findOne({
        where:{
            username:guestName
        }
    })
    .then(user=>{
        bcrypt.compare(guestPassword,user.password,function(error,result){
            if(result){
                const guestLogin={
                    username:user.username,
                    id:user.id
                }
                console.log("Logged IN")
                res.json({success:true,guest:guestLogin})
            }else{
                //failed to authen user due to password not matching db password
                res.json({success:false})
            }
        })
        //failed to retrieve user from db based on username given
    }).catch(function(error){
        res.json({success:false})
    })
})

app.post('/login',(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    models.User.findOne({
        where:{
            username:username
        }
    })
    .then(user=>{
        bcrypt.compare(password,user.password,function(error,result){
            if(result){
                const userLogin={
                    username:user.username,
                    id:user.id
                }
                console.log("Logged IN")
                res.json({success:true,user:userLogin})
            }else{
                //failed to authen user due to password not matching db password
                res.json({success:false})
            }
        })
        //failed to retrieve user from db based on username given
    }).catch(function(error){
        res.json({success:false})
    })
})

app.post('/register',(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    models.User.findOne({
        where:{
            username:username
        }
    })
    .then(duplicateUser=>{
        if(duplicateUser!=null){
            res.json({success:false})
        }else{
            bcrypt.genSalt(10,function(error,salt){
                if(!error){
                    bcrypt.hash(password,salt,function(error,hash){
                        if(!error){
                            const user=models.User.build({
                                username:username,
                                password:hash
                            })
                            user.save()
                            .then(_=>{
                                res.json({success:true})
                            }).catch(function(error){
                                res.json({success:false})
                            })
                        }else{
                            res.json({success:false})
                        }
                    })
                }else{
                    res.json({success:false})
                }
            })
        }
    }).catch(function(error){
        res.json({success:false})
    })
})

app.post('/add-workout',(req,res)=>{
    const userID=req.body.userID
    const workoutID=req.body.workoutID

    models.Workout.findOne({
        where:{
            id:workoutID
        }
    })
    .then(foundWorkout=>{
        const favoriteWorkout= models.WorkoutPlan.build({
            userID:userID,
            workoutID:foundWorkout.id,
            name:foundWorkout.name,
            description:foundWorkout.description,
            numOfSets:foundWorkout.numOfSets,
            numOfReps:foundWorkout.numOfReps
        })
        favoriteWorkout.save()
        .then(savedWorkout=>{
           res.json({addedWorkout:savedWorkout})
        })
    })
})

app.post('/remove-workout',(req,res)=>{
    const userID=req.body.userID
    const workoutID=req.body.workoutID

    console.log(`Add workout to user's list: ${userID}${workoutID}`)
    models.WorkoutPlan.destroy({
        where:{
            workoutID:workoutID
        }
    })
    .then(removedWorkout=>{
        res.json({success:true,subtractedWorkout:removedWorkout})
    })
})

app.post('/update-workout',(req,res)=>{
    console.log('Allow user to edit a workout plan')
})

app.post('/delete-user',(req,res)=>{
    const userID=req.body.userID
    console.log(userID)

    models.WorkoutPlan.findAll({
        where:{
            userID:userID
        }
    })
    .then(deletedUserWorkouts=>{
        for(let i=0;i<deletedUserWorkouts.length;i++){
            models.WorkoutPlan.destroy({
                where:{
                    workoutID:deletedUserWorkouts[i].workoutID
                }
            })
            .then(_=>{
                console.log('Deleted User saved workoutplans')
            })
        }
        models.User.destroy({
            where:{
                id:userID
            }
        }).then(_=>{
            console.log('Deleted User\'s Account from DB!')
        })
    })
})

app.get('/workouts',(req,res)=>{
    models.Workout.findAll()
    .then(workouts=>{
        res.json(workouts)
    })
})

app.post('/my-workoutplan',(req,res)=>{
    const userID=req.body.userID
    models.WorkoutPlan.findAll({
        where:{
            userID:userID
        }
    })
    .then(myWorkoutPlan=>{
        res.json(myWorkoutPlan)
    })
})

app.listen(8080,()=>{
    console.log('Server running...')
})
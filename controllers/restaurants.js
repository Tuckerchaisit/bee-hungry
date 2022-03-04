import { Restaurant } from "../models/restaurant.js";

function index(req,res){
  Restaurant.find({})
  .then(restaurants =>{
    res.render('restaurants/index',{
      restaurants,
      title: 'All Restaurants'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/restaurants')
  })
}

function newRestaurant(req,res){
  res.render('restaurants/new',{
    title: 'Add Restaurant'
  })
}

function create(req,res){
  req.body.owner = req.user.profile._id
  req.body.visited = !!req.body.visited
  Restaurant.create(req.body)
  .then(restaurant =>{
    res.redirect('/restaurants')
  })
  .catch(err=>{
    console.log(err);
    res.redirect('/restaurants')
  })
}

function show(req,res){
  Restaurant.findById(req.params.id)
  .populate("owner")
  .then(restaurant=>{
    res.render('restaurants/show',{
      title, 
      restaurant: restaurant
    })
  })
}



export{
  index,
  newRestaurant as new,
  create,
  show,
}
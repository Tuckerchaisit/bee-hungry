import { Restaurant } from "../models/restaurant.js";

function index(req,res){
  // req.body.owner = req.user.profile._id
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
  req.body.owner = req.user.profile._id
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
  req.body.owner = req.user.profile._id
  Restaurant.findById(req.params.id)
  .populate("owner")
  .then(restaurant=>{
    res.render('restaurants/show',{
      title: 'Restaurant Detail', 
      restaurant: restaurant
    })
    
  })
  .catch(err=>{
    console.log(err);
    res.redirect('/restaurants')
  })
}

function edit(req,res){
  req.body.owner = req.user.profile._id
  Restaurant.findById(req.params.id)
  .then(restaurant=>{
    if (restaurant.owner.equals(req.user.profile._id)) {
    res.render('restaurants/edit',{
      restaurant,
      title: 'Edit Restaurant'
    })
  }else{
    res.redirect('/restaurants')
  }
  })
  .catch(err=>{
    console.log(err);
    res.redirect('/restaurants')
  })
}

function update(req,res){
  req.body.owner = req.user.profile._id
  
  req.body.visited = !!req.body.visited
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Restaurant.findByIdAndUpdate(req.params.id, req.body, function(err, restaurant) {
    if (restaurant.owner.equals(req.user.profile._id)) {
    res.redirect(`/restaurants/${restaurant._id}`)}
    else{
      res.redirect('/restaurants')
    }
  })
  
}
function createPrevVisits(req,res){
  req.body.owner = req.user.profile._id
  Restaurant.findById(req.params.id)
  
  .then(restaurant=>{
    restaurant.prevVisited.push(req.body)
    restaurant.save(function(err){
      res.redirect(`/restaurants/${restaurant._id}`)
    })
  })
}

function deleteRestaurant(req,res){
  req.body.owner = req.user.profile._id
  Restaurant.findByIdAndDelete(req.params.id)
  .then(res.redirect('/restaurants'))
}

export{
  index,
  newRestaurant as new,
  create,
  show,
  edit,
  update,
  createPrevVisits,
  deleteRestaurant as delete,
}
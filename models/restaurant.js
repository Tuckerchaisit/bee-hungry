import mongoose from "mongoose";

const Schema = mongoose.Schema

const prevVisitSchema = new Schema({
  date: {
    type:Date, 
    default: function(){
      return new Date(new Date().setFullYear(new Date().getFullYear()))
  }},
  occasion: String,
  totalBilled: {type:Number, min:1, max:99999},
  specialNotes: String,
},{
  timestamps: true
})

const restaurantSchema = new Schema({
  name: { type: String, required: true},
  priceRange: String,
  address: String,
  cuisine: String,
  visited: Boolean,
  prevVisited: [prevVisitSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
  timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export{
  Restaurant
}
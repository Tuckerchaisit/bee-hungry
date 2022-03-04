import mongoose from "mongoose";

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  priceRange: String,
  address: String,
  cuisine: String,
  visited: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
},{
  timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export{
  Restaurant
}
const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const {ObjectId} = require('mongodb');

module.exports = {


async create(name, genre, website, recordLabel, bandMembers, yearFormed) {

    let InvalidFlagGenre = false;
    let InvalidBandMembers = false;

    if (!name) throw 'Your band must be provided';
    if (!genre) throw 'Your genre must be provided';
    if (!website) throw 'Your website must be provided';
    if (!recordLabel) throw 'Your recordLabel be provided';
    if (!bandMembers) throw 'Your bandMembers be provided';
    if (!yearFormed) throw 'Your yearFormed be provided';

    if (typeof name !== 'string') throw 'Argument name must be a string';
    if (name.trim().length === 0) throw 'Argument name must not be a string with only spaces or an empty string.';
    if (typeof website !== 'string') throw 'Argument website must be a string';
    if (website.trim().length === 0) throw 'Argument website must not be a string with only spaces or an empty string.';
    if (typeof recordLabel !== 'string') throw 'Argument recordLabel must be a string';
    if (recordLabel.trim().length === 0) throw 'Argument recordLabel must not be a string with only spaces or an empty string.';

    //TODO need to figure out have at least 5 characters in-between the http://www. and .com this method will throw part of this error handling
    let web1 = "http://www."; 
    let web2 = ".com";

    if(!website.includes(web1) || !website.includes(web2)) throw 'Error: Website must include http://www. and .com'; 
    if(website.length < 20) throw 'Error: There must be at least 5 characters between http://www. and .com';
    

    if (!genre || !Array.isArray(genre))
      throw 'You must provide an array of genres';
    if (genre.length === 0) throw 'You must supply at least one genres';
    for (i in genre) {
      if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
        InvalidFlagGenre = true 
        break; 
    }
    }
    if (!bandMembers || !Array.isArray(bandMembers))
      throw 'You must provide an array of bandMembers';
    if (bandMembers.length === 0) throw 'You must supply at least one bandMembers';
    for (i in bandMembers) {
      if ((typeof bandMembers[i] !== 'string') || (bandMembers[i].trim().length === 0)) {
        InvalidBandMembers = true 
        break; 
    }
}
    if (InvalidFlagGenre)
    throw 'One or more genres is not a string or is an empty string';
    name = name.trim();
    if (InvalidBandMembers)
    throw 'One or more band members is not a string or is an empty string';
    name = name.trim();

    //if(typeof yearformed !== 'number') throw 'year formed must be a number'; 
    if(yearFormed < 1900 || yearFormed > 2022) throw 'Only years 1900-2022 are valid values';

    const bandCollection = await bands(); 

    let newBand = {
        name: name, 
        genre: genre, 
        website: website, 
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed
    }

    const insertInfo = await bandCollection.insertOne(newBand);
    const newId = insertInfo.insertedId.toString();

    const band = await this.get(newId);
    return band;
},

//TODO make sure to test if this returns an empty array when doing error checking.
async getAll(){ 
  const bandCollection = await bands(); 
  const bandList = await bandCollection.find({}).toArray(); 
  if (!bandList) throw('Error: could not get list of all bands.')

  return bandList; 
},

// function to get band in the data by its id
async get(id){ 
    if (!id) throw 'An id must be provided.';
    if (typeof id !== 'string') throw 'The argument id must be a string.';
    if (id.trim().length === 0) throw 'Error; Id cannot be just spaces or an empty string.';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Object id is invalid.';
    // find way to test if band exists

    const bandCollection = await bands(); 

    const bandy = await bandCollection.findOne({_id: ObjectId(id)});
    if(bandy == null) throw 'Error: You must provide a valid Id.';
    
    return bandy; 
},

async remove(id){ 
  if (!id) throw 'An id must be provided.';
  if (typeof id !== 'string') throw 'The argument id must be a string.';
  if (id.trim().length === 0) throw 'Error: Id cannot be just spaces or an empty string.';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'Error: please use a valid id.';

  const bandCollection = await bands(); 
  const deleteBandInfo = bandCollection.deleteOne({_id: ObjectId(id)}); 
  if (deleteBandInfo.deletedCount === 0) {throw `Could not delete band with id of ${id}`;}

  return {deleted: true}; 
}, 

async rename(id, newName){ 
  if (!id) throw 'An id must be provided.';
  if (typeof id !== 'string') throw 'The argument id must be a string.';
  if (id.trim().length === 0) throw 'Error: Id cannot be just spaces or an empty string.';
  if (!ObjectId.isValid(id)) throw 'Error: You must enter a valid id.';
  if (!newName) throw 'An newName must be provided.';
  if (typeof newName !== 'string') throw 'The argument newName must be a string.';
  if (newName.trim().length === 0) throw 'Error: newName cannot be just spaces or an empty string.';
  if(newName == Object.name) throw 'Error: newName cannot be the same name as the band already there.';// test thsi
  

  const bandCollection = await bands(); 
  
  const updatedBand = {
    id: id, 
    name: newName
  };

  const updatedInfo = await bandCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updatedBand}
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'Error: Could not update band successfully, please use a valid Id';
  }
  
  return await this.get(id);
}

};


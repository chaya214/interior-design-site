const mongoose = require('mongoose');

// התחברות למסד
mongoose.connect('mongodb+srv://Shifra_efrat_chaya:8Wi2bPnpi9rsE4w7@cluster0.7y9rlcp.mongodb.net/Interior_design_inspiration_site?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("📦 Connected to MongoDB");
    return runUpdate();
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

const photoSchema = new mongoose.Schema({}, { strict: false });
const Photo = mongoose.model('Photo', photoSchema, 'photos'); // שם האוסף: photos

async function runUpdate() {
  try {
    const result = await Photo.updateMany(
      { category: { $exists: true } },
      [
        {
          $set: {
            room: "$category"
          }
        },
        {
          $unset: "category"
        }
      ]
    );

    console.log(`✅ Updated ${result.modifiedCount} documents`);
  } catch (err) {
    console.error("❌ Update error:", err);
  } finally {
    mongoose.disconnect();
  }
}

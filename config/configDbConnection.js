const mongoose = require("mongoose");
const config = require("config");

async function connectToDatabase() {
    try {
        const dbUri = config.get("MONGODB_URI");
        if (!dbUri) {
            throw new Error("MONGODB_URI is not defined in the configuration.");
        }

        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;

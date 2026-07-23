const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

async function getConnectionMongoDB() {

    try {

        await mongoose.connect(process.env.URL_CONNECTION_CLUSTER_MONGODB)

    } catch (error) {

        throw error

    }

}

module.exports = { getConnectionMongoDB }
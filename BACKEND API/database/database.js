require('dotenv').config();
module.exports = {
    connectDB: () =>{
        Mongoose.connect(process.env.MONGODB_URL)
        const dbConnection = Mongoose.connect();
        dbConnection.on('open', () => {
            console.log('database connected')
        })
        dbConnection.on('error', (err) => {
            console.log(err)
        })
    }
}
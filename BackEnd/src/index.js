import dotenv from "dotenv";
import connectDB from "./db/indexDB.js";
import app from "./app.js";


dotenv.config();

const port = process.env.PORT ;

// Start the Express server
connectDB()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Express server is running at PORT ${port}`);
       }
    )}
);
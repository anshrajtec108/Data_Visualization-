import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dashboardRouter from './routes/dashboard.router.js'
import chartRouter from './routes/charts.router.js'

const app = express();
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); 


app.use(cors({
    origin: '*',
    credentials: true // If you're using cookies or other credentials
}));
app.get('/test', (req, res) => {
   return res.json("Test")
});
app.use('/api/v1/dashboard', dashboardRouter)
app.use('/api/v1/charts', chartRouter)

export default app;
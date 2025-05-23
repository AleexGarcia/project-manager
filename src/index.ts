import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { projectRoutes } from "./routes/projectRoutes";
import { connectDB } from './db/conn';

const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);
app.use(authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`App em execução da porta ${PORT}\n\nhttp://localhost:${PORT}`));
})


import express from "express";

const app = express();
const PORT = 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(PORT,()=> console.log(`App em execução da porta ${PORT}\n\nhttp://localhost:${PORT}`));


import { app } from "./app";
import { parsedEnv } from "./configs";

const PORT = parsedEnv.API_PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

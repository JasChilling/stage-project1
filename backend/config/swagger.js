const swaggerUi=require("swagger-ui-express");
const swaggerSpec=require("./config/swagger");

app.use(
"/api/docs",
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);
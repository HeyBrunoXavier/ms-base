const { app } = require("./app");
const { viewRoutes } = require("./utils/ServiceRouter");

app.listen(process.env.PORT || 5000, () => {
    viewRoutes(app, process.env.PORT || 5000);
});

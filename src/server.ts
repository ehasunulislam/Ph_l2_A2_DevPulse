import app from "./app.js"
import config from "./config/index.config.js"
import initDB from "./db/index.db.js"

const main = () => {
    initDB()
    app.listen(config.port, ()=> {
        console.log(`server is running on port ${config.port}`);
        
    })
}

main()

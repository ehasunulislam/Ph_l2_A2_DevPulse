import app from "./app.js"
import config from "./config/index.config.js"

const main = () => {
    app.listen(config.port, ()=> {
        console.log(`server is running on port ${config.port}`);
        
    })
}

main()

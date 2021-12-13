# Frontend - samuelkrupik website

Live webite can be found at [samuelkrupik.samedia.sk](https://samuelkrupik.samedia.sk)

# Local installation

## Prerequisites
- Node Js
- NPM

Learn how to install [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Clone repository
``` bash
git clone https://github.com/samuelkrupik/samuelkrupik-front.git samuelkrupik
```
``` bash
cd samuelkrupik
```

### Project setup
``` bash
npm install
```

### Change backend environment variable
Since website uses external API, you need to assign its domain to operate properly.\ 
To do this open `.env.development` file and set `VUE_APP_BACKEND` to _`https://samuelkrupik-api.samedia.sk`_

### Compile and serve
``` bash
npm run serve
```

const yaml = require('js-yaml');
const fs = require('fs');

const Configuration = () => {
  let data = {
    SECRET: undefined,
    ENVIRONMENT : undefined,
    DATA: {
      MONGO_HOST: undefined
    },
    PORT: undefined,
    UPLOAD_DIR: undefined
  };
  try {
    let file = "";
    if(process.env.NODE_ENV){
      file = `./${process.env.NODE_ENV.trim()}.yaml`
    }else{
      file = './production.yaml'
    }

    if(fs.existsSync(file)){
      const fileContents = fs.readFileSync(file, 'utf8');
      data = yaml.safeLoad(fileContents);
    }
  } catch (e) {
    console.error("Não foi possível ler arquivo de configuração", e)
  }

  return data;
}

module.exports = Configuration();


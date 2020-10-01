const yaml = require('js-yaml');
const fs = require('fs');

const Configuration = () => {
  let data = {
    SECRET: "",
    ENVIRONMENT : "",
    DATA: {
      MONGO_HOST:""
    },
    PORT: "",
    UPLOAD_DIR: ""
  };
  try {
    const file = `./${process.env.NODE_ENV||"production"}.yaml`;
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


import sql from 'mssql';

const  config = {
  user: 'sa',
  password: 'MyPass@word',
  server:'127.0.0.1',
  database: 'ECommerce',
  port:1433,
  options:{
      instancename:'127.0.0.1',
      trustedconection:true,
      trustServerCertificate:true
  }
};

export class DBConnect {
  static async getDbConnection(){
    let connection  = await sql.connect(config);
    if(!connection.connected){
      console.log(`in If`);
      return false;
    }
    return true;
  }
}

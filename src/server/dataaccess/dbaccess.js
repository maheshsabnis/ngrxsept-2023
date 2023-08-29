import sql from 'mssql';
import { DBConnect } from './dbconnect.js';

export class DataAccess {
  async getProducts(){
    try {
     if(await DBConnect.getDbConnection()) {
        const result = await sql.query`select * from Customers`;
        console.log(result);
        return {
            data: result.recordset
        }
     } else {
        throw new Error("The Connection coud not be established");
     }
    }catch(ex){
        console.log(ex.message);
        return {
            message: ex.message
        }
    }
  }
  async getProductById(id){
    try {
     if(await DBConnect.getDbConnection()) {
        const result = await sql.query`select * from Customers where CustomerRecordId=${id}`;
        console.log(result);
        return {
            data: result.recordset
        }
     } else {
        throw new Error("The Connection coud not be established");
     }
    }catch(ex){
        console.log(ex.message);
        return {
            message: ex.message
        }
    }
  }
  async createProduct(customer){
    try {
     if(await DBConnect.getDbConnection()) {
        const result = await sql.query`insert into Customers (CustomerId,CustomerName, Address, City, State, EmailAddress, MobileNo) values (${customer.CustomerId},${customer.CustomerName},${customer.Address},${customer.City},${customer.State},${customer.EmailAddress},${parseInt(customer.MobileNo)});
        SELECT SCOPE_IDENTITY() AS insertedId;
        `;
        console.log(result);

        const insertedId = result.recordset[0].insertedId;

        console.log(`The Inserted Record ${insertedId}`);

        const insertedRecord = await sql.query(`Select * from Customers where CustomerRecordId=${insertedId}`);
        console.log(`New Reocrd ${insertedRecord.recordset[0]}`);
        return {
             record:insertedRecord.recordset[0]
        }
     } else {
        throw new Error("Insert faild The Connection coud not be established");
     }
    }catch(ex){
        console.log(ex.message);
        return {
            message: ex.message
        }
    }
  }
  async updateProduct(id,customer){
    console.log(`The Update in DBAccess ${JSON.stringify(customer)}`);
    try {
     if(await DBConnect.getDbConnection()) {
        const result = await sql.query`update Customers set CustomerId=${customer.CustomerId},CustomerName=${customer.CustomerName},Address=${customer.Address},City=${customer.City},State=${customer.State},EmailAddress=${customer.EmailAddress},MobileNo=${parseInt(customer.MobileNo)} where CustomerRecordId=${id}`;

        const updatedRecord = await sql.query(`Select * from Customers where CustomerRecordId=${id}`);
        console.log(`Updated record ${JSON.stringify(updatedRecord.recordset[0])}`);

        if(result.rowsAffected>0){
          return {
            record: updatedRecord.recordset[0]
          }
        }
        return {
            data: null
        }

     } else {
        throw new Error("Update failed The Connection coud not be established");
     }
    }catch(ex){
        console.log(ex.message);
        return {
            message: ex.message
        }
    }
  }
  async delteProduct(id){
    try {
     if(await DBConnect.getDbConnection()) {
        const result = await sql.query`delete Customers where CustomerRecordId=${id}`;
        console.log(result);
        if(result.rowsAffected>0) {
          return {
            deleted:true,
            id:id
          }
        }
        return {
            deleted: false
        }
     } else {
        throw new Error("Delete failed The Connection coud not be established");
     }
    }catch(ex){
        console.log(ex.message);
        return {
            message: ex.message
        }
    }
  }
}

import { DataAccess } from "./dataaccess/dbaccess.js";

export class DataInterface {
  constructor(){
    this.dbAccess = new DataAccess();
  }

  getRecords=async(req,resp)=>{
      const records = await this.dbAccess.getProducts();
      return resp.status(200).json({
        message: 'Data Read Successfully',
        record:records.data
      });
  }
  getRecordById=async (req,resp)=>{
    const record = await this.dbAccess.getProductById(parseInt(req.params.id));
    return resp.status(200).json({
      message: 'Data Read Successfully',
      record:record.data
    });
  }
  createRecord=async(req,resp)=>{
    const customer = {
      CustomerId:req.body.CustomerId,
      CustomerName:req.body.CustomerName,
      Address:req.body.Address,
      City:req.body.City,
      State:req.body.State,
      EmailAddress:req.body.EmailAddress,
      MobileNo:req.body.MobileNo
    };

    const record =  await this.dbAccess.createProduct(customer);
    console.log(`The Body 2 ${JSON.stringify(record)}`);
    return resp.status(200).json({
      message: 'Data Added Successfully',
      record:record.record
    });
  }
  updateRecord=async(req,resp)=>{
    const customer = {
      CustomerRecordId:req.body.CustomerRecordId,
      CustomerId:req.body.CustomerId,
      CustomerName:req.body.CustomerName,
      Address:req.body.Address,
      City:req.body.City,
      State:req.body.State,
      EmailAddress:req.body.EmailAddress,
      MobileNo:req.body.MobileNo
    };
    const record = await this.dbAccess.updateProduct(customer.CustomerRecordId,customer);
    return resp.status(200).json({
      message: 'Data Updated Successfully',
      record:record.record
    });
  }
  deleteRecord=async (req,resp)=>{
    const record = await this.dbAccess.delteProduct(parseInt(req.params.id));
    return resp.status(200).json({
      message: 'Data Deleted Successfully',
      record:record
    });
  }

}

import express from "express";
import cors from "cors"
import { DataInterface } from "./datainterface.js";
const dbinterface = new DataInterface();
const instance = express();

instance.use(express.urlencoded({extended:false}));
instance.use(express.json());
instance.use(cors({
  origin:"*",
  methods:"*",
  allowedHeaders:"*"
}));
instance.get('/api/customers',dbinterface.getRecords);
instance.get('/api/customers/:id', dbinterface.getRecordById);
instance.post('/api/customers',dbinterface.createRecord);
instance.put('/api/customers/:id',dbinterface.updateRecord);
instance.delete('/api/customers/:id',dbinterface.deleteRecord);

instance.listen(9080,()=>{
  console.log(`Server Started on port 9080`);
});




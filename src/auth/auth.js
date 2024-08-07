import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class Authentication{

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(conf.appwriteProjectId); 
         this.account = new Account(this.client);
    }
    async createAccount({name,email,password}){
        try{
           const newAccount = await this.account.create(ID.unique(),email,password);
           if(newAccount){
           return await this.login(email,password);
           } 
           else{
            return null;
           }
        } catch(error){
            throw error;
        }
     }
    async login({email,password}){
        try{
            await this.account.createEmailPasswordSession(email,password);
        } catch(error){
            throw error;
        }
     }
    async getAccount(){
        try{
            return await this.account.get();
        } catch(error){
            throw error;
        }
     }
    async logOut(){
        try{
            return await this.account.deleteSessions();
        } catch(error){
            throw error;
        }
     }

}

const Account = new Authentication();

export default Account;
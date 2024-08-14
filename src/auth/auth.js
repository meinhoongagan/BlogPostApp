import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class Authentication {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ name, email, password }) {
        try {
            const newAccount = await this.account.create(ID.unique(), email, password);
            if (newAccount) {
                return await this.login({ email, password });
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async getAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error('Error fetching account:', error);
            throw error;
        }
    }

    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
}

const auth = new Authentication();

export default auth;

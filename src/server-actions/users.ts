'use server';

import { currentUser } from "@clerk/nextjs/server";

import { connectToMongoDB } from "@/config/dbConnect";
import UserModel from "@/models/userModel";


connectToMongoDB();


export const storeAndGetCurrentLoggedInUserDetailsFromMongoDB = async () => {

    try {

        const userDetailsFromClerk = await currentUser();

        const isUserAlreadyExists = await UserModel.findOne({ clerkUserId: userDetailsFromClerk?.id });

        if(isUserAlreadyExists) {

            return {
                success: true,
                data: JSON.parse(JSON.stringify(isUserAlreadyExists))
            }

        }


        const fullname = `${userDetailsFromClerk?.firstName} ${userDetailsFromClerk?.lastName}`;

        const email = userDetailsFromClerk?.emailAddresses[0]?.emailAddress;
      
        const clerkUserId = userDetailsFromClerk?.id;
        

        const createNewUserInMongoDB = await UserModel.create({
            fullname: fullname,
            email: email,
            clerkUserId: clerkUserId
        });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(createNewUserInMongoDB))
        }

        
    } catch (error: any) {
        
        return {
            success: false,
            message: error?.message
        }

    }

}


export const updateIncomeExpenseOfUser = async ({ userId, payload } : { userId: string, payload: any }) => {

    try {

        const userIncomeExpenseUpdated = await UserModel.findByIdAndUpdate(userId, payload, { new: true });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(userIncomeExpenseUpdated))
        } 
        
    } catch (error: any) {

        console.log(error);
        
        
        return {
            success: false,
            message: error?.message
        }

    }

}
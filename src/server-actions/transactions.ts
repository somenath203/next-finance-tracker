'use server';

import { revalidatePath } from "next/cache";

import { connectToMongoDB } from "@/config/dbConnect";
import TransactionModel from "@/models/trransactionModel";
import { storeAndGetCurrentLoggedInUserDetailsFromMongoDB } from "./users";

connectToMongoDB();


export const AddNewTransaction = async (payload: any) => {

    try {

        await TransactionModel.create(payload);

        revalidatePath("/transactions");

        return {
            success: true,
            message: 'transaction has been created successfully'
        }
        
    } catch (error: any) {
        
        return {
            success: false,
            message: error?.message
        }

    }

}


export const getAllTransactions = async (searchParams: any) => {

    try {

        const currentLoggedInUser = await storeAndGetCurrentLoggedInUserDetailsFromMongoDB();

        let filtersToPass: any = {

            user: currentLoggedInUser?.data?._id 
        
        }

        if(searchParams?.type) {

            filtersToPass['type'] = searchParams?.type;

        }

        if(searchParams?.category) {

            filtersToPass['category'] = searchParams?.category;

        }

        if(searchParams?.fromDate && searchParams?.toDate) {

            filtersToPass["date"] = {
                $gte: searchParams?.fromDate,
                $lte: searchParams?.toDate
            }

        }

        let sortOrderToPass: any = {

            date: searchParams.sortOrder === "asc" ? 1 : -1

        }
        
        
        const allTransactions = await TransactionModel.find(filtersToPass).sort(sortOrderToPass);

        return {
            success: true,
            message: 'all transactions fetched successfully',
            data: JSON.parse(JSON.stringify(allTransactions))
        }
        
    } catch (error: any) {
        
        return {
            success: false,
            message: error?.message
        }

    }

}


export const EditParticularTransaction = async ({ transactionId, payload }: { transactionId: string, payload: any}) => {

    try {
        
        await TransactionModel.findByIdAndUpdate(transactionId, payload, { new: true });

        revalidatePath("/transactions");

        return {
            success: true,
            message: 'transaction has been updated successfully'
        }

    } catch (error: any) {
        
        return {
            success: false,
            message: error?.message
        }

    }

}


export const DeleteParticularTransaction = async (transactionId: string) => {

    try {

        await TransactionModel.findByIdAndDelete(transactionId);

        revalidatePath("/transactions");

        return {
          success: true,
          message: "Transaction deleted successfully",
        };

      } catch (error: any) {

        return {
          success: false,
          error: error.message,
        }

      }
}
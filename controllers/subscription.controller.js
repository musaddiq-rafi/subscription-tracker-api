import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";     

export const createSubscription =  async (req, res, next) => {
    try{
        const subscription = await Subscription.create(
            {
                ...req.body,
                user: req.user._id
            }
        );

        await workflowClient.trigger({
            url: `${SERVER_URL}`

        })

        res.status(201).json({
            success: true,
            data: subscription
        })
    }catch (error) {
        next(error);
    }

}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        if(req.user._id !== req.params.userId){
            const error = new Error('You are not the owner of this account');
            error.status= 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.userId });
        res.status(200).json({
            success: true,
            data: subscriptions
        })

    }catch (error) {
        next(error);
    }
}
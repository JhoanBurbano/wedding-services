import { Request, Response } from "express";
import Invite from "../models/invite.schema";
import { qrcodeGenerator } from "../utils";
import { environment } from "../config";

export async function getInvites(req: Request, res: Response) {
    try {
        const invites = await Invite.find()
        res.status(200).json([...invites]);
    } catch (error) {
        res.status(401).json({error})
    }
}

export async function getInvite(req: Request, res: Response) {
    try {
        const invite = await Invite.findById(req.params?.id)
        res.status(200).json(invite);
    } catch (error) {
        res.status(401).json({error})
    }
}

export async function addInvites(req: Request, res: Response) {
    try {
        const invite = new Invite({...req.body})
        await invite.save()
        const qr = await qrcodeGenerator(`${environment.CLIENT.WEB_APP_URL}${invite._id}`);
        console.log('qr', qr)
        res.json({message: 'invite has been add succesfully', qr})
    } catch (error) {
        res.status(401).json({error})
    }
}

export async function deleteInvites(req: Request, res: Response) {
    try {
        await Invite.findByIdAndDelete(req.params.id)
        res.json({message: 'invite has been deleted succesfully'})
    } catch (error) {
        res.status(401).json({error})
    }
}


export async function updateInvite(req: Request, res: Response) {
    try {
        const invite = await Invite.findByIdAndUpdate(req.params.id, {...req.body})
        res.json({message: 'invite has been updated succesfully', invite})
    } catch (error) {
        res.status(401).json({error})
    }
}
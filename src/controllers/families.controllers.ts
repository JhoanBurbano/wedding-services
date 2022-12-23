import { Request, Response } from "express";
import Family from '../models/families.schema'
import Invite from '../models/invite.schema'
import { qrcodeGenerator, csvGenerator } from "../utils";
import { deleteFile } from "../s3";

export async function createFamily(req: Request, res:Response) {
    try {
        const family = new Family({...req.body})
        family.qrcode = await qrcodeGenerator(family._id.toString()) as string
        await family.save()
        res.json({message: 'family has been create'})
    } catch (error) {
        res.status(400).json({error})
    }
}

export async function addMember(req: Request, res:Response) {
    try {
        const invite = new Invite({...req.body})
        await invite.save()
        let family = await Family.updateOne({_id: req.params.familyId}, {$push:{integrants: invite._id}, $inc:{total:1}});
        res.json({family})
        
    } catch (error) {
        res.status(400).json({error})
    }
}
 

export async function removeMember(req: Request, res:Response) {
    try {
        const inviteId = await Invite.findByIdAndDelete(req.params.inviteId)
        let family = await Family.updateOne({_id: req.params.familyId}, {$pull:{integrants: inviteId?._id}, $inc:{total:-1}});
        res.json({family})
        
    } catch (error) {
        res.status(400).json({error})
    }
}

export async function getFamilies (req:Request, res: Response){
try {
    const families = await Family.find().populate('integrants')
    res.json([...families])
    
} catch (error) {
    res.status(400).json({error})
}
}

export async function getFamily (req:Request, res: Response){
try {
    const family = await Family.findById(req.params.id).populate('integrants') 
    res.json({family})
} catch (error) {
    res.status(400).json({error})
}
}

export async function deleteFamilies (req:Request, res: Response){
try {
    const family = await Family.findByIdAndDelete(req.params.id)
    await deleteFile(req.params.id)
    console.log('req.params.familyId', family)

    res.json({message: 'family has been deleted', family})
} catch (error) {
    res.status(400).json({error})
}
}

export async function updateFamily  (req:Request, res: Response){
try {
    const family = await Family.findByIdAndUpdate(req.params.id, {...req.body})
    res.json({message: 'family has been deleted', family})
    
} catch (error) {
    res.status(400).json({error})
}
}


export async function generateCSV(req: Request, res: Response) {
    try {
        const families = await Family.find({},{integrants:0, confirm:0})
        const fields = csvGenerator(families)
        res.json(fields)
    } catch (error) {
        res.status(402).json({error})
    }
}
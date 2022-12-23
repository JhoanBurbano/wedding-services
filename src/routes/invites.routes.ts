import { Router } from "express";
import { addInvites, getInvites, getInvite, deleteInvites, updateInvite } from '../controllers/index'

export const router = Router()

router.get('/invites', getInvites)
router.get('/invites/:id', getInvite)
router.post('/invites', addInvites)
router.put('/invites/:id', updateInvite)
router.delete('/invites/:id', deleteInvites)
import express from 'express';
import {
  getTeamMembers,
  createTeamMember,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTeamMembers);
router.post('/', authMiddleware, createTeamMember);
router.get('/:id', getTeamMemberById);
router.put('/:id', authMiddleware, updateTeamMember);
router.delete('/:id', authMiddleware, deleteTeamMember);

export default router;

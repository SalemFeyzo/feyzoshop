import express from 'express'
import {
  authUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { onlyAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, onlyAdmin, getAllUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, onlyAdmin, deleteUser)
  .get(protect, onlyAdmin, getSingleUser)
  .put(protect, onlyAdmin, updateUser)

export default router

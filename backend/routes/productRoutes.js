import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createReview,
  getTopRatedProducts,
} from '../controllers/productController.js'
import { protect, onlyAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, onlyAdmin, createProduct)
router.route('/top').get(getTopRatedProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, onlyAdmin, deleteProduct)
  .put(protect, onlyAdmin, updateProduct)
router.route('/:id/reviews').post(protect, createReview)

export default router

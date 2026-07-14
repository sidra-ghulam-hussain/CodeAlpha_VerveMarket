import { Router } from 'express';
import crypto from 'crypto';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function generateTrackingCode() {
  return `VM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

// POST /api/orders — place an order from a cart payload
router.post('/', requireAuth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    const resolvedItems = [];
    let itemsTotal = 0;

    for (const line of items) {
      const product = await Product.findById(line.productId);
      if (!product) {
        return res.status(404).json({ message: `A product in your cart is no longer available.` });
      }
      if (product.stock < line.quantity) {
        return res.status(409).json({ message: `Only ${product.stock} left of "${product.name}".` });
      }

      resolvedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: line.quantity
      });
      itemsTotal += product.price * line.quantity;

      product.stock -= line.quantity;
      await product.save();
    }

    const shippingFee = itemsTotal >= 75 ? 0 : 6.5;
    const grandTotal = Number((itemsTotal + shippingFee).toFixed(2));

    const order = await Order.create({
      user: req.user._id,
      items: resolvedItems,
      shippingAddress,
      itemsTotal: Number(itemsTotal.toFixed(2)),
      shippingFee,
      grandTotal,
      trackingCode: generateTrackingCode()
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Could not place your order.', error: err.message });
  }
});

router.get('/mine', requireAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
});

router.get('/:id', requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || String(order.user) !== String(req.user._id)) {
    return res.status(404).json({ message: 'Order not found.' });
  }
  res.json({ order });
});

export default router;

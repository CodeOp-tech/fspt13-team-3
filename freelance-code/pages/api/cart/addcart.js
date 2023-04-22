export default function AddToCart(req, res) {
    const { itemId, quantity } = req.body;
    

    res.status(200).json({ success: true });
  }
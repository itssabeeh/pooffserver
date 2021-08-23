const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Dmessage = require('../models/Dmessage');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { userId, expireAt, dismessage } = req.body;
    const dmessage = await Dmessage.create({
      userId,
      dismessage,
      expireAt,
    });
    if (dmessage) {
      res.status(201).json({
        dId: dmessage._id,
        dismessage: dmessage.dismessage,
      });
    } else {
      res.status(400);
      throw new Error('Error occured');
    }
  })
);

router.post(
  '/content',
  asyncHandler(async (req, res) => {
    const { dId } = req.body;
    const dmessage = await Dmessage.findOne({ _id: dId });
    if (dmessage) {
      res.json({
        dId: dmessage._id,
        dismessage: dmessage.dismessage,
        expireAt: dmessage.expireAt,
      });
    } else {
      res.status(400);
      throw new Error('Error occured');
    }
  })
);
router.get(
  '/getAll/:id',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const messageList = await Dmessage.find({ userId });
    if (messageList) {
      res.json({ messageList });
    } else {
      res.status(400);
      throw new Error('failed to find');
    }
  })
);

module.exports = router;

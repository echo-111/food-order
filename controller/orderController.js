const { findTopThree } = require('../lib/helper');
const { Order, Dish } = require('../model');

exports.newOrder = async (req, res, next) => {
  const { orderItems, totalPrice } = req.body;

  const order = await Order.create({
    orderItems,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0;
  const dishesArray = [];
  const topDishes = [];

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
    dishesArray.push(...order.cartItems.map((item) => item.name));
  });

  await Promise.all(
    findTopThree(dishesArray).map(async (dish) => {
      const { dishes } = await Dish.findOne(
        { 'dishes.name': dish.dishName },
        { categories: 1, 'dishes.$': 1 },
      );

      topDishes.push(dishes[0]);
    }),
  );

  res.status(200).json({
    totalAmount,
    topDishes,
    orders,
  });
};

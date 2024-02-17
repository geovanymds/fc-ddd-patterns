import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {

    try {

      await OrderModel.sequelize.transaction(async ()=> {
    
        const order = await OrderModel.findOne({
          where: {
            id: entity.id
          }, 
          include: ["items"]
        });
    
        if(!order) {
          throw new Error("Order not found")
        }
    
        await OrderItemModel.bulkCreate(entity.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id
          }
        }), {updateOnDuplicate: ["id","name", "price", "product_id", "quantity", "order_id"]});
    
        await OrderModel.update({
          total: entity.total()
        }, {
          where: {
            id: entity.id
          }
        });
    
      });
      
    } catch (error) {
      throw error
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items", "customer"],
        rejectOnEmpty: true,
      });

      const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
      const order = new Order(orderModel.id, orderModel.customer.id, orderItems);
      return order;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Order not found");
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({include: ["items", "customer"]});

    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
      const order = new Order(orderModel.id, orderModel.customer.id, orderItems);
      return order;
    });

    return orders;
  }
}

class OrderModel {
  final String id;
  final int orderNumber;
  final DateTime expectedDeliveryDate;
  final dynamic customer;
  final dynamic deliveryAddress;
  final dynamic items;
  final DateTime createdAt;

  OrderModel(
    this.id,
    this.orderNumber,
    this.expectedDeliveryDate,
    this.customer,
    this.deliveryAddress,
    this.items,
    this.createdAt,
  );
}

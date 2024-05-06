class OrderRouter {
  final String getOrders = "/order";
  final String getOrdersByFilter = "/order/filter";
  String getOrderById(String id) => "/order/$id";
  final String createOrder = "/order";
  String updateOrder(String id) => "/order/$id";
  String deleteOrder(String id) => "/order/$id";
}

class UserRouter {
  final String getUsers = "/user";
  final String getUsersByFilter = "/user/filter";
  String getUserById(String id) => "/user/$id";
  final String createUser = "/user";
  String updateUser(String id) => "/user/$id";
  String deleteUser(String id) => "/user/$id";
}

class ApiNaPortaRouter {
  static const String login = "/login";

  static final OrderRouter order = OrderRouter();
  static final UserRouter user = UserRouter();
}

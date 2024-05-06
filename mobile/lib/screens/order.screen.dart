import 'package:app_naporta/apis/api.naporta/api.naporta.factory.dart';
import 'package:app_naporta/apis/api.naporta/api.naporta.router.dart';
import 'package:app_naporta/models/order.model.dart';
import 'package:app_naporta/screen.models/order.screen.model.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class OrderScreen extends State<OrderScreenModel> {
  @override
  void initState() {
    super.initState();

    fetchOrders();
  }

  Future<void> fetchOrders() async {
    final response = await ApiNaPortaFactory.get<List<dynamic>>(
      ApiNaPortaRouter.order.getOrders,
      queryParameters: {"page": "1", "quantity": "5"},
    );

    if (!response.success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Falha ao buscar pedidos. Código: ${response.message}'),
        ),
      );

      return;
    }

    setState(() {
      widget.orders = response.content!
          .map(
            (map) => OrderModel(
              map['id'],
              map['orderNumber'],
              DateTime.parse(map['expectedDeliveryDate']),
              map['customer'],
              map['deliveryAddress'],
              map['items'],
              DateTime.parse(map['createdAt']),
            ),
          )
          .toList();
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(children: <Widget>[
        Container(
          height: 120,
          color: Colors.orangeAccent[200],
          padding: const EdgeInsets.symmetric(
            vertical: 40.0,
            horizontal: 20.0,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Icon(
                Icons.inventory,
                color: Colors.white,
                size: 40,
              ),
              Text(
                widget.title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              ElevatedButton(
                child: const Text('Novo pedido'),
                onPressed: () => widget.updateScreen("OrderCreate"),
              ),
            ],
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                ListView.builder(
                  shrinkWrap: true,
                  itemCount: widget.orders.length,
                  itemBuilder: (context, index) {
                    final order = widget.orders[index];

                    final day =
                        DateFormat('dd/MM').format(order.expectedDeliveryDate);

                    final hour =
                        DateFormat('HH:mm').format(order.expectedDeliveryDate);

                    return Container(
                      color: Colors.white,
                      padding: const EdgeInsets.all(10.0),
                      margin: const EdgeInsets.only(bottom: 20.0),
                      child: ListTile(
                        title: Text(
                          'Pedido ID: ${order.id.substring(19, 24)}',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Text(
                          'Previsão de entrega em $day às $hour',
                          style: const TextStyle(fontSize: 14),
                        ),
                        trailing: const Icon(Icons.arrow_forward),
                        onTap: () => widget.updateScreen("OrderDetail"),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ]),
    );
  }
}

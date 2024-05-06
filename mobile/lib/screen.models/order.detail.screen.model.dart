import 'package:app_naporta/screens/order.detail.screen.dart';
import 'package:flutter/material.dart';

class OrderDetailScreenModel extends StatefulWidget {
  final void Function(String) updateScreen;

  const OrderDetailScreenModel({super.key, required Function(String) this.updateScreen});

  final String title = "Pedido - Detalhes";

  @override
  State<OrderDetailScreenModel> createState() => OrderDetailScreen();
}

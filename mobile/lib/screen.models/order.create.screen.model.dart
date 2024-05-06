import 'package:app_naporta/screens/order.create.screen.dart';
import 'package:flutter/material.dart';

class OrderCreateScreenModel extends StatefulWidget {
  final void Function(String) updateScreen;

  const OrderCreateScreenModel({super.key, required Function(String) this.updateScreen});

  final String title = "Pedido - Cadastro";

  @override
  State<OrderCreateScreenModel> createState() => OrderCreateScreen();
}

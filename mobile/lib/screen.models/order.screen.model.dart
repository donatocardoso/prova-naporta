import 'package:app_naporta/models/order.model.dart';
import 'package:app_naporta/screens/order.screen.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class OrderScreenModel extends StatefulWidget {
  final void Function(String) updateScreen;

  OrderScreenModel({super.key, required Function(String) this.updateScreen});

  final String title = "Pedidos";

  late List<OrderModel> orders = [];

  @override
  State<OrderScreenModel> createState() => OrderScreen();
}

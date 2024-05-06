import 'package:app_naporta/screens/delivery.screen.dart';
import 'package:flutter/material.dart';

class DeliveryScreenModel extends StatefulWidget {
  final void Function(String) updateScreen;

  const DeliveryScreenModel({super.key, required Function(String) this.updateScreen});

  final String title = "Entregas";

  @override
  State<DeliveryScreenModel> createState() => DeliveryScreen();
}

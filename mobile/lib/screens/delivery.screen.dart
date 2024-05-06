import 'package:app_naporta/screen.models/delivery.screen.model.dart';
import 'package:flutter/material.dart';

class DeliveryScreen extends State<DeliveryScreenModel> {
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
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
            scrollDirection: Axis.vertical,
            padding: const EdgeInsets.all(20.0),
            child: Column(
              children: [
                Text(
                  widget.title,
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

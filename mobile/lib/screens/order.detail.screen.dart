import 'package:app_naporta/screen.models/order.detail.screen.model.dart';
import 'package:flutter/material.dart';

class OrderDetailScreen extends State<OrderDetailScreenModel> {
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
    return Center(
      child: Column(
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
                GestureDetector(
                  onTap: () => widget.updateScreen("Order"),
                  child: const Icon(
                    Icons.close,
                    color: Colors.white,
                    size: 25,
                  ),
                ),
                Text(
                  widget.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const Icon(
                  Icons.inventory,
                  color: Colors.white,
                  size: 40,
                ),
              ],
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            child: Text(
              widget.title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

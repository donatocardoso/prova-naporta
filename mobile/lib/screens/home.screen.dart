import 'package:app_naporta/screen.models/delivery.screen.model.dart';
import 'package:app_naporta/screen.models/home.screen.model.dart';
import 'package:app_naporta/screen.models/order.create.screen.model.dart';
import 'package:app_naporta/screen.models/order.detail.screen.model.dart';
import 'package:app_naporta/screen.models/order.screen.model.dart';
import 'package:app_naporta/screen.models/user.screen.model.dart';
import 'package:flutter/material.dart';

class HomeScreen extends State<HomeScreenModel> {
  late int _selectedIndex = 1;
  late String _selectedKey = "Order";

  late Map<String, Widget> pages = {
    //--------------- NÃO ALETARAR A ORDEM ABAIXO ---------------//
    "Delivery": DeliveryScreenModel(updateScreen: updateScreen),
    "Order": OrderScreenModel(updateScreen: updateScreen),
    "Profile": const ProfileScreenModel(),
    //--------------- NÃO ALETARAR A ORDEM ACIMA ---------------//
    "OrderCreate": OrderCreateScreenModel(updateScreen: updateScreen),
    "OrderDetail": OrderDetailScreenModel(updateScreen: updateScreen),
  };

  @override
  void initState() {
    super.initState();
  }

  void updateScreen(String key) {
    setState(() {
      _selectedKey = key;
    });
  }

  void onItemTapped(int index) {
    List<String> keys = pages.keys.toList();

    setState(() {
      _selectedIndex = index;
      _selectedKey = keys[index];
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        color: Colors.grey[200],
        child: pages[_selectedKey],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: onItemTapped,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.inventory_2),
            label: 'Entregas',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.list_alt),
            label: 'Pedidos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}

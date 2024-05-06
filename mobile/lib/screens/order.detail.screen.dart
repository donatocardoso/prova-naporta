import 'package:app_naporta/apis/api.naporta/api.naporta.factory.dart';
import 'package:app_naporta/apis/api.naporta/api.naporta.router.dart';
import 'package:app_naporta/screen.models/order.detail.screen.model.dart';
import 'package:flutter/material.dart';

class OrderDetailScreen extends State<OrderDetailScreenModel> {
  late TextEditingController nameController;
  late TextEditingController cpfController;
  late TextEditingController rgController;
  late TextEditingController birthDateController;
  late TextEditingController cellphoneController;
  late TextEditingController emailController;

  late TextEditingController zipcodeController;
  late TextEditingController addressController;
  late TextEditingController numberController;
  late TextEditingController complementController;
  late TextEditingController neighborhoodController;
  late TextEditingController cityController;
  late TextEditingController districtController;

  late TextEditingController descriptionController;
  late TextEditingController prizeController;

  @override
  void initState() {
    super.initState();

    nameController = TextEditingController();
    cpfController = TextEditingController();
    rgController = TextEditingController();
    birthDateController = TextEditingController();
    cellphoneController = TextEditingController();
    emailController = TextEditingController();

    zipcodeController = TextEditingController();
    addressController = TextEditingController();
    numberController = TextEditingController();
    complementController = TextEditingController();
    neighborhoodController = TextEditingController();
    cityController = TextEditingController();
    districtController = TextEditingController();

    descriptionController = TextEditingController();
    prizeController = TextEditingController();
  }

  @override
  void dispose() {
    nameController.dispose();
    cpfController.dispose();
    rgController.dispose();
    birthDateController.dispose();
    cellphoneController.dispose();
    emailController.dispose();

    super.dispose();
  }

  Future<void> getOrder() async {
    final response = await ApiNaPortaFactory.get(
      ApiNaPortaRouter.order.getOrderById(""),
    );

    if (response.success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Form submitted successfully')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to submit form')),
      );
    }
  }

  Future<void> submitForm() async {
    final response = await ApiNaPortaFactory.put(
      ApiNaPortaRouter.order.updateOrder(""),
      body: {},
    );

    if (response.success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Form submitted successfully')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to submit form')),
      );
    }
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
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.all(20.0),
                    margin: const EdgeInsets.only(bottom: 20.0),
                    color: Colors.white,
                    child: Column(
                      children: [
                        const Text(
                          "Dados do Cliente",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: nameController,
                          decoration: const InputDecoration(
                            labelText: 'Nome completo',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.number,
                          controller: cpfController,
                          decoration: const InputDecoration(
                            labelText: 'CPF',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.number,
                          controller: rgController,
                          decoration: const InputDecoration(
                            labelText: 'Login',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.datetime,
                          controller: birthDateController,
                          decoration: const InputDecoration(
                            labelText: 'Data de nascimento',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.number,
                          controller: cellphoneController,
                          decoration: const InputDecoration(
                            labelText: 'Celular',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: emailController,
                          decoration: const InputDecoration(
                            labelText: 'Email',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.all(20.0),
                    margin: const EdgeInsets.only(bottom: 20.0),
                    color: Colors.white,
                    child: Column(
                      children: [
                        const Text(
                          "Endereço",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: zipcodeController,
                          decoration: const InputDecoration(
                            labelText: 'CEP',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: addressController,
                          decoration: const InputDecoration(
                            labelText: 'Logradouro',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: numberController,
                          decoration: const InputDecoration(
                            labelText: 'Número',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: complementController,
                          decoration: const InputDecoration(
                            labelText: 'Complemento',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: neighborhoodController,
                          decoration: const InputDecoration(
                            labelText: 'Bairro',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: cityController,
                          decoration: const InputDecoration(
                            labelText: 'Cidade',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: districtController,
                          decoration: const InputDecoration(
                            labelText: 'Estado',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.all(20.0),
                    margin: const EdgeInsets.only(bottom: 20.0),
                    color: Colors.white,
                    child: Column(
                      children: [
                        const Text(
                          "Items",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.text,
                          controller: descriptionController,
                          decoration: const InputDecoration(
                            labelText: 'Descrição',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 20.0),
                        TextFormField(
                          keyboardType: TextInputType.number,
                          controller: prizeController,
                          decoration: const InputDecoration(
                            labelText: 'CPF',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.all(20.0),
                    color: Colors.white,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                          ),
                          onPressed: submitForm,
                          child: const Text(
                            'Salvar',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:app_naporta/apis/api.naporta/api.naporta.factory.dart';
import 'package:app_naporta/apis/api.naporta/api.naporta.router.dart';
import 'package:app_naporta/screen.models/user.screen.model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ProfileScreen extends State<ProfileScreenModel> {
  final storage = const FlutterSecureStorage();
  final _formKey = GlobalKey<FormState>();

  late TextEditingController nameController;
  late TextEditingController descriptionController;
  late TextEditingController loginController;

  @override
  void initState() {
    super.initState();

    nameController = TextEditingController();
    descriptionController = TextEditingController();
    loginController = TextEditingController();

    fetchData();
  }

  Future<void> fetchData() async {
    final String usrId = (await storage.read(key: 'usr_id')) ?? '';

    final response = await ApiNaPortaFactory.get<Map>(
      ApiNaPortaRouter.user.getUserById(usrId),
      queryParameters: {"login": usrId},
    );

    if (!response.success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content:
              Text('Falha ao buscar o usuário. Código: ${response.message}'),
        ),
      );

      return;
    }

    nameController.text = response.content!["name"];
    descriptionController.text = response.content!["description"];
    loginController.text = response.content!["login"];
  }

  @override
  void dispose() {
    nameController.dispose();
    descriptionController.dispose();
    loginController.dispose();

    super.dispose();
  }

  Future<void> submitForm() async {
    if (_formKey.currentState!.validate()) {
      final response = await ApiNaPortaFactory.post(
        ApiNaPortaRouter.user.createUser,
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
              vertical: 50.0,
              horizontal: 20.0,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  widget.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              padding: const EdgeInsets.all(20.0),
              child: Container(
                padding: const EdgeInsets.all(20.0),
                color: Colors.white,
                child: Column(
                  children: [
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
                      controller: loginController,
                      decoration: const InputDecoration(
                        labelText: 'Login',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 30.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        ElevatedButton(
                          onPressed: submitForm,
                          child: const Text('Alterar Senha'),
                        ),
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
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

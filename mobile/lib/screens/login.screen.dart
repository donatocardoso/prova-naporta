import 'package:app_naporta/screen.models/login.screen.model.dart';
import 'package:flutter/material.dart';

class LoginScreen extends State<LoginScreenModel> {
  late TextEditingController loginController;
  late TextEditingController passwordController;

  @override
  void initState() {
    super.initState();

    loginController = TextEditingController(text: "dev_donato");
    passwordController = TextEditingController(text: "0Fsd0Ynq2Z");
  }

  Future authenticate() async {
    final String username = loginController.text;
    final String password = passwordController.text;

    final authenticated = await widget.authenticate(username, password);

    if (!authenticated) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Usuário e/ou senha incorretos!')),
      );

      return;
    }

    Navigator.pushNamed(context, '/home');
  }

  @override
  void dispose() {
    loginController.dispose();
    passwordController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.orangeAccent[200],
      appBar: AppBar(
        title: const Text('NaPorta - Login'),
      ),
      body: Center(
        child: Container(
          width: 350,
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: <Widget>[
              const SizedBox(height: 150.0),
              const Icon(
                Icons.inventory,
                color: Colors.white,
                size: 50,
              ),
              const SizedBox(height: 150.0),
              Form(
                child: Column(
                  children: [
                    TextField(
                      controller: loginController,
                      style: const TextStyle(
                        height: 3.0,
                        color: Colors.white,
                      ),
                      decoration: const InputDecoration(
                        labelText: 'Usuário',
                        labelStyle: TextStyle(color: Colors.white),
                        border: UnderlineInputBorder(
                          borderSide:
                              BorderSide(color: Colors.white, width: 2.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20.0),
                    TextField(
                      controller: passwordController,
                      obscureText: true,
                      style: const TextStyle(
                        height: 3.0,
                        color: Colors.white,
                      ),
                      decoration: const InputDecoration(
                        labelText: 'Senha',
                        labelStyle: TextStyle(color: Colors.white),
                        border: UnderlineInputBorder(
                          borderSide:
                              BorderSide(color: Colors.white, width: 2.0),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20.0),
                    ElevatedButton(
                      onPressed: authenticate,
                      child: const Text('Login'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

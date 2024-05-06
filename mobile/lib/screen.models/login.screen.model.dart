import 'package:app_naporta/apis/api.naporta/api.naporta.factory.dart';
import 'package:app_naporta/apis/api.naporta/api.naporta.router.dart';
import 'package:app_naporta/screens/login.screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LoginScreenModel extends StatefulWidget {
  final storage = const FlutterSecureStorage();

  const LoginScreenModel({super.key});

  @override
  State<LoginScreenModel> createState() => LoginScreen();

  Future<bool> authenticate(String username, String password) async {
    final response = await ApiNaPortaFactory.post<Map>(
      ApiNaPortaRouter.login,
      body: {
        "login": username,
        "password": password,
      },
    );

    if (response.success && response.content != null) {
      await storage.write(key: 'usr_login', value: username);

      await storage.write(
          key: 'usr_id', value: response.content!["id"].toString());

      await storage.write(
          key: 'jwt_token', value: response.content!["token"].toString());
    }

    return response.success;
  }
}

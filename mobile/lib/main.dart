import 'package:app_naporta/screen.models/home.screen.model.dart';
import 'package:app_naporta/screen.models/login.screen.model.dart';
import 'package:flutter/material.dart';

void main() async {
  //await dotenv.load(fileName: "../.env");

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NaPorta - seu app de entregas',
      restorationScopeId: "dev",
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orangeAccent),
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginScreenModel(),
        '/home': (context) => HomeScreenModel(),
      },
    );
  }
}

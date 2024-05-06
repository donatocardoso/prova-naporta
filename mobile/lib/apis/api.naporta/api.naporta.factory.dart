import 'dart:convert';

import 'package:app_naporta/configs/responser.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class ApiNaPortaFactory {
  static const storage = FlutterSecureStorage();

  //static final String _baseUrl = dotenv.env['API_NAPORTA_URL'] ?? "";
  static const String _baseUrl = "192.168.100.3:3000";

  static Future<Map<String, String>> getHeaders(
      {Map<String, String>? headers}) async {
    String token = (await storage.read(key: 'jwt_token')) ?? '';

    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token.isNotEmpty ? 'Bearer $token' : '',
      ...(headers ?? {})
    };
  }

  static Future<Reaction<T>> get<T>(String url,
      {Map<String, String>? headers,
      Map<String, dynamic>? queryParameters}) async {
    final response = await http.get(
      Uri.http(_baseUrl, url, queryParameters),
      headers: await getHeaders(),
    );

    if (response.statusCode != 200) {
      return Responser.fail<T>(response.reasonPhrase ?? response.body);
    }

    Map jsonMap = json.decode(response.body);

    return Responser.success<T>(jsonMap['message'], jsonMap['content']);
  }

  static Future<Reaction<T>> post<T>(String url,
      {Map<String, String>? headers, dynamic body}) async {
    final response = await http.post(
      Uri.http(_baseUrl, url),
      headers: await getHeaders(),
      body: json.encode(body),
    );

    if (response.statusCode != 200) {
      return Responser.fail<T>(response.reasonPhrase ?? response.body);
    }

    Map jsonMap = json.decode(response.body);

    return Responser.success<T>(jsonMap['message'], jsonMap['content']);
  }

  static Future<Reaction<T>> put<T>(String url,
      {Map<String, String>? headers, dynamic body}) async {
    final response = await http.put(
      Uri.http(_baseUrl, url),
      headers: await getHeaders(),
      body: json.encode(body),
    );

    if (response.statusCode != 200) {
      return Responser.fail<T>(response.reasonPhrase ?? response.body);
    }

    Map jsonMap = json.decode(response.body);

    return Responser.success<T>(jsonMap['message'], jsonMap['content']);
  }

  static Future<Reaction<T>> delete<T>(String url,
      {Map<String, String>? headers}) async {
    final response = await http.delete(
      Uri.http(_baseUrl, url),
      headers: await getHeaders(),
    );

    if (response.statusCode != 200) {
      return Responser.fail<T>(response.reasonPhrase ?? response.body);
    }

    Map jsonMap = json.decode(response.body);

    return Responser.success<T>(jsonMap['message'], jsonMap['content']);
  }
}

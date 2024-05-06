class UserModel {
  late String id;
  late String name;
  late String description;
  late String login;
  late String password;
  late bool active;
  late DateTime createdAt;

  UserModel(this.name, this.description, this.login, this.password);
}

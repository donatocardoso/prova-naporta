class Reaction<T> {
  late bool success;
  late String message;
  late T? content;

  Reaction(this.success, this.message, [this.content]);
}

class Responser {
  static Reaction<T> success<T>(String message, T content) {
    return Reaction<T>(true, message, content);
  }

  static Reaction<T> fail<T>(String message) {
    return Reaction<T>(false, message);
  }
}

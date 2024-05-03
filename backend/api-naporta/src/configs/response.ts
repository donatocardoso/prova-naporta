export type Reaction<T> = {
  success: boolean;
  message: string;
  content?: T;
};

export class Responser {
  static Success<T>(message: string, content: T): Reaction<T> {
    return {
      success: true,
      message,
      content,
    };
  }

  static Fail<T>(message: string): Reaction<T> {
    return {
      success: false,
      message,
    };
  }
}

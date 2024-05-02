export type Response<T> = {
  success: boolean;
  message: string;
  content?: T;
};

export class Responser {
  static Success<T>(message: string, content: T): Response<T> {
    return {
      success: true,
      message,
      content,
    };
  }

  static Fail<T>(message: string): Response<T> {
    return {
      success: false,
      message,
    };
  }
}

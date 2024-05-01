export type Retorno<T> = {
  sucesso: boolean;
  mensagem: string;
  conteudo?: T;
};

export class Retorna {
  static Sucesso<T>(mensagem: string, conteudo: T): Retorno<T> {
    return {
      sucesso: true,
      mensagem,
      conteudo,
    };
  }

  static Falha<T>(mensagem: string): Retorno<T> {
    return {
      sucesso: false,
      mensagem,
    };
  }
}

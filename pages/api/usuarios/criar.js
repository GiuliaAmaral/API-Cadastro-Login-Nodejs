import NextCors from 'nextjs-cors';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Usuario from '../../../colecoes/usuario';
import conectarBancoDados from '../../../funcoes/conectarBandoDados';
import respostaApi from '../../../funcoes/respostaApi';
import replaceAll from '../../../funcoes/replaceAll';

export default async function apiUsuarioCriar(req, res) {
  let method = 'POST'

  if (res !== null) {
    await NextCors(req, res, {
      methods: ['HEAD', 'OPTIONS', method],
      origin: '*',
      optionsSuccessStatus: 200,
    });
  }



  if (req?.method === method) {
    try {
      let body = req.body;
      let dados = body?.dados;
      let condicoes = body?.condicoes;

      if (!dados) {
        throw new Error(`ValidationError: Você não informou nenhum dado.`);
      }
      if (dados?.senha) {
        dados.senha = bcryptjs.hashSync(dados.senha, bcryptjs.genSaltSync(10));
      }


      await conectarBancoDados();
      let resBancoDeDados = await Usuario.create(dados);
      let dadosToken = { id: String(resBancoDeDados?._id) }
      let token = jwt.sign(dadosToken, String(process.env.JWT_CHAVE_PRIVADA_TOKEN_USUARIO), { expiresIn: '7d' });

      return respostaApi(res, 200, "OK", "Dados criados e listados na resposta.", {token, ...resBancoDeDados._doc});



    } catch (error) {
      if (String(error).includes(`email_1 dup key`)) {
        return respostaApi(res, 400, "ERRO", "Endereço de email já cadastrado.", String(error));
      }
      if (String(error).includes(`ValidationError:`)) {
        return respostaApi(res, 400, "ERRO", replaceAll((String(error).replace("ValidationError: ", "")), ":", ""), String(error));
      }


      console.error(error);
      return respostaApi(res, 500, "ERRO", "Tivemos um problema tente novamente mais tarde, caso persistir contate nossa equipe de atendimento via email.", String(error));
    }
  } else {
    return respostaApi(res, 404, "ERRO", "404 endpoint não existe.", "");
  }
}
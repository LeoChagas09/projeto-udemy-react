import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthResquest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password } : AuthResquest){
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      }
    })

    if(!user) {
      throw new Error('Usuário/Senha está incorreto!');
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error('Usuário/Senha está incorreto!');
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    }
  }
}

export { AuthUserService };
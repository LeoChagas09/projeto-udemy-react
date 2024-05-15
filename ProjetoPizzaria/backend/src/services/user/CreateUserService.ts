import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest){

    if(!email){
      throw new Error("Email incorreto");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      }
    })

    if(userAlreadyExists) {
      throw new Error("Usuário já existente");
    }

    const passwordHas = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHas,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user;

  }
}

export { CreateUserService };
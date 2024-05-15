import { Request, Response } from 'express';
import { ListByCategoryService } from '../../services/product/ListByCategoryService';


class ListByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id  = req.query.category_id as string;

    const listByCategoryService = new ListByCategoryService();

    const category = await listByCategoryService.execute({category_id});

    return res.json(category);
  }
}

export { ListByCategoryController };





import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { CreatePurchaseDTO } from '../../domain/dtos/purchases/create-purchase.dto';
import { PurchaseService } from '../services/purchase.service';

export class PurchaseController {

  constructor(
    private readonly purchaseService: PurchaseService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  getPurchases = (req: Request, res: Response) => { 
    this.purchaseService.getPuchases()
        .then(purchases => res.status(200).json(purchases))
        .catch(error => this.handleError(error, res))
  }

  createPurchase = (req: Request, res: Response) => {
    const [ error, createPurchaseDTO ] = CreatePurchaseDTO.create(req.body);
    if( error ) return res.status(422).json({ message: error })

    this.purchaseService.createPurchase(createPurchaseDTO!)
        .then(purchase => res.status(201).json(purchase))
        .catch(error => this.handleError(error, res))
  }

  getPurchaseById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ message: 'El id debe ser un numero' })

    this.purchaseService.getPurchase(+id)
        .then(purchase => res.status(200).json(purchase))
        .catch(error => this.handleError(error, res))
  }

  deletePurchaseById = (req: Request, res: Response) => {
    const userId = req.body.sessionUser.id;
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ message: 'El id debe ser un numero' })

    this.purchaseService.deletePurchase(+id, userId)
        .then(() => res.status(204).json(null))
        .catch(error => this.handleError(error, res))
  }


}
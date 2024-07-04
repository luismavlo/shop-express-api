import { protectAccountOwner } from '../../config/validate-owner';
import { Purchase } from '../../data/postgres/models/purchases.model';
import { CustomError } from '../../domain';
import { CreatePurchaseDTO } from '../../domain/dtos/purchases/create-purchase.dto';
import { AuthService } from './auth.service';
import { VideogameService } from './videogame.service';


enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}


export class PurchaseService {
  constructor(
    private readonly authService: AuthService,
    private readonly videogameService: VideogameService
  ){}

  async createPurchase(createPurchaseDTO: CreatePurchaseDTO){

    const videogamePromise = this.videogameService.findOneVideogameById(createPurchaseDTO.videogameId)
    const userPromise = this.authService.getProfile(createPurchaseDTO.userId)

    await Promise.all([videogamePromise, userPromise])

    const purchase = new Purchase();
    purchase.user_id = createPurchaseDTO.userId;
    purchase.videogame_id = createPurchaseDTO.videogameId;

    try {
      return await purchase.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }

  }

  async getPuchases(){
    try {
      return await Purchase.find({
        where: {
          status: Status.ACTIVE
        }
      })
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  async getPurchase(id: number){
    const purchase = await Purchase.findOne({
      where: {
        id: id,
        status: Status.ACTIVE
      }
    })

    if(!purchase) throw CustomError.notFound('Purchase not found')

    return purchase;
  }

  async deletePurchase(id: number, userSessionId: number){
    const purchase = await this.getPurchase(id)

    const isOwner = protectAccountOwner(purchase.user_id, userSessionId)
    if( !isOwner ) throw CustomError.unAuthorized('You are not the owner of this purchase')

    purchase.status = Status.INACTIVE 
    try {
      await purchase.save()
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

}
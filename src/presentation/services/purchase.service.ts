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
  ) { }

  async createPurchase (createPurchaseDTO: CreatePurchaseDTO) {

    const videogamePromise = this.videogameService.findOneVideogameById(createPurchaseDTO.videogameId)
    const userPromise = this.authService.getProfile(createPurchaseDTO.userId)

    const [videogame, user] = await Promise.all([videogamePromise, userPromise])

    const purchase = new Purchase();
    purchase.user = user;
    purchase.videogame = videogame;

    try {
      return await purchase.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  async getPuchases () {
    try {
      return await Purchase.find({
        where: {
          status: Status.ACTIVE
        },
        // order: {
        //   created_at: 'DESC'
        // },
        // take: 1
      })
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

  async getPurchase (id: number) {
    const purchase = await Purchase.findOne({
      where: {
        id: id,
        status: Status.ACTIVE
      },
      relations: ['user', 'videogame'],
      select: {
        user: {
          id: true,
          first_name: true,
          surname: true,
          email: true,
          role: true
        },
        videogame: {
          id: true,
          title: true,
          description: true,
          price: true
        }
      }
    })

    if (!purchase) throw CustomError.notFound('Purchase not found')

    return purchase;
  }

  async deletePurchase (id: number, userSessionId: number) {
    const purchase = await this.getPurchase(id)

    const isOwner = protectAccountOwner(purchase.user.id, userSessionId)
    if (!isOwner) throw CustomError.unAuthorized('You are not the owner of this purchase')

    purchase.status = Status.INACTIVE
    try {
      return await purchase.save()
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨")
    }
  }

}
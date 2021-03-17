import { singleton } from 'tsyringe';
import { SceneID } from '../constant';
import { BotContext } from '../interface';

@singleton()
export class AuthController {
  register(ctx: BotContext): any {
    return ctx.scene.enter(SceneID.REGISTER);
  }
}

import {
  JsonController,
  Post,
  Param,
  HttpCode,
  NotFoundError,
  Get,
  Body,
  Put,
  Delete
  //   Authorized
} from 'routing-controllers';
import Todays from './entity';

@JsonController()
export default class TodaysController {
  @Get('/todays')
  async allCategories() {
    const todays = await Todays.find();
    return { todays };
  }

  //   @Authorized()
  @Get('/todays/:id')
  @HttpCode(200)
  getEvaluation(@Param('id') id: number) {
    return Todays.findOne(id);
  }

  //   @Authorized()
  @Post('/todays')
  @HttpCode(201)
  async createTodays(@Body() todays: Todays) {
    return await todays.save();
  }

  //   @Authorized()
  @Put('/todays/:id')
  async updateEvaluation(
    @Param('id') id: number,
    @Body() update: Partial<Todays>
  ) {
    const todays = await Todays.findOne(id);
    if (!todays) throw new NotFoundError('Cannot find todays');

    return Todays.merge(todays, update).save();
  }

  //   @Authorized()
  @Delete('/todays/:id')
  async deleteTodays(@Param('id') id: number) {
    const todays = await Todays.findOne(id);
    if (!todays) throw new NotFoundError('Cannot find todays');

    return Todays.remove(todays);
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/user.service';
import { AdminContoller } from './app/admin/admin.controller';
import { AdminService } from './app/admin/admin.service';
import { BookingController } from './app/booking/booking.controller';
import { BookingService } from './app/booking/booking.service';

@Module({
  controllers: [UserController, AdminContoller, BookingController],
  providers: [UserService, AdminService, BookingService],
})
export class AppModule {}

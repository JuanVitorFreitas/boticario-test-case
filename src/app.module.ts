import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { OrdersModule } from './modules/order/orders.module';
import { ProductOrderModule } from './modules/product-order/product-order.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        OrdersModule,
        ProductModule,
        CategoryModule,
        AddressModule,
        ProductOrderModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}

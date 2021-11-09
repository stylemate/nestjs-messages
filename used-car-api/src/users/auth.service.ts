import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
    async signup(email: string, password: string) {
        // Validate Email
        const users = await this.usersService.find(email);
        if (users) throw new BadRequestException('email in use');

        // Hash password
        // // SYNC
        // const salt = bcrypt.genSaltSync(16);
        // console.log(salt);
        // const hash = bcrypt.hashSync(password, salt)
        // ASYNC
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // Create new user and save
        const user = await this.usersService.create(email, hash);
        // Return user
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) throw new NotFoundException('user not found');
        if (!(await bcrypt.compare(password, user.password)))
            throw new BadRequestException('bad password');
        return user;
    }
}

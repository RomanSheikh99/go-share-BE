import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDTO } from './user.dto';
export declare class UserController {
    private readonly appService;
    constructor(appService: UserService);
    getHello(): any;
    postHello(user: CreateUserDTO): Promise<User>;
    update(id: string, user: CreateUserDTO): Promise<User>;
    remove(id: string): Promise<User>;
}

import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    //Whenever CpuService is created, PowerService will be created
    constructor(private powerService: PowerService) {

    }
}

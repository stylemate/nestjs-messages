import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
    imports: [PowerModule], //module is imported and has access to all its services
    providers: [CpuService]
})
export class CpuModule {}

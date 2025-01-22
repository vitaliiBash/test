import { Controller, Post, Get, Body, Query, Param, UseGuards, Delete } from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { SectionService } from './section.service';
import { CreateSectionDto, FilterSectionsDto, SectionDto } from './dto/section.dto';

import { RolesGuard } from 'src/common/guards/roles.quard';
import { AllowedRoles } from 'src/common/decorators/roles.decorator';

import { Roles } from 'src/types/enum/roles';

@Controller({
    version: '1',
    path: 'section'
})
@UseGuards(RolesGuard)
export class SectionController {
    constructor(
        private readonly sectionService: SectionService
    ) {}

    @Post()
    @AllowedRoles([Roles.admin])
    @Serialize(SectionDto)
    async createSection(@Body() body: CreateSectionDto) {
        const data = await this.sectionService.createSection(body);

        return { data };
    }

    @Get()
    @Serialize(SectionDto)
    async getSections(@Query() filter: FilterSectionsDto) {
        const data = await this.sectionService.getSections(filter);

        return { data };
    }

    @Get(':id')
    @Serialize(SectionDto)
    async getSection(@Param('id') id: string) {
        const data = await this.sectionService.getSection(Number(id));

        return { data };
    }

    @Delete(':id')
    @AllowedRoles([Roles.admin])
    @Serialize(SectionDto)
    async deleteSection(@Param('id') id: string) {
        await this.sectionService.deleteSection(Number(id));
    }

}

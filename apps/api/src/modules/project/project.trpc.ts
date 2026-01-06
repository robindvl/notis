import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { 
  Project, 
  CreateProjectDto, 
  UpdateProjectDto,
  IdDto,
  AttrMetaDto
} from '@repo/domain';
import { ProjectService } from './project.service';

const validateList = typia.createAssert<{ spaceId: string } & AttrMetaDto<Project>>();
const validateShow = typia.createAssert<IdDto & AttrMetaDto<Project>>();
const validateCreate = typia.createAssert<CreateProjectDto>();
const validateUpdate = typia.createAssert<IdDto & UpdateProjectDto>();

@Injectable()
export class ProjectTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly projectService: ProjectService,
  ) {
    super();

    this.routes = {
      projects: this.trpcService.router({
        list: this.list(),
        show: this.show(),
        create: this.create(),
        update: this.update(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(async ({ input: { id } }) => {
        return this.projectService.findById(id);
      });
  }

  list() {
    return this.trpcService.procedure.input(validateList).query(async ({ input }) => {
      return this.projectService.list(input.spaceId);
    });
  }

  create() {
    return this.trpcService.procedure.input(validateCreate).mutation(async ({ input }) => {
      return this.projectService.create(input);
    });
  }

  update() {
    return this.trpcService.procedure.input(validateUpdate).mutation(async ({ input }) => {
      const { id, ...dto } = input;
      return this.projectService.update(id, dto);
    });
  }
}

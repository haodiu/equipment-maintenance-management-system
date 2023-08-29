import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../../common/dto/meta-status-ok.dto';

export class FileURLOkResponse {
  @ApiProperty({ type: MetaStatusOkDto })
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: {
    data: 'file_URL';
  };
}
